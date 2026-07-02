import React from 'react'
import {
  Slider
} from '@mui/material'

export default function CSlider (props) {
  const {
    label = '',
    sx={},
    style={},
    ...baseProps
  } = props

  const sliderStyle = {...sx, ...style}

  return (
    <Slider
      size='small'
      sx={{
        height: '4px',
        '.MuiSlider-thumb':{
          height: '14px',
          width: '14px',
          border: '1px solid var(--p-fg-color)',
          backgroundColor: 'var(--p-bg-color)',
          boxShadow: 'none !important'
        },
        '.MuiSlider-rail': {
          color:'var(--t-bg-color)'
        },
        '.MuiSlider-track': {
          color: 'var(--p-fg-color)'
        },
        ...sliderStyle
      }}
      {...baseProps}
    />
  )
}
