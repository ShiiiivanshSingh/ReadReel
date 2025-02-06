'use client'

import { useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { BottomNavigation as MUIBottomNavigation, BottomNavigationAction, Paper } from '@mui/material'
import { Home, Explore, Person } from '@mui/icons-material'

export default function BottomNavigation() {
  const router = useRouter()
  const pathname = usePathname()
  const [value, setValue] = useState(pathname)

  const handleChange = (event, newValue) => {
    setValue(newValue)
    router.push(newValue)
  }

  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
      <MUIBottomNavigation value={value} onChange={handleChange}>
        <BottomNavigationAction
          label="Home"
          value="/"
          icon={<Home />}
        />
        <BottomNavigationAction
          label="Explore"
          value="/explore"
          icon={<Explore />}
        />
        <BottomNavigationAction
          label="Profile"
          value="/profile"
          icon={<Person />}
        />
      </MUIBottomNavigation>
    </Paper>
  )
} 