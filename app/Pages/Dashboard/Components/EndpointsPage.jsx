import React, { useState, useEffect } from 'react'
import { Box, Grid, Paper, Stack, MenuItem, TablePagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { AddRounded, SearchRounded } from '@mui/icons-material'
import CButton from '../../../Components/CButton'
import CChip from '../../../Components/CChip'
import CTypography from '../../../Components/CTypography'
import CTextField from '../../../Components/CTextField'
import CSelect from '../../../Components/CSelect'
import Panel from './Panel'
import REGIONS from '../Constants/REGIONS'
import Link from 'next/link'
import { endpointApi } from '../../../Helpers/endpointApi'

const StatusBadge = ({ status }) => {
  const map = {
    HEALTHY: { label: "Healthy", color: "var(--success-color)", background: "rgba(34,197,94,.12)" },
    DEGRADED: { label: "Degraded", color: "var(--warning-color)", background: "rgba(245,158,11,.12)" },
    DOWN: { label: "Down", color: "var(--error-color)", background: "rgba(239,68,68,.12)" },
    PAUSED: { label: "Paused", color: "var(--t-b-color)", background: "rgba(107,114,128,.12)" }
  }

  const current = map[status] || map.healthy
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

export default function EndpointsPage() {
  const [formData, setFormData] = useState({ endpoint: '', methods: [], regions: [], status: [] })
  const [endpoints, setEndpoints] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [createEndpointDialogOpen, setCreateEndpointDialogOpen] = useState(false)
  const [selectedEndpoint, setSelectedEndpoint] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value === 'string' ? value.split(',') : value,
    }))
  }

  const handleResetFilter = (e) => {
    setFormData({ endpoint: '', methods: [], regions: [], status: [] })
  }

  const handleCreateEndpoint = async (endpointData) => {
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        throw new Error('Authentication token not found')
      }
      
      const response = await endpointApi.createEndpoint(token, endpointData)
      // Refresh endpoints list after creation
      fetchEndpoints()
      return response
    } catch (err) {
      setError(err.message || 'Failed to create endpoint')
      console.error('Error creating endpoint:', err)
      throw err
    }
  }

  const handleUpdateEndpoint = async (endpointId, endpointData) => {
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        throw new Error('Authentication token not found')
      }
      
      const response = await endpointApi.updateEndpoint(token, endpointId, endpointData)
      // Refresh endpoints list after update
      fetchEndpoints()
      return response
    } catch (err) {
      setError(err.message || 'Failed to update endpoint')
      console.error('Error updating endpoint:', err)
      throw err
    }
  }

  const handleDeleteEndpoint = async (endpointId) => {
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        throw new Error('Authentication token not found')
      }
      
      const response = await endpointApi.deleteEndpoint(token, endpointId)
      // Refresh endpoints list after deletion
      fetchEndpoints()
      return response
    } catch (err) {
      setError(err.message || 'Failed to delete endpoint')
      console.error('Error deleting endpoint:', err)
      throw err
    }
  }

  const fetchEndpoints = async () => {
    try {
      setLoading(true)
      // Get token from localStorage (as used in SignIn page)
      const token = localStorage.getItem('token')
      if (!token) {
        throw new Error('Authentication token not found')
      }
      
      const response = await endpointApi.getAllEndpoints(token)
      setEndpoints(response.data || [])
    } catch (err) {
      setError(err.message || 'Failed to fetch endpoints')
      console.error('Error fetching endpoints:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchEndpoints()
  }, [])

  // Render loading state
  if (loading) {
    return (
      <Box>
        <Panel title='Endpoints' subtitle='Manage your monitored services and add new checks.'>
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CTypography cvariant='c'>Loading endpoints...</CTypography>
          </Box>
        </Panel>
      </Box>
    )
  }

  // Render error state
  if (error) {
    return (
      <Box>
        <Panel title='Endpoints' subtitle='Manage your monitored services and add new checks.'>
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CTypography cvariant='c' color='error'>Error: {error}</CTypography>
          </Box>
        </Panel>
      </Box>
    )
  }

  return (
    <Box>
      <Panel title='Endpoints' subtitle='Manage your monitored services and add new checks.'>
        <Grid container spacing={2} sx={{ mb: '8px' }}>
          <Grid item xs={12} md={6}>
            <CTextField
              cvariant='p'
              name='endpoint'
              label='Endpoint'
              value={formData.endpoint}
              placeholder={`Payments API,api.example.com/auth`}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <CSelect
              multiple
              cvariant='s'
              name='status'
              label='Status'
              value={formData.status}
              onChange={handleChange}
              fullWidth
            >
              <MenuItem value={'HEALTHY'}>Healthy</MenuItem>
              <MenuItem value={'DEGRADED'}>Degraded</MenuItem>
              <MenuItem value={'DOWN'}>Down</MenuItem>
              <MenuItem value={'PAUSED'}>Paused</MenuItem>
            </CSelect>
          </Grid>
          <Grid item xs={12} md={2}>
            <CSelect
              multiple
              cvariant='s'
              name='methods'
              label='Method'
              value={formData.methods}
              onChange={handleChange}
              fullWidth
            >
              <MenuItem value={'POST'}>POST</MenuItem>
              <MenuItem value={'GET'}>GET</MenuItem>
            </CSelect>
          </Grid>
          <Grid item xs={12} md={2}>
            <CSelect
              multiple
              cvariant='s'
              name='regions'
              label='Region'
              value={formData.regions}
              onChange={handleChange}
              fullWidth
            >
              <MenuItem value={REGIONS.US.value}>{REGIONS.US.flag} {REGIONS.US.displayName}</MenuItem>
              <MenuItem value={REGIONS.EU.value}>{REGIONS.EU.flag} {REGIONS.EU.displayName}</MenuItem>
              <MenuItem value={REGIONS.SG.value}>{REGIONS.SG.flag} {REGIONS.SG.displayName}</MenuItem>
            </CSelect>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box>
              <CButton size='large' label='Search' active startIcon={SearchRounded} cvariant='secondary' />
              <CButton size='large' label='Reset Filter'sx={{ml: '8px'}} onClick={handleResetFilter} cvariant='t' />
              <CButton 
                size='large' 
                label='Create Endpoint' 
                active 
                startIcon={AddRounded} 
                cvariant='primary' 
                sx={{ ml: '8px' }}
                onClick={() => setCreateEndpointDialogOpen(true)}
              />
            </Box>
          </Grid>
        </Grid>

        <TableContainer
          component={Paper}
          sx={{
            textAlign: 'center',
            border: '1px solid var(--p-b-color)',
            boxShadow: 'none',
            borderRadius: '12px'
          }}  
        >
          <Table size='small'>
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: 'var(--p-fg-color)', fontWeight: 700 }}>Status</TableCell>
                <TableCell sx={{ color: 'var(--p-fg-color)', fontWeight: 700 }}>Uptime</TableCell>
                <TableCell sx={{ color: 'var(--p-fg-color)', fontWeight: 700 }}>Name</TableCell>
                <TableCell sx={{ color: 'var(--p-fg-color)', fontWeight: 700 }}>Method</TableCell>
                <TableCell sx={{ color: 'var(--p-fg-color)', fontWeight: 700 }}>URL</TableCell>
                <TableCell sx={{ color: 'var(--p-fg-color)', fontWeight: 700 }}>Interval</TableCell>
                <TableCell sx={{ color: 'var(--p-fg-color)', fontWeight: 700 }}>Regions</TableCell>
                <TableCell sx={{ color: 'var(--p-fg-color)', fontWeight: 700 }}>Avg. Latency</TableCell>
                <TableCell sx={{ color: 'var(--p-fg-color)', fontWeight: 700 }}>Last Check</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {endpoints.map((endpoint) => (
                <TableRow 
                  key={endpoint._id || endpoint.name} 
                  sx={{':hover': { cursor: 'pointer', bgcolor: 'var(--t-bg-color)' }}}
                  onClick={() => {
                    setSelectedEndpoint(endpoint)
                    // In a real implementation, this would open a modal or navigate to the endpoint detail page
                  }}
                >
                  <TableCell>
                    <Link
                      href="/dashboard/endpoint"
                      style={{
                        textDecoration: 'none',
                        color: 'inherit',
                      }}
                    >
                      <StatusBadge status={endpoint.status}/>
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Link
                      href="/dashboard/endpoint"
                      style={{
                        textDecoration: 'none',
                        color: 'inherit',
                      }}
                    >
                      <CTypography sx={{ color: 'var(--p-fg-color)' }} cvariant='c'>{endpoint.uptime || 'N/A'}</CTypography>
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Link
                      href="/dashboard/endpoint"
                      style={{
                        textDecoration: 'none',
                        color: 'inherit',
                      }}
                    >
                    <CTypography sx={{ color: 'var(--p-fg-color)' }} cvariant='c'>{endpoint.name}</CTypography>
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Link
                      href="/dashboard/endpoint"
                      style={{
                        textDecoration: 'none',
                        color: 'inherit',
                      }}
                    >
                    <CTypography sx={{ color: 'var(--p-fg-color)' }} cvariant='c'>{endpoint.method}</CTypography>
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Link
                      href="/dashboard/endpoint"
                      style={{
                        textDecoration: 'none',
                        color: 'inherit',
                      }}
                    >
                    <CTypography sx={{ color: 'var(--p-fg-color)' }} cvariant='c'>{endpoint.url}</CTypography>
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Link
                      href="/dashboard/endpoint"
                      style={{
                        textDecoration: 'none',
                        color: 'inherit',
                      }}
                    >
                    <CTypography sx={{ color: 'var(--p-fg-color)' }} cvariant='c'>{endpoint.interval || 'N/A'}</CTypography>
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Link
                      href="/dashboard/endpoint"
                      style={{
                        textDecoration: 'none',
                        color: 'inherit',
                      }}
                    >
                    <CTypography sx={{ color: 'var(--p-fg-color)' }} cvariant='c'>{endpoint.regions?.map((region) => `${REGIONS[region].flag} `)} </CTypography>
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Link
                      href="/dashboard/endpoint"
                      style={{
                        textDecoration: 'none',
                        color: 'inherit',
                      }}
                    >
                    <CTypography sx={{ color: 'var(--p-fg-color)' }} cvariant='c'>{endpoint.latency || '-'}</CTypography>
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Link
                      href="/dashboard/endpoint"
                      style={{
                        textDecoration: 'none',
                        color: 'inherit',
                      }}
                    >
                    <CTypography sx={{ color: 'var(--p-fg-color)' }} cvariant='c'>{endpoint.lastCheck || 'N/A'}</CTypography>
                    </Link>
                  </TableCell>
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
          // onPageChange={(event, newPage) => setPage(newPage)}
          rowsPerPageOptions={[]}
          rowsPerPage={50}
        />
      </Panel>
    </Box>
  )
}