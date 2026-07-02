import React from 'react'
import {
  Tooltip
} from '@mui/material'

export default function CTooltip (props) {
  return (
    <Tooltip
      componentsProps={{
        tooltip: {
          sx: {
            p: '8px 16px',
            borderRadius: '0px',
            fontStyle: 'normal',
            fontWeight: '600',
            fontSize: '0.7rem',
            textAlign: 'center',
            color: 'var(--p-bg-color)',
            bgcolor: 'var(--p-fg-color)',
            '& .MuiTooltip-arrow': {
              color: 'var(--p-fg-color)'
            }
          }
        }
      }}
      {...props}
    >
      {props.children}
    </Tooltip>
  )
}
