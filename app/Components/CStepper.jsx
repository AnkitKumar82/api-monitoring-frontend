import React, { useState } from 'react'
import {
  Box,
  Stack
} from '@mui/material'

function getIndicatorIcon(active, index) {
  const baseIndicatorStyle = {
    mx: '2px',
    width: '8px',
    height: '8px',
    bgcolor: 'var(--p-fg-color)',
    borderRadius: '99999px'
  }

  if(index < active) {
    return <Box sx={{...baseIndicatorStyle }} />
  } else if(index === active){
    return <Box sx={{...baseIndicatorStyle, px: '8px' }} />
  } else {
    return <Box sx={{...baseIndicatorStyle, bgcolor: 'var(--p-b-color)' }} />
  }

}

export default function CStepper (props) {
  const {
    sx={},
    style={},
    active = 0,
    count = 3,
    ...baseProps
  } = props

  const stepperStyle = {...sx, ...style}

  return (
    <Stack
      direction='row'
      justifyContent='center'
      alignItems='center'
      sx={{
        p: '6px 4px',
        borderRadius: '99999px',
        bgcolor: 'var(--s-bg-color)',
        ...stepperStyle
      }}
      {...baseProps}
    >
      {Array.from({ length: count }, (_, index) => {
        return getIndicatorIcon(active, index + 1)
      })}
    </Stack>
  )
}
