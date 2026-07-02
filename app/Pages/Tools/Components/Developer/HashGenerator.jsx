import { useState, useEffect } from 'react'
import {
  Alert,
  Card,
  CardContent,
  Container,
  Grid,
  MenuItem,
  Paper,
  Stack,
  Typography
} from '@mui/material'

import copy from 'copy-to-clipboard'

import CButton from '../../../../Components/CButton'
import CSelect from '../../../../Components/CSelect'
import CTextField from '../../../../Components/CTextField'
import CTypography from '../../../../Components/CTypography'

import { useApp } from '../../../../DataStores/AppContext'

export default function HashGeneratorPage() {
  const { setAlert } = useApp()

  const [inputText, setInputText] = useState(
    'Hello World'
  )

  const [hashType, setHashType] = useState('sha256')

  const [hashOutput, setHashOutput] = useState('')

  const [isValid, setIsValid] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  const [inputLength, setInputLength] = useState(0)
  const [outputLength, setOutputLength] = useState(0)
  const [charCount, setCharCount] = useState(0)

  /**
   * Hash generator using Web Crypto API
   */
  const generateHash = async (text, type) => {
    try {
      const encoder = new TextEncoder()
      const data = encoder.encode(text)

      let algo = ''

      switch (type) {
        case 'sha1':
          algo = 'SHA-1'
          break
        case 'sha256':
          algo = 'SHA-256'
          break
        case 'sha384':
          algo = 'SHA-384'
          break
        case 'sha512':
          algo = 'SHA-512'
          break
        default:
          throw new Error('Unsupported hash type')
      }

      const hashBuffer = await crypto.subtle.digest(
        algo,
        data
      )

      const hashArray = Array.from(
        new Uint8Array(hashBuffer)
      )

      const hashHex = hashArray
        .map((b) => b.toString(16).padStart(2, '0'))
        .join('')

      return hashHex
    } catch (err) {
      throw new Error('Hash generation failed')
    }
  }

  /**
   * Main handler
   */
  const handleGenerateHash = async () => {
    try {
      const hash = await generateHash(
        inputText,
        hashType
      )

      setHashOutput(hash)

      setIsValid(true)
      setErrorMessage('')

      setInputLength(inputText.length)
      setOutputLength(hash.length)
      setCharCount(
        inputText.replace(/\s/g, '').length
      )
    } catch (err) {
      setHashOutput('')

      setIsValid(false)
      setErrorMessage(err.message)

      setInputLength(0)
      setOutputLength(0)
      setCharCount(0)
    }
  }

  /**
   * Copy hash
   */
  const handleCopyToClipboard = () => {
    if (!hashOutput) return

    try {
      copy(hashOutput)

      setAlert({
        show: true,
        severity: 'success',
        duration: 5000,
        message: 'Hash copied to clipboard'
      })
    } catch (err) {
      setAlert({
        show: true,
        severity: 'error',
        duration: 5000,
        message: 'Failed to copy'
      })
    }
  }

  useEffect(() => {
    handleGenerateHash()
  }, [])

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
                Hash Generator
              </CTypography>

              <Stack spacing={3}>

                <CTextField
                  label='Input Text'
                  fullWidth
                  multiline
                  rows={12}
                  value={inputText}
                  onChange={(e) =>
                    setInputText(e.target.value)
                  }
                  sx={{
                    '.MuiOutlinedInput-root': {
                      alignItems: 'flex-start'
                    },
                    '.MuiOutlinedInput-notchedOutline': {
                      border:
                        '1px solid var(--p-fg-st-color)'
                    },
                    textarea: {
                      fontFamily:
                        'Consolas, Monaco, monospace',
                      fontSize: '14px'
                    }
                  }}
                />

                <CSelect
                  select
                  label='Hash Algorithm'
                  fullWidth
                  value={hashType}
                  onChange={(e) =>
                    setHashType(e.target.value)
                  }
                  sx={{
                    '.MuiOutlinedInput-notchedOutline': {
                      border:
                        '1px solid var(--p-fg-st-color)'
                    }
                  }}
                >
                  <MenuItem value='sha1'>SHA-1</MenuItem>
                  <MenuItem value='sha256'>SHA-256</MenuItem>
                  <MenuItem value='sha384'>SHA-384</MenuItem>
                  <MenuItem value='sha512'>SHA-512</MenuItem>
                </CSelect>

                <CButton
                  size='large'
                  label='Generate Hash'
                  onClick={handleGenerateHash}
                />

                {isValid ? (
                  <Alert severity='success'>
                    Hash generated successfully
                  </Alert>
                ) : (
                  <Alert severity='error'>
                    {errorMessage}
                  </Alert>
                )}

                <Paper
                  sx={{
                    p: 2,
                    border:
                      '1px solid var(--p-fg-st-color)',
                    boxShadow: 'none',
                    borderRadius: '8px'
                  }}
                >
                  <CTypography cvariant='c' sx={{ mb: 1 }}>
                    Hash Generation Formula
                  </CTypography>

                  <CTypography cvariant='th' sx={{ mb: 1 }}>
                    Text → UTF-8 → Cryptographic Digest
                  </CTypography>

                  <CTypography cvariant='c'>
                    Uses Web Crypto API for secure hashing.
                    <br />
                    <br />
                    SHA-256 is the most commonly used for
                    integrity checks.
                    <br />
                    SHA-512 provides stronger security.
                    <br />
                    <br />
                    Output is always fixed-length hex string.
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
                Results
              </CTypography>

              <Grid container spacing={2} sx={{ mt: 1 }}>

                {/* OUTPUT */}
                <Grid item xs={12}>
                  <Paper
                    sx={{
                      p: 2,
                      border: '1px solid var(--p-fg-st-color)',
                      boxShadow: '0 0 2500px var(--p-b-color)',
                      borderRadius: '8px'
                    }}
                  >
                    <CTypography cvariant='c'>
                      Generated Hash
                    </CTypography>

                    <Typography
                      onClick={handleCopyToClipboard}
                      sx={{
                        mt: 1,
                        p: 2,
                        borderRadius: '8px',
                        fontFamily:
                          'Consolas, Monaco, monospace',
                        wordBreak: 'break-all',
                        cursor: 'pointer',
                        bgcolor: 'transparent',
                        '&:hover': {
                          bgcolor: 'var(--s-bg-color)'
                        }
                      }}
                    >
                      {hashOutput ? (
                        hashOutput
                      ) : (
                        <span style={{ color: 'var(--red-color)' }}>
                          {errorMessage ||
                            'No hash generated'}
                        </span>
                      )}
                    </Typography>
                  </Paper>
                </Grid>

                {/* STATS */}

                <Grid item xs={12} sm={4}>
                  <Paper sx={statsStyle}>
                    <CTypography cvariant='c'>
                      Input Length
                    </CTypography>
                    <Typography variant='h6'>
                      {inputLength.toLocaleString()}
                    </Typography>
                  </Paper>
                </Grid>

                <Grid item xs={12} sm={4}>
                  <Paper sx={statsStyle}>
                    <CTypography cvariant='c'>
                      Hash Length
                    </CTypography>
                    <Typography variant='h6'>
                      {outputLength.toLocaleString()}
                    </Typography>
                  </Paper>
                </Grid>

                <Grid item xs={12} sm={4}>
                  <Paper sx={statsStyle}>
                    <CTypography cvariant='c'>
                      Char Count
                    </CTypography>
                    <Typography variant='h6'>
                      {charCount.toLocaleString()}
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