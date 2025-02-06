'use client'

import { useState, useEffect, useRef } from 'react'
import { 
  Box, 
  IconButton, 
  Typography, 
  Fade,
  Chip,
  Rating,
  Stack,
  useMediaQuery,
  useTheme,
  Container,
} from '@mui/material'
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  ChevronUp, 
  ChevronDown,
  Bookmark,
  BookmarkCheck,
  BookmarkPlus,
  Star,
} from 'lucide-react'
import { useSwipeable } from 'react-swipeable'
import dynamic from 'next/dynamic'
import BookCard from './components/BookCard'
import GenreSelector from './components/GenreSelector'
import { fetchBooks } from './utils/api'

// Add this import with the other imports
import BookDescription from './components/BookDescription'


// Dynamic imports to avoid SSR issues
const ShareOverlay = dynamic(() => import('./components/ShareOverlay'), {
  ssr: false,
})

const CommentsOverlay = dynamic(() => import('./components/CommentsOverlay'), {
  ssr: false,
})

const LoadingBook = dynamic(() => import('./components/LoadingBook'), {
  ssr: false,
})

// Dynamic import for Header to avoid SSR issues
const Header = dynamic(() => import('./components/Header'), {
  ssr: false,
})

export default function Home() {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [showGenreSelector, setShowGenreSelector] = useState(false)
  const [selectedGenres, setSelectedGenres] = useState([])
  const [page, setPage] = useState(1)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [likedBooks, setLikedBooks] = useState([])
  const [showComments, setShowComments] = useState(false)
  const [savedBooks, setSavedBooks] = useState([])
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [showShare, setShowShare] = useState(false)
  const [expandedView, setExpandedView] = useState(false)
  const containerRef = useRef(null)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  useEffect(() => {
    loadBooks(1, [])
    // Load liked books from localStorage
    const savedLikes = localStorage.getItem('likedBooks')
    if (savedLikes) {
      setLikedBooks(JSON.parse(savedLikes))
    }
  }, [])

  useEffect(() => {
    if (selectedGenres.length > 0) {
      setBooks([])
      setPage(1)
      loadBooks(1, selectedGenres)
    }
  }, [selectedGenres])

  useEffect(() => {
    const saved = localStorage.getItem('savedBooks')
    if (saved) {
      setSavedBooks(JSON.parse(saved))
    }
  }, [])

  const loadBooks = async (pageNum = page, genres = selectedGenres) => {
    try {
      setLoading(true)
      const newBooks = await fetchBooks(genres, pageNum)
      
      if (!newBooks || newBooks.length === 0) {
        setLoading(false)
        return
      }
      
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

  const handleScroll = (direction) => {
    if (loading || isTransitioning) return

    setIsTransitioning(true)
    const newIndex = direction === 'up' 
      ? Math.max(0, currentIndex - 1)
      : Math.min(books.length - 1, currentIndex + 1)

    setCurrentIndex(newIndex)

    // Load more books when near the end
    if (books.length - newIndex <= 3 && !loading) {
      const nextPage = page + 1
      setPage(nextPage)
      loadBooks(nextPage)
    }

    // Reset transition after animation completes
    setTimeout(() => {
      setIsTransitioning(false)
    }, 300)
  }

  const handleLike = (book) => {
    setLikedBooks(prev => {
      const isLiked = prev.some(b => b.id === book.id)
      const newLikes = isLiked
        ? prev.filter(b => b.id !== book.id)
        : [...prev, book]
      
      localStorage.setItem('likedBooks', JSON.stringify(newLikes))
      return newLikes
    })
  }

  const handleSave = (book) => {
    setSavedBooks(prev => {
      const isSaved = prev.some(b => b.id === book.id)
      const newSaved = isSaved
        ? prev.filter(b => b.id !== book.id)
        : [...prev, book]
      
      localStorage.setItem('savedBooks', JSON.stringify(newSaved))
      return newSaved
    })
  }

  const swipeHandlers = useSwipeable({
    onSwipedUp: () => handleScroll('down'),
    onSwipedDown: () => handleScroll('up'),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
    delta: 50,
    swipeDuration: 500,
    trackTouch: true,
  })

  const currentBook = books[currentIndex]
  const isLiked = currentBook ? likedBooks.some(b => b.id === currentBook.id) : false
  const isSaved = currentBook ? savedBooks.some(b => b.id === currentBook.id) : false

  const handleKeyNavigation = (e) => {
    if (loading || isTransitioning) return
    
    if (e.key === 'ArrowUp') {
      handleScroll('up')
    } else if (e.key === 'ArrowDown') {
      handleScroll('down')
    } else if (e.key === 'Enter') {
      setExpandedView(prev => !prev)
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyNavigation)
    return () => window.removeEventListener('keydown', handleKeyNavigation)
  }, [currentIndex, loading, isTransitioning])

  return (
    <Box sx={{ minHeight: '100vh', pt: 8 }}>
      <Header />
      
      <Container maxWidth="xl">
        <Box 
          {...swipeHandlers}
          sx={{ 
            height: 'calc(100vh - 64px)',
            position: 'relative',
            touchAction: 'none',
          }}
        >
          {loading ? (
            <LoadingBook />
          ) : currentBook && (
            <Fade 
              in={true} 
              timeout={300}
              style={{
                transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            >
              <Box 
                sx={{ 
                  height: '100%',
                  width: '100%',
                  position: 'relative',
                  transform: isTransitioning ? 'scale(0.98)' : 'scale(1)',
                  transition: 'transform 0.3s ease',
                }}
              >
                <BookCard book={currentBook} />

                {/* Book Info Overlay */}
                <Box 
                  sx={{ 
                    position: 'absolute',
                    left: { xs: 16, sm: 32 },
                    bottom: { xs: 24, sm: 48 },
                    right: '25%',
                    zIndex: 2,
                    color: 'white',
                    opacity: isTransitioning ? 0 : 1,
                    transition: 'opacity 0.3s ease',
                  }}
                >
                  <Stack spacing={1}>
                    {/* Genre Tags */}
                    <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                      {currentBook.genres?.map(genre => (
                        <Chip
                          key={genre}
                          label={genre}
                          size="small"
                          sx={{
                            bgcolor: 'rgba(255,255,255,0.1)',
                            color: 'white',
                            backdropFilter: 'blur(4px)',
                          }}
                        />
                      ))}
                    </Stack>

                    {/* Rating */}
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Rating 
                        value={currentBook.rating || 4.5} 
                        readOnly 
                        size="small"
                        icon={<Star size={16} />}
                      />
                      <Typography variant="body2" sx={{ opacity: 0.8 }}>
                        {currentBook.rating || 4.5}/5
                      </Typography>
                    </Stack>

                    {/* Title & Author */}
                    <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
                      {currentBook.title}
                    </Typography>
                    <Typography variant="h6" sx={{ opacity: 0.9, mb: 2 }}>
                      by {currentBook.author}
                    </Typography>

                    {/* Description */}
                    // Replace the Description section with:
<Box sx={{ mb: { xs: 8, sm: 2 } }}> {/* Added bottom margin for small screens */}
  <BookDescription description={currentBook.description} />
</Box>
                  </Stack>
                </Box>

                {/* Action Buttons */}
                <Stack
                  spacing={3}
                  sx={{
                    position: 'absolute',
                    right: { xs: 16, sm: 32 },
                    bottom: '25%',
                    zIndex: 2,
                  }}
                >
                  <IconButton 
                    onClick={(e) => {
                      e.stopPropagation()
                      handleLike(currentBook)
                    }}
                    className={isLiked ? 'liked' : ''}
                    sx={{
                      color: 'white',
                      transform: isLiked ? 'scale(1.1)' : 'scale(1)',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        transform: 'scale(1.2)',
                      },
                      '&.liked': {
                        color: 'error.main',
                        animation: 'likeAnimation 0.3s ease-in-out',
                      },
                      '@keyframes likeAnimation': {
                        '0%': { transform: 'scale(1)' },
                        '50%': { transform: 'scale(1.3)' },
                        '100%': { transform: 'scale(1.1)' },
                      },
                    }}
                  >
                    <Heart fill={isLiked ? 'currentColor' : 'none'} />
                  </IconButton>
                  <IconButton 
                    onClick={(e) => {
                      e.stopPropagation()
                      handleSave(currentBook)
                    }}
                    sx={{
                      color: 'white',
                      transform: isSaved ? 'scale(1.1)' : 'scale(1)',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {isSaved ? <BookmarkCheck /> : <Bookmark />}
                  </IconButton>
                  <IconButton onClick={(e) => {
                    e.stopPropagation()
                    setShowComments(true)
                  }}>
                    <MessageCircle />
                  </IconButton>
                  <IconButton onClick={(e) => {
                    e.stopPropagation()
                    setShowShare(true)
                  }}>
                    <Share2 />
                  </IconButton>
                </Stack>
              </Box>
            </Fade>
          )}
        </Box>

        <GenreSelector
          open={showGenreSelector}
          onClose={() => setShowGenreSelector(false)}
          onSelect={setSelectedGenres}
        />

        <CommentsOverlay
          open={showComments}
          onClose={() => setShowComments(false)}
          book={currentBook}
        />
        <ShareOverlay
          open={showShare}
          onClose={() => setShowShare(false)}
          book={{
            title: currentBook?.title,
            author: currentBook?.author,
            // Add any other book properties needed for sharing
          }}
        />
      </Container>
    </Box>
  )
} 