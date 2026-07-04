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
            <Link
              href="#features"
              style={{
                textDecoration: 'none',
                color: 'inherit',
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  color: 'var(--s-fg-color)',
                  '&:hover': {
                    color: 'var(--p-fg-color)',
                  },
                }}
              >
                Features
              </Typography>
            </Link>

            <Link
              href="#pricing"
              style={{
                textDecoration: 'none',
                color: 'inherit',
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  color: 'var(--s-fg-color)',
                  '&:hover': {
                    color: 'var(--p-fg-color)',
                  },
                }}
              >
                Pricing
              </Typography>
            </Link>

            <Link
              href="#faq"
              style={{
                textDecoration: 'none',
                color: 'inherit',
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  color: 'var(--s-fg-color)',
                  '&:hover': {
                    color: 'var(--p-fg-color)',
                  },
                }}
              >
                FAQ
              </Typography>
            </Link>

            {/* <Link
              href="/roadmap"
              style={{
                textDecoration: 'none',
                color: 'inherit',
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  color: 'var(--s-fg-color)',
                  '&:hover': {
                    color: 'var(--p-fg-color)',
                  },
                }}
              >
                Roadmap
              </Typography>
            </Link> */}
          </Stack>

          {/* Right Side */}

          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
          >
            <Link
              href="/sign-up"
              style={{
                textDecoration: 'none',
                color: 'inherit',
              }}
            >
              <CButton size="large" cvariant='l' label="Log In"/>  
            </Link>
            <Link
              href="/sign-up"
              style={{
                textDecoration: 'none',
                color: 'inherit',
              }}
            >
              <CButton size="large" cvariant='s' active label="Sign Up"/>  
            </Link>
          </Stack>
        </Stack>
      </Toolbar>
    </AppBar>
  )
}