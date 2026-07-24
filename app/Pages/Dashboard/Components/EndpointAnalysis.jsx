import React, { useState, useEffect } from 'react'
import { Box, Grid, Paper, Stack, TablePagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, MenuItem, Button } from '@mui/material'
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
import CTextField from '../../../Components/CTextField'
import Panel from './Panel'
import REGIONS from '../Constants/REGIONS'
import Link from 'next/link'
import { endpointApi } from '../../../Helpers/endpointApi'

// Mock data for endpoint details
const [endpointDetails, setEndpointDetails] = useState({
  name: '',
  url: '',
  method: '',
  interval: '',
  uptime: '',
  status: '',
  latency: '',
  lastCheck: ''
})

// Mock data for charts - will be replaced with real data from API
const [latencyData, setLatencyData] = useState([
  { time: '00:00', latency: 120 },
  { time: '04:00', latency: 150 },
  { time: '08:00', latency: 110 },
  { time: '12:00', latency: 130 },
  { time: '16:00', latency: 140 },
  { time: '20:00', latency: 125 },
])

const [uptimeData, setUptimeData] = useState([
  { time: '00:00', uptime: 98.5 },
  { time: '04:00', uptime: 97.2 },
  { time: '08:00', uptime: 99.1 },
  { time: '12:00', uptime: 98.8 },
  { time: '16:00', uptime: 97.5 },
  { time: '20:00', uptime: 98.2 },
])

// Mock data for previous checks - will be replaced with real data from API
const [checks, setChecks] = useState([
  { timestamp: '12:04:30', endpoint: 'Payments API', status: 'healthy', latency: '121ms', region: 'US-East' },
  { timestamp: '12:04:25', endpoint: 'User Service', status: 'degraded', latency: '245ms', region: 'EU-West' },
  { timestamp: '12:00:20', endpoint: 'Inventory API', status: 'down', latency: '-', region: 'AP-South' },
  { timestamp: '12:04:15', endpoint: 'Payments API', status: 'healthy', latency: '118ms', region: 'US-East' },
  { timestamp: '12:04:10', endpoint: 'Payments API', status: 'healthy', latency: '130ms', region: 'US-East' }
])

// Mock data for incidents - will be replaced with real data from API
const [incidents, setIncidents] = useState([
  { time: '12:04 PM', endpoint: 'Payments API', detail: '503 Service Unavailable', duration: 'Recovered after 3m 22s' },
  { time: '10:15 AM', endpoint: 'Inventory API', detail: '500 Internal Server Error', duration: 'Recovered after 1m 45s' },
  { time: '09:30 AM', endpoint: 'Payments API', detail: 'Timeout error', duration: 'Recovered after 2m 15s' }
])

// Mock notification groups - will be replaced with real data from API
const [notificationGroups, setNotificationGroups] = useState([
  { id: 1, name: 'Admin Team' },
  { id: 2, name: 'DevOps Team' },
  { id: 3, name: 'Payment Service Team' },
  { id: 4, name: 'Security Team' }
])

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
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // State for search filters
  const [checksFilter, setChecksFilter] = useState({
    endpoint: '',
    status: [],
    region: []
  });

  const [incidentsFilter, setIncidentsFilter] = useState({
    endpoint: '',
    detail: ''
  });

