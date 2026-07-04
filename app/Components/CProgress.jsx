import React from 'react'
import { Box, Typography } from '@mui/material'

export default function CProgress(props) {
  const {
    cvariant = 'primary',
    value = 0,
    label,
    labelStyle = {},
    sx = {},
    style = {},
    ...baseProps
  } = props

  const progressStyle = { ...sx, ...style }
  
  let variantStyle = {}
  let trackColor = 'var(--t-bg-color)'
  let fillColor = 'var(--p-fg-color)'
  
  switch(cvariant) {
    case 'secondary':
    case 's':
      trackColor = 'var(--t-bg-color)'
      fillColor = 'var(--s-fg-color)'
      break
    case 'success':
    case 'su':
      trackColor = 'var(--t-bg-color)'
      fillColor = 'var(--green-color)'
      break
    case 'warning':
    case 'w':
      trackColor = 'var(--t-bg-color)'
      fillColor = 'var(--orange-color)'
      break
    case 'error':
    case 'e':
      trackColor = 'var(--t-bg-color)'
      fillColor = 'var(--red-color)'
      break
    case 'info':
    case 'i':
      trackColor = 'var(--t-bg-color)'
      fillColor = 'var(--blue-color)'
      break
    default: // primary
      trackColor = 'var(--t-bg-color)'
      fillColor = 'var(--p-fg-color)'
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
        ...progressStyle
      }}
      {...baseProps}
    >
      {label && (
        <Typography
          sx={{
            fontSize: '0.7rem',
            fontWeight: '500',
            color: 'var(--p-fg-color)',
            ...labelStyle
          }}
        >
          {label}
        </Typography>
      )}
      <Box
        sx={{
          width: '100%',
          height: '8px',
          borderRadius: '99999px',
          bgcolor: trackColor,
          overflow: 'hidden',
          backdropFilter: 'blur(18px) saturate(180%)',
          '-webkit-backdrop-filter': 'blur(18px) saturate(180%)',
          boxShadow: '0 8px 32px rgba(15, 23, 42, 0.12), inset 0 1px 0 rgba(255,255,255,0.12)'
        }}
      >
        <Box
          sx={{
            height: '100%',
            width: `${Math.min(100, Math.max(0, value))}%`,
            bgcolor: fillColor,
            borderRadius: '99999px',
            transition: 'width 0.3s ease'
          }}
        />
      </Box>
    </Box>
  )
}