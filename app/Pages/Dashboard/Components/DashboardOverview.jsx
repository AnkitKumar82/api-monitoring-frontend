import React from 'react'
import { Box, Grid, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import {
  AddRounded,
  CheckCircleRounded,
  ErrorRounded,
  SpeedRounded,
  TrendingUpRounded,
  WarningRounded
} from '@mui/icons-material'
import CButton from '../../../Components/CButton'
import CChip from '../../../Components/CChip'
import CTypography from '../../../Components/CTypography'
import Panel from './Panel'
import EndpointsPage from './EndpointsPage'

const metricCards = [
  { title: 'Healthy APIs', url: '/', value: '23', trend: '', icon: CheckCircleRounded, color: 'success' },
  { title: 'Degraded APIs', url: '/', value: '2', trend: '', icon: WarningRounded, color: 'warning' },
  { title: 'Down APIs', url: '/', value: '1', trend: '', icon: ErrorRounded, color: 'error' },
  { title: 'Uptime', value: '99.973%', trend: 'last 30 days', icon: TrendingUpRounded, color: 'success' }
]

const endpoints = [
  { name: 'Payments API', status: 'healthy', region: 'US-East', latency: '121ms' },
  { name: 'User Service', status: 'degraded', region: 'EU-West', latency: '245ms' },
  { name: 'Inventory API', status: 'down', region: 'AP-South', latency: '-' }
]

const incidents = [
  { time: '12:04 PM', endpoint: 'Payments API', detail: '503 Service Unavailable', duration: 'Recovered after 3m 22s' },
  { time: '10:15 AM', endpoint: 'Inventory API', detail: '500 Internal Server Error', duration: 'Recovered after 1m 45s' }
]

const checks = [
  { timestamp: '12:04:30', endpoint: 'Payments API', status: 'healthy', latency: '121ms', region: 'US-East' },
  { timestamp: '12:04:25', endpoint: 'User Service', status: 'degraded', latency: '245ms', region: 'EU-West' },
  { timestamp: '12:04:20', endpoint: 'Inventory API', status: 'down', latency: '-', region: 'AP-South' }
]

const StatusBadge = ({ status }) => {
  const map = {
    healthy: { label: 'Healthy', color: 'var(--success-color)' },
    degraded: { label: 'Degraded', color: 'var(--warning-color)' },
    down: { label: 'Down', color: 'var(--error-color)' }
  }
  const current = map[status] || map.healthy
  return <CChip label={current.label} size='small' sx={{ borderColor: current.color, color: current.color, backgroundColor: `${current.color}16` }} />
}

export default function DashboardOverview() {
  return (
    <Box>
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems={{ xs: 'flex-start', md: 'center' }} justifyContent='space-between' sx={{ mb: 3 }}>
        <Box>
          <CTypography cvariant='mh' sx={{ fontSize: '1.5rem' }}>Operations Overview</CTypography>
          <CTypography cvariant='c' >A developer-first view of uptime, latency, and active incidents across your services.</CTypography>
        </Box>
        <Stack direction='row' spacing={1.25}>
          <CButton label='Export' cvariant='s' size='normal'/>
          <CButton label='Add Endpoint' cvariant='s' active startIcon={AddRounded} size='normal'/>
        </Stack>
      </Stack>

      <Grid container spacing={2.5} sx={{ mb: 3 }}>
        {metricCards.map((item) => {
          const Icon = item.icon
          return (
            <Grid item xs={6} sm={6} md={3} key={item.title}>
              <Panel
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'background 0.25s ease',
                }}
              >
                {/* Header */}
                <Stack
                  direction='row'
                  justifyContent='space-between'
                  alignItems='flex-start'
                >
                  <CTypography
                    cvariant='caption'
                    sx={{
                      fontWeight: 600,
                      color: 'var(--s-fg-color)',
                    }}
                  >
                    {item.title}
                  </CTypography>

                  <Icon
                    sx={{
                      fontSize: '40px',
                      bgcolor: `var(--${item.color}-st-color)`,
                      borderRadius: '8px',
                      p: '12px',
                      color: `var(--${item.color}-color)`,
                    }}
                  />
                </Stack>

                {/* Main Content */}
                <Stack direction='row' justifyContent='flex-start' alignItems='flex-end' >
                  <CTypography
                    cvariant='sub-heading'
                    sx={{
                      mb: 0,
                      fontSize: '2rem',
                      fontWeight: 700,
                    }}
                  >
                    {item.value}
                  </CTypography>

                  <CTypography
                    cvariant='c'
                    sx={{
                      ml: '8px',
                      mb: '8px',
                      fontWeight: 400,
                    }}
                  >
                    {item.trend}
                  </CTypography>
                </Stack>
              </Panel>
            </Grid>
          )
        })}
      </Grid>
      <EndpointsPage />
    </Box>
  )
}
