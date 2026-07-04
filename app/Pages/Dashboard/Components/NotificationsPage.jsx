import React from 'react'
import { Box, Grid, Stack } from '@mui/material'
import CTypography from '../../../Components/CTypography'
import Panel from './Panel'

const sections = [
  { title: 'Destinations', items: ['Email', 'Slack', 'Discord', 'Webhook'] },
  { title: 'Groups', items: ['Backend Team', 'On-call Squad', 'SRE Rotation'] },
  { title: 'Policies', items: ['2 consecutive failures', '3 failures in 5 minutes', 'Latency threshold breach'] }
]

export default function NotificationsPage() {
  return (
    <Box>
      <Panel title="Notifications" subtitle="Route incidents to the right channels and teams.">
        <Grid container spacing={2.5}>
          {sections.map((section) => (
            <Grid item xs={12} md={4} key={section.title}>
              <Box sx={{ border: '1px solid rgba(255,255,255,0.7)', borderRadius: 4, p: 2.25, background: 'rgba(255,255,255,0.62)' }}>
                <CTypography cvariant="sub-heading" sx={{ mb: 1.25 }}>{section.title}</CTypography>
                <Stack spacing={1}>
                  {section.items.map((item) => (
                    <Box key={item} sx={{ px: 1.25, py: 1, borderRadius: 2, background: 'rgba(79,156,187,0.08)' }}>
                      <CTypography cvariant="paragraph" sx={{ color: 'var(--p-fg-color)' }}>{item}</CTypography>
                    </Box>
                  ))}
                </Stack>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Panel>
    </Box>
  )
}
