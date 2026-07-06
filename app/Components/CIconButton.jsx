import React from 'react'

export default function CIconButton (props) {
  const {
    cvariant = 'p',
    sx={},
    style={},
    icon: Icon,
    rounded = false,
    gFirst = false,
    gMiddle = false,
    gLast = false,
    active = false,
    ...baseProps
  } = props

  const iconButtonStyle = {...sx, ...style}
  let variantStyle = {
    ...(gFirst && { borderRadius: '0px' }),
    ...(gMiddle && { borderRadius: '0px' }),
    ...(gLast && { borderRadius: '0px' })
  }

  switch(cvariant) {
    case 'secondary':
    case 's':
      variantStyle = {
        ...variantStyle,
        bgcolor: active ? 'var(--t-bg-color)' : 'var(--s-bg-color)',
        color: 'var(--p-fg-color)',
        border: active ? '1px solid var(--t-bg-color)' : '1px solid var(--s-bg-color)',
        backdropFilter: 'blur(20px)',
        boxShadow: '0 8px 32px rgba(15,23,42,.12), inset 0 1px 0 rgba(255,255,255,.35)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        ':hover': {
          cursor: 'pointer',
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
        color: 'var(--p-fg-color)',
        border: '1px solid transparent',
        backdropFilter: 'blur(20px)',
        boxShadow: '0 8px 32px rgba(15,23,42,.12), inset 0 1px 0 rgba(255,255,255,.35)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        ':hover': {
          cursor: 'pointer',
          bgcolor: 'var(--s-bg-color)'
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
        boxShadow: '0 8px 32px rgba(15,23,42,.12), inset 0 1px 0 rgba(255,255,255,.35)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        ':hover': {
          cursor: 'pointer',
          bgcolor: 'inherit',
          border: '1px solid var(--glass-border)'
        }
      }
      break
    case 'outlined':
    case 'o':
      variantStyle = {
        ...variantStyle,
        bgcolor: 'transparent',
        color: 'var(--p-fg-color)',
        border: '1px solid var(--glass-border)',
        backdropFilter: 'blur(20px)',
        boxShadow: '0 8px 32px rgba(15,23,42,.12), inset 0 1px 0 rgba(255,255,255,.35)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        ':hover': {
          cursor: 'pointer',
          border: '1px solid var(--p-b-color)'
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
        boxShadow: '0 8px 32px rgba(15,23,42,.12), inset 0 1px 0 rgba(255,255,255,.35)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        ':hover': {
          cursor: 'pointer',
          bgcolor: 'var(--success-st-color)',
          border: '1px solid var(--success-color)'
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
        boxShadow: '0 8px 32px rgba(15,23,42,.12), inset 0 1px 0 rgba(255,255,255,.35)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        ':hover': {
          cursor: 'pointer',
          bgcolor: 'var(--warning-st-color)',
          border: '1px solid var(--warning-color)'
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
        boxShadow: '0 8px 32px rgba(15,23,42,.12), inset 0 1px 0 rgba(255,255,255,.35)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        ':hover': {
          cursor: 'pointer',
          bgcolor: 'var(--s-fg-color)',
          color: 'var(--p-bg-color)',
          border: '1px solid var(--s-fg-color)'
        }
      }
    }

  return (
    <Icon
      sx={{
        width: '20px',
        height: '20px',
        borderRadius: '12px',
        ...(rounded && { borderRadius: '99999px' }),
        ...variantStyle,
        ...iconButtonStyle
      }}
      {...baseProps}
    />
  )
}
