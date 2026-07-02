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

import AppIcon from './AppIcon'
import { useApp } from '../DataStores/AppContext'

export default function NavBar() {
  const { navbarRef } = useApp()

  return (
    <AppBar
      position="sticky"
      ref={navbarRef}
      sx={{
        zIndex: 1000,
        bgcolor: 'var(--p-bg-st-color) !important',
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

            <Link
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
            </Link>
          </Stack>

          {/* Right Side */}

          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
          >
            <Button
              variant="text"
              disableRipple
              sx={{
                display: {
                  xs: 'none',
                  md: 'inline-flex',
                },
              }}
            >
              Sign In
            </Button>

            <Button
              variant="contained"
              disableRipple
              sx={{
                borderRadius: '12px',
                px: 3,
              }}
            >
              Join Waitlist
            </Button>
          </Stack>
        </Stack>
      </Toolbar>
    </AppBar>
  )
}