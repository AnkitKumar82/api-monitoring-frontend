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
import FAQConstant from '../Constants/FAQ'

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

export default function FAQ() {
  const [expandedFAQ, setExpandedFAQ] = useState(null)

  return (
    <Box display="flex" flexDirection="column">
      <Container
        id="faq"
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
          {FAQConstant.map((faq, index) => (
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
    </Box>
  )
}