'use client'

import { useState, useEffect } from 'react'
import { 
  Box, 
  Typography, 
  TextField,
  InputAdornment,
  Chip,
  Stack,
  Container,
  Fade,
  IconButton,
} from '@mui/material'
import { 
  Search,
  TrendingUp,
  BookOpen,
  Sparkles,
  Clock,
  Compass,
  ChevronRight,
  ChevronLeft
} from 'lucide-react'
import BookCard from '../components/BookCard'
import { fetchBooks } from '../utils/api'
import dynamic from 'next/dynamic'

const Header = dynamic(() => import('../components/Header'), {
  ssr: false,
})

const TRENDING_GENRES = [
  { label: 'Fiction', icon: <BookOpen size={16} /> },
  { label: 'Fantasy', icon: <Sparkles size={16} /> },
  { label: 'Mystery', icon: <Compass size={16} /> },
  { label: 'Romance', icon: <TrendingUp size={16} /> },
  { label: 'New Releases', icon: <Clock size={16} /> }
]

export default function Explore() {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedGenre, setSelectedGenre] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    loadBooks()
  }, [selectedGenre])

  const loadBooks = async () => {
    setLoading(true)
    try {
      const genres = selectedGenre ? [selectedGenre] : []
      const newBooks = await fetchBooks(genres, 1)
      setBooks(newBooks)
    } catch (error) {
      console.error('Error loading books:', error)
    }
    setLoading(false)
  }

  const handleSearch = (event) => {
    setSearchQuery(event.target.value)
  }

  const handleGenreSelect = (genre) => {
    setSelectedGenre(genre === selectedGenre ? '' : genre)
  }

  const handleNext = () => {
    if (currentIndex < books.length - 1) {
      setCurrentIndex(prev => prev + 1)
    }
  }

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1)
    }
  }

  const currentBook = books[currentIndex]

  return (
    <Box sx={{ minHeight: '100vh', pt: 8 }}>
      <Header />
      
      <Container maxWidth="xl">
        <Box sx={{ height: 'calc(100vh - 64px)', position: 'relative' }}>
          {/* Search and Filters */}
          <Stack spacing={2} sx={{ mb: 4 }}>
            <TextField
              fullWidth
              placeholder="Search books, authors, or genres..."
              value={searchQuery}
              onChange={handleSearch}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search size={20} />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                }
              }}
            />

            <Stack 
              direction="row" 
              spacing={1} 
              sx={{ 
                overflowX: 'auto',
                pb: 1,
                '&::-webkit-scrollbar': { display: 'none' },
                scrollbarWidth: 'none'
              }}
            >
              {TRENDING_GENRES.map((genre) => (
                <Chip
                  key={genre.label}
                  label={genre.label}
                  icon={genre.icon}
                  onClick={() => handleGenreSelect(genre.label)}
                  sx={{
                    bgcolor: selectedGenre === genre.label ? 'primary.main' : 'background.paper',
                    '&:hover': { opacity: 0.9 },
                    px: 1
                  }}
                />
              ))}
            </Stack>
          </Stack>

          {/* Book Display */}
          {currentBook && (
            <Fade in={true} timeout={300}>
              <Box sx={{ height: 'calc(100% - 120px)', position: 'relative' }}>
                <BookCard book={currentBook} />
                
                {/* Navigation Buttons */}
                <Stack
                  direction="row"
                  spacing={2}
                  sx={{
                    position: 'absolute',
                    bottom: 32,
                    right: 32,
                    zIndex: 2,
                  }}
                >
                  <IconButton 
                    onClick={handlePrevious}
                    disabled={currentIndex === 0}
                    sx={{ bgcolor: 'background.paper' }}
                  >
                    <ChevronLeft />
                  </IconButton>
                  <IconButton 
                    onClick={handleNext}
                    disabled={currentIndex === books.length - 1}
                    sx={{ bgcolor: 'background.paper' }}
                  >
                    <ChevronRight />
                  </IconButton>
                </Stack>
              </Box>
            </Fade>
          )}
        </Box>
      </Container>
    </Box>
  )
} 