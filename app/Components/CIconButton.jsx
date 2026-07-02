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
        ':hover': {
          cursor: 'pointer',
          bgcolor: 'var(--s-bg-color)'
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
        borderRadius: '0px',
        ...(rounded && { borderRadius: '99999px' }),
        ...variantStyle,
        ...iconButtonStyle
      }}
      {...baseProps}
    />
  )
}
