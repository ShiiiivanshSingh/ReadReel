'use client'

import { 
  Drawer, 
  Box, 
  Typography, 
  IconButton, 
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material'
import { 
  X, 
  Link as LinkIcon,
} from 'lucide-react'
import { useState } from 'react'

export default function ShareOverlay({ open, onClose, book }) {
  const [copied, setCopied] = useState(false)

  const shareOptions = [
    {
      name: 'Copy Link',
      icon: <LinkIcon size={20} />,
      action: async () => {
        try {
          await navigator.clipboard.writeText(window.location.href)
          setCopied(true)
          setTimeout(() => setCopied(false), 2000)
        } catch (err) {
          console.error('Failed to copy:', err)
        }
      }
    }
  ]

  return (
    <Drawer
      anchor="bottom"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          maxHeight: '70vh',
        }
      }}
    >
      <Box sx={{ p: 2, position: 'relative' }}>
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
          }}
        >
          <X size={20} />
        </IconButton>

        <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
          Share this book
        </Typography>

        {book && (
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'medium' }}>
              {book.title}
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.7 }}>
              by {book.author}
            </Typography>
          </Box>
        )}

        <Divider sx={{ mb: 2 }} />

        <List>
          {shareOptions.map((option) => (
            <ListItem
              key={option.name}
              button
              onClick={option.action}
              sx={{
                borderRadius: 2,
                mb: 1,
                '&:hover': {
                  bgcolor: 'action.hover',
                }
              }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>
                {option.icon}
              </ListItemIcon>
              <ListItemText 
                primary={option.name} 
                secondary={copied ? 'Copied!' : null}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  )
} 