import React from 'react'
import {
  Typography,
  Select,
  Stack
} from '@mui/material'
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded'

export default function CSelect (props) {
  const {
    label = '',
    labelStyle = {},
    sx={},
    style={},
    helperText = '',
    helperTextStyle = {},
    rounded = false,
    ...baseProps
  } = props
  
  const selectStyle = {...sx, ...style}

  return (
    <Stack
      direction='column'
      justifyContent='flex-start'
      alignItems='flex-start'
    >
      {
        label && 
        <Typography
          sx={{
            mb: '4px',
            color: 'var(--s-fg-color)',
            fontSize: '0.8rem',
            fontStyle: 'normal',
            fontWeight: '500',
            ...labelStyle
          }}
          variant='body2'
        >
          {label}
        </Typography>
      }
      <Select
        size='small'
        IconComponent ={ExpandMoreRoundedIcon}
        sx={{
          borderRadius: '8px',
          ...(rounded && { borderRadius: '99999px' }),
          minHeight: '24px',
          fontSize: '0.8rem',
          fontStyle: 'normal',
          fontWeight: '400',
          border: 'none',
          bgcolor: 'transparent',
          '.MuiSvgIcon-root': {
            color: 'var(--t-fg-color)' // Icon color
          },
          '.MuiOutlinedInput-notchedOutline': { 
            border: '1px solid var(--p-b-color)'
          },
          '&:hover .MuiOutlinedInput-notchedOutline': { 
            border: '1px solid var(--p-b-color)'
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            border: '1px solid var(--p-b-color)'
          },
          ...selectStyle
        }}

        MenuProps={{
          sx: {
            '& .MuiMenu-paper': {
              borderRadius: '8px',
              border: '1px solid var(--p-b-color)',
              bgcolor: 'var(--p-bg-color) !important',
              boxShadow: '0px 0px 4px var(--p-fg-st-color)',
              color: 'var(--p-fg-color)',
              maxHeight: '320px',
              width: '320px',
              overflow: 'auto',
              '-ms-overflow-style': 'none',
              'scrollbar-width': 'none',
            },
            '& .MuiMenuItem-root': {
              mx: '8px',
              fontSize: '0.8rem',
              fontStyle: 'normal',
              fontWeight: '500',
              borderRadius: '6px',
              bgcolor: 'var(--p-bg-color) !important',
              color: 'var(--s-fg-color)'
            },
            '& .MuiMenuItem-root:hover': {
              bgcolor: 'var(--s-bg-color) !important',
              color: 'var(--p-fg-color)'
            },
            '& .Mui-selected': {
              bgcolor: 'var(--s-bg-color) !important',
              color: 'var(--p-fg-color)'
            }
          }
        }}
        {...baseProps}
      >
        {props.children}
      </Select>
      {
        helperText && 
        <Typography
          sx={{
            mt: '4px',
            color: 'var(--t-fg-color)',
            fontSize: '0.8rem',
            fontStyle: 'normal',
            fontWeight: '400',
            ...helperTextStyle
          }}
          variant='body2'
        >
          {helperText}
        </Typography>
      }
    </Stack>
  )
}
