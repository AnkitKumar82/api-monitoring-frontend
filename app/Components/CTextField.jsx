import React from 'react'
import {
  Typography,
  TextField,
  InputAdornment,
  Stack,
} from '@mui/material'

export default function CTextField (props) {
  const {
    label = '',
    labelStyle = {},
    cvariant = 'p',
    sx={},
    style={},
    helperText = '',
    helperTextStyle = {},
    startIcon: StartIcon,
    endIcon: EndIcon,
    rounded = false,
    fullWidth = false,
    ...baseProps
  } = props
  
  const textFieldStyle = {...sx, ...style}
  let variantStyle = {
    height: '100%',
    transition: '0.2s',
    cursor: 'pointer',
    border: '1px solid var(--p-fg-st-color)',
    background: "var(--s-bg-color) !important",
    backdropFilter: "blur(18px) saturate(180%)",
    "-webkit-backdrop-filter": "blur(18px) saturate(180%)",
    border: "1px solid var(--p-b-color)",
    borderRadius: "12px",
    boxShadow:"0 8px 32px rgba(15, 23, 42, 0.12), inset 0 1px 0 rgba(255,255,255,0.12)"    
  }

  switch(cvariant) {
    case 'secondary':
    case 's':
      variantStyle = {
        ...variantStyle,
        bgcolor: 'transparent',
        border: '1px solid var(--s-bg-color)',
        ':focus-within': {
          border: '1px solid var(--p-b-color)'
        }
      }
      break
    default:
      variantStyle = {
        ...variantStyle,
        bgcolor: 'var(--s-bg-color)',
        border: '1px solid var(--s-bg-color)',
        ':focus-within': {
          border: '1px solid var(--p-b-color)'
        }
      }
  }

  return (
    <Stack
      direction='column'
      justifyContent='flex-start'
      alignItems='flex-start'
      sx={ fullWidth && { width: "100%" }}
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
      <TextField
        size='small'
        variant='outlined'
        fullWidth={fullWidth}
        sx={{
          borderRadius: '8px',
          ...(rounded && { borderRadius: '99999px' }),
          minHeight: '24px',
          '& .MuiInput-underline:after': { border: 'none' },
          '& .MuiOutlinedInput-root': {
            '& fieldset': { border: 'none' },
            '&:hover fieldset': { border: 'none' },
            '&.Mui-focused fieldset': { border: 'none' },
          },
          ...variantStyle,
          ...textFieldStyle
        }}
        inputProps={{
          style: {
            color: 'var(--p-fg-color)',
            fontSize: '0.8rem',
            fontStyle: 'normal',
            fontWeight: '400',
            p: '8px'
          }
        }}
        InputProps={{
          startAdornment: (StartIcon && (
            <InputAdornment position='start'>
              <StartIcon
                sx={{
                  width: '16px',
                  height: '16px',
                  color: 'var(--t-fg-color)'
                }}
              />
            </InputAdornment>
          )),
          endAdornment: (EndIcon && (
            <InputAdornment position='end'>
              <EndIcon
                sx={{
                  width: '16px',
                  height: '16px',
                  color: 'var(--t-fg-color)'
                }}
              />
            </InputAdornment>
          ))
        }}
        {...baseProps}
      >{props.children}</TextField>
      {
        helperText && 
        <Typography
          sx={{
            mt: '4px',
            color: 'var(--t-fg-color)',
            fontSize: '0.7rem',
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
