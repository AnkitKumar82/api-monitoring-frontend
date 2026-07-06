import React, { useState } from 'react'
import { Box, Grid, Divider, Typography, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material'
import CTypography from '../../../Components/CTypography'
import CButton from '../../../Components/CButton'
import CTextField from '../../../Components/CTextField'
import Panel from './Panel'
import { LockRounded as LockIcon, DeleteRounded as DeleteIcon } from '@mui/icons-material'

export default function SettingsPage() {
  const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false)

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

  const handleResetPassword = () => {
    // In a real app, this would redirect to password reset page
    // For now we'll just show an alert to demonstrate the concept
    alert('Redirecting to password reset page...')
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
                sx={{
                  mt: '12px'
                }}
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
              <CButton
                label="Change Password"
                cvariant="s"
                active
                // startIcon={LockIcon}
                onClick={handleResetPassword}
              />
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
          <Typography cvariant="c" sx={{ mb: 1 }}>
            Are you sure you want to delete your account?
          </Typography>
          <Typography cvariant="c" sx={{ mb: 1 }}>
            This action cannot be undone and will permanently remove all data associated with this email address.
          </Typography>
          <Typography cvariant="c" sx={{ color: 'var(--d-fg-color)' }}>
            Warning: All your account details, settings, and associated data will be permanently deleted. This action is irreversible.
          </Typography>
        </DialogContent>
        <DialogActions>
          <CButton label="Cancel" cvariant="ghost" onClick={cancelDelete} />
          <CButton label="Delete Account" cvariant="danger" onClick={confirmDelete} />
        </DialogActions>
      </Dialog>
    </Box>
  )
}
