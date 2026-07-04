import React from 'react'
import { Box } from '@mui/material'
import CTypography from '../../../Components/CTypography'
import Panel from './Panel'

export default function StatusPagesPage() {
  return (
    <Box>
      <Panel title="Status Pages" subtitle="Share uptime updates with customers and partners.">
        <Box sx={{ border: '1px dashed rgba(79,156,187,0.4)', borderRadius: 4, p: 3, textAlign: 'center', background: 'rgba(79,156,187,0.06)' }}>
          <CTypography cvariant="sub-heading">Coming soon</CTypography>
          <CTypography cvariant="caption" sx={{ mt: 0.75 }}>Public incident pages and status feeds are being prepared for launch.</CTypography>
        </Box>
      </Panel>
    </Box>
  )
}
