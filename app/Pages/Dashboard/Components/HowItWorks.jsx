import React, { useState } from 'react'
import Link from 'next/link'

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
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

export default function HowItWorks() {
  const [expandedFAQ, setExpandedFAQ] = useState(null)

  return (
    <Box display="flex" flexDirection="column">
      {/* ===================== HOW IT WORKS ===================== */}
      <Container
        maxWidth="lg"
        sx={{
          py: 12,
        }}
      >
        <Box
          textAlign="center"
          mb={10}
        >
          <CTypography cvariant="mh">
            Get Started in Under One Minute
          </CTypography>

          <CTypography
            cvariant="mhd"
            sx={{
              maxWidth: 700,
              mx: 'auto',
              mt: 2,
            }}
          >
            From adding your first endpoint to receiving alerts, everything takes just
            a few clicks.
          </CTypography>
        </Box>

        {/* STEP 1 */}

        <Grid
          container
          spacing={8}
          alignItems="center"
          sx={{
            mb: 16,
          }}
        >
          {/* LEFT */}

          <Grid
            item
            xs={12}
            md={5}
          >
            <Chip
              label="STEP 1"
              sx={{
                mb: 3,
              }}
            />

            <CTypography
              cvariant="mh"
              gutterBottom
            >
              Add Your First Endpoint
            </CTypography>

            <CTypography
              cvariant="mhd"
              sx={{
                mb: 4,
              }}
            >
              Paste your API URL, choose a monitoring interval, and optionally add
              authentication headers. We'll handle the rest.
            </CTypography>

            <Stack spacing={3}>

              <Stack
                direction="row"
                spacing={2}
                alignItems="center"
              >
                <CheckCircleRoundedIcon
                  color="success"
                />

                <CTypography cvariant="c">
                  HTTP & HTTPS Endpoints
                </CTypography>
              </Stack>

              <Stack
                direction="row"
                spacing={2}
                alignItems="center"
              >
                <CheckCircleRoundedIcon
                  color="success"
                />

                <CTypography cvariant="c">
                  API Keys & Bearer Tokens
                </CTypography>
              </Stack>

              <Stack
                direction="row"
                spacing={2}
                alignItems="center"
              >
                <CheckCircleRoundedIcon
                  color="success"
                />

                <CTypography cvariant="c">
                  Configure checks from 1 minute
                </CTypography>
              </Stack>

            </Stack>

          </Grid>

          {/* RIGHT */}

          <Grid
            item
            xs={12}
            md={7}
          >
            <GlassCard>

              <CardContent
                sx={{
                  p: 5,
                }}
              >

                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  mb={4}
                >
                  <CTypography cvariant="th">
                    Create Endpoint
                  </CTypography>

                  <Chip
                    size="small"
                    color="primary"
                    label="New"
                  />
                </Stack>

                <Stack spacing={3}>

                  <Box>

                    <CTypography
                      cvariant="c"
                      sx={{
                        mb: 1,
                      }}
                    >
                      Endpoint URL
                    </CTypography>

                    <Paper
                      elevation={0}
                      sx={{
                        p: 2,
                        borderRadius: 3,
                        bgcolor: 'rgba(255,255,255,.55)',
                        border: '1px solid var(--p-b-color)',
                      }}
                    >
                      <CTypography cvariant="c">
                        https://api.mycompany.com/health
                      </CTypography>
                    </Paper>

                  </Box>

                  <Grid container spacing={2}>

                    <Grid item xs={6}>

                      <Box>

                        <CTypography
                          cvariant="c"
                          sx={{
                            mb: 1,
                          }}
                        >
                          Method
                        </CTypography>

                        <Paper
                          elevation={0}
                          sx={{
                            p: 2,
                            borderRadius: 3,
                          }}
                        >
                          GET
                        </Paper>

                      </Box>

                    </Grid>

                    <Grid item xs={6}>

                      <Box>

                        <CTypography
                          cvariant="c"
                          sx={{
                            mb: 1,
                          }}
                        >
                          Interval
                        </CTypography>

                        <Paper
                          elevation={0}
                          sx={{
                            p: 2,
                            borderRadius: 3,
                          }}
                        >
                          Every 1 Minute
                        </Paper>

                      </Box>

                    </Grid>

                  </Grid>

                  <Box>

                    <CTypography
                      cvariant="c"
                      sx={{
                        mb: 1,
                      }}
                    >
                      Authentication
                    </CTypography>

                    <Paper
                      elevation={0}
                      sx={{
                        p: 2,
                        borderRadius: 3,
                      }}
                    >
                      Bearer ••••••••••••••••••
                    </Paper>

                  </Box>

                  <Divider />

                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Stack
                      direction="row"
                      spacing={1}
                    >
                      <Chip
                        size="small"
                        label="US"
                        color="success"
                      />

                      <Chip
                        size="small"
                        label="EU"
                        color="success"
                      />

                      <Chip
                        size="small"
                        label="Singapore"
                        color="success"
                      />
                    </Stack>

                    <CButton cvariant='s' label="Add Endpoint"/>

                  </Stack>

                </Stack>

              </CardContent>

            </GlassCard>

          </Grid>

        </Grid>
        {/* ===================== STEP 2 ===================== */}

        <Grid
          container
          spacing={8}
          alignItems="center"
          sx={{
            mb: 16,
          }}
        >

          {/* MOCK UI */}

          <Grid
            item
            xs={12}
            md={7}
          >

            <GlassCard>

              <CardContent
                sx={{
                  p: 5,
                }}
              >

                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  mb={4}
                >

                  <CTypography cvariant="th">
                    Live Monitoring
                  </CTypography>

                  <Chip
                    color="success"
                    size="small"
                    label="Healthy"
                  />

                </Stack>

                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    mb: 3,
                    borderRadius: 4,
                    bgcolor: "rgba(34,197,94,.08)",
                    border: "1px solid rgba(34,197,94,.15)"
                  }}
                >

                  <Stack
                    direction="row"
                    justifyContent="space-between"
                  >

                    <Box>

                      <CTypography cvariant="th">
                        https://api.mycompany.com
                      </CTypography>

                      <CTypography cvariant="c">
                        Last Checked 12 seconds ago
                      </CTypography>

                    </Box>

                    <CTypography cvariant="th">
                      99.98%
                    </CTypography>

                  </Stack>

                </Paper>

                <Stack spacing={2}>

                  {
                    [
                      {
                        region: "🇺🇸  US East",
                        latency: "118 ms"
                      },
                      {
                        region: "🇪🇺  Europe",
                        latency: "126 ms"
                      },
                      {
                        region: "🇸🇬  Singapore",
                        latency: "171 ms"
                      }
                    ].map(region => (

                      <Paper
                        key={region.region}
                        elevation={0}
                        sx={{
                          p: 2.5,
                          borderRadius: 3,
                          border: "1px solid var(--p-b-color)"
                        }}
                      >

                        <Stack
                          direction="row"
                          justifyContent="space-between"
                          alignItems="center"
                        >

                          <Stack
                            direction="row"
                            spacing={2}
                            alignItems="center"
                          >

                            <CheckCircleRoundedIcon
                              color="success"
                            />

                            <Box>

                              <CTypography cvariant="th">
                                {region.region}
                              </CTypography>

                              <CTypography cvariant="c">
                                Healthy
                              </CTypography>

                            </Box>

                          </Stack>

                          <CTypography cvariant="th">
                            {region.latency}
                          </CTypography>

                        </Stack>

                      </Paper>

                    ))
                  }

                </Stack>

                <Divider sx={{ my: 4 }} />

                <Grid
                  container
                  spacing={2}
                >

                  <Grid item xs={4}>

                    <Paper
                      elevation={0}
                      sx={{
                        p: 2,
                        borderRadius: 3,
                        textAlign: "center"
                      }}
                    >

                      <CTypography cvariant="mh">
                        24
                      </CTypography>

                      <CTypography cvariant="c">
                        Checks Today
                      </CTypography>

                    </Paper>

                  </Grid>

                  <Grid item xs={4}>

                    <Paper
                      elevation={0}
                      sx={{
                        p: 2,
                        borderRadius: 3,
                        textAlign: "center"
                      }}
                    >

                      <CTypography cvariant="mh">
                        132 ms
                      </CTypography>

                      <CTypography cvariant="c">
                        Avg Latency
                      </CTypography>

                    </Paper>

                  </Grid>

                  <Grid item xs={4}>

                    <Paper
                      elevation={0}
                      sx={{
                        p: 2,
                        borderRadius: 3,
                        textAlign: "center"
                      }}
                    >

                      <CTypography cvariant="mh">
                        0
                      </CTypography>

                      <CTypography cvariant="c">
                        Failures
                      </CTypography>

                    </Paper>

                  </Grid>

                </Grid>

              </CardContent>

            </GlassCard>

          </Grid>

          {/* TEXT */}

          <Grid
            item
            xs={12}
            md={5}
          >

            <Chip
              label="STEP 2"
              sx={{
                mb: 3,
              }}
            />

            <CTypography
              cvariant="mh"
              gutterBottom
            >
              We Monitor From Around the World
            </CTypography>

            <CTypography
              cvariant="mhd"
              sx={{
                mb: 4,
              }}
            >
              Every minute, checks are executed from multiple regions so you can detect
              regional outages, increased latency, and intermittent failures before
              they impact your users.
            </CTypography>

            <Stack spacing={3}>

              <Stack
                direction="row"
                spacing={2}
              >
                <CheckCircleRoundedIcon color="success" />

                <CTypography cvariant="c">
                  Multi-region health checks
                </CTypography>

              </Stack>

              <Stack
                direction="row"
                spacing={2}
              >
                <CheckCircleRoundedIcon color="success" />

                <CTypography cvariant="c">
                  Real-time latency tracking
                </CTypography>

              </Stack>

              <Stack
                direction="row"
                spacing={2}
              >
                <CheckCircleRoundedIcon color="success" />

                <CTypography cvariant="c">
                  Historical uptime reporting
                </CTypography>

              </Stack>

            </Stack>

          </Grid>

        </Grid>
        {/* ===================== STEP 3 ===================== */}
        <Grid
          container
          spacing={8}
          alignItems="center"
        >

          {/* LEFT */}

          <Grid
            item
            xs={12}
            md={5}
          >

            <Chip
              label="STEP 3"
              sx={{
                mb: 3,
              }}
            />

            <CTypography
              cvariant="mh"
              gutterBottom
            >
              Get Alerted Before Your Customers
            </CTypography>

            <CTypography
              cvariant="mhd"
              sx={{
                mb: 4,
              }}
            >
              When an endpoint fails, alerts are sent immediately. Follow the incident
              from detection to recovery with a complete timeline and notification
              history.
            </CTypography>

            <Stack spacing={3}>

              <Stack
                direction="row"
                spacing={2}
                alignItems="center"
              >
                <CheckCircleRoundedIcon color="success" />

                <CTypography cvariant="c">
                  Email notifications
                </CTypography>

              </Stack>

              <Stack
                direction="row"
                spacing={2}
                alignItems="center"
              >
                <CheckCircleRoundedIcon color="success" />

                <CTypography cvariant="c">
                  Slack integration
                </CTypography>

              </Stack>

              <Stack
                direction="row"
                spacing={2}
                alignItems="center"
              >
                <CheckCircleRoundedIcon color="success" />

                <CTypography cvariant="c">
                  Complete incident timeline
                </CTypography>

              </Stack>

            </Stack>

          </Grid>

          {/* RIGHT */}

          <Grid
            item
            xs={12}
            md={7}
          >

            <GlassCard>

              <CardContent
                sx={{
                  p: 5,
                }}
              >

                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  mb={4}
                >

                  <CTypography cvariant="th">
                    Incident Timeline
                  </CTypography>

                  <Chip
                    color="error"
                    label="Resolved"
                    size="small"
                  />

                </Stack>

                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    mb: 4,
                    borderRadius: 4,
                    bgcolor: "rgba(239,68,68,.08)",
                    border: "1px solid rgba(239,68,68,.15)",
                  }}
                >

                  <Stack
                    direction="row"
                    justifyContent="space-between"
                  >

                    <Box>

                      <CTypography cvariant="th">
                        Payments API
                      </CTypography>

                      <CTypography cvariant="c">
                        https://api.mycompany.com/payments
                      </CTypography>

                    </Box>

                    <Box textAlign="right">

                      <CTypography cvariant="th">
                        2m 31s
                      </CTypography>

                      <CTypography cvariant="c">
                        Total Downtime
                      </CTypography>

                    </Box>

                  </Stack>

                </Paper>
                <Stack spacing={2}>
                  {
                    [
                      {
                        time: "10:24:11",
                        title: "Failure Detected",
                        subtitle: "HTTP 503 Service Unavailable"
                      },
                      {
                        time: "10:24:18",
                        title: "Email Notification Sent",
                        subtitle: "johndoe@example.com"
                      },
                      {
                        time: "10:24:19",
                        title: "Slack Notification Sent",
                        subtitle: "#backend-alerts"
                      },
                      {
                        time: "10:26:42",
                        title: "Endpoint Recovered",
                        subtitle: "HTTP 200 OK"
                      }
                    ].map((event, index) => (

                      <Stack
                        key={index}
                        direction="row"
                        spacing={3}
                        alignItems="flex-start"
                      >

                        <Box
                          sx={{
                            width: 72,
                            flexShrink: 0,
                          }}
                        >

                          <CTypography cvariant="c">
                            {event.time}
                          </CTypography>

                        </Box>

                        <Box
                          sx={{
                            width: 12,
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >

                          <Box
                            sx={{
                              width: 10,
                              height: 10,
                              mt: "6px",
                              borderRadius: "50%",
                              bgcolor:
                                index === 3
                                  ? "#22c55e"
                                  : "#ef4444",
                            }}
                          />

                        </Box>

                        <Paper
                          elevation={0}
                          sx={{
                            flex: 1,
                            p: 2,
                            borderRadius: 3,
                            border: "1px solid var(--p-b-color)",
                          }}
                        >

                          <CTypography cvariant="th">
                            {event.title}
                          </CTypography>

                          <CTypography cvariant="c">
                            {event.subtitle}
                          </CTypography>

                        </Paper>

                      </Stack>

                    ))
                  }

                </Stack>

                <Divider sx={{ my: 4 }} />

                <Grid
                  container
                  spacing={2}
                >

                  <Grid item xs={4}>

                    <Paper
                      elevation={0}
                      sx={{
                        p: 2,
                        borderRadius: 3,
                        textAlign: "center",
                      }}
                    >

                      <CTypography cvariant="mh">
                        7 sec
                      </CTypography>

                      <CTypography cvariant="c">
                        Detection
                      </CTypography>

                    </Paper>

                  </Grid>

                  <Grid item xs={4}>

                    <Paper
                      elevation={0}
                      sx={{
                        p: 2,
                        borderRadius: 3,
                        textAlign: "center",
                      }}
                    >

                      <CTypography cvariant="mh">
                        2
                      </CTypography>

                      <CTypography cvariant="c">
                        Notifications
                      </CTypography>

                    </Paper>

                  </Grid>

                  <Grid item xs={4}>

                    <Paper
                      elevation={0}
                      sx={{
                        p: 2,
                        borderRadius: 3,
                        textAlign: "center",
                      }}
                    >

                      <CTypography cvariant="mh">
                        100%
                      </CTypography>

                      <CTypography cvariant="c">
                        Recovery
                      </CTypography>

                    </Paper>

                  </Grid>

                </Grid>

              </CardContent>

            </GlassCard>

          </Grid>

        </Grid>
      </Container>
    </Box>
  )
}