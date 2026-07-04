import React from 'react'
import { Box, Grid } from '@mui/material'
import CTypography from '../../../Components/CTypography'
import Panel from './Panel'

export default function BillingPage() {
  return (
    <Box>
      <Panel title="Billing" subtitle="Plan usage, invoices, and payment history.">
        <Grid container spacing={2.5}>
          <Grid item xs={12} md={6}>
            <Box sx={{ border: '1px solid rgba(255,255,255,0.7)', borderRadius: 4, p: 2.25, background: 'rgba(255,255,255,0.62)' }}>
              <CTypography cvariant="sub-heading" sx={{ mb: 0.75 }}>Pro plan</CTypography>
              <CTypography cvariant="caption">$79/month • 250 monitored endpoints</CTypography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ border: '1px solid rgba(255,255,255,0.7)', borderRadius: 4, p: 2.25, background: 'rgba(255,255,255,0.62)' }}>
              <CTypography cvariant="sub-heading" sx={{ mb: 0.75 }}>Next invoice</CTypography>
              <CTypography cvariant="caption">August 1, 2026 • Auto-pay enabled</CTypography>
            </Box>
          </Grid>
        </Grid>
      </Panel>
    </Box>
  )
}
