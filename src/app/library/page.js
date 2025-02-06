 'use client'

import { useState, useEffect } from 'react'
import { 
  Box, 
  Container, 
  Typography, 
  Stack,
  Fade,
  IconButton,
  Tabs,
  Tab,
} from '@mui/material'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import dynamic from 'next/dynamic'
import BookCard from '../components/BookCard'

const Header = dynamic(() => import('../components/Header'), {
  ssr: false,
})

export default function Library() {
  const [books, setBooks] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [activeTab, setActiveTab] = useState(0)

  useEffect(() => {
    const savedBooks = localStorage.getItem('savedBooks')
    if (savedBooks) {
      setBooks(JSON.parse(savedBooks))
    }
  }, [])

  const currentBook = books[currentIndex]

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

  return (
    <Box sx={{ minHeight: '100vh', pt: 8 }}>
      <Header />
      
      <Container maxWidth="xl">
        <Box sx={{ height: 'calc(100vh - 64px)', position: 'relative' }}>
          <Tabs
            value={activeTab}
            onChange={(e, newValue) => setActiveTab(newValue)}
            sx={{ mb: 4 }}
          >
            <Tab label="All Books" />
            <Tab label="Currently Reading" />
            <Tab label="Completed" />
          </Tabs>

          {books.length === 0 ? (
            <Box sx={{ textAlign: 'center', mt: 8 }}>
              <Typography variant="h5">Your library is empty</Typography>
              <Typography variant="body1" sx={{ mt: 2, opacity: 0.7 }}>
                Save books to add them to your library
              </Typography>
            </Box>
          ) : currentBook && (
            <Fade in={true} timeout={300}>
              <Box sx={{ height: 'calc(100% - 48px)', position: 'relative' }}>
                <BookCard book={currentBook} />
                
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