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

export default function Base64DecoderPage() {
  const { setAlert } = useApp()

  const [inputBase64, setInputBase64] = useState(`SGVsbG8gV29ybGQh`)

  const [decodedText, setDecodedText] = useState('')

  const [decodeType, setDecodeType] = useState('utf8')

  const [isValid, setIsValid] = useState(true)

  const [errorMessage, setErrorMessage] = useState('')

  const [inputLength, setInputLength] = useState(0)
  const [outputLength, setOutputLength] = useState(0)
  const [lineCount, setLineCount] = useState(0)
  const [charWithoutSpaces, setCharWithoutSpaces] = useState(0)

  /**
   * UTF-8 safe Base64 decode
   */
  const decodeBase64 = (str) => {
    try {
      if (decodeType === 'utf8') {
        return decodeURIComponent(
          atob(str)
            .split('')
            .map((c) => {
              return (
                '%' +
                ('00' + c.charCodeAt(0).toString(16)).slice(-2)
              )
            })
            .join('')
        )
      }

      return atob(str)
    } catch (err) {
      throw new Error('Invalid Base64 input')
    }
  }

  /**
   * Main decode handler
   */
  const formatDecodeHandler = () => {
    try {
      const decoded = decodeBase64(inputBase64)

      setDecodedText(decoded)

      setIsValid(true)
      setErrorMessage('')

      setInputLength(inputBase64.length)
      setOutputLength(decoded.length)

      setCharWithoutSpaces(decoded.replace(/\s/g, '').length)

      setLineCount(decoded.split('\n').length)
    } catch (err) {
      setDecodedText('')

      setIsValid(false)
      setErrorMessage(err.message)

      setInputLength(0)
      setOutputLength(0)
      setCharWithoutSpaces(0)
      setLineCount(0)
    }
  }

  /**
   * Copy decoded output
   */
  const handleCopyToClipboard = () => {
    if (!decodedText) return

    try {
      copy(decodedText)

      setAlert({
        show: true,
        severity: 'success',
        duration: 5000,
        message: 'Copied to clipboard'
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
    formatDecodeHandler()
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
                Base64 Decoder
              </CTypography>

              <Stack spacing={3}>

                <CTextField
                  label='Base64 Input'
                  multiline
                  rows={18}
                  fullWidth
                  value={inputBase64}
                  onChange={(e) =>
                    setInputBase64(e.target.value)
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
                  label='Decode Type'
                  fullWidth
                  value={decodeType}
                  onChange={(e) =>
                    setDecodeType(e.target.value)
                  }
                  sx={{
                    '.MuiOutlinedInput-notchedOutline': {
                      border:
                        '1px solid var(--p-fg-st-color)'
                    }
                  }}
                >
                  <MenuItem value='utf8'>
                    UTF-8 Safe Decode
                  </MenuItem>

                  <MenuItem value='raw'>
                    Raw Decode (atob)
                  </MenuItem>
                </CSelect>

                <CButton
                  size='large'
                  label='Decode Base64'
                  onClick={formatDecodeHandler}
                />

                {isValid ? (
                  <Alert severity='success'>
                    Decoding successful
                  </Alert>
                ) : (
                  <Alert severity='error'>
                    {errorMessage}
                  </Alert>
                )}

                <Paper
                  sx={{
                    p: 2,
                    border: '1px solid var(--p-fg-st-color)',
                    boxShadow: 'none',
                    borderRadius: '8px'
                  }}
                >
                  <CTypography cvariant='c' sx={{ mb: 1 }}>
                    Base64 Decoding Formula
                  </CTypography>

                  <CTypography cvariant='th' sx={{ mb: 1 }}>
                    Base64 String → Binary → Text
                  </CTypography>

                  <CTypography cvariant='c'>
                    Converts Base64 encoded data back
                    into readable text.
                    <br />
                    <br />
                    UTF-8 mode safely restores emojis
                    and special characters.
                    <br />
                    <br />
                    Raw mode uses direct browser
                    decoding (atob).
                  </CTypography>
                </Paper>

              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* RIGHT PANEL STARTS IN PART 3 */}
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
                      Decoded Output
                    </CTypography>

                    <Typography
                      onClick={handleCopyToClipboard}
                      sx={{
                        mt: 1,
                        p: 2,
                        borderRadius: '8px',
                        fontFamily:
                          'Consolas, Monaco, monospace',
                        whiteSpace: 'pre-wrap',
                        wordBreak: 'break-word',
                        cursor: 'pointer',
                        bgcolor: 'transparent',
                        '&:hover': {
                          bgcolor: 'var(--s-bg-color)'
                        }
                      }}
                    >
                      {decodedText ? (
                        decodedText
                      ) : (
                        <span style={{ color: 'var(--red-color)' }}>
                          {errorMessage ||
                            'No decoded output'}
                        </span>
                      )}
                    </Typography>
                  </Paper>
                </Grid>

                {/* STATS */}

                <Grid item xs={12} sm={6}>
                  <Paper sx={statsStyle}>
                    <CTypography cvariant='c'>
                      Input Length
                    </CTypography>
                    <Typography variant='h6'>
                      {inputLength.toLocaleString()}
                    </Typography>
                  </Paper>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Paper sx={statsStyle}>
                    <CTypography cvariant='c'>
                      Output Length
                    </CTypography>
                    <Typography variant='h6'>
                      {outputLength.toLocaleString()}
                    </Typography>
                  </Paper>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Paper sx={statsStyle}>
                    <CTypography cvariant='c'>
                      Without Spaces
                    </CTypography>
                    <Typography variant='h6'>
                      {charWithoutSpaces.toLocaleString()}
                    </Typography>
                  </Paper>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Paper sx={statsStyle}>
                    <CTypography cvariant='c'>
                      Line Count
                    </CTypography>
                    <Typography variant='h6'>
                      {lineCount.toLocaleString()}
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