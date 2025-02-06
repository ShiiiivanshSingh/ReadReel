'use client'

import { useState, useEffect } from 'react'
import { Fade, IconButton } from '@mui/material'
import { ArrowUp } from 'lucide-react'

export default function ScrollButton() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const toggleVisible = () => {
      const scrolled = document.documentElement.scrollTop
      setVisible(scrolled > 300)
    }

    window.addEventListener('scroll', toggleVisible)
    return () => window.removeEventListener('scroll', toggleVisible)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <Fade in={visible}>
      <IconButton
        onClick={scrollToTop}
        sx={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          bgcolor: 'background.paper',
          boxShadow: 2,
          zIndex: 1200,
          '&:hover': { bgcolor: 'background.paper' },
          width: { xs: 36, sm: 40 },
          height: { xs: 36, sm: 40 },
        }}
      >
        <ArrowUp size={20} />
      </IconButton>
    </Fade>
  )
} 