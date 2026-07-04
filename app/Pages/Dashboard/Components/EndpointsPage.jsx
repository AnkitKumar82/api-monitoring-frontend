import React from 'react'
import { Box, Grid, Paper, Stack, MenuItem, TablePagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { AddRounded, SearchRounded } from '@mui/icons-material'
import CButton from '../../../Components/CButton'
import CChip from '../../../Components/CChip'
import CTypography from '../../../Components/CTypography'
import CTextField from '../../../Components/CTextField'
import CSelect from '../../../Components/CSelect'
import Panel from './Panel'
import REGIONS from '../Constants/REGIONS'


const endpoints = [
  { name: 'Payments API', uptime:'93.132%', method: 'GET', url: 'https://api.example.com/payments', interval: '1 min', regions: ["US","EU"], status: 'HEALTHY', latency: '121ms', lastCheck: '2 min ago' },
  { name: 'Auth Service', uptime:'78.112%', method: 'POST', url: 'https://api.example.com/auth', interval: '30 sec', regions: ["US","SG"], status: 'DEGRADED', latency: '245ms', lastCheck: '5 min ago' },
  { name: 'Inventory API', uptime:'36.82%', method: 'GET', url: 'https://api.example.com/inventory', interval: '5 min', regions: ['SG'], status: 'DOWN', latency: '-', lastCheck: '10 min ago' },
  { name: 'Inventory API', uptime:'36.82%', method: 'GET', url: 'https://api.example.com/inventory', interval: '5 min', regions: ["SG"], status: 'PAUSED', latency: '-', lastCheck: '10 min ago' }
]

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
  return (
    <Box>
      <Panel title='Endpoints' subtitle='Manage your monitored services and add new checks.' actions={<CButton label='Add Endpoint' size="normal" active cvariant='p' startIcon={AddRounded} />}>
        <Grid container spacing={2} sx={{ mb: '8px' }}>
          <Grid item xs={12} md={4}>
            <CTextField
              cvariant='p'
              name='email'
              label='Endpoint'
              placeholder={`Payments API or api.example.com/payments`}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <CSelect
              cvariant='s'
              name='email'
              label='Method'
              fullWidth
            >
              <MenuItem value={'POST'}>POST</MenuItem>
              <MenuItem value={'GET'}>GET</MenuItem>
            </CSelect>
          </Grid>
          <Grid item xs={12} md={4}>
            <CSelect
              cvariant='s'
              name='email'
              label='Region'
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
              <CButton size='large' label='Reset Filter'sx={{ml: '8px'}} startIcon={SearchRounded} cvariant='t' />
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
                <TableRow key={endpoint.name}>
                  <TableCell><StatusBadge status={endpoint.status}/></TableCell>
                  <TableCell><CTypography sx={{ color: 'var(--p-fg-color)' }} cvariant='c'>{endpoint.uptime}</CTypography></TableCell>
                  <TableCell><CTypography sx={{ color: 'var(--p-fg-color)' }} cvariant='c'>{endpoint.name}</CTypography></TableCell>
                  <TableCell><CTypography sx={{ color: 'var(--p-fg-color)' }} cvariant='c'>{endpoint.method}</CTypography></TableCell>
                  <TableCell><CTypography sx={{ color: 'var(--p-fg-color)' }} cvariant='c'>{endpoint.url}</CTypography></TableCell>
                  <TableCell><CTypography sx={{ color: 'var(--p-fg-color)' }} cvariant='c'>{endpoint.interval}</CTypography></TableCell>
                  <TableCell><CTypography sx={{ color: 'var(--p-fg-color)' }} cvariant='c'>{endpoint.regions.map((region) => `${REGIONS[region].flag} `)} </CTypography></TableCell>
                  <TableCell><CTypography sx={{ color: 'var(--p-fg-color)' }} cvariant='c'>{endpoint.latency}</CTypography></TableCell>
                  <TableCell><CTypography sx={{ color: 'var(--p-fg-color)' }} cvariant='c'>{endpoint.lastCheck}</CTypography></TableCell>
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
          }}
          // onPageChange={(event, newPage) => setPage(newPage)}
          rowsPerPageOptions={[]}
          rowsPerPage={50}
        />
      </Panel>
    </Box>
  )
}
