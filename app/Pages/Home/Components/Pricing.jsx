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

export default function Pricing() {
  const [expandedFAQ, setExpandedFAQ] = useState(null)

  return (
    <Box display="flex" flexDirection="column">
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
    </Box>
  )
}