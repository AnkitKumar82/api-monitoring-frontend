import React from 'react'
import { Box, Typography, IconButton, Stack } from '@mui/material'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'

export default function CAlert(props) {
  const {
    cvariant = 'primary',
    title,
    titleStyle = {},
    description,
    descriptionStyle = {},
    sx = {},
    style = {},
    onClose,
    closable = false,
    ...baseProps
  } = props

  const alertStyle = { ...sx, ...style }
  
  let variantStyle = {}
  
  switch(cvariant) {
    case 'success':
    case 'su':
      variantStyle = {
        bgcolor: 'var(--s-bg-color)',
        border: '1px solid var(--green-st-color)',
        backdropFilter: 'blur(18px) saturate(180%)',
        '-webkit-backdrop-filter': 'blur(18px) saturate(180%)',
        boxShadow: '0 8px 32px rgba(15, 23, 42, 0.12), inset 0 1px 0 rgba(255,255,255,0.12)'
      }
      break
    case 'warning':
    case 'w':
      variantStyle = {
        bgcolor: 'var(--s-bg-color)',
        border: '1px solid var(--orange-st-color)',
        backdropFilter: 'blur(18px) saturate(180%)',
        '-webkit-backdrop-filter': 'blur(18px) saturate(180%)',
        boxShadow: '0 8px 32px rgba(15, 23, 42, 0.12), inset 0 1px 0 rgba(255,255,255,0.12)'
      }
      break
    case 'error':
    case 'e':
      variantStyle = {
        bgcolor: 'var(--s-bg-color)',
        border: '1px solid var(--red-st-color)',
        backdropFilter: 'blur(18px) saturate(180%)',
        '-webkit-backdrop-filter': 'blur(18px) saturate(180%)',
        boxShadow: '0 8px 32px rgba(15, 23, 42, 0.12), inset 0 1px 0 rgba(255,255,255,0.12)'
      }
      break
    case 'info':
    case 'i':
      variantStyle = {
        bgcolor: 'var(--s-bg-color)',
        border: '1px solid var(--blue-st-color)',
        backdropFilter: 'blur(18px) saturate(180%)',
        '-webkit-backdrop-filter': 'blur(18px) saturate(180%)',
        boxShadow: '0 8px 32px rgba(15, 23, 42, 0.12), inset 0 1px 0 rgba(255,255,255,0.12)'
      }
      break
    default: // primary
      variantStyle = {
        bgcolor: 'var(--s-bg-color)',
        border: '1px solid var(--p-b-color)',
        backdropFilter: 'blur(18px) saturate(180%)',
        '-webkit-backdrop-filter': 'blur(18px) saturate(180%)',
        boxShadow: '0 8px 32px rgba(15, 23, 42, 0.12), inset 0 1px 0 rgba(255,255,255,0.12)'
      }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'flex-start',
        p: '16px',
        borderRadius: '12px',
        ...variantStyle,
        ...alertStyle
      }}
      {...baseProps}
    >
      <Stack
        direction='column'
        justifyContent='flex-start'
        alignItems='flex-start'
        sx={{ flex: 1, gap: '4px' }}
      >
        {title && (
          <Typography
            sx={{
              fontSize: '0.9rem',
              fontWeight: '600',
              color: 'var(--p-fg-color)',
              ...titleStyle
            }}
          >
            {title}
          </Typography>
        )}
        {description && (
          <Typography
            sx={{
              fontSize: '0.8rem',
              fontWeight: '400',
              color: 'var(--s-fg-color)',
              ...descriptionStyle
            }}
          >
            {description}
          </Typography>
        )}
      </Stack>
      {closable && (
        <IconButton
          sx={{
            width: '24px',
            height: '24px',
            p: '4px',
            ml: '8px',
            '&:hover': {
              bgcolor: 'var(--t-bg-color)'
            }
          }}
          onClick={onClose}
        >
          <CloseRoundedIcon
            sx={{
              width: '16px',
              height: '16px',
              color: 'var(--p-fg-color)'
            }}
          />
        </IconButton>
      )}
    </Box>
  )
}