import React from 'react'
import { Box, Grid, Stack } from '@mui/material'
import CTypography from '../../../Components/CTypography'
import Panel from './Panel'

const incidents = [
  { title: 'Payments API', severity: 'Critical', started: '12:04 PM', recovered: '12:07 PM', duration: '3m 22s', rootCause: 'Upstream timeout during peak traffic', notification: 'Slack + Email' },
  { title: 'Inventory API', severity: 'Warning', started: '10:15 AM', recovered: '10:17 AM', duration: '1m 45s', rootCause: 'Transient dependency degradation', notification: 'Email only' }
]

export default function IncidentsPage() {
  return (
    <Box>
      <Panel title="Incidents" subtitle="Track active and resolved issues across your APIs.">
        <Grid container spacing={2.5}>
          {incidents.map((incident) => (
            <Grid item xs={12} md={6} key={incident.title}>
              <Box sx={{ border: '1px solid rgba(255,255,255,0.7)', borderRadius: 4, p: 2.25, background: 'rgba(255,255,255,0.62)' }}>
                <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1.5 }}>
                  <CTypography cvariant="sub-heading">{incident.title}</CTypography>
                  <Box sx={{ px: 1.2, py: 0.45, borderRadius: 999, background: incident.severity === 'Critical' ? 'rgba(197,72,77,0.16)' : 'rgba(245,158,11,0.16)', color: incident.severity === 'Critical' ? 'var(--error-color)' : 'var(--warning-color)', fontSize: '0.75rem', fontWeight: 700 }}>{incident.severity}</Box>
                </Stack>
                <Stack spacing={0.75}>
                  <CTypography cvariant="caption">Started: {incident.started}</CTypography>
                  <CTypography cvariant="caption">Recovered: {incident.recovered}</CTypography>
                  <CTypography cvariant="caption">Duration: {incident.duration}</CTypography>
                  <CTypography cvariant="caption">Root cause: {incident.rootCause}</CTypography>
                  <CTypography cvariant="caption">Notification sent: {incident.notification}</CTypography>
                </Stack>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Panel>
    </Box>
  )
}
