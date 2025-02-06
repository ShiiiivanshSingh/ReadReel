'use client'

import { useState } from 'react'
import {
  Box,
  Typography,
  Chip,
  IconButton,
  Fade,
  Paper
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
  'Business'
]

export default function GenreSelector({ open, onClose, onSelect }) {
  const [selected, setSelected] = useState([])

  const handleToggle = (genre) => {
    setSelected(prev => {
      const newSelection = prev.includes(genre)
        ? prev.filter(g => g !== genre)
        : [...prev, genre]
      
      // Immediately update parent component with new selection
      onSelect(newSelection)
      return newSelection
    })
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
          bgcolor: 'background.default',
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
            background: 'linear-gradient(180deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.2) 25%, rgba(0,0,0,0.2) 75%, rgba(0,0,0,0.8) 100%)',
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
              bgcolor: 'background.paper',
              boxShadow: 2,
              '&:hover': { bgcolor: 'background.paper' },
              width: { xs: 36, sm: 40 },
              height: { xs: 36, sm: 40 },
            }}
          >
            <X size={20} />
          </IconButton>

          {/* Main Content */}
          <Paper
            elevation={0}
            sx={{
              maxWidth: 600,
              width: '100%',
              background: 'linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.6))',
              backdropFilter: 'blur(10px)',
              borderRadius: 3,
              p: { xs: 2, sm: 4 },
            }}
          >
            <Typography
              variant="h5"
              sx={{
                color: '#fff',
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
                color: 'rgba(255,255,255,0.8)',
                textAlign: 'center',
                mb: 4,
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
              }}
            >
              {GENRES.map((genre) => (
                <Chip
                  key={genre}
                  label={genre}
                  onClick={() => handleToggle(genre)}
                  sx={{
                    bgcolor: selected.includes(genre) ? 'primary.main' : 'rgba(255,255,255,0.1)',
                    color: selected.includes(genre) ? 'primary.contrastText' : 'rgba(255,255,255,0.9)',
                    fontWeight: 500,
                    '&:hover': {
                      bgcolor: selected.includes(genre) ? 'primary.dark' : 'rgba(255,255,255,0.2)',
                    },
                  }}
                />
              ))}
            </Box>

            <Typography
              variant="caption"
              sx={{
                display: 'block',
                color: 'rgba(255,255,255,0.6)',
                textAlign: 'center',
                mt: 3,
              }}
            >
              {selected.length === 0 ? 'Select at least one genre to continue' : 
                `${selected.length} genre${selected.length > 1 ? 's' : ''} selected`}
            </Typography>
          </Paper>
        </Box>
      </Box>
    </Fade>
  )
} 