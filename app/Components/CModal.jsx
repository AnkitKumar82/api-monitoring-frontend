import React, { useState, useEffect } from 'react'

import {
  Box,
  Modal,
  Slide,
  Grow,
  useMediaQuery,
  useTheme
} from '@mui/material'

export default function CModal (props) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'))
  
  const {
    sx = {},
    style = {},
    ...baseProps
  } = props

  const modalStyle = {...sx, ...style}
  
  let variantStyle = {}
  let Transition
  let transitionProps = {}

  if(isMobile) {
    variantStyle = {
      bottom: '0%',
      left: '0%',
      width: '100%',
      maxHeight: '90%',
      overflowY: 'scroll',
      borderRadius: '16px 16px 0px 0px'
    }
    Transition = Slide
    transitionProps = { direction: 'up' }
  } else {
    variantStyle = {
      top: '32px',
      transform: 'translate(-50%, -50%)',
      borderRadius: '16px',
      overflow: 'scroll',
      'scroll-width': 'thin'
    }
    Transition = Grow
  }

  return (
    <Modal
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      open={props.open}
      {...baseProps}
    >
      <Transition {...transitionProps} in={props.open} mountOnEnter unmountOnExit>
        <Box
          sx={{
            position: 'absolute',
            outline: 0,
            bgcolor: 'var(--p-bg-color)',
            ...variantStyle,
            ...modalStyle
          }}
        >
          {props.children}
        </Box>
      </Transition>
    </Modal>
  )
}
