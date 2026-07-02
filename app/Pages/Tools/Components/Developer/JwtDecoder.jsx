import { useState, useEffect } from 'react'
import {
  Alert,
  Card,
  CardContent,
  Container,
  Grid,
  Paper,
  Stack,
  Typography
} from '@mui/material'

import copy from 'copy-to-clipboard'

import CButton from '../../../../Components/CButton'
import CTextField from '../../../../Components/CTextField'
import CTypography from '../../../../Components/CTypography'

import { useApp } from '../../../../DataStores/AppContext'

export default function JwtDecoderPage() {
  const { setAlert } = useApp()

  // Input JWT
  const [token, setToken] = useState('')

  // Decoded parts
  const [header, setHeader] = useState(null)
  const [payload, setPayload] = useState(null)
  const [signature, setSignature] = useState('')

  // Output formatting
  const [formattedHeader, setFormattedHeader] = useState('')
  const [formattedPayload, setFormattedPayload] = useState('')

  // UI state
  const [isValid, setIsValid] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  // Stats
  const [tokenLength, setTokenLength] = useState(0)

  /**
   * Decode Base64URL safely
   */
  const base64UrlDecode = (str) => {
    try {
      const base64 = str.replace(/-/g, '+').replace(/_/g, '/')
      const padded = base64.padEnd(
        base64.length + (4 - (base64.length % 4)) % 4,
        '='
      )

      return decodeURIComponent(
        atob(padded)
          .split('')
          .map((c) =>
            '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
          )
          .join('')
      )
    } catch (err) {
      throw new Error('Invalid Base64 URL encoding')
    }
  }

  /**
   * Parse JWT token
   */
  const decodeJWT = () => {
    try {
      if (!token || token.split('.').length !== 3) {
        throw new Error('Invalid JWT format')
      }

      const [h, p, s] = token.split('.')

      const decodedHeader = JSON.parse(base64UrlDecode(h))
      const decodedPayload = JSON.parse(base64UrlDecode(p))

      setHeader(decodedHeader)
      setPayload(decodedPayload)
      setSignature(s)

      setFormattedHeader(JSON.stringify(decodedHeader, null, 2))
      setFormattedPayload(JSON.stringify(decodedPayload, null, 2))

      setTokenLength(token.length)

      setIsValid(true)
      setErrorMessage('')
    } catch (err) {
      setHeader(null)
      setPayload(null)
      setSignature('')

      setFormattedHeader('')
      setFormattedPayload('')

      setIsValid(false)
      setErrorMessage(err.message || 'Invalid JWT')
      setTokenLength(0)
    }
  }

  /**
   * Copy decoded payload
   */
  const copyPayload = () => {
    try {
      if (!payload) return

      copy(JSON.stringify(payload, null, 2))

      setAlert({
        show: true,
        severity: 'success',
        duration: 5000,
        message: 'Payload copied'
      })
    } catch (err) {
      setAlert({
        show: true,
        severity: 'error',
        duration: 5000,
        message: 'Copy failed'
      })
    }
  }

    const statsStyle = {
        p: 2,
        border: '1px solid var(--p-fg-st-color)',
        boxShadow: '0 0 2500px var(--p-b-color)',
        borderRadius: '8px'
    }

  return (
    <Container>
      <Grid container spacing={3} mb={4}>
                {/* LEFT PANEL */}

        <Grid item xs={12} md={5}>
          <Card
            sx={{
              transition: '0.2s',
              border: '1px solid var(--p-fg-st-color)',
              boxShadow: '0 0 2500px var(--p-b-color)',
              borderRadius: '8px'
            }}
          >
            <CardContent>
              <CTypography cvariant='sh'>
                JWT Decoder
              </CTypography>

              <Stack spacing={3}>

                {/* INPUT */}
                <CTextField
                  label='JWT Token'
                  fullWidth
                  multiline
                  rows={10}
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  sx={{
                    '.MuiOutlinedInput-root': {
                      alignItems: 'flex-start'
                    },
                    textarea: {
                      fontFamily:
                        'Consolas, Monaco, monospace',
                      fontSize: '13px',
                      lineHeight: 1.4
                    }
                  }}
                />

                {/* ACTION BUTTON */}
                <CButton
                  size='large'
                  label='Decode JWT'
                  onClick={decodeJWT}
                />

                {/* VALIDATION */}
                {isValid ? (
                  <Alert severity='success'>
                    JWT decoded successfully
                  </Alert>
                ) : (
                  <Alert severity='error'>
                    {errorMessage}
                  </Alert>
                )}

                {/* COPY PAYLOAD */}
                <CButton
                  size='large'
                  label='Copy Payload'
                  onClick={copyPayload}
                />

                {/* INFO PANEL */}
                <Paper
                  sx={{
                    p: 2,
                    border: '1px solid var(--p-fg-st-color)',
                    borderRadius: '8px',
                    boxShadow: 'none'
                  }}
                >
                  <CTypography cvariant='c'>
                    JWT Structure
                  </CTypography>

                  <CTypography cvariant='th' sx={{ mt: 1 }}>
                    header.payload.signature
                  </CTypography>

                  <CTypography cvariant='c' sx={{ mt: 1 }}>
                    • Header → algorithm & type
                    <br />
                    • Payload → claims / data
                    <br />
                    • Signature → verification hash
                  </CTypography>
                </Paper>

              </Stack>
            </CardContent>
          </Card>
        </Grid>
                {/* RIGHT PANEL */}

        <Grid item xs={12} md={7}>
          <Card
            sx={{
              transition: '0.2s',
              border: '1px solid var(--p-fg-st-color)',
              boxShadow: '0 0 2500px var(--p-b-color)',
              borderRadius: '8px'
            }}
          >
            <CardContent>
              <CTypography cvariant='sh'>
                Decoded JWT
              </CTypography>

              <Grid container spacing={2} sx={{ mt: 1 }}>

                {/* HEADER */}
                <Grid item xs={12}>
                  <Paper
                    sx={{
                      p: 2,
                      border: '1px solid var(--p-fg-st-color)',
                      borderRadius: '8px',
                      maxHeight: '220px',
                      boxShadow: '0 0 2500px var(--p-b-color)',
                      overflow: 'auto'
                    }}
                  >
                    <CTypography cvariant='c'>
                      Header
                    </CTypography>

                    <Typography
                      sx={{
                        mt: 1,
                        fontFamily:
                          'Consolas, Monaco, monospace',
                        fontSize: '13px',
                        whiteSpace: 'pre-wrap',
                        wordBreak: 'break-word'
                      }}
                    >
                      {formattedHeader ? (
                        formattedHeader
                      ) : (
                        <span style={{ color: 'var(--red-color)' }}>
                          No header decoded
                        </span>
                      )}
                    </Typography>
                  </Paper>
                </Grid>

                {/* PAYLOAD */}
                <Grid item xs={12}>
                  <Paper
                    sx={{
                      p: 2,
                      border: '1px solid var(--p-fg-st-color)',
                      borderRadius: '8px',
                      boxShadow: '0 0 2500px var(--p-b-color)',
                      maxHeight: '260px',
                      overflow: 'auto'
                    }}
                  >
                    <CTypography cvariant='c'>
                      Payload
                    </CTypography>

                    <Typography
                      sx={{
                        mt: 1,
                        fontFamily:
                          'Consolas, Monaco, monospace',
                        fontSize: '13px',
                        whiteSpace: 'pre-wrap',
                        wordBreak: 'break-word'
                      }}
                    >
                      {formattedPayload ? (
                        formattedPayload
                      ) : (
                        <span style={{ color: 'var(--red-color)' }}>
                          No payload decoded
                        </span>
                      )}
                    </Typography>
                  </Paper>
                </Grid>

                {/* SIGNATURE */}
                <Grid item xs={12}>
                  <Paper
                    sx={{
                      p: 2,
                      border: '1px solid var(--p-fg-st-color)',
                      borderRadius: '8px',
                      boxShadow: '0 0 2500px var(--p-b-color)'
                    }}
                  >
                    <CTypography cvariant='c'>
                      Signature
                    </CTypography>

                    <Typography
                      sx={{
                        mt: 1,
                        fontFamily:
                          'Consolas, Monaco, monospace',
                        fontSize: '13px',
                        wordBreak: 'break-all'
                      }}
                    >
                      {signature || (
                        <span style={{ color: 'var(--red-color)' }}>
                          No signature available
                        </span>
                      )}
                    </Typography>
                  </Paper>
                </Grid>

                {/* STATS */}
                <Grid item xs={12} sm={6}>
                  <Paper sx={statsStyle}>
                    <CTypography cvariant='c'>
                      Token Length
                    </CTypography>
                    <Typography variant='h6'>
                      {tokenLength}
                    </Typography>
                  </Paper>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Paper sx={statsStyle}>
                    <CTypography cvariant='c'>
                      Parts
                    </CTypography>
                    <Typography variant='h6'>
                      {token ? token.split('.').length : 0}
                    </Typography>
                  </Paper>
                </Grid>

              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  )
}