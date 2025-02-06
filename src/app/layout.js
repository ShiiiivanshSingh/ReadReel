import { Montserrat } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from './theme/ThemeProvider'
import MenuButton from './components/MenuButton'
import ScrollButton from './components/ScrollButton'
import { Box } from '@mui/material'
import ErrorBoundary from '@/components/ErrorBoundary'

const montserrat = Montserrat({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <ThemeProvider>
          <ErrorBoundary>
            <Box sx={{ minHeight: '100vh' }}>
              <MenuButton />
              <ScrollButton />
              {children}
            </Box>
          </ErrorBoundary>
        </ThemeProvider>
      </body>
    </html>
  )
} 