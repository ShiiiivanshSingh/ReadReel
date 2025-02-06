'use client'

import { useState, useEffect } from 'react'
import { IconButton, Fade } from '@mui/material'
import { ChevronUp } from 'lucide-react'

export default function ScrollButton() {
  const [visible, setVisible] = useState(false)

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop
    setVisible(scrolled > 300)
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  useEffect(() => {
    window.addEventListener('scroll', toggleVisible)
    return () => {
      window.removeEventListener('scroll', toggleVisible)
    }
  }, [])

  return (
    <Fade in={visible}>
      <IconButton
        onClick={scrollToTop}
        sx={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          bgcolor: 'background.paper',
          boxShadow: 2,
          '&:hover': {
            bgcolor: 'background.paper',
            opacity: 0.8,
          },
          zIndex: 10,
          display: visible ? 'flex' : 'none',
        }}
      >
        <ChevronUp />
      </IconButton>
    </Fade>
  )
} 