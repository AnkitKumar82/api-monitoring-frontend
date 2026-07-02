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

export default function RegexTesterPage() {
  const { setAlert } = useApp()

  const [pattern, setPattern] = useState(`\\b\\w+\\b`)
  const [testString, setTestString] = useState(
    `Hello world! This is a regex tester.\nTry matching words.`
  )

  const [flags, setFlags] = useState('g')

  const [matches, setMatches] = useState([])

  const [isValid, setIsValid] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  const [matchCount, setMatchCount] = useState(0)
  const [testLength, setTestLength] = useState(0)
  const [patternLength, setPatternLength] = useState(0)

  /**
   * Run regex safely
   */
  const runRegex = () => {
    try {
      const regex = new RegExp(pattern, flags)

      const found = []
      let match

      if (flags.includes('g')) {
        while ((match = regex.exec(testString)) !== null) {
          found.push({
            value: match[0],
            index: match.index
          })
        }
      } else {
        const single = regex.exec(testString)
        if (single) {
          found.push({
            value: single[0],
            index: single.index
          })
        }
      }

      setMatches(found)

      setIsValid(true)
      setErrorMessage('')

      setMatchCount(found.length)
      setTestLength(testString.length)
      setPatternLength(pattern.length)
    } catch (err) {
      setMatches([])

      setIsValid(false)
      setErrorMessage(err.message)

      setMatchCount(0)
      setTestLength(testString.length)
      setPatternLength(pattern.length)
    }
  }

  /**
   * Copy matches
   */
  const handleCopyToClipboard = () => {
    if (!matches.length) return

    try {
      copy(matches.map(m => m.value).join('\n'))

      setAlert({
        show: true,
        severity: 'success',
        duration: 5000,
        message: 'Copied matches to clipboard'
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
    runRegex()
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
                Regex Tester
              </CTypography>

              <Stack spacing={3}>

                <CTextField
                  label='Regular Expression Pattern'
                  fullWidth
                  value={pattern}
                  onChange={(e) => setPattern(e.target.value)}
                  helperText='Example: \\b\\w+\\b'
                  sx={{
                    '.MuiOutlinedInput-notchedOutline': {
                      border:
                        '1px solid var(--p-fg-st-color)'
                    }
                  }}
                />

                <CSelect
                  select
                  label='Flags'
                  fullWidth
                  value={flags}
                  onChange={(e) => setFlags(e.target.value)}
                  sx={{
                    '.MuiOutlinedInput-notchedOutline': {
                      border:
                        '1px solid var(--p-fg-st-color)'
                    }
                  }}
                >
                  <MenuItem value='g'>
                    g - global
                  </MenuItem>
                  <MenuItem value='i'>
                    i - case insensitive
                  </MenuItem>
                  <MenuItem value='gi'>
                    gi - global + case insensitive
                  </MenuItem>
                  <MenuItem value='m'>
                    m - multiline
                  </MenuItem>
                  <MenuItem value='gm'>
                    gm - global + multiline
                  </MenuItem>
                </CSelect>

                <CTextField
                  label='Test String'
                  multiline
                  rows={14}
                  fullWidth
                  value={testString}
                  onChange={(e) =>
                    setTestString(e.target.value)
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
                  label='Run Regex'
                  onClick={runRegex}
                />

                {isValid ? (
                  <Alert severity='success'>
                    Pattern is valid
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
                    Regex Tester Formula
                  </CTypography>

                  <CTypography cvariant='th' sx={{ mb: 1 }}>
                    Pattern → Engine → Matches
                  </CTypography>

                  <CTypography cvariant='c'>
                    Compiles JavaScript RegExp pattern
                    <br />
                    Executes against input string
                    <br />
                    Extracts all matching results
                    <br />
                    Supports flags like g, i, m
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

                {/* MATCHES OUTPUT */}
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
                      Matches
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
                      {matches.length > 0 ? (
                        matches.map((m, idx) => (
                          <div key={idx}>
                            {m.value}{" "}
                            <span style={{ opacity: 0.6 }}>
                              (index: {m.index})
                            </span>
                          </div>
                        ))
                      ) : (
                        <span style={{ color: 'var(--red-color)' }}>
                          {errorMessage || 'No matches found'}
                        </span>
                      )}
                    </Typography>
                  </Paper>
                </Grid>

                {/* STATS */}

                <Grid item xs={12} sm={4}>
                  <Paper sx={statsStyle}>
                    <CTypography cvariant='c'>
                      Match Count
                    </CTypography>
                    <Typography variant='h6'>
                      {matchCount.toLocaleString()}
                    </Typography>
                  </Paper>
                </Grid>

                <Grid item xs={12} sm={4}>
                  <Paper sx={statsStyle}>
                    <CTypography cvariant='c'>
                      Pattern Length
                    </CTypography>
                    <Typography variant='h6'>
                      {patternLength.toLocaleString()}
                    </Typography>
                  </Paper>
                </Grid>

                <Grid item xs={12} sm={4}>
                  <Paper sx={statsStyle}>
                    <CTypography cvariant='c'>
                      Test Length
                    </CTypography>
                    <Typography variant='h6'>
                      {testLength.toLocaleString()}
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