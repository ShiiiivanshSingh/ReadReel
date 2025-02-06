'use client'

import { useState, useEffect } from 'react'
import { 
  Box, 
  Container, 
  Typography,
  Avatar,
  Paper,
  Stack,
} from '@mui/material'
import dynamic from 'next/dynamic'

const Header = dynamic(() => import('../components/Header'), {
  ssr: false,
})

export default function Profile() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    // Get user data from localStorage or your auth system
    const userData = localStorage.getItem('user')
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  return (
    <Box sx={{ minHeight: '100vh', pt: 8 }}>
      <Header />
      
      <Container maxWidth="md">
        <Paper sx={{ mt: 4, p: 4 }}>
          <Stack spacing={3} alignItems="center">
            <Avatar 
              sx={{ 
                width: 120, 
                height: 120,
                bgcolor: 'primary.main'
              }}
            >
              {user?.name?.[0] || 'U'}
            </Avatar>
            
            <Typography variant="h4">
              {user?.name || 'User Profile'}
            </Typography>

            <Typography variant="body1" color="text.secondary">
              {user?.email || 'No email provided'}
            </Typography>

            {!user && (
              <Typography variant="body1" color="text.secondary">
                Please sign in to view your profile
              </Typography>
            )}
          </Stack>
        </Paper>
      </Container>
    </Box>
  )
}