'use client'

import { useState } from 'react'
import {
  Box,
  Typography,
  Chip,
  IconButton,
  Fade,
  Paper,
  Button,
} from '@mui/material'
import { X } from 'lucide-react'

const GENRES = [
  'Fiction',
  'Fantasy',
  'Romance',
  'Mystery',
  'Science Fiction',
  'Thriller',
  'Horror',
  'Historical Fiction',
  'Literary Fiction',
  'Contemporary',
  'Adventure',
  'Young Adult',
  'Biography',
  'Non-Fiction',
  'Self-Help',
  'Business',
  'Poetry',
  'Drama',
  'Crime',
  'Classics'
]

export default function GenreSelector({ open, onClose, onSelect }) {
  const [selectedGenres, setSelectedGenres] = useState([])

  const handleGenreClick = (genre) => {
    setSelectedGenres(prev => {
      const newSelection = prev.includes(genre)
        ? prev.filter(g => g !== genre)
        : [...prev, genre]
      return newSelection
    })
  }

  const handleSubmit = () => {
    if (selectedGenres.length > 0) {
      onSelect(selectedGenres)
      onClose()
    }
  }

  if (!open) return null

  return (
    <Fade in={open}>
      <Box
        sx={{
          height: '100vh',
          width: '100%',
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 1000,
          overflow: 'hidden',
        }}
      >
        {/* Background Gradient */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.1) 25%, rgba(0,0,0,0.1) 75%, rgba(0,0,0,0.6) 100%)',
          }}
        />

        {/* Content */}
        <Box
          sx={{
            position: 'relative',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            p: 3,
            zIndex: 2,
          }}
        >
          {/* Close Button */}
          <IconButton
            onClick={onClose}
            sx={{
              position: 'absolute',
              top: { xs: 8, sm: 16 },
              right: { xs: 8, sm: 16 },
              width: { xs: 36, sm: 40 },
              height: { xs: 36, sm: 40 },
            }}
          >
            <X size={20} />
          </IconButton>

          {/* Main Content */}
          <Paper
            elevation={3}
            sx={{
              maxWidth: 600,
              width: '100%',
              backdropFilter: 'blur(10px)',
              borderRadius: 3,
              p: { xs: 2, sm: 4 },
              bgcolor: 'background.paper',
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                textAlign: 'center',
                mb: 3,
              }}
            >
              Choose Your Reading Preferences
            </Typography>

            <Typography
              variant="body1"
              sx={{
                textAlign: 'center',
                mb: 4,
                opacity: 0.8,
              }}
            >
              Select the genres you enjoy to get personalized book recommendations
            </Typography>

            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 1.5,
                justifyContent: 'center',
                mb: 4,
              }}
            >
              {GENRES.map((genre) => (
                <Chip
                  key={genre}
                  label={genre}
                  onClick={() => handleGenreClick(genre)}
                  sx={{
                    bgcolor: selectedGenres.includes(genre) ? 'primary.main' : 'rgba(255,255,255,0.1)',
                    color: selectedGenres.includes(genre) ? 'primary.contrastText' : 'text.primary',
                    fontWeight: 500,
                    '&:hover': {
                      bgcolor: selectedGenres.includes(genre) ? 'primary.dark' : 'rgba(255,255,255,0.2)',
                    },
                  }}
                />
              ))}
            </Box>

            {/* Submit Button */}
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
              <Button
                variant="contained"
                onClick={handleSubmit}
                disabled={selectedGenres.length === 0}
                sx={{
                  minWidth: 200,
                  py: 1.5,
                  textTransform: 'none',
                  fontSize: '1.1rem',
                  fontWeight: 600,
                }}
              >
                {selectedGenres.length === 0 ? 'Select genres to continue' : 'Apply Preferences'}
              </Button>
            </Box>

            <Typography
              variant="caption"
              sx={{
                display: 'block',
                textAlign: 'center',
                mt: 3,
                opacity: 0.7,
              }}
            >
              {selectedGenres.length === 0 ? 'Select at least one genre to continue' : 
                `${selectedGenres.length} genre${selectedGenres.length > 1 ? 's' : ''} selected`}
            </Typography>
          </Paper>
        </Box>
      </Box>
    </Fade>
  )
} 