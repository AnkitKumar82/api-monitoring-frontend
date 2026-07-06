import React, { useState } from 'react'
import {
  Avatar,
  Box,
  Container,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material'

import {
  CloudDoneRounded,
  CreditCardRounded,
  DashboardRounded,
  GroupRounded,
  InsightsRounded,
  MenuRounded,
  NotificationsRounded,
  PublicRounded,
  SettingsRounded,
  SpeedRounded,
  WarningRounded
} from '@mui/icons-material'
import CTypography from '../../Components/CTypography'
import DashboardOverview from './Components/DashboardOverview'
import EndpointsPage from './Components/EndpointsPage'
import IncidentsPage from './Components/IncidentsPage'
import NotificationsPage from './Components/NotificationsPage'
import TeamPage from './Components/TeamPage'
import SettingsPage from './Components/SettingsPage'
import StatusPagesPage from './Components/StatusPagesPage'
import BillingPage from './Components/BillingPage'
import AnalyticsPage from './Components/AnalyticsPage'
import AppIcon from '../../Commons/AppIcon'
import Link from 'next/link'
import { useRouter } from 'next/router'

const sidebarItems = [
  { label: 'Dashboard', icon: DashboardRounded },
  { label: 'Incidents', icon: WarningRounded },
  { label: 'Notifications', icon: NotificationsRounded },
  { label: 'Team', icon: GroupRounded },
  { label: 'Settings', icon: SettingsRounded },
  { label: 'Status Pages', icon: PublicRounded },
  { label: 'Billing', icon: CreditCardRounded },
  { label: 'Analytics', icon: InsightsRounded }
]

const Sidebar = ({ open, onClose, activeSection, onSelect }) => {
  const content = (
    <Box sx={{ width: 280, height: '100%', p: 2.5, background: 'var(--s-bg-color)', borderRight: '1px solid var(--s-b-color)' }}>
      <Stack spacing={2.5} sx={{ height: '100%' }}>
        <Stack
          direction='column'
          alignItems='center'
        >
          <Stack
            direction='row'
            alignItems='center'
            spacing={1}
          >
            <AppIcon />
            <CTypography
              cvariant='c'
              sx={{
                fontWeight: 700,
                color: 'var(--p-fg-color)',
              }}
            >
              API Sentinel
            </CTypography>
          </Stack>
        </Stack>

        <List disablePadding>
          {sidebarItems.map((item) => {
            const Icon = item.icon
            return (
              <ListItem key={item.label} disablePadding sx={{ mb: 0.5 }}>
                <ListItemButton
                  selected={activeSection === item.label.toLowerCase()}
                  onClick={() => { onSelect(item.label.toLowerCase()); onClose() }}
                  disableRipple
                  sx={{
                    borderRadius: '8px',
                    ':hover': { backgroundColor: 'var(--t-bg-color)' },
                    '&.Mui-selected': { backgroundColor: 'var(--t-bg-color)' },
                    '&.Mui-selected:hover': { backgroundColor: 'var(--t-bg-color)' }
                  }}
                >
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{
                      fontSize: '0.8rem',
                      fontWeight: activeSection === item.label.toLowerCase() ? 700 : 500,
                      color: activeSection === item.label.toLowerCase() ? 'var(--p-fg-color)' : 'var(--s-fg-color)'
                    }}
                  />
                </ListItemButton>
              </ListItem>
            )
          })}
        </List>

        <Divider sx={{ borderColor: 'var(--s-b-color)' }} />

        <Box sx={{ borderRadius: '8px', p: 2, background: 'var(--t-bg-color)' }}>
          <CTypography cvariant='c' sx={{ fontWeight: 700, color: 'var(--p-fg-color)' }}>Health score</CTypography>
          <Typography variant='h5' sx={{ fontWeight: 800, color: 'var(--success-color)' }}>97.8</Typography>
          <CTypography cvariant='caption' sx={{ mt: 0.5 }}>All systems operating normally with 2 watchlist services.</CTypography>
        </Box>
      </Stack>
    </Box>
  )

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'))

  if (isMobile) {
    return (
      <Drawer
        anchor='left'
        open={open}
        onClose={onClose}
        ModalProps={{ keepMounted: true }}
        sx={{ '& .MuiDrawer-paper': { boxSizing: 'border-box', borderRight: 'none', background: 'transparent' } }}
      >
        {content}
      </Drawer>
    )
  }

  return (
    <Box
      sx={{
        width: 280,
        flexShrink: 0,
        display: { xs: 'none', lg: 'block' },
        position: 'sticky',
        top: 0,
        height: '100vh',
        alignSelf: 'flex-start',
      }}
    >
      {content}
    </Box>
  )
}

export default function Main() {
  const router = useRouter()
  const { view, id } = router.query 

  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState(view || 'dashboard')

  const renderSection = () => {
    switch (activeSection) {
      case 'incidents':
        return <IncidentsPage />
      case 'notifications':
        return <NotificationsPage />
      case 'team':
        return <TeamPage />
      case 'settings':
        return <SettingsPage />
      case 'status pages':
        return <StatusPagesPage />
      case 'billing':
        return <BillingPage />
      case 'analytics':
        return <AnalyticsPage />
      default:
        return <DashboardOverview />
    }
  }

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', width: '100%' }}>
      <Sidebar open={mobileOpen} onClose={() => setMobileOpen(false)} activeSection={activeSection} onSelect={setActiveSection} />

      <Box position="sticky"  component='main' sx={{ flexGrow: 1, minWidth: 0 }}>
        <Container maxWidth='xl' >
          <Stack direction='row' spacing={1.5} alignItems='center' sx={{ mb: 3, mt: '16px', display: { lg: 'none' } }}>
            <IconButton
              disableRipple 
              sx={{
                width: '20px',
                height: '20px',
                color: 'var(--p-fg-color)'
              }}
              onClick={() => setMobileOpen(true)}
            >
              <MenuRounded />
            </IconButton>
            <CTypography cvariant='c' sx={{ fontWeight: 700, color: 'var(--p-fg-color)' }}>{activeSection}</CTypography>
          </Stack>
          <Box
            sx={{
              width: '100%',
              background: 'var(--s-bg-color)',
              py: '16px'
            }}
          >
            {renderSection()}
          </Box>
        </Container>
      </Box>
    </Box>
  )
}
