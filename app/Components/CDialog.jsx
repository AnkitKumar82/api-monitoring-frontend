import React from 'react'
import { Box, Modal } from '@mui/material'

export default function CDialog(props) {
  return (
    <Modal open={props.open} onClose={props.onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'var(--s-bg-color) !important',
          backdropFilter: 'blur(18px) saturate(180%)',
          '-webkit-backdrop-filter': 'blur(18px) saturate(180%)',
          border: '1px solid var(--p-b-color)',
          borderRadius: '16px',
          p: '24px',
          minWidth: '300px',
          ...props.sx
        }}
      >
        {props.children}
      </Box>
    </Modal>
  )
}