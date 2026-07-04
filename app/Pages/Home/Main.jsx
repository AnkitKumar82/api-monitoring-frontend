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

import CTypography from '../../Components/CTypography'
import CTextField from '../../Components/CTextField'
import Hero from './Components/Hero'
import Features from './Components/Features'
import Pricing from './Components/Pricing'
import HowItWorks from './Components/HowItWorks'
import FAQ from './Components/FAQ'
import Footer from './Components/Footer'
import CChip from '../../Components/CChip'
import CButton from '../../Components/CButton'
import CExpansionPanel from '../../Components/CExpansionPanel'
import CDialog from '../../Components/CDialog'
import CAlert from '../../Components/CAlert'

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
    <Box 
      display="flex" 
      flexDirection="column"
    >
      {/* ===================== HERO ===================== */}
      <Hero />

      {/* ===================== FEATURES ===================== */}
      <Features />
      {/* ===================== HOW IT WORKS ===================== */}
      <HowItWorks />
      {/* ===================== PRICING ===================== */}
      <Pricing />
      {/* ===================== FAQ ===================== */}
      <FAQ />
      {/* ===================== Footer ===================== */}
      <Footer />
    </Box>
  )
}