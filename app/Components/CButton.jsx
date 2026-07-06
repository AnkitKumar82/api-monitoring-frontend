import React from 'react'
import {
  Button
} from '@mui/material'

export default function CButton (props) {
  const {
    label = '',
    cvariant = 'p',
    sx={},
    style={},
    startIcon: StartIcon,
    startIconProps = {},
    endIcon: EndIcon,
    endIconProps = {},
    rounded = false,
    gFirst = false,
    gMiddle = false,
    gLast = false,
    active = false,
    ...baseProps
  } = props

  const buttonStyle = {...sx, ...style}
  let variantStyle = {
    ...(gFirst && { borderRadius: '8px' }),
    ...(gMiddle && { borderRadius: '8px' }),
    ...(gLast && { borderRadius: '8px' })
  }

  switch(cvariant) {
    case 'secondary':
    case 's':
      variantStyle = {
        ...variantStyle,
        bgcolor: active ? 'var(--t-bg-color)'  : 'var(--s-bg-color)',
        color: 'var(--p-fg-color)',
        border: '1px solid transparent',
        backdropFilter: 'blur(20px)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        ':hover': {
          cursor: 'pointer',
          bgcolor: 'var(--t-bg-color)',
          border: '1px solid transparent',
          transform: 'translateY(-2px)'
        }
      }
      break
    case 'tertiary':  
    case 't':
      variantStyle = {
        ...variantStyle,
        bgcolor: 'transparent',
        color: 'var(--p-fg-color)',
        border: '1px solid transparent',
        backdropFilter: 'blur(20px)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        ':hover': {
          cursor: 'pointer',
          bgcolor: 'var(--s-bg-color)',
          border: '1px solid transparent',
          transform: 'translateY(-2px)'
        }
      }
      break
    case 'ghost':
    case 'g':
      variantStyle = {
        ...variantStyle,
        bgcolor: 'transparent',
        color: 'var(--p-fg-color)',
        border: '1px solid var(--glass-border)',
        backdropFilter: 'blur(20px)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        ':hover': {
          cursor: 'pointer',
          bgcolor: 'var(--s-bg-color)',
          border: '1px solid var(--glass-border)',
          transform: 'translateY(-2px)'
        }
      }
      break
    case 'success':
    case 'su':
      variantStyle = {
        ...variantStyle,
        bgcolor: 'transparent',
        color: 'var(--success-color)',
        border: '1px solid var(--glass-border)',
        backdropFilter: 'blur(20px)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        ':hover': {
          cursor: 'pointer',
          bgcolor: 'var(--success-st-color)',
          border: '1px solid var(--success-color)',
          transform: 'translateY(-2px)'
        }
      }
      break
    case 'warning':
    case 'w':
      variantStyle = {
        ...variantStyle,
        bgcolor: 'transparent',
        color: 'var(--warning-color)',
        border: '1px solid var(--glass-border)',
        backdropFilter: 'blur(20px)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        ':hover': {
          cursor: 'pointer',
          bgcolor: 'var(--warning-st-color)',
          border: '1px solid var(--warning-color)',
          transform: 'translateY(-2px)'
        }
      }
      break
    case 'link':
    case 'l':
      variantStyle = {
        ...variantStyle,
        bgcolor: 'transparent',
        color: 'var(--p-fg-color)',
        border: '1px solid transparent',
        p: '0px',
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: '0.8rem',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        ':hover': {
          cursor: 'pointer',
          bgcolor: 'transparent',
          color: 'var(--s-fg-color)',
          transform: 'translateY(-2px)'
        }
      }
      break
    default: 
      variantStyle = {
        ...variantStyle,
        bgcolor: 'var(--p-fg-color)',
        color: 'var(--p-bg-color)',
        border: '1px solid var(--p-fg-color)',
        backdropFilter: 'blur(20px)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        ':hover': {
          cursor: 'pointer',
          bgcolor: 'var(--s-fg-color)',
          color: 'var(--p-bg-color)',
          border: '1px solid var(--s-fg-color)',
          transform: 'translateY(-2px)'
        }
      }
  }

  return (
    <Button
      disableRipple
      sx={{
        textTransform: 'none !important',
        px: '10px',
        fontStyle: 'normal',
        fontWeight: '500',
        fontSize: '0.8rem',
        borderRadius: '8px',
        ...(rounded && { borderRadius: '99999px' }),
        ...variantStyle,
        ...buttonStyle
      }}
      {...baseProps}
    >
      {StartIcon &&
        <StartIcon
          sx={{
            width: '16px',
            height: '16px',
            color: 'inherit',
            mr: '12px',
            ...startIconProps
          }}
        />
      }
      {label}
      {EndIcon &&
        <EndIcon
          sx={{
            ml: '12px',
            width: '16px',
            height: '16px',
            color: 'inherit',
            ...endIconProps
          }}
        />
      }
    </Button>
  )
}