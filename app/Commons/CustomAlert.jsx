import * as React from 'react'
import {
  Snackbar,
  Alert,
  Stack,
  Typography
} from '@mui/material'
import { useApp } from '../DataStores/AppContext'

export default function CustomAlert () {
  const { alert, setAlert } = useApp()

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setAlert({ ...alert, show: false })
  }

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left'
      }}
      open={alert.show || false}
      autoHideDuration={alert.duration || 5000}
      onClose={handleClose}
    >
      <Stack
        direction='row'
        justifyContent='flex-start'
        alignItems='center'
      >
        <Alert
          elevation={6}
          variant='filled'
          onClose={handleClose}
          severity={alert.severity}
          sx={{
            display: 'flex',
            fontWeight: '400',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '8px',
            px: '12px',
            color: 'var(--p-fg-color)',
            fontSize: '0.8rem',
            bgcolor: 'var(--p-bg-color)',
            border: '1px solid var(--s-bg-color)',
            boxShadow: 'none'
          }}
        >
          <Typography
            sx={{
              fontWeight: '400',
              fontSize: '0.8rem',
              color: 'var(--p-fg-color)'
            }}
            variant='body2'
          >
            {alert.message}
          </Typography>
        </Alert>
      </Stack>
    </Snackbar>
  )
}
