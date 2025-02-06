'use client'

import { Montserrat } from 'next/font/google'
import './globals.css'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import ScrollButton from './components/ScrollButton'
import { Box } from '@mui/material'
import ErrorBoundary from './components/ErrorBoundary'

const montserrat = Montserrat({ subsets: ['latin'] })

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',  // A nice blue that works well in dark mode
    },
    background: {
      default: '#000000',
      paper: '#121212',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar': {
            display: 'none'
          },
        },
      },
    },
  },
})

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <ErrorBoundary>
            <Box sx={{ minHeight: '100vh' }}>
             
              <ScrollButton />
              {children}
            </Box>
          </ErrorBoundary>
        </ThemeProvider>
      </body>
    </html>
  )
} 