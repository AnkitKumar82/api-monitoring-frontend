import React, { useState } from 'react'
import { Box, Grid, Paper, Stack, TablePagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, MenuItem } from '@mui/material'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts'
import CButton from '../../../Components/CButton'
import CChip from '../../../Components/CChip'
import CTypography from '../../../Components/CTypography'
import CSelect from '../../../Components/CSelect'
import Panel from './Panel'
import REGIONS from '../Constants/REGIONS'

// Mock data for endpoint details
const endpointDetails = {
  name: 'Payments API',
  url: 'https://api.example.com/payments',
  method: 'POST',
  interval: '1 min',
  uptime: '93.132%',
  status: 'HEALTHY',
  latency: '121ms',
  lastCheck: '2 min ago'
}

// Mock data for charts
const latencyData = [
  { time: '00:00', latency: 120 },
  { time: '04:00', latency: 150 },
  { time: '08:00', latency: 110 },
  { time: '12:00', latency: 130 },
  { time: '16:00', latency: 140 },
  { time: '20:00', latency: 125 },
]

const uptimeData = [
  { time: '00:00', uptime: 98.5 },
  { time: '04:00', uptime: 97.2 },
  { time: '08:00', uptime: 99.1 },
  { time: '12:00', uptime: 98.8 },
  { time: '16:00', uptime: 97.5 },
  { time: '20:00', uptime: 98.2 },
]

// Mock data for previous checks
const checks = [
  { timestamp: '12:04:30', endpoint: 'Payments API', status: 'healthy', latency: '121ms', region: 'US-East' },
  { timestamp: '12:04:25', endpoint: 'User Service', status: 'degraded', latency: '245ms', region: 'EU-West' },
  { timestamp: '12:04:20', endpoint: 'Inventory API', status: 'down', latency: '-', region: 'AP-South' },
  { timestamp: '12:04:15', endpoint: 'Payments API', status: 'healthy', latency: '118ms', region: 'US-East' },
  { timestamp: '12:04:10', endpoint: 'Payments API', status: 'healthy', latency: '130ms', region: 'US-East' }
]

// Mock data for incidents
const incidents = [
  { time: '12:04 PM', endpoint: 'Payments API', detail: '503 Service Unavailable', duration: 'Recovered after 3m 22s' },
  { time: '10:15 AM', endpoint: 'Inventory API', detail: '500 Internal Server Error', duration: 'Recovered after 1m 45s' },
  { time: '09:30 AM', endpoint: 'Payments API', detail: 'Timeout error', duration: 'Recovered after 2m 15s' }
]

// Mock notification groups
const notificationGroups = [
  { id: 1, name: 'Admin Team' },
  { id: 2, name: 'DevOps Team' },
  { id: 3, name: 'Payment Service Team' },
  { id: 4, name: 'Security Team' }
]

// Status badge component
const StatusBadge = ({ status }) => {
  const map = {
    HEALTHY: { label: "Healthy", color: "var(--success-color)", background: "rgba(34,197,94,.12)" },
    DEGRADED: { label: "Degraded", color: "var(--warning-color)", background: "rgba(245,158,11,.12)" },
    DOWN: { label: "Down", color: "var(--error-color)", background: "rgba(239,68,68,.12)" },
    PAUSED: { label: "Paused", color: "var(--t-b-color)", background: "rgba(107,114,128,.12)" }
  }

  const current = map[status] || map.HEALTHY
  return (
    <Stack
      direction="row"
      spacing={1}
      alignItems="center"
      sx={{
        width:"fit-content",
        px:1.5,
        py:.5,
        borderRadius:999,
        bgcolor:current.background
      }}
    >
      <Box
        sx={{
          width:8,
          height:8,
          borderRadius:"50%",
          bgcolor:current.color,
          animation:
            ["DOWN", "DEGRADED"].includes(status)
            ? "livePulse 2s infinite"
            : undefined
        }}
      />
      <CTypography
        cvariant="c"
        sx={{ color:current.color }}
      >
          {current.label}
      </CTypography>
    </Stack>
  )
}

