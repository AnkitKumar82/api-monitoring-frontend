import React from 'react'
import { Box } from '@mui/material'

export default function CCard(props) {
  return (
    <Box
      sx={{
        bgcolor: 'var(--s-bg-color) !important',
        backdropFilter: 'blur(18px) saturate(180%)',
        '-webkit-backdrop-filter': 'blur(18px) saturate(180%)',
        border: '1px solid var(--p-b-color)',
        borderRadius: '12px',
        boxShadow: '0 8px 32px rgba(15, 23, 42, 0.12), inset 0 1px 0 rgba(255,255,255,0.12)',
        p: '16px',
        ...props.sx
      }}
      {...props}
    >
      {props.children}
    </Box>
  )
}