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
import VpnKeyRoundedIcon from '@mui/icons-material/VpnKeyRounded'
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded'
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded'

import CTypography from '../../Components/CTypography'
import CTextField from '../../Components/CTextField'
import CButton from '../../Components/CButton'

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
  const [currentStep, setCurrentStep] = useState('email') // 'email', 'otp', 'password'
  const [formData, setFormData] = useState({
    email: '',
    otp: '',
    password: '',
    confirmPassword: ''
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

  const validateEmailStep = () => {
    const newErrors = {}
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }
    
    return newErrors
  }

  const validateOTPStep = () => {
    const newErrors = {}
    
    if (!formData.otp.trim()) {
      newErrors.otp = 'OTP is required'
    } else if (formData.otp.length !== 6) {
      newErrors.otp = 'OTP must be 6 digits'
    }
    
    return newErrors
  }

  const validatePasswordStep = () => {
    const newErrors = {}
    
    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters'
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password'
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }
    
    return newErrors
  }

  const handleNextStep = async () => {
    let newErrors = {}
    
    if (currentStep === 'email') {
      newErrors = validateEmailStep()
    } else if (currentStep === 'otp') {
      newErrors = validateOTPStep()
    } else if (currentStep === 'password') {
      newErrors = validatePasswordStep()
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setIsSubmitting(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      
      if (currentStep === 'email') {
        setCurrentStep('otp')
      } else if (currentStep === 'otp') {
        setCurrentStep('password')
      } else if (currentStep === 'password') {
        // Reset form and go back to email step after successful reset
        setFormData({
          email: '',
          otp: '',
          password: '',
          confirmPassword: ''
        })
        setCurrentStep('email')
        // Here you would typically make an API call to reset the password
        console.log('Password reset data:', formData)
      }
    }, 1000)
  }

  const handleBack = () => {
    if (currentStep === 'otp') {
      setCurrentStep('email')
    } else if (currentStep === 'password') {
      setCurrentStep('otp')
    }
  }

  const renderEmailStep = () => (
    <Box component='form' onSubmit={(e) => { e.preventDefault(); handleNextStep(); }} noValidate>
      <Stack spacing={2.5}>
        <CTextField
          label='Email Address'
          name='email'
          type='email'
          placeholder='john.doe@example.com'
          value={formData.email}
          onChange={handleChange}
          error={!!errors.email}
          helperText={errors.email}
          fullWidth
        />

        <CButton
          label={isSubmitting ? 'Sending OTP...' : 'Send OTP'}
          cvariant='p'
          active
          size='small'
          type='submit'
          fullWidth
          sx={{ py: 1.5 }}
          disabled={isSubmitting}
        />
      </Stack>
    </Box>
  )

  const renderOTPStep = () => (
    <Box component='form' onSubmit={(e) => { e.preventDefault(); handleNextStep(); }} noValidate>
      <Stack spacing={2.5}>
        <CTypography cvariant='s'>
          Enter the 6-digit OTP sent to your email
        </CTypography>
        
        <CTextField
          label='Enter OTP'
          name='otp'
          placeholder='123456'
          value={formData.otp}
          onChange={handleChange}
          error={!!errors.otp}
          helperText={errors.otp}
          fullWidth
        />

        <CButton
          label={isSubmitting ? 'Verifying...' : 'Verify OTP'}
          cvariant='p'
          active
          size='small'
          type='submit'
          fullWidth
          sx={{ py: 1.5 }}
          disabled={isSubmitting}
        />
        
        <Stack alignItems='center' spacing={1} sx={{ mt: 2 }}>
          <Typography
            sx={{
              fontSize: '0.9rem',
              fontWeight: '400',
              color: 'var(--s-fg-color)'
            }}
          >
            Didn't receive the OTP?{' '}
            <CTypography
              component='span'
              sx={{
                color: 'var(--p-fg-color)',
                '&:hover': {
                  textDecoration: 'underline',
                  cursor: 'pointer'
                },
              }}
              onClick={() => console.log('Resend OTP')}
            >
              Resend OTP
            </CTypography>
          </Typography>
        </Stack>
      </Stack>
    </Box>
  )

  const renderPasswordStep = () => (
    <Box component='form' onSubmit={(e) => { e.preventDefault(); handleNextStep(); }} noValidate>
      <Stack spacing={2.5}>
        <CTextField
          label='New Password'
          name='password'
          placeholder='&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;'
          type={showPassword ? 'text' : 'password'}
          value={formData.password}
          onChange={handleChange}
          error={!!errors.password}
          helperText={errors.password}
          endIcon={showPassword ? VisibilityOffRoundedIcon : VisibilityRoundedIcon}
          endIconProps={{
            onClick: () => setShowPassword(!showPassword)
          }}
          fullWidth
        />

        <CTextField
          label='Confirm New Password'
          name='confirmPassword'
          placeholder='&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;'
          type={showPassword ? 'text' : 'password'}
          value={formData.confirmPassword}
          onChange={handleChange}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword}
          fullWidth
        />

        <CButton
          label={isSubmitting ? 'Resetting Password...' : 'Reset Password'}
          cvariant='p'
          active
          size='small'
          type='submit'
          fullWidth
          sx={{ py: 1.5 }}
          disabled={isSubmitting}
        />
        
        <Stack alignItems='center' spacing={1} sx={{ mt: 2 }}>
          <Typography
            sx={{
              fontSize: '0.9rem',
              fontWeight: '400',
              color: 'var(--s-fg-color)'
            }}
          >
            Remember your password?{' '}
            <Link
              href='/sign-in'
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
                Sign In
              </CTypography>
            </Link>
          </Typography>
        </Stack>
      </Stack>
    </Box>
  )

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
            <GlassCard>
              <Stack spacing={3} sx={{ p: 4 }}>
                {/* Header */}
                <Stack alignItems='center' spacing={2}>
                  <CTypography cvariant='sh'>
                    Reset Your Password
                  </CTypography>
                  <CTypography cvariant='shd' sx={{ textAlign: 'center' }}>
                    {currentStep === 'email' 
                      ? 'Enter your email address to receive OTP' 
                      : currentStep === 'otp'
                      ? 'Verify your email with OTP'
                      : 'Create a new password'}
                  </CTypography>
                </Stack>

                {/* Step indicator */}
                <Stack direction='row' justifyContent='center' spacing={2} sx={{ my: 2 }}>
                  <Box 
                    sx={{
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      backgroundColor: currentStep === 'email' ? 'var(--p-fg-color)' : 'var(--s-bg-color)',
                      border: '1px solid var(--p-b-color)'
                    }}
                  />
                  <Box 
                    sx={{
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      backgroundColor: currentStep === 'otp' ? 'var(--p-fg-color)' : 'var(--s-bg-color)',
                      border: '1px solid var(--p-b-color)'
                    }}
                  />
                  <Box 
                    sx={{
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      backgroundColor: currentStep === 'password' ? 'var(--p-fg-color)' : 'var(--s-bg-color)',
                      border: '1px solid var(--p-b-color)'
                    }}
                  />
                </Stack>

                {/* Form content based on step */}
                {currentStep === 'email' && renderEmailStep()}
                {currentStep === 'otp' && renderOTPStep()}
                {currentStep === 'password' && renderPasswordStep()}

                {/* Back button for OTP and password steps */}
                {(currentStep === 'otp' || currentStep === 'password') && (
                  <Stack alignItems='center' spacing={1} sx={{ mt: 2 }}>
                    <CTypography
                      component='span'
                      sx={{
                        color: 'var(--p-fg-color)',
                        '&:hover': {
                          textDecoration: 'underline',
                          cursor: 'pointer'
                        },
                      }}
                      onClick={handleBack}
                    >
                      ← Back to previous step
                    </CTypography>
                  </Stack>
                )}
              </Stack>
            </GlassCard>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}