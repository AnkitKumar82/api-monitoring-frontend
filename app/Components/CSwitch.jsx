import * as React from 'react'
import Switch from '@mui/material/Switch'

export default function CSwitch(props) {
  const {
    showFocusHighlight = false,
    ...baseProps
  } = props

  return (
    <Switch
      checked={props.checked}
      sx={{
        width: '30px',
        height: '18px',
        padding: 0,
        '& .MuiSwitch-switchBase': {
          padding: 0,
          margin: '2px',
          transitionDuration: '200ms',
          '&.Mui-checked': {
            transform: 'translateX(12px)',
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
          width: '14px',
          height: '14px'
        },
        '& .MuiSwitch-track': {
          borderRadius: '9px',
          backgroundColor: 'var(--t-bg-color)',
          opacity: 1
        },
        borderRadius: '9px'
      }}
      {...baseProps}
    />
  )
}