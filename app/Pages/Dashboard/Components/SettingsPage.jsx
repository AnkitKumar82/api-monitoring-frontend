import React, { useState } from 'react'
import { Box, Grid, Divider, Typography, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material'
import CTypography from '../../../Components/CTypography'
import CButton from '../../../Components/CButton'
import CTextField from '../../../Components/CTextField'
import Panel from './Panel'
import { LockRounded as LockIcon, DeleteRounded as DeleteIcon, VisibilityRounded as VisibilityIcon, VisibilityOffRounded as VisibilityOffIcon } from '@mui/icons-material'

export default function SettingsPage() {
  const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false)
  const [showPasswordFields, setShowPasswordFields] = useState(false)
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Mock user data - in real app this would come from auth context or API
  const userData = {
    email: 'user@example.com'
  }

  const handleDeleteAccount = () => {
    setOpenDeleteConfirm(true)
  }

  const confirmDelete = () => {
    // In a real implementation, this would make an API call to delete the account
    console.log('Account deletion confirmed')
    setOpenDeleteConfirm(false)
    // Here you would typically redirect to login or home page
  }

  const cancelDelete = () => {
    setOpenDeleteConfirm(false)
  }

  const handleInputChange = (e) => {
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

  const validatePasswordForm = () => {
    const newErrors = {}
    
    if (!formData.currentPassword) {
      newErrors.currentPassword = 'Current password is required'
    }
    
    if (!formData.newPassword) {
      newErrors.newPassword = 'New password is required'
    } else if (formData.newPassword.length < 8) {
      newErrors.newPassword = 'Password must be at least 8 characters'
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your new password'
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }
    
    return newErrors
  }

  const handleResetPassword = () => {
    // Show the password change form instead of redirecting
    setShowPasswordFields(true)
    setErrors({})
  }

  const handleSubmitPasswordChange = (e) => {
    e.preventDefault()
    const newErrors = validatePasswordForm()
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setIsSubmitting(true)
    
    // Simulate API call to update password
    setTimeout(() => {
      setIsSubmitting(false)
      // In a real app, you would handle the response here
      console.log('Password changed successfully:', formData)
      setShowPasswordFields(false)
      setFormData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      })
      alert('Password updated successfully!')
    }, 1000)
  }

  const cancelPasswordChange = () => {
    setShowPasswordFields(false)
    setFormData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    })
    setErrors({})
  }

  return (
    <Box>
      <Panel title="Settings" subtitle="Control your account preferences and security.">
        {/* Email/Account Section */}
        <Grid container spacing={2.5} sx={{ mb: 3 }}>
          <Grid item xs={12} md={4}>
            <Box sx={{ flexDirection: 'column', height: '100%' }}>
              <CTypography cvariant="c" sx={{ color: 'var(--p-fg-color)',fontWeight: '600' }}>Email Address</CTypography>
              <CTypography cvariant="caption">Your email address associated with the account</CTypography>
              <CTextField
                name="email"
                value={userData.email}
                InputProps={{
                  readOnly: true,
                }}
                sx={{ mt: '12px' }}
                fullWidth
                cvariant="s"
              />
            </Box>
          </Grid>
        </Grid>

        {/* Password Section */}
        <Grid container spacing={2.5} sx={{ mb: 3 }}>
          <Grid item xs={12} md={4}>
            <Box sx={{ flexDirection: 'column', height: '100%' }}>
              <CTypography cvariant="c" sx={{ color: 'var(--p-fg-color)',fontWeight: '600' }}>Password</CTypography>
              <CTypography cvariant="caption" sx={{ mb: '12px' }}>Change your account password</CTypography>
              
              {showPasswordFields ? (
                <Box component="form" onSubmit={handleSubmitPasswordChange} sx={{ mt: 1 }}>
                  <CTextField
                    label="Current Password"
                    name="currentPassword"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.currentPassword}
                    onChange={handleInputChange}
                    error={!!errors.currentPassword}
                    helperText={errors.currentPassword || 'Enter your current password'}
                    fullWidth
                    helperTextStyle={{mb: 1}}
                  />
                  
                  <CTextField
                    label="New Password"
                    name="newPassword"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.newPassword}
                    onChange={handleInputChange}
                    error={!!errors.newPassword}
                    helperText={errors.newPassword || 'At least 8 characters'}
                    fullWidth
                    helperTextStyle={{mb: 1}}
                  />
                  
                  <CTextField
                    label="Confirm New Password"
                    name="confirmPassword"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword}
                    fullWidth
                    helperTextStyle={{ mb: 2 }}
                  />
                  
                  <Box sx={{ mt: 2, display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                    <CButton 
                      label="Cancel" 
                      cvariant="ghost" 
                      onClick={cancelPasswordChange} 
                    />
                    <CButton 
                      label={isSubmitting ? "Updating..." : "Update Password"} 
                      cvariant="primary" 
                      type="submit" 
                      disabled={isSubmitting}
                    />
                  </Box>
                </Box>
              ) : (
                <CButton
                  label="Change Password"
                  cvariant="s"
                  active
                  // startIcon={LockIcon}
                  onClick={handleResetPassword}
                />
              )}
            </Box>
          </Grid>
        </Grid>

        <Divider />
        {/* Account Deletion Section */}
        <Grid container spacing={2.5} sx={{ mt: '0px'}} >
          <Grid item>
            <Box sx={{ flexDirection: 'column', height: '100%' }}>
              <CTypography cvariant="c" sx={{ color: 'var(--p-fg-color)',fontWeight: '600' }}>Account Deletion</CTypography>
              <CTypography cvariant="c" sx={{ color: 'var(--red-color)', mb: '12px' }}>
                Warning: All your account details, settings, and associated data will be permanently deleted. This action is irreversible.
              </CTypography>
              <CButton
                label="Delete Account"
                cvariant="danger"
                // startIcon={DeleteIcon}
                onClick={handleDeleteAccount}
              />
            </Box>
          </Grid>
        </Grid>
      </Panel>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={openDeleteConfirm}
        onClose={cancelDelete}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
        PaperProps={{
          sx: {
            p: '0px 16px 16px 0px',
            borderRadius: "16px",
          },
        }}
      >
        <DialogTitle id="delete-dialog-title">
          Confirm Account Deletion
        </DialogTitle>
        <DialogContent>
          <CTypography sx={{ color: 'var(--p-fg-color)' ,mb: 1 }}>
            Are you sure you want to delete your account?
          </CTypography>
          <CTypography cvariant="c" sx={{ color: 'var(--red-color)' }}>
            Warning: All your account details, settings, and associated data will be permanently deleted. This action is irreversible.
          </CTypography>
        </DialogContent>
        <DialogActions>
          <CButton label="Cancel" cvariant="ghost" onClick={cancelDelete} />
          <CButton label="Delete Account" cvariant="danger" onClick={confirmDelete} />
        </DialogActions>
      </Dialog>
    </Box>
  )
}
