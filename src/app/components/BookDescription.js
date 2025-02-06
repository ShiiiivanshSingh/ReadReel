'use client'

import { useState } from 'react'
import { 
  Typography, 
  Button, 
  Dialog, 
  DialogTitle, 
  DialogContent,
  DialogActions,
  Box 
} from '@mui/material'

export default function BookDescription({ description }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Box sx={{ position: 'relative', minHeight: 72 }}>
        <Typography 
          variant="body1" 
          sx={{ 
            opacity: 0.8,
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            mb: 1
          }}
        >
          {description}
        </Typography>
        <Button 
          size="small" 
          onClick={() => setOpen(true)}
          sx={{ 
            position: 'absolute',
            bottom: -8,
            left: 0,
            color: 'primary.main',
            textTransform: 'none',
            '&:hover': { backgroundColor: 'transparent' }
          }}
        >
          Show more
        </Button>
      </Box>

      <Dialog 
        open={open} 
        onClose={() => setOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Book Description</DialogTitle>
        <DialogContent>
          <Typography sx={{ mt: 2 }}>
            {description}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}