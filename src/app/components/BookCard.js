'use client'

import { Box } from '@mui/material'
import { useState, useEffect } from 'react'

export default function BookCard({ book, expanded }) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const coverImage = book.coverImage?.replace('&edge=curl', '')?.replace('zoom=1', 'zoom=3') || '/placeholder.jpg'

  return (
    <Box
      sx={{
        height: '100%',
        width: '100%',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: expanded ? '100%' : '60%',
          background: expanded 
            ? 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.7) 100%)'
            : 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%)',
          zIndex: 1,
          transition: 'all 0.3s ease',
        },
      }}
    >
      {/* Background Image */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          bgcolor: 'background.paper',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url(${coverImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(20px)',
            opacity: 0.3,
          },
        }}
      />

      {/* Main Book Cover */}
      <Box
        component="img"
        src={coverImage}
        alt={book.title}
        onLoad={() => setImageLoaded(true)}
        sx={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          objectPosition: 'center',
          position: 'relative',
          zIndex: 0,
          opacity: imageLoaded ? 1 : 0,
          transition: 'all 0.3s ease',
          transform: expanded ? 'scale(0.9)' : 'none',
          padding: '8px',
        }}
      />

      {/* Loading Placeholder */}
      {!imageLoaded && (
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '60%',
            height: '80%',
            bgcolor: 'background.paper',
            borderRadius: 2,
          }}
        />
      )}
    </Box>
  )
} 