import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Box, Grid, Paper, Stack, MenuItem, TablePagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { AddRounded, SearchRounded } from '@mui/icons-material'
import CButton from '../../../Components/CButton'
import CChip from '../../../Components/CChip'
import CTypography from '../../../Components/CTypography'
import CTextField from '../../../Components/CTextField'
import CSelect from '../../../Components/CSelect'
import Panel from './Panel'
import REGIONS from '../Constants/REGIONS'
import { incidentApi } from '../../../Helpers/incidentApi'

const initialIncidents = []
const StatusBadge = ({ status }) => {
  const map = {
    RESOLVED: { label: "Resolved", color: "var(--success-color)", background: "rgba(34,197,94,.12)" },
    ONGOING: { label: "Ongoing", color: "var(--error-color)", background: "rgba(239,68,68,.12)" },
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
            ["ONGOING"].includes(status)
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

export default function IncidentsPage() {
  const [formData, setFormData] = useState({ endpoint: '', methods: [], regions: [], status: [] })
  const [incidents, setIncidents] = useState(initialIncidents)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const router = useRouter()
  const { view, action, id } = router.query

  // Get token from localStorage (assuming it's stored there after login)
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null

  useEffect(() => {
    if (token) {
      fetchIncidents()
    }
  }, [token])

  const fetchIncidents = async () => {
    if (!token) return
    setLoading(true)
    setError(null)
    try {
      // Fetch incidents with default parameters (can be extended with filters)
      const result = await incidentApi.listIncidents(token)
      setIncidents(result.data || [])
    } catch (err) {
      setError('Failed to fetch incidents')
      console.error('Error fetching incidents:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value === 'string' ? value.split(',') : value,
    }))
  }

  const handleResetFilter = (e) => {
    setFormData({ endpoint: '', methods: [], regions: [] })
  }

  return (
    <Box>
      <Panel title='Incidents' subtitle='Track active and resolved issues across your APIs with clear impact details.'>
        <Grid container spacing={2} sx={{ mb: '8px' }}>
          <Grid item xs={12} md={6}>
            <CTextField
              cvariant='p'
              name='endpoints'
              label='Endpoint'
              placeholder={`Payments API,api.example.com/auth`}
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
            <CTextField
              cvariant='p'
              name='email'
              label='Error'
              placeholder={`500 Internal Server Error`}
              fullWidth
            />
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
              <CButton size='large' label='Reset Filter'sx={{ml: '8px'}} cvariant='t' />
            </Box>
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
                <TableCell sx={{ color: 'var(--p-fg-color)', fontWeight: 700 }}>Status</TableCell>
                <TableCell sx={{ color: 'var(--p-fg-color)', fontWeight: 700 }}>Name</TableCell>
                <TableCell sx={{ color: 'var(--p-fg-color)', fontWeight: 700 }}>Started</TableCell>
                <TableCell sx={{ color: 'var(--p-fg-color)', fontWeight: 700 }}>Resolved</TableCell>
                <TableCell sx={{ color: 'var(--p-fg-color)', fontWeight: 700 }}>Reason</TableCell>
                <TableCell sx={{ color: 'var(--p-fg-color)', fontWeight: 700 }}>Last Check</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} align="center">Loading incidents...</TableCell>
                </TableRow>
              ) : error ? (
                <TableRow>
                  <TableCell colSpan={6} align="center">Error: {error}</TableCell>
                </TableRow>
              ) : incidents.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center">No incidents found</TableCell>
                </TableRow>
              ) : (
                incidents.map((incident) => (
                  <TableRow key={incident._id || incident.name} sx={{':hover': { cursor: 'pointer', bgcolor: 'var(--t-bg-color)' }}}>
                    <TableCell><StatusBadge status={incident.status}/></TableCell>
                    <TableCell><CTypography sx={{ color: 'var(--p-fg-color)' }} cvariant='c'>{incident.name || incident.endpointName}</CTypography></TableCell>
                    <TableCell><CTypography sx={{ color: 'var(--p-fg-color)' }} cvariant='c'>{incident.startTime || 'N/A'}</CTypography></TableCell>
                    <TableCell><CTypography sx={{ color: 'var(--p-fg-color)' }} cvariant='c'>{incident.resolveTime || 'N/A'}</CTypography></TableCell>
                    <TableCell><CTypography sx={{ color: 'var(--p-fg-color)' }} cvariant='c'>{incident.reason || 'N/A'}</CTypography></TableCell>
                    <TableCell><CTypography sx={{ color: 'var(--p-fg-color)' }} cvariant='c'>{incident.lastCheck || 'N/A'}</CTypography></TableCell>
                  </TableRow>
                ))
              )}
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
          }}
          // onPageChange={(event, newPage) => setPage(newPage)}
          rowsPerPageOptions={[]}
          rowsPerPage={50}
        />
      </Panel>
    </Box>
  )
}
