import * as React from 'react'
import Switch from '@mui/material/Switch'

export default function CSwitch(props) {
  const {
    showFocusHighlight = false,
    scale = 1,
    ...baseProps
  } = props

  const width = `${30*scale}px`
  const height = `${18*scale}px`
  const margin = `${2*scale}px`
  const transform = `translateX(${12*scale}px)`
  const thumbWidth = `${14*scale}px`
  const thumbHeight = `${14*scale}px`
  const borderRadius = `${9*scale}px`

  return (
    <Switch
      checked={props.checked}
      sx={{
        width,
        height,
        padding: 0,
        '& .MuiSwitch-switchBase': {
          padding: 0,
          margin,
          transitionDuration: '200ms',
          '&.Mui-checked': {
            transform,
            color: 'var(--p-bg-color)',
            '& + .MuiSwitch-track': {
              backgroundColor: 'var(--p-fg-color)',
              opacity: 1,
              border: 0
            }
          },
          '&.Mui-focusVisible .MuiSwitch-thumb': {
            color: 'var(--p-fg-color)',
            border: '1px solid var(--p-bg-color)'
          },
          '&.Mui-disabled .MuiSwitch-thumb': {
            color: 'var(--t-bg-color)'
          }
        },
        '& .MuiSwitch-thumb': {
          boxSizing: 'border-box',
          width: thumbWidth,
          height: thumbHeight
        },
        '& .MuiSwitch-track': {
          borderRadius,
          backgroundColor: 'var(--t-bg-color)',
          opacity: 1
        },
        borderRadius
      }}
      {...baseProps}
    />
  )
}