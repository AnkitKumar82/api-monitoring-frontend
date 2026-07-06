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

export default function Footer() {
  const [expandedFAQ, setExpandedFAQ] = useState(null)

  return (
    <Box display="flex" flexDirection="column">
      {/* ===================== Footer ===================== */}
      <Box
        component="footer"
        sx={{
          mt: 6,
          py: 8,
          // background:
          border: "1px solid rgba(59,130,246,.15)",
        }}
      >
        <Container maxWidth="lg" id="footer">

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
                  cvariant='s'
                />

                <CButton cvariant='t' label="Join"/>  
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