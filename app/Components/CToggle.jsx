import React from 'react'
import {
  Stack
} from '@mui/material'
import CTypography from './CTypography'
import CSwitch from './CSwitch'
import CCheckbox from './CCheckbox'

export default function CToggle (props) {
  const {
    cvariant = '',
    label = '',
    labelStyle = {},
    helperText = '',
    helperTextStyle = {},
    sx={},
    style={},
    ...baseProps
  } = props

  let ToggleComponent
  const toggleStyle = {...sx, ...style}

  switch(cvariant) {
    case 'checkbox':
    case 'c':
      ToggleComponent = CCheckbox
      break
    default:
      ToggleComponent = CSwitch
  }

  return (
    <Stack
      direction='row'
      justifyContent='space-between'
      alignItems='center'
      sx={{ p: '8px 16px', ...toggleStyle }}
    >
      <Stack
        direction='column'
        justifyContent='center'
        alignItems='flex-start'
      >
        <CTypography
          component='h4'
          sx={{
            color: 'var(--p-fg-color)',
            fontWeight: '500',
            fontSize: '0.8rem',
            ...labelStyle
          }}
        >{label}</CTypography>
        {
          helperText &&
          <CTypography
            cvariant='c'
            component='h4'
            sx={{ mt: '4px', ...helperTextStyle }}
          >{helperText}</CTypography>
        }
      </Stack>
      <ToggleComponent {...baseProps}/>
    </Stack>
  )
}
