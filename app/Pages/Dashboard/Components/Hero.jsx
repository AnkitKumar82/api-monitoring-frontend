import React, { useState } from 'react'
import Link from 'next/link'

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Card,
  CardContent,
  Chip,
  Container,
  Divider,
  Grid,
  Paper,
  Stack,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
  LinearProgress
} from '@mui/material'

import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded'
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded'

import PublicRoundedIcon from '@mui/icons-material/PublicRounded'
import SpeedRoundedIcon from '@mui/icons-material/SpeedRounded'
import SupportAgentRoundedIcon from '@mui/icons-material/SupportAgentRounded'
import NotificationsActiveRoundedIcon from '@mui/icons-material/NotificationsActiveRounded'
import TimelineRoundedIcon from '@mui/icons-material/TimelineRounded'
import SecurityRoundedIcon from '@mui/icons-material/SecurityRounded'
import VerifiedRoundedIcon from '@mui/icons-material/VerifiedRounded'
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded'
import RocketLaunchRoundedIcon from '@mui/icons-material/RocketLaunchRounded'
import EmailRoundedIcon from '@mui/icons-material/EmailRounded'
import BoltRoundedIcon from '@mui/icons-material/BoltRounded'

import CTypography from '../../../Components/CTypography'
import CTextField from '../../../Components/CTextField'
import CButton from '../../../Components/CButton'

const GlassCard = ({ style = {}, children }) => (
  <Card
    sx={{
      height: '100%',
      background: 'var(--s-bg-color)',
      backdropFilter: 'blur(20px)',
      border: '1px solid var(--p-b-color)',
      borderRadius: '20px',
      boxShadow:
        '0 8px 32px rgba(15,23,42,.12), inset 0 1px 0 rgba(255,255,255,.35)',
      ...style
    }}
  >
    {children}
  </Card>
)

