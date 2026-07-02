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

export default function TimestampConverterPage() {
  const { setAlert } = useApp()

  const [inputValue, setInputValue] = useState(
    String(Math.floor(Date.now() / 1000))
  )

  const [mode, setMode] = useState('unixToDate')

  const [result, setResult] = useState('')

  const [isValid, setIsValid] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  const [unixTimestamp, setUnixTimestamp] = useState(0)
  const [utcString, setUtcString] = useState('')
  const [localString, setLocalString] = useState('')
  const [msValue, setMsValue] = useState(0)

  /**
   * Convert Unix → Date
   */
  const unixToDate = (value) => {
    const num = Number(value)

    if (isNaN(num)) {
      throw new Error('Invalid Unix timestamp')
    }

    const date = new Date(
      num.toString().length === 10
        ? num * 1000
        : num
    )

    return {
      utc: date.toUTCString(),
      local: date.toString(),
      ms: date.getTime(),
      unix: Math.floor(date.getTime() / 1000)
    }
  }

  /**
   * Convert Date → Unix
   */
  const dateToUnix = (value) => {
    const date = new Date(value)

    if (isNaN(date.getTime())) {
      throw new Error('Invalid date format')
    }

    return {
      utc: date.toUTCString(),
      local: date.toString(),
      ms: date.getTime(),
      unix: Math.floor(date.getTime() / 1000)
    }
  }

  /**
   * Main converter
   */
  const handleConvert = () => {
    try {
      let output

      if (mode === 'unixToDate') {
        output = unixToDate(inputValue)
      } else {
        output = dateToUnix(inputValue)
      }

      setResult(JSON.stringify(output, null, 2))

      setUnixTimestamp(output.unix)
      setUtcString(output.utc)
      setLocalString(output.local)
      setMsValue(output.ms)

      setIsValid(true)
      setErrorMessage('')
    } catch (err) {
      setResult('')

      setIsValid(false)
      setErrorMessage(err.message)

      setUnixTimestamp(0)
      setUtcString('')
      setLocalString('')
      setMsValue(0)
    }
  }

  /**
   * Copy result
   */
  const handleCopyToClipboard = () => {
    if (!result) return

    try {
      copy(result)

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
    handleConvert()
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
                Timestamp Converter
              </CTypography>

              <Stack spacing={3}>

                <CSelect
                  select
                  label='Conversion Mode'
                  fullWidth
                  value={mode}
                  onChange={(e) =>
                    setMode(e.target.value)
                  }
                  sx={{
                    '.MuiOutlinedInput-notchedOutline': {
                      border:
                        '1px solid var(--p-fg-st-color)'
                    }
                  }}
                >
                  <MenuItem value='unixToDate'>
                    Unix → Date
                  </MenuItem>

                  <MenuItem value='dateToUnix'>
                    Date → Unix
                  </MenuItem>
                </CSelect>

                <CTextField
                  label={
                    mode === 'unixToDate'
                      ? 'Unix Timestamp (seconds or ms)'
                      : 'Date String (UTC / readable)'
                  }
                  fullWidth
                  value={inputValue}
                  onChange={(e) =>
                    setInputValue(e.target.value)
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

                <CButton
                  size='large'
                  label='Convert'
                  onClick={handleConvert}
                />

                {isValid ? (
                  <Alert severity='success'>
                    Conversion successful
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
                    Timestamp Conversion Formula
                  </CTypography>

                  <CTypography cvariant='th' sx={{ mb: 1 }}>
                    Unix Time ↔ Human Readable Date
                  </CTypography>

                  <CTypography cvariant='c'>
                    Unix timestamps are seconds since
                    1970-01-01 UTC.
                    <br />
                    <br />
                    Supports both seconds and milliseconds
                    input.
                    <br />
                    Converts to UTC or Local.
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

                {/* OUTPUT JSON */}
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
                      Converted Output
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
                      {result ? (
                        result
                      ) : (
                        <span style={{ color: 'var(--red-color)' }}>
                          {errorMessage ||
                            'No output available'}
                        </span>
                      )}
                    </Typography>
                  </Paper>
                </Grid>

                {/* STATS CARDS */}

                <Grid item xs={12} sm={6}>
                  <Paper sx={statsStyle}>
                    <CTypography cvariant='c'>
                      Unix Timestamp
                    </CTypography>
                    <Typography variant='h6'>
                      {unixTimestamp.toLocaleString()}
                    </Typography>
                  </Paper>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Paper sx={statsStyle}>
                    <CTypography cvariant='c'>
                      Milliseconds
                    </CTypography>
                    <Typography variant='h6'>
                      {msValue.toLocaleString()}
                    </Typography>
                  </Paper>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Paper sx={statsStyle}>
                    <CTypography cvariant='c'>
                      UTC String
                    </CTypography>
                    <Typography variant='h6'>
                      {utcString || '-'}
                    </Typography>
                  </Paper>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Paper sx={statsStyle}>
                    <CTypography cvariant='c'>
                      Local String
                    </CTypography>
                    <Typography variant='h6'>
                      {localString || '-'}
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