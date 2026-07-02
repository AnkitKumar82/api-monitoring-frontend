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

import CTypography from '../../Components/CTypography'
import CTextField from '../../Components/CTextField'

const PRICING = [
  {
    name: 'Free',
    price: '$0',
    endpoints: 5,
    interval: '5 min',
    history: '7 days',
    features: [
      '5 Endpoints',
      '5 Minute Checks',
      'Email Alerts',
      '7 Days History',
    ],
  },
  {
    name: 'Pro',
    price: '$49',
    popular: true,
    endpoints: 50,
    interval: '1 min',
    history: '90 days',
    features: [
      '50 Endpoints',
      '1 Minute Checks',
      'Slack Alerts',
      '90 Days History',
      'SSL Monitoring',
    ],
  },
  {
    name: 'Business',
    price: '$199',
    endpoints: 'Unlimited',
    interval: '30 sec',
    history: 'Unlimited',
    features: [
      'Unlimited Endpoints',
      'Multi Region Checks',
      'Teams',
      'Status Pages',
      'Priority Support',
    ]
  }
]

const FAQ = [
  {
    question: 'How often do you check my APIs?',
    answer:
      'Every minute on paid plans and every five minutes on the free plan.',
  },
  {
    question: 'Do I need to install an agent?',
    answer:
      'No. Just provide your endpoint URL and we will start monitoring immediately.',
  },
  {
    question: 'Can I monitor authenticated APIs?',
    answer:
      'Yes. API Keys, Bearer Tokens and custom headers will be supported.',
  },
  {
    question: 'Which regions are supported?',
    answer:
      'US East, Europe and Singapore initially. More regions will be added based on demand.',
  },
  {
    question: 'When will beta launch?',
    answer:
      'Early access users will receive invitations before the public launch.',
  },
]

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

