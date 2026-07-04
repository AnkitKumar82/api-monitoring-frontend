import React from 'react'
import { Box, Typography } from '@mui/material'

export default function CBadge(props) {
  const {
    cvariant = 'primary',
    sx = {},
    style = {},
    ...baseProps
  } = props

  const badgeStyle = { ...sx, ...style }
  
  let variantStyle = {}
  
  switch(cvariant) {
    case 'secondary':
    case 's':
      variantStyle = {
        bgcolor: 'var(--t-bg-color)',
        color: 'var(--p-fg-color)',
        border: '1px solid var(--p-b-color)'
      }
      break
    case 'tertiary':
    case 't':
      variantStyle = {
        bgcolor: 'transparent',
        color: 'var(--s-fg-color)',
        border: '1px solid var(--t-b-color)'
      }
      break
    default: // primary
      variantStyle = {
        bgcolor: 'var(--p-fg-color)',
        color: 'var(--p-bg-color)',
        border: '1px solid var(--p-b-color)'
      }
  }

  return (
    <Box
      sx={{
        px: '8px',
        py: '4px',
        borderRadius: '99999px',
        fontSize: '0.7rem',
        fontWeight: '500',
        fontStyle: 'normal',
        ...variantStyle,
        ...badgeStyle
      }}
      {...baseProps}
    >
      <Typography
        sx={{
          fontSize: 'inherit',
          fontWeight: 'inherit',
          color: 'inherit'
        }}
      >
        {props.children}
      </Typography>
    </Box>
  )
}