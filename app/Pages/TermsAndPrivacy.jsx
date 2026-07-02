import React from 'react'
import { Container, Box } from '@mui/material'
import CTypography from '../Components/CTypography'
import CButton from '../Components/CButton'
import NavBar from '../Commons/NavBar'
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded'

const TermsAndPrivacy = () => {

  return (
    <>
      <NavBar />
      <Container maxWidth='md' sx={{ py: 4 }}>
        <CButton
          label={'Go Back'}
          cvariant='t'
          sx={{ p: '8px 16px', mb: '16px', borderRadius: '0px' }}
          startIcon={ArrowBackIosNewRoundedIcon}
          onClick={() => { window.location.href = '/' }}
        />
        <CTypography cvariant='mh' gutterBottom>
          Terms of Service & Privacy Policy
        </CTypography>

        {/* Privacy Policy */}
        <Box>
          <CTypography cvariant='sh' gutterBottom>
            2. Privacy Policy
          </CTypography>

          <CTypography paragraph>
            Your privacy is important to us. This section outlines how we collect, use, and protect your information.
          </CTypography>

          <CTypography cvariant='th'>2.1 Data Collection</CTypography>
          <CTypography paragraph>
            We collect minimal data required for functionality, such as session logs and IP addresses for security purposes. We do not store chat messages.
          </CTypography>

          <CTypography cvariant='th'>2.2 Use of Data</CTypography>
          <CTypography paragraph>
            Your data is used to improve the platform and prevent abuse. We do not sell or share your data with third parties.
          </CTypography>

          <CTypography cvariant='th'>2.3 Cookies</CTypography>
          <CTypography paragraph>
            ChatHive may use cookies for user experience enhancement. You can disable cookies in your browser settings.
          </CTypography>

          <CTypography cvariant='th'>2.4 Security</CTypography>
          <CTypography paragraph>
            We take security seriously and use industry-standard measures to protect your data. However, no system is 100% secure.
          </CTypography>
        </Box>
      </Container>
    </>
  )
}

export default TermsAndPrivacy;
