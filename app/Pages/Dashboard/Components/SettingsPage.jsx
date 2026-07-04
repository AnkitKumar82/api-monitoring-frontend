import React from 'react'
import { Box, Grid } from '@mui/material'
import CTypography from '../../../Components/CTypography'
import Panel from './Panel'

const sections = [
  { title: 'General', description: 'Workspace display name, domain, and default timezone.' },
  { title: 'Security', description: 'SSO, audit logs, and access controls.' },
  { title: 'API Keys', description: 'Generate, rotate, and revoke service credentials.' },
  { title: 'Profile', description: 'Personal preferences and contact details.' }
]

export default function SettingsPage() {
  return (
    <Box>
      <Panel title="Settings" subtitle="Control the workspace experience and security posture.">
        <Grid container spacing={2.5}>
          {sections.map((section) => (
            <Grid item xs={12} md={6} key={section.title}>
              <Box sx={{ border: '1px solid rgba(255,255,255,0.7)', borderRadius: 4, p: 2.25, background: 'rgba(255,255,255,0.62)' }}>
                <CTypography cvariant="sub-heading" sx={{ mb: 0.75 }}>{section.title}</CTypography>
                <CTypography cvariant="caption">{section.description}</CTypography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Panel>
    </Box>
  )
}
