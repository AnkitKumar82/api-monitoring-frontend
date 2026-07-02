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

export default function UrlDecoderPage() {
  const { setAlert } = useApp()

  const [inputText, setInputText] = useState(
    `https%3A%2F%2Fexample.com%2Fsearch%3Fq%3Dhello%20world`
  )

  const [decodedText, setDecodedText] = useState('')

  const [decodeMode, setDecodeMode] = useState('component')

  const [isValid, setIsValid] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  const [originalLength, setOriginalLength] = useState(0)
  const [decodedLength, setDecodedLength] = useState(0)
  const [spaceCount, setSpaceCount] = useState(0)

  /**
   * URL decode safely
   */
  const decodeUrl = (str) => {
    try {
      if (decodeMode === 'full') {
        return decodeURI(str)
      }

      // component-safe decoding (recommended for query params)
      return decodeURIComponent(str)
    } catch (err) {
      throw new Error('Invalid encoded URL input')
    }
  }

  /**
   * Main decode handler
   */
  const handleDecode = () => {
    try {
      const decoded = decodeUrl(inputText)

      setDecodedText(decoded)

      setIsValid(true)
      setErrorMessage('')

      setOriginalLength(inputText.length)
      setDecodedLength(decoded.length)
      setSpaceCount((decoded.match(/ /g) || []).length)
    } catch (err) {
      setDecodedText('')

      setIsValid(false)
      setErrorMessage(err.message)

      setOriginalLength(0)
      setDecodedLength(0)
      setSpaceCount(0)
    }
  }

  /**
   * Copy decoded URL
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
    handleDecode()
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
                URL Decoder
              </CTypography>

              <Stack spacing={3}>

                <CTextField
                  label='Encoded URL / Text'
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
                  label='Decoding Mode'
                  fullWidth
                  value={decodeMode}
                  onChange={(e) =>
                    setDecodeMode(e.target.value)
                  }
                  sx={{
                    '.MuiOutlinedInput-notchedOutline': {
                      border:
                        '1px solid var(--p-fg-st-color)'
                    }
                  }}
                >
                  <MenuItem value='component'>
                    Component Safe (decodeURIComponent)
                  </MenuItem>

                  <MenuItem value='full'>
                    Full URL (decodeURI)
                  </MenuItem>
                </CSelect>

                <CButton
                  size='large'
                  label='Decode URL'
                  onClick={handleDecode}
                />

                {isValid ? (
                  <Alert severity='success'>
                    URL decoded successfully
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
                    URL Decoding Formula
                  </CTypography>

                  <CTypography cvariant='th' sx={{ mb: 1 }}>
                    Percent Encoding → Raw Text
                  </CTypography>

                  <CTypography cvariant='c'>
                    Converts percent-encoded URLs back
                    into readable format.
                    <br />
                    <br />
                    decodeURIComponent is best for query
                    parameters.
                    <br />
                    decodeURI is used for full URLs.
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
                      Decoded URL
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
                      Decoded Length
                    </CTypography>
                    <Typography variant='h6'>
                      {decodedLength.toLocaleString()}
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