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
  TextField,
} from '@mui/material'

import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded'
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded'

import PublicRoundedIcon from '@mui/icons-material/PublicRounded'
import SpeedRoundedIcon from '@mui/icons-material/SpeedRounded'
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

const FEATURES = [
  {
    title: 'Global Monitoring',
    description:
      'Monitor APIs from multiple regions including US, Europe and Singapore.',
    icon: <PublicRoundedIcon sx={{ fontSize: 42, color: 'var(--p-fg-color)' }} />,
  },
  {
    title: 'Instant Alerts',
    description:
      'Receive email and Slack notifications when your API becomes unavailable.',
    icon: (
      <NotificationsActiveRoundedIcon
        sx={{ fontSize: 42, color: 'var(--p-fg-color)' }}
      />
    ),
  },
  {
    title: 'Latency Tracking',
    description:
      'Track response time trends and identify slow endpoints before users complain.',
    icon: <SpeedRoundedIcon sx={{ fontSize: 42, color: 'var(--p-fg-color)' }} />,
  },
  {
    title: 'Incident History',
    description:
      'View complete incident history with downtime duration and recovery.',
    icon: <TimelineRoundedIcon sx={{ fontSize: 42, color: 'var(--p-fg-color)' }} />,
  },
  {
    title: 'SSL Monitoring',
    description:
      'Receive reminders before SSL certificates expire.',
    icon: <SecurityRoundedIcon sx={{ fontSize: 42, color: 'var(--p-fg-color)' }} />,
  },
  {
    title: 'Response Validation',
    description:
      'Validate HTTP status codes, headers and JSON responses.',
    icon: <VerifiedRoundedIcon sx={{ fontSize: 42, color: 'var(--p-fg-color)' }} />,
  },
]