export default function Main() {
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
                direction={{
                  xs: 'column',
                  sm: 'row',
                }}
                spacing={2}
              >
                <Button
                  size="large"
                  variant="contained"
                  sx={{
                    textTransform: 'none',
                    borderRadius: '12px',
                    px: 4,
                  }}
                >
                  Join Waitlist
                </Button>
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

      {/* ===================== FEATURES ===================== */}
      <Container
        maxWidth="lg"
        sx={{
          py: 12
        }}
      >
        <Box
          textAlign="center"
          mb={8}
        >
          <CTypography cvariant="mh" gutterBottom>
            Everything You Need.
          </CTypography>

          <CTypography
            cvariant="mhd"
            sx={{
              maxWidth: 720,
              mx: "auto",
            }}
          >
            Built specifically for backend engineers. Powerful monitoring without the
            complexity of enterprise observability platforms.
          </CTypography>
        </Box>

        <Grid container spacing={3}>

          {/* ================================================= */}
          {/* GLOBAL MONITORING */}
          {/* ================================================= */}

          <Grid
            item
            xs={12}
            md={8}
          >

            <GlassCard
              sx={{
                height: "100%",
              }}
            >

              <CardContent
                sx={{
                  p: 4,
                }}
              >

                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  mb={4}
                >

                  <Stack
                    direction="row"
                    spacing={2}
                    alignItems="center"
                  >

                    <Box
                      sx={{
                        width: 56,
                        height: 56,
                        borderRadius: 3,
                        bgcolor: "rgba(59,130,246,.12)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <PublicRoundedIcon
                        sx={{
                          color: "#3B82F6",
                          fontSize: 32,
                        }}
                      />
                    </Box>

                    <Box>

                      <CTypography cvariant="th">
                        Global Monitoring
                      </CTypography>

                      <CTypography cvariant="c">
                        Multi-region health checks every minute
                      </CTypography>

                    </Box>

                  </Stack>

                  <Chip
                    color="success"
                    size="small"
                    label="LIVE"
                  />

                </Stack>

                <Grid container spacing={2}>

                  {
                    [
                      {
                        region: "🇺🇸 US East",
                        latency: "118 ms",
                      },
                      {
                        region: "🇪🇺 Europe",
                        latency: "129 ms",
                      },
                      {
                        region: "🇸🇬 Singapore",
                        latency: "171 ms",
                      },
                    ].map((item) => (

                      <Grid
                        item
                        xs={12}
                        md={4}
                        key={item.region}
                      >

                        <Paper
                          elevation={0}
                          sx={{
                            p: 3,
                            borderRadius: 3,
                            border: "1px solid rgba(59,130,246,.18)",
                          }}
                        >

                          <Stack
                            direction="row"
                            justifyContent="space-between"
                            mb={2}
                          >

                            <CTypography cvariant="th">
                              {item.region}
                            </CTypography>

                            <CheckCircleRoundedIcon
                              sx={{
                                color: "#22C55E",
                              }}
                            />

                          </Stack>

                          <CTypography
                            cvariant="mh"
                            sx={{
                              color: "#3B82F6",
                            }}
                          >
                            {item.latency}
                          </CTypography>

                          <LinearProgress
                            variant="determinate"
                            value={90}
                            sx={{
                              mt: 2,
                              height: 8,
                              borderRadius: 10,
                            }}
                          />

                          <CTypography
                            cvariant="c"
                            sx={{
                              mt: 1,
                            }}
                          >
                            Healthy
                          </CTypography>

                        </Paper>

                      </Grid>

                    ))
                  }

                </Grid>

                <Paper
                  elevation={0}
                  sx={{
                    mt: 3,
                    p: 3,
                    borderRadius: 3,
                  }}
                >

                  <Stack
                    direction="row"
                    justifyContent="space-between"
                  >

                    <Box>

                      <CTypography cvariant="c">
                        Average Latency
                      </CTypography>

                      <CTypography cvariant="mh">
                        139 ms
                      </CTypography>

                    </Box>

                    <Box textAlign="right">

                      <CTypography cvariant="c">
                        Uptime
                      </CTypography>

                      <CTypography
                        cvariant="mh"
                        sx={{
                          color: "#22C55E",
                        }}
                      >
                        99.98%
                      </CTypography>

                    </Box>

                  </Stack>

                </Paper>

              </CardContent>

            </GlassCard>

          </Grid>

          {/* ================================================= */}
          {/* SSL */}
          {/* ================================================= */}

          <Grid
            item
            xs={12}
            md={4}
          >

            <GlassCard
              sx={{
                height: "100%",
              }}
            >

              <CardContent
                sx={{
                  p: 4,
                  height: "100%",
                }}
              >

                <Stack
                  direction="row"
                  spacing={2}
                  alignItems="center"
                  mb={4}
                >

                  <Box
                    sx={{
                      width: 52,
                      height: 52,
                      borderRadius: 3,
                      bgcolor: "rgba(245,158,11,.12)",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >

                    <SecurityRoundedIcon
                      sx={{
                        color: "#F59E0B",
                      }}
                    />

                  </Box>

                  <Box>

                    <CTypography cvariant="th">
                      SSL Monitoring
                    </CTypography>

                    <CTypography cvariant="c">
                      Never miss certificate expiry
                    </CTypography>

                  </Box>

                </Stack>

                <Stack spacing={2}>

                  <Paper
                    elevation={0}
                    sx={{
                      p: 2.5,
                      borderRadius: 3,
                    }}
                  >

                    <CTypography cvariant="th">
                      api.company.com
                    </CTypography>

                    <CTypography
                      cvariant="mh"
                      sx={{
                        color: "#F59E0B",
                      }}
                    >
                      24 Days
                    </CTypography>

                    <CTypography cvariant="c">
                      Until Expiration
                    </CTypography>

                  </Paper>

                  <Paper
                    elevation={0}
                    sx={{
                      p: 2.5,
                      borderRadius: 3,
                    }}
                  >

                    <CTypography cvariant="th">
                      auth.company.com
                    </CTypography>

                    <CTypography
                      cvariant="mh"
                      sx={{
                        color: "#22C55E",
                      }}
                    >
                      127 Days
                    </CTypography>

                    <CTypography cvariant="c">
                      Healthy
                    </CTypography>

                  </Paper>

                </Stack>

              </CardContent>

            </GlassCard>

          </Grid>
          
          {/* ================================================= */}
          {/* LATENCY ANALYTICS */}
          {/* ================================================= */}

          <Grid
            item
            xs={12}
            md={6}
          >
            <GlassCard
              sx={{
                height: "100%",
              }}
            >
              <CardContent sx={{ p: 4 }}>

                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  mb={4}
                >
                  <Stack
                    direction="row"
                    spacing={2}
                    alignItems="center"
                  >
                    <Box
                      sx={{
                        width: 56,
                        height: 56,
                        borderRadius: 3,
                        bgcolor: "rgba(34,197,94,.12)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <SpeedRoundedIcon
                        sx={{
                          color: "#22C55E",
                          fontSize: 32,
                        }}
                      />
                    </Box>

                    <Box>
                      <CTypography cvariant="th">
                        Latency Analytics
                      </CTypography>

                      <CTypography cvariant="c">
                        Performance trends over time
                      </CTypography>
                    </Box>
                  </Stack>

                  <Chip
                    label="24H"
                    color="success"
                    size="small"
                  />
                </Stack>

                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    mb: 3,
                  }}
                >

                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Box>

                      <CTypography cvariant="c">
                        Average Response
                      </CTypography>

                      <CTypography
                        cvariant="mh"
                        sx={{
                          color: "#22C55E",
                        }}
                      >
                        124 ms
                      </CTypography>

                    </Box>

                    <Chip
                      label="-18ms Today"
                      color="success"
                      size="small"
                    />

                  </Stack>

                </Paper>

                <Box
                  sx={{
                    mt: 4,
                    mb: 2,
                  }}
                >

                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="flex-end"
                    sx={{
                      height: 140,
                    }}
                  >
                    {[35,60,48,72,95,80,58,45,66,88,76,52].map((height,index)=>(
                      <Box
                        key={index}
                        sx={{
                          width: "6%",
                          height: `${height}%`,
                          borderRadius: "10px 10px 0 0",
                          bgcolor:
                            height > 85
                              ? "#F59E0B"
                              : "#22C55E",
                          transition: ".25s",
                          "&:hover":{
                            transform:"scaleY(1.08)",
                          }
                        }}
                      />
                    ))}
                  </Stack>

                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    mt={1}
                  >
                    <CTypography cvariant="c">12 AM</CTypography>
                    <CTypography cvariant="c">6 AM</CTypography>
                    <CTypography cvariant="c">12 PM</CTypography>
                    <CTypography cvariant="c">6 PM</CTypography>
                    <CTypography cvariant="c">Now</CTypography>
                  </Stack>

                </Box>

              </CardContent>
            </GlassCard>
          </Grid>

          {/* ================================================= */}
          {/* RESPONSE VALIDATION */}
          {/* ================================================= */}

          <Grid
            item
            xs={12}
            md={3}
          >
            <GlassCard
              sx={{
                height: "100%",
              }}
            >
              <CardContent sx={{ p: 4 }}>

                <Stack
                  direction="row"
                  spacing={2}
                  alignItems="center"
                  mb={4}
                >
                  <Box
                    sx={{
                      width: 52,
                      height: 52,
                      borderRadius: 3,
                      bgcolor: "rgba(139,92,246,.12)",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <VerifiedRoundedIcon
                      sx={{
                        color: "#8B5CF6",
                      }}
                    />
                  </Box>

                  <Box>
                    <CTypography cvariant="th">
                      Validation
                    </CTypography>

                    <CTypography cvariant="c">
                      Verify responses
                    </CTypography>
                  </Box>

                </Stack>

                <Stack spacing={2}>

                  {[
                    "HTTP 200",
                    "JSON Schema",
                    "Auth Header",
                    "Response Time",
                    "Content-Type"
                  ].map(item=>(
                    <Paper
                      key={item}
                      elevation={0}
                      sx={{
                        p:2,
                        borderRadius:2,
                      }}
                    >
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <CTypography cvariant="c">
                          {item}
                        </CTypography>

                        <CheckCircleRoundedIcon
                          sx={{
                            color:"#22C55E",
                            fontSize:18
                          }}
                        />
                      </Stack>
                    </Paper>
                  ))}

                </Stack>

              </CardContent>
            </GlassCard>
          </Grid>

          {/* ================================================= */}
          {/* ALERTS */}
          {/* ================================================= */}

          <Grid
            item
            xs={12}
            md={3}
          >
            <GlassCard
              sx={{
                height:"100%"
              }}
            >
              <CardContent sx={{p:4}}>

                <Stack
                  direction="row"
                  spacing={2}
                  alignItems="center"
                  mb={4}
                >

                  <Box
                    sx={{
                      width:52,
                      height:52,
                      borderRadius:3,
                      bgcolor:"rgba(239,68,68,.12)",
                      display:"flex",
                      justifyContent:"center",
                      alignItems:"center",
                    }}
                  >

                    <NotificationsActiveRoundedIcon
                      sx={{
                        color:"#EF4444"
                      }}
                    />

                  </Box>

                  <Box>

                    <CTypography cvariant="th">
                      Instant Alerts
                    </CTypography>

                    <CTypography cvariant="c">
                      Stay informed
                    </CTypography>

                  </Box>

                </Stack>

                <Stack spacing={2}>

                  <Paper
                    elevation={0}
                    sx={{
                      p:2.5,
                      borderRadius:3,
                      borderLeft:"4px solid #EF4444"
                    }}
                  >
                    <CTypography cvariant="th">
                      Payments API
                    </CTypography>

                    <CTypography cvariant="c">
                      Timeout detected
                    </CTypography>

                    <Chip
                      label="Email Sent"
                      color="error"
                      size="small"
                      sx={{mt:2}}
                    />
                  </Paper>

                  <Paper
                    elevation={0}
                    sx={{
                      p:2.5,
                      borderRadius:3,
                      borderLeft:"4px solid #22C55E"
                    }}
                  >
                    <CTypography cvariant="th">
                      Recovery
                    </CTypography>

                    <CTypography cvariant="c">
                      Service healthy again
                    </CTypography>

                    <Chip
                      label="Slack Delivered"
                      color="success"
                      size="small"
                      sx={{mt:2}}
                    />
                  </Paper>

                </Stack>

              </CardContent>
            </GlassCard>
          </Grid>
        </Grid>
      </Container>
      
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

                    <Button
                      variant="contained"
                      sx={{
                        textTransform: 'none',
                        borderRadius: 2,
                      }}
                    >
                      Add Endpoint
                    </Button>

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
      

      {/* ===================== PRICING ===================== */}
      <Container
        maxWidth="lg"
        sx={{
          py: 12,
        }}
      >

        {/* Header */}

        <Box
          textAlign="center"
          mb={7}
        >

          <Chip
            label="Pricing"
            color="primary"
            sx={{
              mb: 3,
            }}
          />

          <CTypography
            cvariant="mh"
            gutterBottom
          >
            Simple Pricing That Scales With You
          </CTypography>

          <CTypography
            cvariant="mhd"
            sx={{
              maxWidth: 720,
              mx: "auto",
              mb: 5,
            }}
          >
            Start monitoring your APIs for free. Upgrade only when your team
            needs faster checks, more endpoints, and advanced integrations.
          </CTypography>

          {/* Billing Toggle */}

          <Paper
            elevation={0}
            sx={{
              display: "inline-flex",
              p: .75,
              borderRadius: 999,
              border: "1px solid var(--p-b-color)",
            }}
          >

            <Button
              variant="contained"
              sx={{
                textTransform: "none",
                borderRadius: 999,
              }}
            >
              Monthly
            </Button>

            <Button
              sx={{
                ml: 1,
                textTransform: "none",
                borderRadius: 999,
              }}
            >
              Yearly

              <Chip
                label="Save 20%"
                size="small"
                color="success"
                sx={{
                  ml: 1,
                }}
              />

            </Button>

          </Paper>

        </Box>

        {/* Pricing Cards */}

        <Grid
          container
          spacing={4}
        >

          {PRICING.map((plan) => (

            <Grid
              item
              xs={12}
              md={4}
              key={plan.name}
            >

              <GlassCard
                style={{
                  position: "relative",
                  height: "100%",
                  overflow: "hidden",

                  ...(plan.popular && {
                    border: "2px solid var(--p-fg-color)",
                    transform: "scale(1.03)",
                    background: "linear-gradient(135deg, rgba(59,130,246,.08), rgba(34,197,94,.08))",
                    border: "1px solid rgba(59,130,246,.15)"
                  })
                }}
              >

                {plan.popular && (

                  <Chip
                    label="⭐ Most Popular"
                    color="primary"
                    sx={{
                      position: "absolute",
                      top: 20,
                      right: 20,
                    }}
                  />

                )}

                <CardContent
                  sx={{
                    p: 4,
                  }}
                >

                  {/* Plan */}

                  <CTypography
                    cvariant="th"
                  >
                    {plan.name}
                  </CTypography>

                  <CTypography
                    cvariant="c"
                    sx={{
                      mt: 1,
                      mb: 3,
                    }}
                  >
                    {plan.subtitle}
                  </CTypography>

                  <Stack
                    direction="row"
                    alignItems="flex-end"
                    spacing={1}
                  >

                    <CTypography
                      cvariant="mh"
                    >
                      {plan.price}
                    </CTypography>

                    <CTypography
                      cvariant="c"
                      sx={{
                        mb: .8,
                      }}
                    >
                      /month
                    </CTypography>

                  </Stack>

                  <CTypography
                    cvariant="c"
                    sx={{
                      mt: 2,
                      mb: 4,
                    }}
                  >
                    {plan.description}
                  </CTypography>

                  {/* Stats Row */}

                  <Grid
                    container
                    spacing={2}
                    sx={{
                      mb: 4,
                    }}
                  >

                    <Grid item xs={4}>

                      <Paper
                        elevation={0}
                        sx={{
                          p: 2,
                          bgcolor: 'transparent',
                          textAlign: "center",
                          borderRadius: 3,
                        }}
                      >

                        <CTypography cvariant="th">
                          {plan.endpoints}
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
                          bgcolor: 'transparent',
                          textAlign: "center",
                          borderRadius: 3,
                        }}
                      >

                        <CTypography cvariant="th">
                          {plan.interval}
                        </CTypography>

                        <CTypography cvariant="c">
                          Checks
                        </CTypography>

                      </Paper>

                    </Grid>

                    <Grid item xs={4}>

                      <Paper
                        elevation={0}
                        sx={{
                          p: 2,
                          bgcolor: 'transparent',
                          textAlign: "center",
                          borderRadius: 3,
                        }}
                      >

                        <CTypography cvariant="th">
                          {plan.history}
                        </CTypography>

                        <CTypography cvariant="c">
                          History
                        </CTypography>

                      </Paper>

                    </Grid>

                  </Grid>
                  {/* Included Features */}

                  <CTypography
                    cvariant="th"
                    sx={{
                      mb: 2,
                    }}
                  >
                    Included
                  </CTypography>

                  <Stack
                    spacing={1.75}
                    sx={{
                      mb: 4,
                    }}
                  >

                    {plan.features.map((feature) => (

                      <Stack
                        key={feature}
                        direction="row"
                        spacing={1.5}
                        alignItems="center"
                      >

                        <CheckCircleRoundedIcon
                          sx={{
                            color: "#22C55E",
                            fontSize: 20,
                          }}
                        />

                        <CTypography cvariant="c">
                          {feature}
                        </CTypography>

                      </Stack>

                    ))}

                  </Stack>

                  {/* Upgrade Features */}

                  {plan.unavailable?.length > 0 && (
                    <>

                      <Divider
                        sx={{
                          my: 3,
                        }}
                      />

                      <CTypography
                        cvariant="th"
                        sx={{
                          mb: 2,
                          opacity: .75,
                        }}
                      >
                        Upgrade for
                      </CTypography>

                      <Stack spacing={1.75}>

                        {plan.unavailable.map((feature) => (

                          <Stack
                            key={feature}
                            direction="row"
                            spacing={1.5}
                            alignItems="center"
                            sx={{
                              opacity: .45,
                            }}
                          >

                            <CancelRoundedIcon
                              sx={{
                                fontSize: 20,
                              }}
                            />

                            <CTypography cvariant="c">
                              {feature}
                            </CTypography>

                          </Stack>

                        ))}

                      </Stack>

                    </>
                  )}

                  {/* CTA */}

                  <Button
                    fullWidth
                    size="large"
                    variant={
                      plan.popular
                        ? "contained"
                        : "outlined"
                    }
                    sx={{
                      mt: 5,
                      py: 1.5,
                      borderRadius: 3,
                      textTransform: "none",
                    }}
                  >
                    Join Waitlist
                  </Button>

                  <CTypography
                    cvariant="c"
                    sx={{
                      textAlign: "center",
                      mt: 2,
                      opacity: .7,
                    }}
                  >
                    No credit card required
                  </CTypography>

                </CardContent>

              </GlassCard>

            </Grid>

          ))}

        </Grid>
      {/* ===================================================== */}
      {/* FEATURE COMPARISON */}
      {/* ===================================================== */}

      <Box
        sx={{
          mt: 10,
        }}
      >

        <Box
          textAlign="center"
          mb={5}
        >

          <CTypography
            cvariant="mh"
            gutterBottom
          >
            Compare Plans
          </CTypography>

          <CTypography cvariant="mhd">
            Everything included in each plan at a glance.
          </CTypography>

        </Box>

        <GlassCard>

          <CardContent
            sx={{
              p: 0,
            }}
          >

            <Table>

              <TableHead>

                <TableRow>

                  <TableCell
                    sx={{
                      fontWeight: 700,
                    }}
                  >
                    Feature
                  </TableCell>

                  <TableCell align="center">
                    <CTypography cvariant="th">
                      Free
                    </CTypography>
                  </TableCell>

                  <TableCell
                    align="center"
                    sx={{
                      bgcolor: "rgba(59,130,246,.05)",
                    }}
                  >
                    <Stack
                      spacing={1}
                      alignItems="center"
                    >

                      <CTypography cvariant="th">
                        Pro
                      </CTypography>

                      <Chip
                        label="Most Popular"
                        size="small"
                        color="primary"
                      />

                    </Stack>

                  </TableCell>

                  <TableCell align="center">
                    <CTypography cvariant="th">
                      Business
                    </CTypography>
                  </TableCell>

                </TableRow>

              </TableHead>

              <TableBody>

                {[
                  ["API Endpoints","5","50","Unlimited"],
                  ["Check Interval","5 min","1 min","30 sec"],
                  ["History","7 Days","90 Days","Unlimited"],
                  ["Monitoring Regions","1","3","All"],
                  ["Email Alerts","✓","✓","✓"],
                  ["Slack Alerts","—","✓","✓"],
                  ["SSL Monitoring","—","✓","✓"],
                  ["Public Status Pages","—","✓","✓"],
                  ["Team Members","—","—","Unlimited"],
                  ["REST APIs","✓","✓","✓"],
                  ["GraphQL","✓","✓","✓"],
                  ["Custom Headers","✓","✓","✓"],
                  ["Priority Support","—","—","✓"],
                  ["API Access","—","—","✓"],
                ].map((row)=>(
                  <TableRow
                    key={row[0]}
                    hover
                  >

                    <TableCell>
                      <CTypography cvariant="c">
                        {row[0]}
                      </CTypography>
                    </TableCell>

                    {[1,2,3].map((i)=>(

                      <TableCell
                        key={i}
                        align="center"
                        sx={{
                          ...(i===2 && {
                            bgcolor:"rgba(59,130,246,.03)"
                          })
                        }}
                      >

                        <CTypography
                          cvariant="c"
                          sx={{
                            color:
                              row[i] === "✓"
                                ? "#22C55E"
                                : row[i] === "—"
                                ? "text.disabled"
                                : "inherit",
                            fontWeight:
                              row[i] === "✓"
                                ? 600
                                : 400,
                          }}
                        >
                          {row[i]}
                        </CTypography>

                      </TableCell>

                    ))}

                  </TableRow>
                ))}

              </TableBody>

            </Table>

          </CardContent>

        </GlassCard>

      </Box>
      {/* ===================================================== */}
      {/* PRICING FAQ / REASSURANCE */}
      {/* ===================================================== */}

      <Box
        sx={{
          mt: 10,
        }}
      >

        <Grid
          container
          spacing={3}
        >

          <Grid
            item
            xs={12}
            md={4}
          >

            <Paper
              elevation={0}
              sx={{
                p: 4,
                borderRadius: 4,
                height: "100%",
                textAlign: "center",
              }}
            >

              <BoltRoundedIcon
                sx={{
                  fontSize: 42,
                  color: "#3B82F6",
                  mb: 2,
                }}
              />

              <CTypography
                cvariant="th"
                gutterBottom
              >
                Setup in Minutes
              </CTypography>

              <CTypography cvariant="c">
                Add an endpoint, choose an interval, and monitoring starts
                immediately. No agents or infrastructure required.
              </CTypography>

            </Paper>

          </Grid>

          <Grid
            item
            xs={12}
            md={4}
          >

            <Paper
              elevation={0}
              sx={{
                p: 4,
                borderRadius: 4,
                height: "100%",
                textAlign: "center",
              }}
            >

              <VerifiedRoundedIcon
                sx={{
                  fontSize: 42,
                  color: "#22C55E",
                  mb: 2,
                }}
              />

              <CTypography
                cvariant="th"
                gutterBottom
              >
                Cancel Anytime
              </CTypography>

              <CTypography cvariant="c">
                Upgrade or downgrade whenever your monitoring needs change.
                No long-term contracts or hidden fees.
              </CTypography>

            </Paper>

          </Grid>

          <Grid
            item
            xs={12}
            md={4}
          >

            <Paper
              elevation={0}
              sx={{
                p: 4,
                borderRadius: 4,
                height: "100%",
                textAlign: "center",
              }}
            >

              <SupportAgentRoundedIcon
                sx={{
                  fontSize: 42,
                  color: "#F59E0B",
                  mb: 2,
                }}
              />

              <CTypography
                cvariant="th"
                gutterBottom
              >
                Built for Developers
              </CTypography>

              <CTypography cvariant="c">
                REST APIs, GraphQL, authentication headers, JSON validation,
                SSL monitoring, and more—all in one place.
              </CTypography>

            </Paper>

          </Grid>

        </Grid>

        <Paper
          elevation={0}
          sx={{
            mt: 8,
            p: 5,
            borderRadius: 5,
            textAlign: "center",
            background:
              "linear-gradient(135deg, rgba(59,130,246,.08), rgba(34,197,94,.08))",
            border: "1px solid rgba(59,130,246,.15)",
          }}
        >

          <CTypography
            cvariant="mh"
            gutterBottom
          >
            Ready to Monitor Your APIs?
          </CTypography>

          <CTypography
            cvariant="mhd"
            sx={{
              maxWidth: 620,
              mx: "auto",
              mb: 4,
            }}
          >
            Join the early access waitlist and help shape the next generation of API monitoring.
          </CTypography>

          <Stack
            direction={{
              xs: "column",
              sm: "row",
            }}
            spacing={2}
            justifyContent="center"
          >
            <CTextField
              placeholder="Enter your work email"
              size="large"
              fullWidth
            />
            <Button
              variant="contained"
              size="large"
              disableRipple
              sx={{
                ml: "16px",
                textTransform: 'none',
                minWidth: 220,
                borderRadius: '12px',
                px: 5,
              }}
            >
              Join Waitlist
            </Button>

          </Stack>

        </Paper>

      </Box>
      </Container>

      {/* ===================== FAQ ===================== */}

      <Container
        maxWidth="lg"
        sx={{
          pb: 10,
        }}
      >

        <CTypography
          cvariant="mh"
          gutterBottom
        >
          Frequently Asked Questions
        </CTypography>

        <Box mt={4}>
          {FAQ.map((faq, index) => (
            <Box
              key={faq.question}
              sx={{
                borderBottom: '1px solid var(--b-color)',
              }}
            >
              <Accordion
                expanded={expandedFAQ === index}
                onChange={() =>
                  setExpandedFAQ(
                    expandedFAQ === index ? null : index
                  )
                }
                sx={{
                  boxShadow: 'none',
                }}
              >
                <AccordionSummary
                  sx={{
                    px: 0,
                  }}
                >
                  <Stack
                    direction="row"
                    alignItems="center"
                  >
                    {expandedFAQ === index ? (
                      <KeyboardArrowDownRoundedIcon
                        sx={{
                          mr: 1,
                          color: 'var(--p-fg-color)',
                        }}
                      />
                    ) : (
                      <KeyboardArrowRightRoundedIcon
                        sx={{
                          mr: 1,
                          color: 'var(--p-fg-color)',
                        }}
                      />
                    )}

                    <CTypography cvariant="th">
                      {faq.question}
                    </CTypography>

                  </Stack>
                </AccordionSummary>

                <AccordionDetails
                  sx={{
                    pl: 4,
                    pb: 3,
                  }}
                >
                  <CTypography>
                    {faq.answer}
                  </CTypography>
                </AccordionDetails>
              </Accordion>
            </Box>
          ))}
        </Box>

      </Container>
      
      {/* ===================== Footer ===================== */}
      <Box
        component="footer"
        sx={{
          mt: 6,
          py: 8,
          background:
              "linear-gradient(135deg, rgba(59,130,246,.08), rgba(34,197,94,.08))",
          border: "1px solid rgba(59,130,246,.15)",
        }}
      >
        <Container maxWidth="lg">

          <Grid
            container
            spacing={6}
          >

            {/* Brand */}

            <Grid
              item
              xs={12}
              md={4}
            >
              <CTypography
                cvariant="th"
                gutterBottom
              >
                API Sentinel
              </CTypography>

              <CTypography
                cvariant="c"
                sx={{
                  maxWidth: 340,
                  mb: 3,
                }}
              >
                Lightweight API monitoring for startups and backend engineers.
                Monitor globally, receive alerts instantly, and keep your
                customers happy.
              </CTypography>

              <Stack
                direction="row"
                spacing={1}
              >
                <Chip
                  size="small"
                  label="US"
                  variant="outlined"
                />

                <Chip
                  size="small"
                  label="Europe"
                  variant="outlined"
                />

                <Chip
                  size="small"
                  label="Singapore"
                  variant="outlined"
                />
              </Stack>
            </Grid>

            {/* Product */}

            <Grid
              item
              xs={6}
              md={2}
            >
              <CTypography
                cvariant="th"
                gutterBottom
              >
                Product
              </CTypography>

              <Stack spacing={1.5}>
                <Link
                  href="#features"
                  style={{
                    textDecoration: 'none',
                    color: 'inherit',
                  }}
                >
                  <CTypography cvariant="c">
                    Features
                  </CTypography>
                </Link>

                <Link
                  href="#pricing"
                  style={{
                    textDecoration: 'none',
                    color: 'inherit',
                  }}
                >
                  <CTypography cvariant="c">
                    Pricing
                  </CTypography>
                </Link>

                <Link
                  href="#faq"
                  style={{
                    textDecoration: 'none',
                    color: 'inherit',
                  }}
                >
                  <CTypography cvariant="c">
                    FAQ
                  </CTypography>
                </Link>

                <Link
                  href="/roadmap"
                  style={{
                    textDecoration: 'none',
                    color: 'inherit',
                  }}
                >
                  <CTypography cvariant="c">
                    Roadmap
                  </CTypography>
                </Link>
              </Stack>
            </Grid>

            {/* Resources */}

            <Grid
              item
              xs={6}
              md={2}
            >
              <CTypography
                cvariant="th"
                gutterBottom
              >
                Resources
              </CTypography>

              <Stack spacing={1.5}>
                <Link
                  href="/docs"
                  style={{
                    textDecoration: 'none',
                    color: 'inherit',
                  }}
                >
                  <CTypography cvariant="c">
                    Documentation
                  </CTypography>
                </Link>

                <Link
                  href="/blog"
                  style={{
                    textDecoration: 'none',
                    color: 'inherit',
                  }}
                >
                  <CTypography cvariant="c">
                    Blog
                  </CTypography>
                </Link>

                <Link
                  href="/status"
                  style={{
                    textDecoration: 'none',
                    color: 'inherit',
                  }}
                >
                  <CTypography cvariant="c">
                    Status
                  </CTypography>
                </Link>

                <Link
                  href="/contact"
                  style={{
                    textDecoration: 'none',
                    color: 'inherit',
                  }}
                >
                  <CTypography cvariant="c">
                    Contact
                  </CTypography>
                </Link>
              </Stack>
            </Grid>

            {/* Newsletter */}

            <Grid
              item
              xs={12}
              md={4}
            >
              <CTypography
                cvariant="th"
                gutterBottom
              >
                Stay Updated
              </CTypography>

              <CTypography
                cvariant="c"
                sx={{
                  mb: 3,
                }}
              >
                Get notified when beta launches and receive product updates.
              </CTypography>

              <Stack
                direction={{
                  xs: 'column',
                  sm: 'row',
                }}
                spacing={2}
              >
                <CTextField
                  size="small"
                  placeholder="Email address"
                  fullWidth
                />

                <Button
                  variant="contained"
                  sx={{
                    textTransform: 'none',
                    borderRadius: '12px',
                    px: 4
                  }}
                >
                  Join
                </Button>
              </Stack>
            </Grid>

          </Grid>

          <Divider
            sx={{
              my: 5,
            }}
          />

          <Stack
            direction={{
              xs: 'column',
              md: 'row',
            }}
            justifyContent="space-between"
            alignItems={{
              xs: 'flex-start',
              md: 'center',
            }}
            spacing={2}
          >
            <CTypography cvariant="c">
              © 2026 API Sentinel. All rights reserved.
            </CTypography>

            <Stack
              direction="row"
              spacing={3}
            >
              <Link
                href="/privacy"
                style={{
                  textDecoration: 'none',
                  color: 'inherit',
                }}
              >
                <CTypography cvariant="c">
                  Privacy
                </CTypography>
              </Link>

              <Link
                href="/terms"
                style={{
                  textDecoration: 'none',
                  color: 'inherit',
                }}
              >
                <CTypography cvariant="c">
                  Terms
                </CTypography>
              </Link>

              <Link
                href="/cookies"
                style={{
                  textDecoration: 'none',
                  color: 'inherit',
                }}
              >
                <CTypography cvariant="c">
                  Cookies
                </CTypography>
              </Link>
            </Stack>

          </Stack>

        </Container>
      </Box>

    </Box>
  )
}