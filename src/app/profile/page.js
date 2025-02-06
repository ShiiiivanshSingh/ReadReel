'use client'

import { useState, useEffect } from 'react'
import { 
  Box, 
  Typography, 
  Tab, 
  Tabs, 
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material'
import { DarkMode, LightMode } from '@mui/icons-material'
import BookCard from '../components/BookCard'
import { useTheme } from '../theme/ThemeProvider'

export default function Profile() {
  const [mounted, setMounted] = useState(false)
  const [tab, setTab] = useState(0)
  const [likedBooks, setLikedBooks] = useState([])
  const [showClearDialog, setShowClearDialog] = useState(false)
  const { darkMode, toggleDarkMode } = useTheme()

  useEffect(() => {
    setMounted(true)
    const savedBooks = JSON.parse(localStorage.getItem('likedBooks') || '[]')
    setLikedBooks(savedBooks)
  }, [])

  const handleClearLikes = () => {
    localStorage.setItem('likedBooks', '[]')
    setLikedBooks([])
    setShowClearDialog(false)
  }

  if (!mounted) return null

  return (
    <Box sx={{ pb: 7, px: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', my: 2 }}>
        <Typography variant="h5">
          Your Profile
        </Typography>
        <Button
          variant="outlined"
          startIcon={darkMode ? <LightMode /> : <DarkMode />}
          onClick={toggleDarkMode}
        >
          {darkMode ? 'Light' : 'Dark'} Mode
        </Button>
      </Box>

      <Tabs 
        value={tab} 
        onChange={(e, newValue) => setTab(newValue)}
        sx={{ mb: 2 }}
      >
        <Tab label="Liked Books" />
        <Tab label="Settings" />
      </Tabs>

      {tab === 0 && (
        <>
          {likedBooks.length > 0 ? (
            <>
              <Button 
                color="error" 
                onClick={() => setShowClearDialog(true)}
                sx={{ mb: 2 }}
              >
                Clear All Likes
              </Button>
              {likedBooks.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </>
          ) : (
            <Typography color="text.secondary" sx={{ textAlign: 'center', mt: 4 }}>
              No liked books yet. Start exploring to find your favorites!
            </Typography>
          )}
        </>
      )}

      {tab === 1 && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="h6" gutterBottom>
            App Settings
          </Typography>
          {/* Add more settings here */}
        </Box>
      )}

      <Dialog open={showClearDialog} onClose={() => setShowClearDialog(false)}>
        <DialogTitle>Clear All Likes?</DialogTitle>
        <DialogContent>
          Are you sure you want to remove all liked books? This action cannot be undone.
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowClearDialog(false)}>Cancel</Button>
          <Button onClick={handleClearLikes} color="error">
            Clear All
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
} 