'use client'

import { useState, useEffect } from 'react'
import { 
  Box, 
  Typography, 
  CircularProgress, 
  TextField, 
  InputAdornment,
  Grid,
  Chip
} from '@mui/material'
import { Search } from '@mui/icons-material'
import axios from 'axios'
import BookCard from '../components/BookCard'
import { fetchBooks } from '../utils/api'

const GOOGLE_BOOKS_API = 'https://www.googleapis.com/books/v1/volumes'

const TRENDING_GENRES = [
  'Bestseller',
  'New Release',
  'Award Winner',
  'Classic',
  'Popular'
]

export default function Explore() {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedGenre, setSelectedGenre] = useState('')

  useEffect(() => {
    loadBooks()
  }, [selectedGenre])

  const loadBooks = async () => {
    setLoading(true)
    try {
      const genres = selectedGenre ? [selectedGenre] : []
      const newBooks = await fetchBooks(genres, 1)
      const uniqueBooks = Array.from(
        new Map(newBooks.map(book => [book.id, book])).values()
      )
      setBooks(uniqueBooks)
    } catch (error) {
      console.error('Error loading books:', error)
    }
    setLoading(false)
  }

  const handleSearch = async (e) => {
    e.preventDefault()
    if (!searchQuery.trim()) return

    setLoading(true)
    try {
      const response = await axios.get(GOOGLE_BOOKS_API, {
        params: {
          q: searchQuery,
          maxResults: 10,
          key: process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY,
          langRestrict: 'en'
        }
      })

      if (response.data.items) {
        const searchResults = response.data.items.map(item => ({
          id: item.id,
          title: item.volumeInfo.title || 'Untitled',
          author: item.volumeInfo.authors?.[0] || 'Unknown Author',
          description: item.volumeInfo.description || 'No description available',
          coverImage: item.volumeInfo.imageLinks?.thumbnail || '/placeholder.jpg',
          genre: item.volumeInfo.categories?.[0] || 'Uncategorized',
          publishedDate: item.volumeInfo.publishedDate || 'Unknown Date'
        }))

        const uniqueBooks = Array.from(
          new Map(searchResults.map(book => [book.id, book])).values()
        )
        setBooks(uniqueBooks)
      } else {
        setBooks([])
      }
    } catch (error) {
      console.error('Error searching books:', error)
      setBooks([])
    }
    setLoading(false)
  }

  const handleGenreSelect = (genre) => {
    setSelectedGenre(genre === selectedGenre ? '' : genre)
    setSearchQuery('')
  }

  return (
    <Box sx={{ pb: 7, px: 2 }}>
      <Typography variant="h5" sx={{ my: 2 }}>
        Explore Books
      </Typography>

      <form onSubmit={handleSearch}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search books..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
          sx={{ mb: 2 }}
        />
      </form>

      <Typography variant="h6" sx={{ mb: 1 }}>
        Trending Categories
      </Typography>

      <Grid container spacing={1} sx={{ mb: 3 }}>
        {TRENDING_GENRES.map((genre) => (
          <Grid item key={genre}>
            <Chip
              label={genre}
              onClick={() => handleGenreSelect(genre)}
              color={genre === selectedGenre ? 'primary' : 'default'}
              clickable
            />
          </Grid>
        ))}
      </Grid>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
          <CircularProgress />
        </Box>
      ) : books.length > 0 ? (
        books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))
      ) : (
        <Typography color="text.secondary" sx={{ textAlign: 'center', mt: 4 }}>
          No books found. Try a different search or category.
        </Typography>
      )}
    </Box>
  )
} 