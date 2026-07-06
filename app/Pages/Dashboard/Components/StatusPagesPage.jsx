import React from 'react'
import { Box, Grid, Paper, Stack } from '@mui/material'
import CTypography from '../../../Components/CTypography'
import Panel from './Panel'
import CButton from '../../../Components/CButton'
import { PublicRounded as PublicIcon, SupportAgentRounded as SupportIcon } from '@mui/icons-material'

export default function StatusPagesPage() {
  return (
    <Box>
      <Panel title="Status Pages" subtitle="Share uptime updates with customers and partners.">
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={3}
          sx={{
            border: '1px dashed rgba(79,156,187,0.4)', 
            borderRadius: 2, 
            p: 4, 
            textAlign: 'center', 
            background: 'rgba(79,156,187,0.06)',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Box sx={{ flex: 1 }}>
            <PublicIcon sx={{ fontSize: '48px', color: 'var(--s-fg-color)', mb: 2 }} />
            <CTypography cvariant="sub-heading" sx={{ mb: 1 }}>Coming soon</CTypography>
            <CTypography cvariant="caption" sx={{ mb: 3, display: 'block' }}>Public incident pages and status feeds are being prepared for launch.</CTypography>
            <CButton
              label="Contact Support"
              cvariant="secondary"
              startIcon={SupportIcon}
              sx={{ width: { xs: '100%', md: 'auto' } }}
            />
          </Box>
        </Stack>
      </Panel>
    </Box>
  )
}
