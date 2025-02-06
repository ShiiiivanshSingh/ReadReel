'use client'

import { Box, Skeleton, Stack } from '@mui/material'

export default function LoadingBook() {
  return (
    <Box
      sx={{
        height: '100%',
        width: '100%',
        position: 'relative',
        bgcolor: 'background.paper',
      }}
    >
      {/* Background Skeleton */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          overflow: 'hidden',
        }}
      >
        <Skeleton 
          variant="rectangular" 
          width="100%" 
          height="100%"
          animation="wave"
        />
      </Box>

      {/* Genre Tags Skeleton */}
      <Box
        sx={{
          position: 'absolute',
          left: { xs: 8, sm: 16 },
          top: { xs: 16, sm: 24 },
          zIndex: 2,
        }}
      >
        <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
          {[1, 2, 3].map(i => (
            <Skeleton
              key={i}
              variant="rounded"
              width={60}
              height={24}
              animation="wave"
            />
          ))}
        </Stack>
        <Skeleton
          variant="rounded"
          width={120}
          height={20}
          animation="wave"
        />
      </Box>

      {/* Interaction Buttons Skeleton */}
      <Stack
        spacing={2}
        sx={{
          position: 'absolute',
          right: { xs: 8, sm: 16 },
          bottom: '25%',
          zIndex: 2,
        }}
      >
        {[1, 2, 3, 4].map(i => (
          <Skeleton
            key={i}
            variant="circular"
            width={40}
            height={40}
            animation="wave"
          />
        ))}
      </Stack>

      {/* Book Info Skeleton */}
      <Box
        sx={{
          position: 'absolute',
          left: { xs: 8, sm: 16 },
          bottom: { xs: 16, sm: 24 },
          right: '20%',
          zIndex: 2,
        }}
      >
        <Skeleton
          variant="text"
          width="70%"
          height={32}
          animation="wave"
          sx={{ mb: 1 }}
        />
        <Skeleton
          variant="text"
          width="40%"
          height={24}
          animation="wave"
          sx={{ mb: 2 }}
        />
        <Stack spacing={1}>
          {[1, 2].map(i => (
            <Skeleton
              key={i}
              variant="text"
              width="90%"
              height={20}
              animation="wave"
            />
          ))}
        </Stack>
      </Box>

      {/* Progress Indicators Skeleton */}
      <Stack
        spacing={1}
        sx={{
          position: 'absolute',
          right: 4,
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 2,
        }}
      >
        {[1, 2, 3, 4, 5].map(i => (
          <Skeleton
            key={i}
            variant="rounded"
            width={4}
            height={16}
            animation="wave"
          />
        ))}
      </Stack>
    </Box>
  )
} 