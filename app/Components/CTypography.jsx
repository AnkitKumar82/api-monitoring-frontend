import React from 'react'
import {
  Typography
} from '@mui/material'

export default function CTypography (props) {
  const {
    cvariant = '',
    sx={},
    style={},
    ...baseProps
  } = props
  
  const typographyStyle = {...sx, ...style}
  let variantStyle = {}
  switch(cvariant) {
    case 'main-heading':
    case 'mh':
      variantStyle = {
        fontSize: '3rem',
        fontWeight: '800',
        color: 'var(--p-fg-color)'
      }
      break
    case 'main-heading-description':
    case 'mhd':
      variantStyle = {
        fontSize: '1rem',
        fontWeight: '400',
        color: 'var(--t-fg-color)'
      }
      break
    case 'sub-heading':
    case 'sh':
      variantStyle = {
        fontSize: '1.3rem',
        fontWeight: '600',
        color: 'var(--p-fg-color)'
      }
      break
    case 'tertiary-heading':
    case 'th':
      variantStyle = {
        fontSize: '0.9rem',
        fontWeight: '500',
        color: 'var(--p-fg-color)'
      }
      break
    case 'caption':
    case 'c':
      variantStyle = {
        fontSize: '0.8rem',
        fontWeight: '400',
        color: 'var(--t-fg-color)'
      }
      break
    case 'paragraph':
    case 'p':
      variantStyle = {
        fontSize: '1rem',
        fontWeight: '400',
        color: 'var(--t-fg-color)'
      }
      break
    default:
      variantStyle = {
        fontSize: '0.9rem',
        fontWeight: '400',
        color: 'var(--s-fg-color)'
      }
  }

  return (
    <Typography
      sx={{
        ...variantStyle,
        ...typographyStyle
      }}
      {...baseProps}
    >
      {props.children}
    </Typography>
  )
}
