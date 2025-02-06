'use client'

import { useState, useEffect } from 'react'
import { Box, CircularProgress } from '@mui/material'
import BookCard from './components/BookCard'
import GenreSelector from './components/GenreSelector'
import { fetchBooks } from './utils/api'

export default function Home() {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [showGenreSelector, setShowGenreSelector] = useState(false)
  const [selectedGenres, setSelectedGenres] = useState([])
  const [page, setPage] = useState(1)

  useEffect(() => {
    if (selectedGenres.length > 0) {
      setBooks([]) // Clear existing books
      setPage(1)
      loadBooks(1, selectedGenres)
    }
  }, [selectedGenres])

  const loadBooks = async (pageNum = page, genres = selectedGenres) => {
    try {
      setLoading(true)
      const newBooks = await fetchBooks(genres, pageNum)
      
      setBooks(prevBooks => {
        const uniqueBooks = [...prevBooks]
        newBooks.forEach(newBook => {
          if (!uniqueBooks.some(book => book.id === newBook.id)) {
            uniqueBooks.push(newBook)
          }
        })
        return uniqueBooks
      })
      
      setLoading(false)
    } catch (error) {
      console.error('Error loading books:', error)
      setLoading(false)
    }
  }

  const handleScroll = (e) => {
    if (loading) return

    const bottom = Math.abs(
      e.target.scrollHeight - e.target.scrollTop - e.target.clientHeight
    ) < 1

    if (bottom) {
      const nextPage = page + 1
      setPage(nextPage)
      loadBooks(nextPage)
    }

    // Show genre selector after scrolling past 5 books
    if (e.target.scrollTop > 1000 && !showGenreSelector && selectedGenres.length === 0) {
      setShowGenreSelector(true)
    }
  }

  return (
    <Box 
      sx={{ 
        height: '100vh',
        overflowY: 'auto',
        scrollSnapType: 'y mandatory',
        '&::-webkit-scrollbar': {
          display: 'none'
        },
        scrollbarWidth: 'none',
      }}
      onScroll={handleScroll}
    >
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
      
      {loading && (
        <Box 
          sx={{ 
            height: '100vh', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            scrollSnapAlign: 'start',
          }}
        >
          <CircularProgress />
        </Box>
      )}

      <GenreSelector
        open={showGenreSelector}
        onClose={() => setShowGenreSelector(false)}
        onSelect={setSelectedGenres}
      />
    </Box>
  )
} 