import React from 'react'
import { Box, Grid } from '@mui/material'
import CTypography from '../../../Components/CTypography'
import Panel from './Panel'

export default function AnalyticsPage() {
  return (
    <Box>
      <Panel title="Analytics" subtitle="Trend performance and response quality over time.">
        <Grid container spacing={2.5}>
          <Grid item xs={12} md={6}>
            <Box sx={{ border: '1px solid rgba(255,255,255,0.7)', borderRadius: 4, p: 2.25, background: 'rgba(255,255,255,0.62)' }}>
              <CTypography cvariant="sub-heading" sx={{ mb: 0.75 }}>Availability</CTypography>
              <CTypography cvariant="caption">99.97% weekly average with one major incident.</CTypography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ border: '1px solid rgba(255,255,255,0.62)', borderRadius: 4, p: 2.25, background: 'rgba(255,255,255,0.62)' }}>
              <CTypography cvariant="sub-heading" sx={{ mb: 0.75 }}>Response time</CTypography>
              <CTypography cvariant="caption">Median latency held at 121ms over the last 30 days.</CTypography>
            </Box>
          </Grid>
        </Grid>
      </Panel>
    </Box>
  )
}
