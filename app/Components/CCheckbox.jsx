import React, { useState } from 'react'
import {
  Box,
  Checkbox
} from '@mui/material'
import CheckRoundedIcon from '@mui/icons-material/CheckRounded'

export default function CCheckbox (props) {
  const {
    sx={},
    style={},
    checkboxIconStyle={},
    checked = false,
    ...baseProps
  } = props

  const checkboxStyle = {...sx, ...style}

  return (
    <Checkbox
      disableRipple
      checked={props.checked}
      icon={
        <Box
          sx={{
            width: '16px',
            height: '16px',
            borderRadius: '6px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            border: '1px solid var(--p-b-color)',
            ...checkboxIconStyle
          }}
        >
          <CheckRoundedIcon
            sx={{
              stroke: 'transparent',
              strokeWidth: 2,
              width: '16px',
              height: '16px',
              color: 'transparent'
            }}
          />
        </Box>
      }
      checkedIcon={
        <Box
          sx={{
            width: '16px',
            height: '16px',
            borderRadius: '6px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            border: '1px solid var(--p-fg-color)',
            bgcolor: 'var(--p-fg-color)',
            ...checkboxIconStyle
          }}
        >
          <CheckRoundedIcon
            sx={{
              stroke: 'var(--p-bg-color)',
              strokeWidth: 2,
              width: '12px',
              height: '12px',
              color: 'var(--p-bg-color)'
            }}
          />
        </Box>
      }
      sx={{
        padding: 0,
        borderRadius: '6px',
        ...checkboxStyle
      }}
      {...baseProps}
    />
  )
}
