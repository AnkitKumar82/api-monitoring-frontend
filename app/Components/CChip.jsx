import React from 'react'
import { Box, Typography } from '@mui/material'

export default function CChip(props) {
  const {
    cvariant = 'primary',
    label,
    labelStyle = {},
    sx = {},
    style = {},
    clickable = false,
    onDelete,
    deleteIcon: DeleteIcon,
    deleteIconProps = {},
    ...baseProps
  } = props

  const chipStyle = { ...sx, ...style }
  
  let variantStyle = {}
  
  switch(cvariant) {
    case 'secondary':
    case 's':
      variantStyle = {
        bgcolor: 'var(--s-bg-color)',
        border: '1px solid var(--p-b-color)',
        backdropFilter: 'blur(18px) saturate(180%)',
        '-webkit-backdrop-filter': 'blur(18px) saturate(180%)',
        color: 'var(--p-fg-color)'
      }
      break
    case 'success':
    case 'su':
      variantStyle = {
        bgcolor: 'var(--s-bg-color)',
        border: '1px solid var(--green-st-color)',
        backdropFilter: 'blur(18px) saturate(180%)',
        '-webkit-backdrop-filter': 'blur(18px) saturate(180%)',
        color: 'var(--green-color)'
      }
      break
    case 'warning':
    case 'w':
      variantStyle = {
        bgcolor: 'var(--s-bg-color)',
        border: '1px solid var(--orange-st-color)',
        backdropFilter: 'blur(18px) saturate(180%)',
        '-webkit-backdrop-filter': 'blur(18px) saturate(180%)',
        color: 'var(--orange-color)'
      }
      break
    case 'error':
    case 'e':
      variantStyle = {
        bgcolor: 'var(--s-bg-color)',
        border: '1px solid var(--red-st-color)',
        backdropFilter: 'blur(18px) saturate(180%)',
        '-webkit-backdrop-filter': 'blur(18px) saturate(180%)',
        color: 'var(--red-color)'
      }
      break
    case 'info':
    case 'i':
      variantStyle = {
        bgcolor: 'var(--s-bg-color)',
        border: '1px solid var(--blue-st-color)',
        backdropFilter: 'blur(18px) saturate(180%)',
        '-webkit-backdrop-filter': 'blur(18px) saturate(180%)',
        color: 'var(--blue-color)'
      }
      break
    default: // primary
      variantStyle = {
        bgcolor: 'var(--s-bg-color)',
        border: '1px solid var(--p-b-color)',
        backdropFilter: 'blur(18px) saturate(180%)',
        '-webkit-backdrop-filter': 'blur(18px) saturate(180%)',
        color: 'var(--p-fg-color)'
      }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        px: '12px',
        py: '6px',
        borderRadius: '99999px',
        fontSize: '0.7rem',
        fontWeight: '500',
        cursor: clickable ? 'pointer' : 'default',
        transition: 'all 0.2s ease',
        '&:hover': {
          ...(clickable && {
            bgcolor: 'var(--t-bg-color)'
          })
        },
        ...variantStyle,
        ...chipStyle
      }}
      {...baseProps}
    >
      <Typography
        sx={{
          color: 'inherit',
          ...labelStyle
        }}
      >
        {label}
      </Typography>
      {onDelete && DeleteIcon && (
        <DeleteIcon
          sx={{
            width: '12px',
            height: '12px',
            ml: '6px',
            color: 'inherit',
            cursor: 'pointer',
            ...deleteIconProps
          }}
          onClick={(e) => {
            e.stopPropagation()
            onDelete()
          }}
        />
      )}
    </Box>
  )
}