export default function EndpointAnalysis() {
  const [selectedGroups, setSelectedGroups] = useState([1, 3]) // Pre-selected groups

  return (
    <Box>
      {/* Endpoint Details Section */}
      <Panel title='Endpoint Details' subtitle='Overview of the selected API endpoint'>
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} md={6}>
            <Stack direction='column' spacing={1}>
              <CTypography cvariant='caption'>Name</CTypography>
              <CTypography cvariant='p'>{endpointDetails.name}</CTypography>
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack direction='column' spacing={1}>
              <CTypography cvariant='caption'>URL</CTypography>
              <CTypography cvariant='p'>{endpointDetails.url}</CTypography>
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack direction='column' spacing={1}>
              <CTypography cvariant='caption'>Method</CTypography>
              <CTypography cvariant='p'>{endpointDetails.method}</CTypography>
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack direction='column' spacing={1}>
              <CTypography cvariant='caption'>Check Interval</CTypography>
              <CTypography cvariant='p'>{endpointDetails.interval}</CTypography>
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack direction='column' spacing={1}>
              <CTypography cvariant='caption'>Status</CTypography>
              <Box sx={{ mt: 0.5 }}>
                <StatusBadge status={endpointDetails.status} />
              </Box>
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack direction='column' spacing={1}>
              <CTypography cvariant='caption'>Uptime</CTypography>
              <CTypography cvariant='p'>{endpointDetails.uptime}</CTypography>
            </Stack>
          </Grid>
        </Grid>
      </Panel>

      {/* Charts Section */}
      <Panel title='API Health' subtitle='Performance metrics over time'>
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} md={6}>
            <Box sx={{ height: '300px' }}>
              <CTypography cvariant='caption' sx={{ mb: 1, display: 'block' }}>Latency Chart</CTypography>
              <ResponsiveContainer width="100%" height="90%">
                <LineChart data={latencyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--p-b-color)" />
                  <XAxis dataKey="time" stroke="var(--t-fg-color)" />
                  <YAxis stroke="var(--t-fg-color)" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'var(--s-bg-color)', 
                      borderColor: 'var(--p-b-color)',
                      borderRadius: '8px',
                      color: 'var(--p-fg-color)'
                    }} 
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="latency" 
                    stroke="var(--success-color)" 
                    strokeWidth={2}
                    dot={{ strokeWidth: 2, r: 3 }}
                    activeDot={{ r: 6, strokeWidth: 0 }} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ height: '300px' }}>
              <CTypography cvariant='caption' sx={{ mb: 1, display: 'block' }}>Uptime Chart</CTypography>
              <ResponsiveContainer width="100%" height="90%">
                <BarChart data={uptimeData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--p-b-color)" />
                  <XAxis dataKey="time" stroke="var(--t-fg-color)" />
                  <YAxis stroke="var(--t-fg-color)" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'var(--s-bg-color)', 
                      borderColor: 'var(--p-b-color)',
                      borderRadius: '8px',
                      color: 'var(--p-fg-color)'
                    }} 
                  />
                  <Legend />
                  <Bar dataKey="uptime" fill="var(--warning-color)" />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Grid>
        </Grid>
      </Panel>

      {/* Previous Checks Table */}
      <Panel title='Previous Checks' subtitle='Historical check results'>
        <TableContainer
          component={Paper}
          sx={{
            textAlign: 'center',
            border: '1px solid var(--p-b-color)',
            boxShadow: 'none !important',
            borderRadius: '12px'
          }}  
        >
          <Table size='small'>
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: 'var(--p-fg-color)', fontWeight: 700 }}>Timestamp</TableCell>
                <TableCell sx={{ color: 'var(--p-fg-color)', fontWeight: 700 }}>Endpoint</TableCell>
                <TableCell sx={{ color: 'var(--p-fg-color)', fontWeight: 700 }}>Status</TableCell>
                <TableCell sx={{ color: 'var(--p-fg-color)', fontWeight: 700 }}>Latency</TableCell>
                <TableCell sx={{ color: 'var(--p-fg-color)', fontWeight: 700 }}>Region</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {checks.map((check, index) => (
                <TableRow key={index} sx={{':hover': { cursor: 'pointer', bgcolor: 'var(--t-bg-color)' }}}>
                  <TableCell><CTypography sx={{ color: 'var(--p-fg-color)' }} cvariant='c'>{check.timestamp}</CTypography></TableCell>
                  <TableCell><CTypography sx={{ color: 'var(--p-fg-color)' }} cvariant='c'>{check.endpoint}</CTypography></TableCell>
                  <TableCell><StatusBadge status={check.status} /></TableCell>
                  <TableCell><CTypography sx={{ color: 'var(--p-fg-color)' }} cvariant='c'>{check.latency}</CTypography></TableCell>
                  <TableCell><CTypography sx={{ color: 'var(--p-fg-color)' }} cvariant='c'>{check.region}</CTypography></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component={Paper}
          count={100}
          page={1}
          sx={{
            textAlign: 'center',
            border: '1px solid var(--p-b-color)',
            borderRadius: '12px',
            boxShadow: 'none',
            mt: '8px'
          }}
          rowsPerPageOptions={[]}
          rowsPerPage={50}
        />
      </Panel>

      {/* Incidents Table */}
      <Panel title='Incidents' subtitle='Active and resolved issues'>
        <TableContainer
          component={Paper}
          sx={{
            textAlign: 'center',
            border: '1px solid var(--p-b-color)',
            boxShadow: 'none !important',
            borderRadius: '12px'
          }}  
        >
          <Table size='small'>
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: 'var(--p-fg-color)', fontWeight: 700 }}>Time</TableCell>
                <TableCell sx={{ color: 'var(--p-fg-color)', fontWeight: 700 }}>Endpoint</TableCell>
                <TableCell sx={{ color: 'var(--p-fg-color)', fontWeight: 700 }}>Detail</TableCell>
                <TableCell sx={{ color: 'var(--p-fg-color)', fontWeight: 700 }}>Duration</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {incidents.map((incident, index) => (
                <TableRow key={index} sx={{':hover': { cursor: 'pointer', bgcolor: 'var(--t-bg-color)' }}}>
                  <TableCell><CTypography sx={{ color: 'var(--p-fg-color)' }} cvariant='c'>{incident.time}</CTypography></TableCell>
                  <TableCell><CTypography sx={{ color: 'var(--p-fg-color)' }} cvariant='c'>{incident.endpoint}</CTypography></TableCell>
                  <TableCell><CTypography sx={{ color: 'var(--p-fg-color)' }} cvariant='c'>{incident.detail}</CTypography></TableCell>
                  <TableCell><CTypography sx={{ color: 'var(--p-fg-color)' }} cvariant='c'>{incident.duration}</CTypography></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component={Paper}
          count={100}
          page={1}
          sx={{
            textAlign: 'center',
            border: '1px solid var(--p-b-color)',
            borderRadius: '12px',
            boxShadow: 'none',
            mt: '8px'
          }}
          rowsPerPageOptions={[]}
          rowsPerPage={50}
        />
      </Panel>

      {/* Notification Groups */}
      <Panel title='Notification Groups' subtitle='Select groups to receive alerts for this endpoint'>
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12}>
            <CSelect
              multiple
              cvariant='s'
              label='Notification Groups'
              value={selectedGroups}
              onChange={(e) => setSelectedGroups(e.target.value)}
              fullWidth
            >
              {notificationGroups.map((group) => (
                <MenuItem key={group.id} value={group.id}>
                  {group.name}
                </MenuItem>
              ))}
            </CSelect>
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <CButton size='large' label='Save Changes' cvariant='secondary' />
            </Box>
          </Grid>
        </Grid>
      </Panel>
    </Box>
  )
}