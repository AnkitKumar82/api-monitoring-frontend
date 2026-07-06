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

export default function Features() {
  const [expandedFAQ, setExpandedFAQ] = useState(null)

  return (
    <Box display="flex" flexDirection="column">
      {/* ===================== FEATURES ===================== */}
      <Container
        id="features"
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
                            cvariant="sh"
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
                      <CTypography cvariant="mh"
                        sx={{
                          color: "#22C55E",
                        }}>
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
                    {[35,60,48,72,95,80,58,45,66,88,76,52,55,60,28,32,75,50,68,85,36,38,76,32].map((height,index)=>(
                      <Box
                        key={index}
                        sx={{
                          width: "3%",
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
    </Box>
  )
}