import React from 'react'
import { Box, Stack } from '@mui/material'
import CTypography from '../../../Components/CTypography'

export default function Panel({ title, subtitle, actions, children, sx = {} }) {
  return (
    <Box
      sx={{
        border: '1px solid var(--s-b-color)',
        borderRadius: '12px',
        p: '16px',
        ...sx
      }}
    >
      {(title || subtitle || actions) && (
        <Stack direction={{ xs: 'column', sm: 'row' }} alignItems={{ xs: 'flex-start', sm: 'center' }} justifyContent="space-between" spacing={1.5} sx={{ mb: 2.5 }}>
          <Box>
            {title && <CTypography cvariant="sub-heading">{title}</CTypography>}
            {subtitle && <CTypography cvariant="caption" sx={{ mt: 0.5 }}>{subtitle}</CTypography>}
          </Box>
          {actions}
        </Stack>
      )}
      {children}
    </Box>
  )
}
