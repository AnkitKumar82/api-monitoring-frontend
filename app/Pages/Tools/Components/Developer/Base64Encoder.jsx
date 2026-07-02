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

export default function Base64EncoderPage() {
  const { setAlert } = useApp()

  const [inputText, setInputText] = useState(`Hello World!
This is Base64 encoder demo.`)

  const [encodedText, setEncodedText] = useState('')

  const [encodingType, setEncodingType] = useState('utf8')

  const [isValid, setIsValid] = useState(true)

  const [errorMessage, setErrorMessage] = useState('')

  const [totalCharacters, setTotalCharacters] = useState(0)
  const [encodedLength, setEncodedLength] = useState(0)
  const [originalLength, setOriginalLength] = useState(0)
  const [lineCount, setLineCount] = useState(0)

  /**
   * Encode UTF-8 safely to Base64
   */
  const encodeBase64 = (str) => {
    try {
      if (encodingType === 'utf8') {
        return btoa(
          encodeURIComponent(str).replace(
            /%([0-9A-F]{2})/g,
            (match, p1) =>
              String.fromCharCode('0x' + p1)
          )
        )
      }

      return btoa(str)
    } catch (err) {
      throw new Error('Invalid input for Base64 encoding')
    }
  }

  /**
   * Main encoder handler
   */
  const formatBase64Handler = () => {
    try {
      const encoded = encodeBase64(inputText)

      setEncodedText(encoded)

      setIsValid(true)
      setErrorMessage('')

      setTotalCharacters(encoded.length)
      setEncodedLength(encoded.length)
      setOriginalLength(inputText.length)

      setLineCount(inputText.split('\n').length)
    } catch (err) {
      setEncodedText('')

      setIsValid(false)
      setErrorMessage(err.message)

      setTotalCharacters(0)
      setEncodedLength(0)
      setOriginalLength(0)
      setLineCount(0)
    }
  }

  /**
   * Copy encoded text
   */
  const handleCopyToClipboard = () => {
    if (!encodedText) return

    try {
      copy(encodedText)

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
    formatBase64Handler()
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
                Base64 Encoder
              </CTypography>

              <Stack spacing={3}>

                <CTextField
                  label='Input Text'
                  multiline
                  rows={18}
                  fullWidth
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
                  label='Encoding Type'
                  fullWidth
                  value={encodingType}
                  onChange={(e) =>
                    setEncodingType(e.target.value)
                  }
                  sx={{
                    '.MuiOutlinedInput-notchedOutline': {
                      border:
                        '1px solid var(--p-fg-st-color)'
                    }
                  }}
                >
                  <MenuItem value='utf8'>
                    UTF-8 Safe Encode
                  </MenuItem>

                  <MenuItem value='raw'>
                    Raw Encode (btoa)
                  </MenuItem>
                </CSelect>

                <CButton
                  size='large'
                  label='Encode Base64'
                  onClick={formatBase64Handler}
                />

                {isValid ? (
                  <Alert severity='success'>
                    Encoding successful
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
                    Base64 Encoding Formula
                  </CTypography>

                  <CTypography cvariant='th' sx={{ mb: 1 }}>
                    Text → Binary → Base64 String
                  </CTypography>

                  <CTypography cvariant='c'>
                    Converts readable text into Base64
                    encoded format.
                    <br />
                    <br />
                    UTF-8 mode safely handles special
                    characters and emojis.
                    <br />
                    <br />
                    Raw mode uses direct browser
                    encoding (btoa).
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
                      Base64 Output
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
                      {encodedText ? (
                        encodedText
                      ) : (
                        <span style={{ color: 'var(--red-color)' }}>
                          {errorMessage ||
                            'No encoded output'}
                        </span>
                      )}
                    </Typography>
                  </Paper>
                </Grid>

                {/* STATS */}

                <Grid item xs={12} sm={4}>
                  <Paper sx={statsStyle}>
                    <CTypography cvariant='c'>
                      Encoding Valid
                    </CTypography>
                    <Typography variant='h6'>
                      {isValid ? 'Yes' : 'No'}
                    </Typography>
                  </Paper>
                </Grid>

                <Grid item xs={12} sm={4}>
                  <Paper sx={statsStyle}>
                    <CTypography cvariant='c'>
                      Output Length
                    </CTypography>
                    <Typography variant='h6'>
                      {encodedLength.toLocaleString()}
                    </Typography>
                  </Paper>
                </Grid>

                <Grid item xs={12} sm={4}>
                  <Paper sx={statsStyle}>
                    <CTypography cvariant='c'>
                      Input Length
                    </CTypography>
                    <Typography variant='h6'>
                      {originalLength.toLocaleString()}
                    </Typography>
                  </Paper>
                </Grid>

                <Grid item xs={12} sm={4}>
                  <Paper sx={statsStyle}>
                    <CTypography cvariant='c'>
                      Total Characters
                    </CTypography>
                    <Typography variant='h6'>
                      {totalCharacters.toLocaleString()}
                    </Typography>
                  </Paper>
                </Grid>

                <Grid item xs={12} sm={4}>
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