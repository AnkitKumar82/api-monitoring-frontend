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

const metricCards = [
  { title: 'Healthy APIs', url: '/', value: '23', trend: '↑ 0.02% this week', icon: CheckCircleRounded, color: 'success' },
  { title: 'Degraded APIs', url: '/', value: '2', trend: '↗ 1 active watch', icon: WarningRounded, color: 'warning' },
  { title: 'Down APIs', url: '/', value: '1', trend: 'Needs attention', icon: ErrorRounded, color: 'error' },
  { title: 'Overall Uptime', value: '99.973%', trend: '↑ 0.02% this week', icon: TrendingUpRounded, color: 'success' }
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
            <Grid item xs={12} sm={6} md={3} key={item.title}>
              <Panel
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'background 0.25s ease',
                  // border: `1px solid var(--${item.color}-st-color)`
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
                      color: `var(--${item.color}-color)`,
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

      <Grid container spacing={2.5} sx={{ mb: 3 }}>
        <Grid item xs={12} lg={8}>
          <Panel title='Response Time' subtitle='Average, P95 and P99 latency across your monitored services.' actions={<CButton label='24 Hours' cvariant='secondary' />}>
            <Box sx={{ height: 240, borderRadius: 4, background: 'linear-gradient(135deg, rgba(79,156,187,0.12), rgba(255,255,255,0.65))', p: 2, display: 'flex', alignItems: 'flex-end', gap: 1.5 }}>
              {[58, 72, 66, 92, 84, 78, 96].map((height, index) => (
                <Box key={index} sx={{ flex: 1, height: `${height}%`, borderRadius: '999px 999px 4px 4px', background: index % 2 ? 'linear-gradient(180deg, var(--warning-color), var(--blue-color))' : 'linear-gradient(180deg, var(--success-color), var(--blue-color))' }} />
              ))}
            </Box>
          </Panel>
        </Grid>
        <Grid item xs={12} lg={4}>
          <Panel title='Notification Summary' subtitle='Signals sent to your on-call team.'>
            <Stack spacing={2}>
              {[
                { label: 'Today', value: '3 notifications sent', color: 'var(--success-color)' },
                { label: 'This Week', value: '12 notifications sent', color: 'var(--warning-color)' },
                { label: 'This Month', value: '47 notifications sent', color: 'var(--blue-color)' }
              ].map((item) => (
                <Stack key={item.label} direction='row' spacing={1.5} alignItems='center'>
                  <Box sx={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: item.color }} />
                  <Box>
                    <CTypography cvariant='paragraph' sx={{ color: 'var(--p-fg-color)', fontWeight: 600 }}>{item.value}</CTypography>
                    <CTypography cvariant='caption'>{item.label}</CTypography>
                  </Box>
                </Stack>
              ))}
            </Stack>
          </Panel>
        </Grid>
      </Grid>

      <Grid container spacing={2.5} sx={{ mb: 3 }}>
        <Grid item xs={12} lg={8}>
          <Panel title='Current Endpoint Status' subtitle='Live service health across your monitored regions.'>
            <TableContainer>
              <Table size='small'>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ color: 'var(--s-fg-color)', fontWeight: 700 }}>Name</TableCell>
                    <TableCell sx={{ color: 'var(--s-fg-color)', fontWeight: 700 }}>Status</TableCell>
                    <TableCell sx={{ color: 'var(--s-fg-color)', fontWeight: 700 }}>Region</TableCell>
                    <TableCell sx={{ color: 'var(--s-fg-color)', fontWeight: 700 }}>Latency</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {endpoints.map((endpoint) => (
                    <TableRow key={endpoint.name}>
                      <TableCell sx={{ color: 'var(--p-fg-color)' }}>{endpoint.name}</TableCell>
                      <TableCell><StatusBadge status={endpoint.status} /></TableCell>
                      <TableCell sx={{ color: 'var(--s-fg-color)' }}>{endpoint.region}</TableCell>
                      <TableCell sx={{ color: 'var(--p-fg-color)' }}>{endpoint.latency}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Panel>
        </Grid>
        <Grid item xs={12} lg={4}>
          <Panel title='Recent Incidents' subtitle='Latest events that have already recovered.'>
            <Stack spacing={2}>
              {incidents.map((incident) => (
                <Box key={incident.time} sx={{ borderRadius: 3, background: 'rgba(79,156,187,0.06)', p: 1.5 }}>
                  <CTypography cvariant='paragraph' sx={{ color: 'var(--p-fg-color)', fontWeight: 700 }}>{incident.endpoint}</CTypography>
                  <CTypography cvariant='caption'>{incident.time} • {incident.detail}</CTypography>
                  <CTypography cvariant='caption' sx={{ display: 'block', mt: 0.25 }}>{incident.duration}</CTypography>
                </Box>
              ))}
            </Stack>
          </Panel>
        </Grid>
      </Grid>

      <Panel title='Latest Checks' subtitle='Fresh verification results from your monitored endpoints.'>
        <TableContainer>
          <Table size='small'>
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: 'var(--s-fg-color)', fontWeight: 700 }}>Timestamp</TableCell>
                <TableCell sx={{ color: 'var(--s-fg-color)', fontWeight: 700 }}>Endpoint</TableCell>
                <TableCell sx={{ color: 'var(--s-fg-color)', fontWeight: 700 }}>Status</TableCell>
                <TableCell sx={{ color: 'var(--s-fg-color)', fontWeight: 700 }}>Latency</TableCell>
                <TableCell sx={{ color: 'var(--s-fg-color)', fontWeight: 700 }}>Region</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {checks.map((check) => (
                <TableRow key={check.timestamp}>
                  <TableCell sx={{ color: 'var(--s-fg-color)' }}>{check.timestamp}</TableCell>
                  <TableCell sx={{ color: 'var(--p-fg-color)' }}>{check.endpoint}</TableCell>
                  <TableCell><StatusBadge status={check.status} /></TableCell>
                  <TableCell sx={{ color: 'var(--p-fg-color)' }}>{check.latency}</TableCell>
                  <TableCell sx={{ color: 'var(--s-fg-color)' }}>{check.region}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Panel>
    </Box>
  )
}
