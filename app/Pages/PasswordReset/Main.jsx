import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

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
import GoogleIcon from '@mui/icons-material/Google'

import CTypography from '../../Components/CTypography'
import CTextField from '../../Components/CTextField'
import CButton from '../../Components/CButton'
import { userApi } from '../../Helpers/userApi'

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
    confirmPassword: '',
    otp: ''
  })
  
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [serverError, setServerError] = useState('')
  const [otpSent, setOtpSent] = useState(false)
  const [otpId, setOtpId] = useState('')
  const [step, setStep] = useState('initiate') // 'initiate', 'verify', 'reset'
  const router = useRouter()

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

  const validateEmail = () => {
    const newErrors = {}
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }
    return newErrors
  }

  const validatePassword = () => {
    const newErrors = {}
    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }
    return newErrors
  }

  const handleSendOtp = async () => {
    // Validate email only
    const emailErrors = validateEmail()
    if (Object.keys(emailErrors).length > 0) {
      setErrors(emailErrors)
      return
    }

    setIsSubmitting(true)
    setServerError('')

    try {
      // Call the forgot password initiate API
      const result = await userApi.forgotPasswordInitiate(formData.email)
      setOtpId(result.otpId)
      setOtpSent(true)
      setStep('verify')
      setErrors({})
    } catch (error) {
      setServerError(error.message || 'Failed to send OTP. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleVerifyOtp = async () => {
    // Validate OTP only
    const newErrors = {}
    if (!formData.otp.trim()) {
      newErrors.otp = 'OTP is required'
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setIsSubmitting(true)
    setServerError('')

    try {
      // In a real app, we would verify OTP here
      // For now, just proceed to password reset step
      setStep('reset')
      setErrors({})
    } catch (error) {
      setServerError(error.message || 'Failed to verify OTP. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleResetPassword = async () => {
    // Validate password fields
    const passwordErrors = validatePassword()
    if (Object.keys(passwordErrors).length > 0) {
      setErrors(passwordErrors)
      return
    }

    setIsSubmitting(true)
    setServerError('')

    try {
      // Call the forgot password complete API
      const userData = {
        otp: formData.otp,
        otpId: otpId,
        email: formData.email,
        password: formData.password
      }
      
      await userApi.forgotPasswordComplete(userData)
      
      // Redirect to sign in page
      router.push('/sign-in')
    } catch (error) {
      setServerError(error.message || 'Failed to reset password. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (step === 'initiate') {
      await handleSendOtp()
    } else if (step === 'verify') {
      await handleVerifyOtp()
    } else if (step === 'reset') {
      await handleResetPassword()
    }
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
                  Reset Password
                </CTypography>
                <CTypography cvariant='shd' sx={{ textAlign: 'center' }}>
                  {step === 'initiate' ? 'Enter your email to reset password' : 
                   step === 'verify' ? 'Verify OTP' : 'Set new password'}
                </CTypography>
              </Stack>
              
              {/* Reset Password Form */}
              <Box component='form' onSubmit={handleSubmit} noValidate>
                <Stack spacing={2.5}>
                  {serverError && (
                    <Typography color='error' sx={{ textAlign: 'center' }}>
                      {serverError}
                    </Typography>
                  )}

                  {step === 'initiate' ? (
                    // Email input step
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
                  ) : step === 'verify' ? (
                    // OTP verification step
                    <>
                      <Typography sx={{ textAlign: 'center' }}>
                        An OTP has been sent to {formData.email}
                      </Typography>
                      <CTextField
                        label='Enter OTP'
                        name='otp'
                        type='text'
                        placeholder='123456'
                        value={formData.otp}
                        onChange={handleChange}
                        error={!!errors.otp}
                        helperText={errors.otp}
                        fullWidth
                      />
                    </>
                  ) : (
                    // Password reset step
                    <>
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
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        error={!!errors.confirmPassword}
                        helperText={errors.confirmPassword}
                        endIcon={showConfirmPassword ? VisibilityOffRoundedIcon : VisibilityRoundedIcon}
                        endIconProps={{
                          onClick: () => setShowConfirmPassword(!showConfirmPassword)
                        }}
                        fullWidth
                      />
                    </>
                  )}

                  <CButton
                    label={isSubmitting ? 'Processing...' : step === 'initiate' ? 'Send OTP' : 
                           step === 'verify' ? 'Verify OTP' : 'Reset Password'}
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

                  {/* Reset with Google Button */}
                  <CButton
                    label={isSubmitting ? 'Processing...' : 'Reset with Google'}
                    cvariant='s'
                    active
                    size='small'
                    type='submit'
                    fullWidth
                    sx={{ py: 1.5 }}
                    disabled={isSubmitting}
                    startIcon={GoogleIcon}
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
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}