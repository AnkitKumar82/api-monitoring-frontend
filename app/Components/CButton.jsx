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
        border: active ? '1px solid var(--t-bg-color)' : '1px solid var(--s-bg-color)',
        ':hover': {
          bgcolor: 'var(--t-bg-color)',
          border: '1px solid var(--t-bg-color)'
        }
      }
      break
    case 'tertiary':  
    case 't':
      variantStyle = {
        ...variantStyle,
        bgcolor: 'transparent',
        // border: active ? '1px solid var(--p-b-color)' : '1px solid var(--s-bg-color)',
        color: 'var(--p-fg-color)',
        ':hover': {
          bgcolor: 'var(--s-bg-color)'
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
        ':hover': {
          bgcolor: 'transparent',
          color: 'var(--s-fg-color)'
        }
      }
      break
    default: 
      variantStyle = {
        ...variantStyle,
        bgcolor: 'var(--p-fg-color)',
        color: 'var(--p-bg-color)',
        border: '1px solid var(--p-fg-color)',
        ':hover': {
          bgcolor: 'var(--s-fg-color)',
          color: 'var(--p-bg-color)',
          border: '1px solid var(--s-fg-color)'
        }
      }
  }

  return (
    <Button
      size='small'
      disableRipple
      sx={{
        textTransform: 'none !important',
        px: '10px',
        fontStyle: 'normal',
        fontWeight: '500',
        fontSize: '0.7rem',
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
