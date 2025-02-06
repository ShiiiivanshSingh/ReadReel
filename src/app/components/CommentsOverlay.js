'use client'

import { 
  Drawer, 
  Box, 
  Typography, 
  IconButton, 
  TextField,
  Avatar,
  Divider,
  Stack,
} from '@mui/material'
import { X, Send, Heart } from 'lucide-react'
import { useState } from 'react'

const SAMPLE_COMMENTS = [
  { 
    id: 1, 
    user: 'Alice', 
    text: 'This book changed my perspective on life!', 
    avatar: '/avatars/1.jpg',
    likes: 24,
  },
  { 
    id: 2, 
    user: 'Bob', 
    text: 'One of the best reads this year. The character development is amazing.', 
    avatar: '/avatars/2.jpg',
    likes: 18,
  },
]

export default function CommentsOverlay({ open, onClose, book }) {
  const [comment, setComment] = useState('')
  const [comments, setComments] = useState(SAMPLE_COMMENTS)
  const [likedComments, setLikedComments] = useState([])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!comment.trim()) return

    const newComment = {
      id: Date.now(),
      user: 'You',
      text: comment,
      avatar: '/avatars/default.jpg',
      likes: 0,
    }

    setComments(prev => [newComment, ...prev])
    setComment('')
  }

  const handleLike = (commentId) => {
    setLikedComments(prev => {
      const isLiked = prev.includes(commentId)
      if (isLiked) {
        return prev.filter(id => id !== commentId)
      }
      return [...prev, commentId]
    })

    setComments(prev => 
      prev.map(comment => {
        if (comment.id === commentId) {
          return {
            ...comment,
            likes: comment.likes + (likedComments.includes(commentId) ? -1 : 1)
          }
        }
        return comment
      })
    )
  }

  return (
    <Drawer
      anchor="bottom"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          height: '80vh',
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          bgcolor: 'background.paper',
        }
      }}
    >
      <Box sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" sx={{ flex: 1, fontWeight: 'bold' }}>
            Comments
          </Typography>
          <IconButton onClick={onClose}>
            <X size={20} />
          </IconButton>
        </Box>

        {book && (
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'medium' }}>
              {book.title}
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.7 }}>
              by {book.author}
            </Typography>
          </Box>
        )}

        <Divider sx={{ mb: 2 }} />

        {/* Comments List */}
        <Box sx={{ flex: 1, overflowY: 'auto', mb: 2 }}>
          <Stack spacing={2}>
            {comments.map(comment => (
              <Box key={comment.id} sx={{ display: 'flex', gap: 2 }}>
                <Avatar src={comment.avatar} />
                <Box sx={{ flex: 1 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                    {comment.user}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    {comment.text}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <IconButton 
                      size="small"
                      onClick={() => handleLike(comment.id)}
                      sx={{ 
                        color: likedComments.includes(comment.id) ? 'error.main' : 'inherit',
                      }}
                    >
                      <Heart 
                        size={16} 
                        fill={likedComments.includes(comment.id) ? 'currentColor' : 'none'} 
                      />
                    </IconButton>
                    <Typography variant="caption" sx={{ opacity: 0.7 }}>
                      {comment.likes}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            ))}
          </Stack>
        </Box>

        {/* Comment Input */}
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: 'flex',
            gap: 1,
            p: 2,
            borderTop: 1,
            borderColor: 'divider',
          }}
        >
          <TextField
            fullWidth
            size="small"
            placeholder="Add a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 3,
              }
            }}
          />
          <IconButton 
            type="submit"
            disabled={!comment.trim()}
            color="primary"
          >
            <Send size={20} />
          </IconButton>
        </Box>
      </Box>
    </Drawer>
  )
} 