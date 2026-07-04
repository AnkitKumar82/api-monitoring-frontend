import React from 'react'
import {
  AppBar,
  Toolbar,
  Stack,
  Typography,
  Button,
  Box,
} from '@mui/material'
import Link from 'next/link'

import AppIcon from '../../../Commons/AppIcon'
import { useApp } from '../../../DataStores/AppContext'
import CButton from '../../../Components/CButton'
import CIconButton from '../../../Components/CIconButton'
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded'
import CToggle from '../../../Components/CToggle'
import CSwitch from '../../../Components/CSwitch'

export default function NavBar() {
  const { navbarRef } = useApp()

  return (
    <AppBar
      position="sticky"
      ref={navbarRef}
      sx={{
        zIndex: 1000,
        bgcolor: 'transparent !important',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        boxShadow: 'none',
        borderBottom: '1px solid var(--p-b-color)',
      }}
    >
      <Toolbar
        sx={{
          py: 0.5,
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{
            width: '100%',
          }}
        >
          {/* Logo */}

          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
          >
            <AppIcon />

            <Link
              href="/"
              style={{
                textDecoration: 'none',
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  fontWeight: 700,
                  color: 'var(--p-fg-color)',
                }}
              >
                API Sentinel
              </Typography>
            </Link>
          </Stack>

          {/* Navigation */}

          <Stack
            direction="row"
            spacing={4}
            alignItems="center"
            sx={{
              display: {
                xs: 'none',
                md: 'flex',
              },
            }}
          >
          </Stack>

          {/* Right Side */}

          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
          >
          </Stack>
        </Stack>
      </Toolbar>
    </AppBar>
  )
}