// State for timeframe selectors
const [latencyTimeframe, setLatencyTimeframe] = useState('Last 24 Hours');
const [uptimeTimeframe, setUptimeTimeframe] = useState('Last 24 Hours');
// State for region selectors
const [latencyRegion, setLatencyRegion] = useState('');
const [uptimeRegion, setUptimeRegion] = useState('');

  // Fetch endpoint data when component mounts (this would be replaced with actual endpoint ID from URL params)
  useEffect(() => {
    const fetchEndpointData = async () => {
      try {
        setLoading(true)
        // Get token from localStorage (same as SignIn page)
        const token = localStorage.getItem('token')
        if (!token) {
          throw new Error('Authentication token not found')
        }

        // In a real app, we would get the endpoint ID from URL parameters
        // For now, using a mock endpoint ID for demonstration purposes
        const endpointId = '640012345678901234567892' // This would be dynamically determined in real app

        // Fetch endpoint details by ID (GET /endpoints/:id)
        const endpointData = await endpointApi.getEndpointById(token, endpointId)
        setEndpointDetails({
          name: endpointData.name,
          url: endpointData.url,
          method: endpointData.method,
          interval: `${endpointData.intervalSeconds} seconds`,
          uptime: '93.132%', // This would come from API in real app
          status: endpointData.status || 'HEALTHY', // Would be dynamic from API
          latency: '121ms', // Would be dynamic from API
          lastCheck: '2 min ago' // Would be dynamic from API
        })

        // Mock chart data - would be replaced with real data from API in a real app
        setLatencyData([
          { time: '00:00', latency: 120 },
          { time: '04:00', latency: 150 },
          { time: '08:00', latency: 110 },
          { time: '12:00', latency: 130 },
          { time: '16:00', latency: 140 },
          { time: '20:00', latency: 125 },
        ])

        setUptimeData([
          { time: '00:00', uptime: 98.5 },
          { time: '04:00', uptime: 97.2 },
          { time: '08:00', uptime: 99.1 },
          { time: '12:00', uptime: 98.8 },
          { time: '16:00', uptime: 97.5 },
          { time: '20:00', uptime: 98.2 },
        ])

        // Mock checks data - would be replaced with real data from API in a real app
        setChecks([
          { timestamp: '12:04:30', endpoint: endpointData.name, status: 'healthy', latency: '121ms', region: 'US-East' },
          { timestamp: '12:04:25', endpoint: 'User Service', status: 'degraded', latency: '245ms', region: 'EU-West' },
          { timestamp: '12:00:20', endpoint: 'Inventory API', status: 'down', latency: '-', region: 'AP-South' },
          { timestamp: '12:04:15', endpoint: endpointData.name, status: 'healthy', latency: '118ms', region: 'US-East' },
          { timestamp: '12:04:10', endpoint: endpointData.name, status: 'healthy', latency: '130ms', region: 'US-East' }
        ])

        // Mock incidents data - would be replaced with real data from API in a real app
        setIncidents([
          { time: '12:04 PM', endpoint: endpointData.name, detail: '503 Service Unavailable', duration: 'Recovered after 3m 22s' },
          { time: '10:15 AM', endpoint: 'Inventory API', detail: '500 Internal Server Error', duration: 'Recovered after 1m 45s' },
          { time: '09:30 AM', endpoint: endpointData.name, detail: 'Timeout error', duration: 'Recovered after 2m 15s' }
        ])

        // Mock notification groups - would be replaced with real data from API in a real app
        setNotificationGroups([
          { id: 1, name: 'Admin Team' },
          { id: 2, name: 'DevOps Team' },
          { id: 3, name: 'Payment Service Team' },
          { id: 4, name: 'Security Team' }
        ])

      } catch (err) {
        console.error('Error fetching endpoint data:', err)
        setError(err.message || 'Failed to fetch endpoint data')
      } finally {
        setLoading(false)
      }
    }

    fetchEndpointData()
  }, []) // Empty dependency array means this runs once on mount

  if (loading) {
    return <Box sx={{ textAlign: 'center', p: 4 }}>Loading endpoint details...</Box>
  }

  if (error) {
    return <Box sx={{ textAlign: 'center', p: 4, color: 'error.main' }}>Error: {error}</Box>
  }

  return (
    <Box>
      {/* Endpoint Details Section */}
      <Panel
        title='Endpoint Details'
        subtitle='Overview of the selected API endpoint'
        sx={{ mb: 3 }}
        actions={
          <Link
            href="/dashboard/overview"
            style={{
              textDecoration: 'none',
              color: 'inherit',
            }}
          >
            <CButton label='Back to Overview' cvariant='s' size='normal'/>
          </Link>
        }
      >
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
          {/* Notification Groups moved here */}
          <Grid item xs={12}>
            <Box sx={{ mt: 2 }}>
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
            </Box>
          </Grid>
        </Grid>
      </Panel>

      {/* Charts Section */}
      <Panel title='API Health' subtitle='Performance metrics over time' sx={{ mb: 3 }}>
        <Grid container spacing={2} sx={{ mb: 3, pb: 3 }}>
          <Grid item xs={12} md={6}>
            <Box sx={{ height: '300px' }}>
              <CTypography cvariant='th' sx={{ color:'var(--p-fg-color)', mb: '16px' }}>Latency Chart</CTypography>
              <CSelect
                cvariant='s'
                label='TimeFrame'
                value={latencyTimeframe}
                onChange={(e) => setLatencyTimeframe(e.target.value)}
                fullWidth
                sx={{ mb: 2 }}
              >
                <MenuItem value='Last 24 Hours'>Last 24 Hours</MenuItem>
                <MenuItem value='Last 7 Days'>Last 7 Days</MenuItem>
                <MenuItem value='Last 30 Days'>Last 30 Days</MenuItem>
              </CSelect>
              <CSelect
                cvariant='s'
                label='Region'
                value={latencyRegion}
                onChange={(e) => setLatencyRegion(e.target.value)}
                fullWidth
                sx={{ mb: 2 }}
              >
                <MenuItem value='US'>US</MenuItem>
                <MenuItem value='EU'>Europe</MenuItem>
                <MenuItem value='SG'>Singapore</MenuItem>
              </CSelect>
              <ResponsiveContainer width="100%" height="80%">
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
            <Box>
              <CTypography cvariant='th' sx={{ color:'var(--p-fg-color)', mb: '16px' }}>Uptime Chart</CTypography>
              <CSelect
                cvariant='s'
                label='TimeFrame'
                value={uptimeTimeframe}
                onChange={(e) => setUptimeTimeframe(e.target.value)}
                // fullWidth
                sx={{ mb: 2 }}
              >
                <MenuItem value='Last 24 Hours'>Last 24 Hours</MenuItem>
                <MenuItem value='Last 7 Days'>Last 7 Days</MenuItem>
                <MenuItem value='Last 30 Days'>Last 30 Days</MenuItem>
              </CSelect>
              <CSelect
                cvariant='s'
                label='Region'
                value={uptimeRegion}
                onChange={(e) => setUptimeRegion(e.target.value)}
                // fullWidth
                sx={{ mb: 2 }}
              >
                <MenuItem value=''>All Regions</MenuItem>
                <MenuItem value='US'>US</MenuItem>
                <MenuItem value='EU'>Europe</MenuItem>
                <MenuItem value='SG'>Singapore</MenuItem>
              </CSelect>
              <ResponsiveContainer>
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
        <Grid container spacing={2} sx={{ mb: 2 }}>
<Grid item xs={12} md={4}>
            <CTextField
              cvariant='p'
              label='Endpoint'
              placeholder='Search by endpoint...'
              value={checksFilter.endpoint}
              onChange={(e) => setChecksFilter({...checksFilter, endpoint: e.target.value})}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <CSelect
              multiple
              cvariant='s'
              label='Status'
              value={checksFilter.status}
              onChange={(e) => setChecksFilter({...checksFilter, status: e.target.value})}
              fullWidth
            >
              <MenuItem value={'healthy'}>Healthy</MenuItem>
              <MenuItem value={'degraded'}>Degraded</MenuItem>
              <MenuItem value={'down'}>Down</MenuItem>
            </CSelect>
          </Grid>
          <Grid item xs={12} md={4}>
            <CSelect
              multiple
              cvariant='s'
              label='Region'
              value={checksFilter.region}
              onChange={(e) => setChecksFilter({...checksFilter, region: e.target.value})}
              fullWidth
            >
              <MenuItem value={'US-East'}>US-East</MenuItem>
              <MenuItem value={'EU-West'}>EU-West</MenuItem>
              <MenuItem value={'AP-South'}>AP-South</MenuItem>
            </CSelect>
          </Grid>
        </Grid>
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
              {checks
                .filter(check => {
                  return (
                    (checksFilter.endpoint === '' || check.endpoint.toLowerCase().includes(checksFilter.endpoint.toLowerCase())) &&
                    (checksFilter.status.length === 0 || checksFilter.status.includes(check.status)) &&
                    (checksFilter.region.length === 0 || checksFilter.region.includes(check.region))
                  );
                })
                .map((check, index) => (
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
        <Grid container spacing={2} sx={{ mb: 2 }}>
<Grid item xs={12} md={6}>
            <CTextField
              cvariant='p'
              label='Endpoint'
              placeholder='Search by endpoint...'
              value={incidentsFilter.endpoint}
              onChange={(e) => setIncidentsFilter({...incidentsFilter, endpoint: e.target.value})}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <CTextField
              cvariant='p'
              label='Detail'
              placeholder='Search by detail...'
              value={incidentsFilter.detail}
              onChange={(e) => setIncidentsFilter({...incidentsFilter, detail: e.target.value})}
              fullWidth
            />
          </Grid>
        </Grid>
        <TableContainer
          component={Paper}
          sx={{
            textAlign: 'center',
            border: '1px solid var(--p-b-color)',
            boxShadow: 'none !important',
            borderRadius: '12px',
            mt: 2 // Added 16px margin (2 units) between sections
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
              {incidents
                .filter(incident => {
                  return (
                    (incidentsFilter.endpoint === '' || incident.endpoint.toLowerCase().includes(incidentsFilter.endpoint.toLowerCase())) &&
                    (incidentsFilter.detail === '' || incident.detail.toLowerCase().includes(incidentsFilter.detail.toLowerCase()))
                  );
                })
                .map((incident, index) => (
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
    </Box>
  )
}