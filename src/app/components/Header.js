'use client'

import { useState, useEffect } from 'react'
import { 
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  InputBase,
  Stack,
  Button,
  Avatar,
  Fade,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import { 
  Search,
  Library,
  TrendingUp,
  Bookmark,
  Menu as MenuIcon,
  X,
  Home,
  Compass,
  User,
  Tag,
} from 'lucide-react'
import { alpha } from '@mui/material/styles'
import { useRouter } from 'next/navigation'

const navItems = [
  { 
    label: 'Home',
    icon: <Home size={18} />,
    path: '/'
  },
  { 
    label: 'Explore',
    icon: <Compass size={18} />,
    path: '/explore'
  },
  { 
    label: 'Library',
    icon: <Library size={18} />,
    path: '/library'
  },
  { 
    label: 'Reading List',
    icon: <Bookmark size={18} />,
    path: '/reading-list'
  }
]

const Header = ({ onGenreSelect }) => {
  const [showSearch, setShowSearch] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [scrolled, setScrolled] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const [showGenreSelector, setShowGenreSelector] = useState(false)
  const router = useRouter()

  // Scroll handling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleNavigation = (path) => {
    router.push(path)
    handleMenuClose()
  }

  const menuItems = [
    { 
      icon: <Home size={18} />, 
      text: 'Home',
      action: () => handleNavigation('/')
    },
    { 
      icon: <Compass size={18} />, 
      text: 'Explore',
      action: () => handleNavigation('/explore')
    },
    { 
      icon: <Library size={18} />, 
      text: 'Library',
      action: () => handleNavigation('/library')
    },
    { 
      icon: <Bookmark size={18} />, 
      text: 'Reading List',
      action: () => handleNavigation('/reading-list')
    },
    { 
      icon: <Tag size={18} />, 
      text: 'Change Genres',
      action: () => {
        setShowGenreSelector(true)
        handleMenuClose()
      }
    },
    { 
      icon: <User size={18} />, 
      text: 'Profile',
      action: () => handleNavigation('/profile')
    },
  ]

  return (
    <AppBar 
      position="fixed"
      elevation={scrolled ? 2 : 0}
      sx={{
        bgcolor: scrolled ? 'rgba(18, 18, 18, 0.9)' : 'background.paper',
        backdropFilter: 'blur(10px)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        transform: `scale(${scrolled ? 0.98 : 1})`,
      }}
    >
      <Toolbar>
        {/* Menu Button */}
        <IconButton
          onClick={handleMenuClick}
          sx={{ 
            mr: 2,
            '&:hover': { 
              transform: 'scale(1.05)',
              transition: 'transform 0.2s ease',
            },
          }}
        >
          <MenuIcon />
        </IconButton>

        {/* Logo */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            fontSize: scrolled ? '1.1rem' : '1.25rem',
            transition: 'all 0.3s ease',
          }}
        >
          ReadReel
        </Typography>

        {/* Desktop Navigation */}
        <Stack
          direction="row"
          spacing={2}
          sx={{
            ml: 4,
            display: { xs: 'none', md: 'flex' },
          }}
        >
          {navItems.map((item) => (
            <Button
              key={item.label}
              color="inherit"
              startIcon={item.icon}
              onClick={() => handleNavigation(item.path)}
              sx={{
                textTransform: 'none',
                fontWeight: 500,
                opacity: scrolled ? 0.8 : 1,
                '&:hover': {
                  opacity: 1,
                },
              }}
            >
              {item.label}
            </Button>
          ))}
        </Stack>

        <Box sx={{ flexGrow: 1 }} />

        {/* Search */}
        <Box sx={{ position: 'relative' }}>
          <Fade in={showSearch}>
            <Box
              sx={{
                position: 'absolute',
                right: 0,
                top: '50%',
                transform: 'translateY(-50%)',
                bgcolor: (theme) => alpha(theme.palette.common.white, 0.1),
                borderRadius: 2,
                width: showSearch ? 300 : 0,
                transition: 'width 0.3s ease',
              }}
            >
              <InputBase
                placeholder="Search books, authors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                sx={{
                  color: 'inherit',
                  width: '100%',
                  '& .MuiInputBase-input': {
                    p: 1,
                    pl: 2,
                    transition: 'width 0.3s ease',
                  },
                }}
              />
              <IconButton
                onClick={() => setShowSearch(false)}
                sx={{
                  position: 'absolute',
                  right: 4,
                  top: '50%',
                  transform: 'translateY(-50%)',
                }}
              >
                <X size={16} />
              </IconButton>
            </Box>
          </Fade>
          {!showSearch && (
            <IconButton onClick={() => setShowSearch(true)}>
              <Search />
            </IconButton>
          )}
        </Box>

        {/* Profile */}
        <IconButton sx={{ ml: 2 }}>
          <Avatar
            sx={{
              width: scrolled ? 32 : 36,
              height: scrolled ? 32 : 36,
              transition: 'all 0.3s ease',
            }}
          />
        </IconButton>

        {/* Menu Drawer */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          TransitionComponent={Fade}
          sx={{
            '& .MuiPaper-root': {
              borderRadius: 2,
              minWidth: 200,
              boxShadow: 'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
            },
          }}
        >
          {menuItems.map((item, index) => (
            <MenuItem
              key={index}
              onClick={item.action}
              sx={{
                py: 1,
                '&:hover': {
                  bgcolor: 'action.hover',
                },
              }}
            >
              <ListItemIcon>
                {item.icon}
              </ListItemIcon>
              <ListItemText>{item.text}</ListItemText>
            </MenuItem>
          ))}
        </Menu>
      </Toolbar>
    </AppBar>
  )
}

export default Header 