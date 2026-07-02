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

export default function UrlEncoderPage() {
  const { setAlert } = useApp()

  const [inputText, setInputText] = useState(
    `https://example.com/search?q=hello world&lang=en`
  )

  const [encodedText, setEncodedText] = useState('')

  const [encodeMode, setEncodeMode] = useState('component')

  const [isValid, setIsValid] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  const [originalLength, setOriginalLength] = useState(0)
  const [encodedLength, setEncodedLength] = useState(0)
  const [spaceCount, setSpaceCount] = useState(0)

  /**
   * URL encode safely
   */
  const encodeUrl = (str) => {
    try {
      if (encodeMode === 'full') {
        return encodeURI(str)
      }

      // component-safe encoding (recommended for query params)
      return encodeURIComponent(str)
    } catch (err) {
      throw new Error('Invalid URL input')
    }
  }

  /**
   * Main encoder handler
   */
  const handleEncode = () => {
    try {
      const encoded = encodeUrl(inputText)

      setEncodedText(encoded)

      setIsValid(true)
      setErrorMessage('')

      setOriginalLength(inputText.length)
      setEncodedLength(encoded.length)
      setSpaceCount((inputText.match(/ /g) || []).length)
    } catch (err) {
      setEncodedText('')

      setIsValid(false)
      setErrorMessage(err.message)

      setOriginalLength(0)
      setEncodedLength(0)
      setSpaceCount(0)
    }
  }

  /**
   * Copy encoded URL
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
    handleEncode()
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
                URL Encoder
              </CTypography>

              <Stack spacing={3}>

                <CTextField
                  label='Input URL / Text'
                  fullWidth
                  multiline
                  rows={14}
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
                  label='Encoding Mode'
                  fullWidth
                  value={encodeMode}
                  onChange={(e) =>
                    setEncodeMode(e.target.value)
                  }
                  sx={{
                    '.MuiOutlinedInput-notchedOutline': {
                      border:
                        '1px solid var(--p-fg-st-color)'
                    }
                  }}
                >
                  <MenuItem value='component'>
                    Component Safe (encodeURIComponent)
                  </MenuItem>

                  <MenuItem value='full'>
                    Full URL (encodeURI)
                  </MenuItem>
                </CSelect>

                <CButton
                  size='large'
                  label='Encode URL'
                  onClick={handleEncode}
                />

                {isValid ? (
                  <Alert severity='success'>
                    URL encoded successfully
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
                    URL Encoding Formula
                  </CTypography>

                  <CTypography cvariant='th' sx={{ mb: 1 }}>
                    Raw Text → Percent Encoding → Safe URL
                  </CTypography>

                  <CTypography cvariant='c'>
                    Converts unsafe characters into
                    percent-encoded format.
                    <br />
                    <br />
                    encodeURIComponent is best for query
                    parameters.
                    <br />
                    encodeURI is used for full URLs.
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
                      Encoded URL
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
                        whiteSpace: 'pre-wrap',
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
                      Original Length
                    </CTypography>
                    <Typography variant='h6'>
                      {originalLength.toLocaleString()}
                    </Typography>
                  </Paper>
                </Grid>

                <Grid item xs={12} sm={4}>
                  <Paper sx={statsStyle}>
                    <CTypography cvariant='c'>
                      Encoded Length
                    </CTypography>
                    <Typography variant='h6'>
                      {encodedLength.toLocaleString()}
                    </Typography>
                  </Paper>
                </Grid>

                <Grid item xs={12} sm={4}>
                  <Paper sx={statsStyle}>
                    <CTypography cvariant='c'>
                      Space Count
                    </CTypography>
                    <Typography variant='h6'>
                      {spaceCount.toLocaleString()}
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