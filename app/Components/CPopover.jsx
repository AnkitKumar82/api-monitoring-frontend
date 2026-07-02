import React from 'react'
import {
  Popover
} from '@mui/material'

export default function CPopover (props) {
  const {
    sx = {},
    style = {},
    ...restProps
  } = props

  const popoverStyle = { ...sx, ...style  }
  return (
    <Popover
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        sx={{
          '.MuiPopover-paper': {
            bgcolor: 'transparent',
            boxShadow: 'none',
            p: '0px'
          },
          ...popoverStyle
        }}
        {...restProps} 
      >
        {props.children}
      </Popover>
  )
}