export default function Hero() {
  const [expandedFAQ, setExpandedFAQ] = useState(null)

  return (
    <Box display="flex" flexDirection="column">
      {/* ===================== HERO ===================== */}
      <Box
        sx={{
          py: {
            xs: 8,
            md: 14,
          },
        }}
      >
        <Container maxWidth="lg">
          <Grid
            container
            spacing={6}
            alignItems="center"
          >
            <Grid
              item
              xs={12}
              md={6}
            >
              <Chip
                icon={<BoltRoundedIcon />}
                label="Launching Soon"
                sx={{
                  mb: 3,
                  bgcolor: 'var(--s-bg-color)',
                  border: '1px solid var(--p-b-color)',
                }}
              />

              <CTypography
                cvariant="mh"
                gutterBottom
              >
                Know Your API Is Down
                <br />
                Before Your Customers Do.
              </CTypography>

              <CTypography
                cvariant="mhd"
                sx={{
                  maxWidth: 560,
                  mb: 5,
                }}
              >
                Lightweight API monitoring built for startups and backend
                engineers. Monitor from multiple regions, track uptime &
                latency, and receive alerts before users notice outages.
              </CTypography>

              <Stack
                direction="row"
                spacing={2}
                alignItems="center"
              >
                <Link
                  href="/sign-in"
                  style={{
                    textDecoration: 'none',
                    color: 'inherit',
                  }}
                >
                  <CButton size="large" cvariant='l' label="Log In"/>  
                </Link>
                <Link
                  href="/sign-up"
                  style={{
                    textDecoration: 'none',
                    color: 'inherit',
                  }}
                >
                  <CButton size="large" active cvariant='s' label="Sign Up"/>  
                </Link>
              </Stack>

              <Stack
                direction="row"
                spacing={4}
                mt={5}
              >
                <Box>
                  <CTypography cvariant="th">
                    1 min
                  </CTypography>

                  <CTypography cvariant="c">
                    Monitoring
                  </CTypography>
                </Box>

                <Box>
                  <CTypography cvariant="th">
                    3 Regions
                  </CTypography>

                  <CTypography cvariant="c">
                    Global Checks
                  </CTypography>
                </Box>

                <Box>
                  <CTypography cvariant="th">
                    Email
                  </CTypography>

                  <CTypography cvariant="c">
                    Instant Alerts
                  </CTypography>
                </Box>
              </Stack>

            </Grid>

            <Grid
              item
              xs={12}
              md={6}
            >
              <GlassCard>
                <CardContent
                  sx={{
                    p: 4,
                  }}
                >
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    mb={3}
                  >
                    <CTypography cvariant="th">
                      API Status Dashboard
                    </CTypography>

                    <Chip
                      size="small"
                      color="success"
                      label="99.98% Uptime"
                    />
                  </Stack>

                  <Stack spacing={2}>

                    <Paper
                      elevation={0}
                      sx={{
                        p: 2,
                        borderRadius: '14px',
                        bgcolor: 'rgba(34,197,94,.08)',
                        border: '1px solid rgba(34,197,94,.15)',
                      }}
                    >
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Box>
                          <CTypography cvariant="th">
                            Authentication API
                          </CTypography>

                          <CTypography cvariant="c">
                            Healthy
                          </CTypography>
                        </Box>

                        <Box textAlign="right">
                          <CTypography cvariant="th">
                            118 ms
                          </CTypography>

                          <CTypography cvariant="c">
                            US • EU • SG
                          </CTypography>
                        </Box>
                      </Stack>
                    </Paper>

                    <Paper
                      elevation={0}
                      sx={{
                        p: 2,
                        borderRadius: '14px',
                        bgcolor: 'rgba(34,197,94,.08)',
                        border: '1px solid rgba(34,197,94,.15)',
                      }}
                    >
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Box>
                          <CTypography cvariant="th">
                            Orders API
                          </CTypography>

                          <CTypography cvariant="c">
                            Healthy
                          </CTypography>
                        </Box>

                        <Box textAlign="right">
                          <CTypography cvariant="th">
                            92 ms
                          </CTypography>

                          <CTypography cvariant="c">
                            US • EU • SG
                          </CTypography>
                        </Box>
                      </Stack>
                    </Paper>

                    <Paper
                      elevation={0}
                      sx={{
                        p: 2,
                        borderRadius: '14px',
                        bgcolor: 'rgba(239,68,68,.08)',
                        border: '1px solid rgba(239,68,68,.15)',
                      }}
                    >
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Box>
                          <CTypography cvariant="th">
                            Payments API
                          </CTypography>

                          <CTypography cvariant="c">
                            Timeout
                          </CTypography>
                        </Box>

                        <Box textAlign="right">
                          <CTypography cvariant="th">
                            5.0 s
                          </CTypography>

                          <CTypography cvariant="c">
                            Incident Open
                          </CTypography>
                        </Box>
                      </Stack>
                    </Paper>

                    <Divider sx={{ my: 1 }} />

                    <Grid container spacing={2}>
                      <Grid item xs={4}>
                        <Paper
                          elevation={0}
                          sx={{
                            p: 2,
                            borderRadius: '12px',
                            textAlign: 'center',
                          }}
                        >
                          <CTypography cvariant="th">
                            24
                          </CTypography>

                          <CTypography cvariant="c">
                            Endpoints
                          </CTypography>
                        </Paper>
                      </Grid>

                      <Grid item xs={4}>
                        <Paper
                          elevation={0}
                          sx={{
                            p: 2,
                            borderRadius: '12px',
                            textAlign: 'center',
                          }}
                        >
                          <CTypography cvariant="th">
                            99.98%
                          </CTypography>

                          <CTypography cvariant="c">
                            Uptime
                          </CTypography>
                        </Paper>
                      </Grid>

                      <Grid item xs={4}>
                        <Paper
                          elevation={0}
                          sx={{
                            p: 2,
                            borderRadius: '12px',
                            textAlign: 'center',
                          }}
                        >
                          <CTypography cvariant="th">
                            132 ms
                          </CTypography>

                          <CTypography cvariant="c">
                            Avg Latency
                          </CTypography>
                        </Paper>
                      </Grid>
                    </Grid>

                  </Stack>
                </CardContent>
              </GlassCard>

            </Grid>

          </Grid>

        </Container>
      </Box>
    </Box>
  )
}