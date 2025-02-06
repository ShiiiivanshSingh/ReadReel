'use client'

import { useState } from 'react'
import { 
  IconButton, 
  Menu, 
  MenuItem, 
  ListItemIcon, 
  ListItemText,
  Box,
  Fade
} from '@mui/material'
import { 
  Menu as MenuIcon,
  Home,
  Compass,
  User,
  Sun,
  Moon
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useTheme } from '../theme/ThemeProvider'

export default function MenuButton() {
  const [anchorEl, setAnchorEl] = useState(null)
  const router = useRouter()
  const { darkMode, toggleDarkMode } = useTheme()

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleNavigation = (path) => {
    router.push(path)
    handleClose()
  }

  return (
    <Box sx={{ 
      position: 'fixed', 
      top: { xs: 8, sm: 16 }, // Less top margin on mobile
      left: { xs: 8, sm: 16 }, 
      zIndex: 1200 
    }}>
      <IconButton
        onClick={handleClick}
        sx={{ 
          bgcolor: 'background.paper',
          boxShadow: 2,
          '&:hover': { bgcolor: 'background.paper' },
          width: { xs: 36, sm: 40 }, // Smaller on mobile
          height: { xs: 36, sm: 40 },
        }}
      >
        <MenuIcon size={20} />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        TransitionComponent={Fade}
        sx={{
          '& .MuiPaper-root': {
            borderRadius: 2,
            minWidth: { xs: 160, sm: 180 }, // Smaller on mobile
            boxShadow: 'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
          },
        }}
      >
        <MenuItem onClick={() => handleNavigation('/')}>
          <ListItemIcon>
            <Home size={18} />
          </ListItemIcon>
          <ListItemText>Home</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleNavigation('/explore')}>
          <ListItemIcon>
            <Compass size={18} />
          </ListItemIcon>
          <ListItemText>Explore</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleNavigation('/profile')}>
          <ListItemIcon>
            <User size={18} />
          </ListItemIcon>
          <ListItemText>Profile</ListItemText>
        </MenuItem>
        <MenuItem onClick={toggleDarkMode}>
          <ListItemIcon>
            {darkMode ? 
              <Sun size={18} /> : 
              <Moon size={18} />
            }
          </ListItemIcon>
          <ListItemText>{darkMode ? 'Light Mode' : 'Dark Mode'}</ListItemText>
        </MenuItem>
      </Menu>
    </Box>
  )
} 