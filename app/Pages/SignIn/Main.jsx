import React, { useState } from 'react'
import Link from 'next/link'

import {
  Box,
  Card,
  Container,
  Grid,
  Stack,
  Typography,
  Divider
} from '@mui/material'

import EmailRoundedIcon from '@mui/icons-material/EmailRounded'
import LockRoundedIcon from '@mui/icons-material/LockRounded'
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded'
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded'
import GoogleIcon from '@mui/icons-material/Google'

import CTypography from '../../Components/CTypography'
import CTextField from '../../Components/CTextField'
import CButton from '../../Components/CButton'
import CCheckbox from '../../Components/CCheckbox'
import CToggle from '../../Components/CToggle'

const GlassCard = ({ style = {}, children }) => (
  <Card
    sx={{
      height: '100%',
      background: 'var(--s-bg-color)',
      backdropFilter: 'blur(20px)',
      border: '1px solid var(--p-b-color)',
      borderRadius: '20px',
      boxShadow:
        '0 8px 32px rgba(15,23,42,.12), inset 0 1px 0 rgba(255,255,255,.35)',
      ...style
    }}
  >
    {children}
  </Card>
)

export default function Main() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  })
  
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }

    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }

    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newErrors = validateForm()
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setIsSubmitting(true)
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      // Here you would typically make an API call to login the user
      console.log('Login data:', formData)
      // Redirect or show success message
    }, 1000)
  }

  return (
    <Box 
      display='flex' 
      flexDirection='column'
      minHeight='100vh'
      sx={{
        background: 'var(--bg-gradient)',
        backgroundSize: '400% 400%',
        animation: 'gradientBG 15s ease infinite',
        '& .MuiBox-root': {
          py: { xs: 2, sm: 4, md: 6 }
        }
      }}
    >
      <Container maxWidth='md' sx={{ py: 8 }}>
        <Grid container spacing={4} justifyContent='center' alignItems='center' height='100%'>
          <Grid item xs={12} sm={8} md={6}>
              <Stack spacing={3}>
                {/* Header */}
                <Stack alignItems='center' spacing={2}>
                  <CTypography cvariant='sh' sx={{ textAlign: 'flex-start' }}>
                    Welcome Back
                  </CTypography>
                  <CTypography cvariant='shd' sx={{ textAlign: 'center' }}>
                    Sign in to continue to your dashboard
                  </CTypography>
                </Stack>
                {/* Login Form */}
                <Box component='form' onSubmit={handleSubmit} noValidate>
                  <Stack spacing={2.5}>
                    {/* Email Field */}
                    <CTextField
                      cvariant='s'
                      label='Email Address'
                      name='email'
                      type='email'
                      placeholder='john.doe@example.com'
                      value={formData.email}
                      onChange={handleChange}
                      error={!!errors.email}
                      helperText={errors.email}
                      // startIcon={EmailRoundedIcon}
                      fullWidth
                    />

                    {/* Password Field */}
                    <CTextField
                      label='Password'
                      name='password'
                      placeholder='&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;'
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={handleChange}
                      error={!!errors.password}
                      helperText={errors.password}
                      // startIcon={LockRoundedIcon}
                      endIcon={showPassword ? VisibilityOffRoundedIcon : VisibilityRoundedIcon}
                      endIconProps={{
                        onClick: () => setShowPassword(!showPassword)
                      }}
                      fullWidth
                    />

                    {/* Remember Me and Forgot Password */}
                    <Stack direction='row' justifyContent='space-between' alignItems='center'>
                      <span></span>
                      <Link
                        href='/forgot-password'
                        style={{
                          textDecoration: 'none',
                          color: 'inherit',
                        }}
                      >
                        <CTypography
                          component='span'
                          sx={{
                            color: 'var(--p-fg-color)',
                            '&:hover': {
                              textDecoration: 'underline'
                            },
                          }}
                        >
                          Forgot Password?
                        </CTypography>
                      </Link>
                    </Stack>

                    {/* Submit Button */}
                    <CButton
                      label={isSubmitting ? 'Signing In...' : 'Sign In'}
                      cvariant='p'
                      active
                      size='small'
                      type='submit'
                      fullWidth
                      sx={{ py: 1.5 }}
                      disabled={isSubmitting}
                    />

                    {/* Divider with "Or Continue With" text */}
                    <Stack direction='row' alignItems='center' spacing={2} sx={{ my: 2 }}>
                      <Divider sx={{ flex: 1 }} />
                      <Typography variant='body2' sx={{ color: 'var(--s-fg-color)' }}>
                        Or Continue With
                      </Typography>
                      <Divider sx={{ flex: 1 }} />
                    </Stack>

                    {/* Login With Google Button */}
                    <CButton
                      label={isSubmitting ? 'Signing In...' : 'Sign In with Google'}
                      cvariant='s'
                      active
                      size='small'
                      type='submit'
                      fullWidth
                      sx={{ py: 1.5 }}
                      disabled={isSubmitting}
                      startIcon={GoogleIcon}
                    />
                  </Stack>
                </Box>

                {/* Sign Up Link */}
                <Stack alignItems='center' spacing={1}>
                  <Typography
                    sx={{
                      fontSize: '0.9rem',
                      fontWeight: '400',
                      color: 'var(--s-fg-color)'
                    }}
                  >
                    Don't have an account?{' '}
                    <Link
                      href='/sign-up'
                      style={{
                        textDecoration: 'none',
                        color: 'inherit',
                      }}
                    >
                      <CTypography
                        component='span'
                        sx={{
                          color: 'var(--p-fg-color)',
                          '&:hover': {
                            textDecoration: 'underline'
                          },
                        }}
                      >
                        Sign Up
                      </CTypography>
                    </Link>
                  </Typography>
                </Stack>
              </Stack>
            {/* </GlassCard> */}
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}