const PRICING = [
  {
    name: 'Free',
    price: '$0',
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
    features: [
      'Unlimited Endpoints',
      'Multi Region Checks',
      'Teams',
      'Status Pages',
      'Priority Support',
    ],
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

      {/* HERO */}

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

      {/* FEATURES */}

      <Container
        maxWidth="lg"
        sx={{
          py: 10,
        }}
      >
        <Box textAlign="center" mb={6}>
          <CTypography cvariant="mh" gutterBottom>
            Everything You Need.
          </CTypography>

          <CTypography cvariant="mhd">
            Built specifically for backend engineers and SaaS startups.
          </CTypography>
        </Box>

        <Grid container spacing={3}>
          {FEATURES.map((feature) => (
            <Grid
              key={feature.title}
              item
              xs={12}
              sm={6}
              md={4}
            >
              <GlassCard>
                <CardContent sx={{ p: 4 }}>

                  <Box mb={3}>
                    {feature.icon}
                  </Box>

                  <CTypography
                    cvariant="th"
                    gutterBottom
                  >
                    {feature.title}
                  </CTypography>

                  <CTypography cvariant="c">
                    {feature.description}
                  </CTypography>

                </CardContent>
              </GlassCard>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* HOW IT WORKS */}

      <Container
        maxWidth="lg"
        sx={{
          py: 8,
        }}
      >
        <Box textAlign="center" mb={6}>
          <CTypography cvariant="mh">
            Get Started In Less Than One Minute
          </CTypography>
        </Box>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <GlassCard>
              <CardContent sx={{ p: 4 }}>
                <RocketLaunchRoundedIcon
                  sx={{
                    fontSize: 52,
                    mb: 2
                  }}
                />

                <CTypography cvariant="th" gutterBottom>
                  1. Add Endpoint
                </CTypography>

                <CTypography cvariant="c">
                  Add your API endpoint along with headers, authentication and monitoring interval.
                </CTypography>
              </CardContent>
            </GlassCard>
          </Grid>
          <Grid item xs={12} md={4}>
            <GlassCard>
              <CardContent sx={{ p: 4 }}>
                <PublicRoundedIcon
                  sx={{
                    fontSize: 52,
                    color: 'var(--p-fg-color)',
                    mb: 2,
                  }}
                />

                <CTypography cvariant="th" gutterBottom>
                  2. We Monitor Globally
                </CTypography>

                <CTypography cvariant="c">
                  Checks are performed from multiple locations with latency and uptime tracking.
                </CTypography>
              </CardContent>
            </GlassCard>
          </Grid>
          <Grid item xs={12} md={4}>
            <GlassCard>
              <CardContent sx={{ p: 4 }}>
                <NotificationsActiveRoundedIcon
                  sx={{
                    fontSize: 52,
                    color: 'var(--p-fg-color)',
                    mb: 2,
                  }}
                />

                <CTypography cvariant="th" gutterBottom>
                  3. Get Alerts
                </CTypography>

                <CTypography cvariant="c">
                  Receive instant notifications when incidents occur so your customers never surprise you.
                </CTypography>
              </CardContent>
            </GlassCard>
          </Grid>
        </Grid>
      </Container>

      {/* PRICING */}

      <Container
        maxWidth="lg"
        sx={{
          py: 10,
        }}
      >
        <Box
          textAlign="center"
          mb={6}
        >
          <CTypography cvariant="mh">
            Simple Pricing
          </CTypography>

          <CTypography cvariant="mhd">
            No hidden costs. Upgrade whenever your team grows.
          </CTypography>
        </Box>

        <Grid container spacing={3}>
          {PRICING.map((plan) => (
            <Grid
              key={plan.name}
              item
              xs={12}
              md={4}
            >
              <GlassCard>
                <CardContent
                  sx={{
                    p: 4,
                    position: 'relative',
                    height: '100%',
                  }}
                >
                  {plan.popular && (
                    <Chip
                      label="Most Popular"
                      color="primary"
                      size="small"
                      sx={{
                        position: 'absolute',
                        top: 20,
                        right: 20,
                      }}
                    />
                  )}

                  <CTypography
                    cvariant="th"
                    gutterBottom
                  >
                    {plan.name}
                  </CTypography>

                  <CTypography
                    cvariant="mh"
                    sx={{
                      mb: 1,
                    }}
                  >
                    {plan.price}
                  </CTypography>

                  <CTypography
                    cvariant="c"
                    sx={{
                      mb: 4,
                    }}
                  >
                    {plan.price === '$0'
                      ? 'Forever Free'
                      : '/month'}
                  </CTypography>

                  <Stack spacing={2}>
                    {plan.features.map((feature) => (
                      <Stack
                        key={feature}
                        direction="row"
                        spacing={1.5}
                        alignItems="center"
                      >
                        <CheckCircleRoundedIcon
                          sx={{
                            color: 'var(--p-fg-color)',
                            fontSize: 20,
                          }}
                        />

                        <CTypography cvariant="c">
                          {feature}
                        </CTypography>
                      </Stack>
                    ))}
                  </Stack>

                  <Button
                    fullWidth
                    variant={plan.popular ? 'contained' : 'outlined'}
                    size="large"
                    sx={{
                      textTransform: 'none',
                      mt: 5,
                      borderRadius: '12px',
                    }}
                  >
                    {plan.price === '$0'
                      ? 'Start Free'
                      : 'Join Waitlist'}
                  </Button>

                </CardContent>
              </GlassCard>
            </Grid>
          ))}

        </Grid>

      </Container>

      
      {/* CTA */}

      <Container
        maxWidth="lg"
        sx={{
          pb: 10,
        }}
      >
        <CardContent
          sx={{
            p: {
              xs: 4,
              md: 6,
            },
          }}
        >

          <Grid
            container
            sx={{ justifyContent: "space-between" }}
            alignItems="center"
          >
            <Grid
              item
              xs={12}
              md={8}
            >
              <CTypography
                cvariant="mh"
                gutterBottom
              >
                Built for Backend Engineers.
              </CTypography>
              <CTypography cvariant="mhd">
                Finally, an API monitoring platform that focuses on what
                matters instead of overwhelming dashboards and hundreds of
                unnecessary features.
              </CTypography>
            </Grid>

            {/* <Grid
              item
              xs={12}
              md={4}
            >
              <Button
                variant="contained"
                fullWidth
                size="large"
                sx={{
                  textTransform: 'none',
                  height: 56,
                  borderRadius: '12px',
                }}
              >
                Request Early Access
              </Button>

            </Grid> */}
          </Grid>

        </CardContent>
      </Container>

      {/* WAITLIST */}

      <Container
        maxWidth="md"
        sx={{
          py: 12,
        }}
      >

        <GlassCard>
          <CardContent
            sx={{
              p: {
                xs: 4,
                md: 6,
              },
              textAlign: 'center',
            }}
          >

            <EmailRoundedIcon
              sx={{
                fontSize: 64,
                color: 'var(--p-fg-color)',
                mb: 2,
              }}
            />

            <CTypography
              cvariant="mh"
              gutterBottom
            >
              Join Early Access
            </CTypography>

            <CTypography
              cvariant="mhd"
              sx={{
                maxWidth: 600,
                mx: 'auto',
                mb: 5,
              }}
            >
              We're inviting a small group of backend engineers and startup
              teams to help shape the product before launch.
            </CTypography>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{ width: '100%' }}
            >
              <CTextField
                placeholder="Enter your work email"
                size="large"
                fullWidth
              />
              <Button
                variant="contained"
                size="large"
                sx={{
                  ml: "16px",
                  textTransform: 'none',
                  minWidth: 220,
                  borderRadius: '12px',
                }}
              >
                Join Waitlist
              </Button>
            </Stack>

            <CTypography
              cvariant="c"
              sx={{
                mt: 3,
              }}
            >
              No spam. We'll only email you about beta access and product updates.
            </CTypography>

          </CardContent>

        </GlassCard>

      </Container>

      {/* FAQ */}

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
      <Box
        component="footer"
        sx={{
          borderTop: '1px solid var(--p-b-color)',
          mt: 6,
          py: 8,
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