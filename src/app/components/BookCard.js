'use client'

import { useState, useEffect } from 'react'
import { 
  Box,
  IconButton,
  Typography,
  Fade,
  Stack,
  Paper
} from '@mui/material'
import { 
  FavoriteBorderRounded, 
  FavoriteRounded,
  ThumbDownAltRounded,
  InfoRounded,
  ShareRounded,
  BookmarkBorderRounded
} from '@mui/icons-material'

export default function BookCard({ book }) {
  const [mounted, setMounted] = useState(false)
  const [liked, setLiked] = useState(false)

  useEffect(() => {
    setMounted(true)
    const likedBooks = JSON.parse(localStorage.getItem('likedBooks') || '[]')
    setLiked(likedBooks.some(b => b.id === book.id))
  }, [book.id])

  const handleLike = () => {
    if (!mounted) return
    const newLiked = !liked
    setLiked(newLiked)
    const likedBooks = JSON.parse(localStorage.getItem('likedBooks') || '[]')
    if (newLiked) {
      localStorage.setItem('likedBooks', JSON.stringify([...likedBooks, book]))
    } else {
      localStorage.setItem('likedBooks', JSON.stringify(likedBooks.filter(b => b.id !== book.id)))
    }
  }

  if (!mounted) return null

  const coverImage = book.coverImage?.replace('&edge=curl', '')?.replace('zoom=1', 'zoom=3') || '/placeholder.jpg'

  return (
    <Fade in timeout={500}>
      <Box
        sx={{
          height: '100vh',
          width: '100%',
          position: 'relative',
          bgcolor: 'background.default',
          scrollSnapAlign: 'start',
          overflow: 'hidden',
          pt: { xs: 8, sm: 0 },
        }}
      >
        {/* Gradient Overlay - Enhanced for better readability */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(180deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.2) 25%, rgba(0,0,0,0.2) 75%, rgba(0,0,0,0.8) 100%)',
            zIndex: 1,
          }}
        />

        {/* Book Cover Background */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url(${coverImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(30px) brightness(0.5)',
            transform: 'scale(1.1)',
          }}
        />

        {/* Content Container */}
        <Box
          sx={{
            position: 'relative',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2,
          }}
        >
          {/* Book Cover */}
          <Box
            component="img"
            src={coverImage}
            alt={book.title}
            sx={{
              height: { xs: '65vh', sm: '75vh' },
              maxWidth: '95%',
              objectFit: 'contain',
              borderRadius: '12px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
            }}
          />

          {/* Side Actions */}
          <Stack
            spacing={2}
            sx={{
              position: 'absolute',
              right: { xs: 2, sm: 6 },
              bottom: { xs: '20%', sm: '30%' },
              alignItems: 'center',
            }}
          >
            <IconButton 
              onClick={handleLike} 
              sx={{ 
                bgcolor: 'background.paper',
                boxShadow: 2,
                '&:hover': { bgcolor: 'background.paper' },
                width: { xs: 36, sm: 40 },
                height: { xs: 36, sm: 40 },
              }}
            >
              {liked ? 
                <FavoriteRounded color="error" sx={{ fontSize: { xs: 20, sm: 24 } }} /> : 
                <FavoriteBorderRounded sx={{ fontSize: { xs: 20, sm: 24 } }} />
              }
            </IconButton>
            <IconButton 
              sx={{ 
                bgcolor: 'background.paper',
                boxShadow: 2,
                '&:hover': { bgcolor: 'background.paper' },
              }}
            >
              <ThumbDownAltRounded />
            </IconButton>
            <IconButton 
              sx={{ 
                bgcolor: 'background.paper',
                boxShadow: 2,
                '&:hover': { bgcolor: 'background.paper' },
              }}
            >
              <BookmarkBorderRounded />
            </IconButton>
            <IconButton 
              sx={{ 
                bgcolor: 'background.paper',
                boxShadow: 2,
                '&:hover': { bgcolor: 'background.paper' },
              }}
            >
              <ShareRounded />
            </IconButton>
          </Stack>

          {/* Book Info - Enhanced for better readability */}
          <Paper
            elevation={0}
            sx={{
              position: 'absolute',
              left: { xs: 3, sm: 8 },
              right: { xs: 3, sm: 8 },
              bottom: { xs: '5%', sm: '12%' },
              background: 'linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.6))',
              backdropFilter: 'blur(10px)',
              borderRadius: 3,
              p: { xs: 2, sm: 3 },
              maxWidth: { sm: '600px' },
            }}
          >
            {/* Genre Tag */}
            <Typography
              variant="caption"
              sx={{
                display: 'inline-block',
                bgcolor: 'primary.main',
                color: 'primary.contrastText',
                px: 1.5,
                py: 0.5,
                borderRadius: 'full',
                mb: 1,
                fontSize: { xs: '0.7rem', sm: '0.8rem' },
                fontWeight: 500,
                letterSpacing: '0.5px',
              }}
            >
              {book.genre || 'Fiction'}
            </Typography>

            {/* Title */}
            <Typography 
              variant="h5" 
              gutterBottom 
              sx={{ 
                fontSize: { xs: '1.25rem', sm: '1.75rem' },
                fontWeight: 700,
                color: '#fff',
                letterSpacing: '-0.01em',
                lineHeight: 1.2,
                mb: 1,
              }}
            >
              {book.title}
            </Typography>

            {/* Author */}
            <Typography 
              variant="subtitle1" 
              sx={{ 
                fontSize: { xs: '0.875rem', sm: '1rem' },
                color: 'rgba(255,255,255,0.9)',
                fontWeight: 500,
                mb: 2,
              }}
            >
              by {book.author}
            </Typography>

            {/* Description */}
            <Typography
              variant="body2"
              sx={{
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                color: 'rgba(255,255,255,0.8)',
                fontSize: { xs: '0.8rem', sm: '0.9rem' },
                lineHeight: { xs: 1.4, sm: 1.6 },
                letterSpacing: '0.01em',
                maxWidth: '100%',
                textAlign: 'justify',
              }}
            >
              {book.description}
            </Typography>

            {/* Published Date */}
            <Typography
              variant="caption"
              sx={{
                display: 'block',
                mt: 2,
                color: 'rgba(255,255,255,0.6)',
                fontSize: { xs: '0.7rem', sm: '0.8rem' },
                fontWeight: 500,
              }}
            >
              Published: {book.publishedDate}
            </Typography>
          </Paper>
        </Box>
      </Box>
    </Fade>
  )
} 