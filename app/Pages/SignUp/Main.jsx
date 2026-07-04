import React, { useState } from 'react'
import Link from 'next/link'

import {
  Box,
  Card,
  Container,
  Grid,
  Stack,
  Typography
} from '@mui/material'

import EmailRoundedIcon from '@mui/icons-material/EmailRounded'
import LockRoundedIcon from '@mui/icons-material/LockRounded'
import PersonRoundedIcon from '@mui/icons-material/PersonRounded'
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded'
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded'
import PersonAddRoundedIcon from '@mui/icons-material/PersonAddRounded'

import CTypography from '../../Components/CTypography'
import CTextField from '../../Components/CTextField'
import CButton from '../../Components/CButton'
import CChip from '../../Components/CChip'

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
    name: '',
    email: '',
    password: ''
  })
  
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
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

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }

    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters'
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
      // Here you would typically make an API call to sign up the user
      console.log('Sign up data:', formData)
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
                    Create Your Account
                  </CTypography>
                  <CTypography cvariant='shd' sx={{ textAlign: 'center' }}>
                    Join our community and start monitoring your APIs today
                  </CTypography>
                </Stack>
                {/* Sign Up Form */}
                <Box component='form' onSubmit={handleSubmit} noValidate>
                  <Stack spacing={2.5}>
                    {/* Name Field */}
                    <CTextField
                      label='Full Name'
                      name='name'
                      placeholder='John Doe'
                      value={formData.name}
                      onChange={handleChange}
                      error={!!errors.name}
                      helperText={errors.name}
                      startIcon={PersonRoundedIcon}
                      fullWidth
                    />

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
                      startIcon={EmailRoundedIcon}
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
                      startIcon={LockRoundedIcon}
                      endIcon={showPassword ? VisibilityOffRoundedIcon : VisibilityRoundedIcon}
                      endIconProps={{
                        onClick: () => setShowPassword(!showPassword)
                      }}
                      fullWidth
                    />

                    {/* Submit Button */}
                    <CButton
                      label={isSubmitting ? 'Creating Account...' : 'Sign Up'}
                      cvariant='p'
                      active
                      size='small'
                      type='submit'
                      fullWidth
                      sx={{ py: 1.5 }}
                      disabled={isSubmitting}
                    />

                    {/* Sign Up With Google Button */}
                    <CButton
                      label={isSubmitting ? 'Creating Account...' : 'Sign Up with Google'}
                      cvariant='s'
                      active
                      size='small'
                      type='submit'
                      fullWidth
                      sx={{ py: 1.5 }}
                      disabled={isSubmitting}
                    />
                  </Stack>
                </Box>

                {/* Login Link */}
                <Stack alignItems='center' spacing={1}>
                  <Typography
                    sx={{
                      fontSize: '0.9rem',
                      fontWeight: '400',
                      color: 'var(--s-fg-color)'
                    }}
                  >
                    Already have an account?{' '}
                    <Link
                      href='/log-in'
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
                        Log In
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
