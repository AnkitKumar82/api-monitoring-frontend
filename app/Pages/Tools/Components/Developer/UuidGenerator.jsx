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

export default function UUIDGeneratorPage() {
  const { setAlert } = useApp()

  const [uuidCount, setUuidCount] = useState(5)
  const [uuidVersion, setUuidVersion] = useState('v4')

  const [generatedUUIDs, setGeneratedUUIDs] = useState([])

  const [isValid, setIsValid] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  const [totalGenerated, setTotalGenerated] = useState(0)
  const [lineCount, setLineCount] = useState(0)

  /**
   * Generate a single UUID v4 (browser-safe)
   */
  const generateUUIDv4 = () => {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
      return crypto.randomUUID()
    }

    // fallback UUID v4 generator
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
      /[xy]/g,
      (c) => {
        const r = (Math.random() * 16) | 0
        const v = c === 'x' ? r : (r & 0x3) | 0x8
        return v.toString(16)
      }
    )
  }

  /**
   * Generate UUID list
   */
  const generateUUIDs = () => {
    try {
      const list = []

      for (let i = 0; i < Number(uuidCount); i++) {
        list.push(generateUUIDv4())
      }

      setGeneratedUUIDs(list)

      setIsValid(true)
      setErrorMessage('')

      setTotalGenerated(list.length)
      setLineCount(list.length)
    } catch (err) {
      setGeneratedUUIDs([])

      setIsValid(false)
      setErrorMessage('Failed to generate UUIDs')

      setTotalGenerated(0)
      setLineCount(0)
    }
  }

  /**
   * Copy all UUIDs
   */
  const handleCopyToClipboard = () => {
    if (!generatedUUIDs.length) return

    try {
      copy(generatedUUIDs.join('\n'))

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
    generateUUIDs()
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
                UUID Generator
              </CTypography>

              <Stack spacing={3}>

                <CTextField
                  label='Number of UUIDs'
                  fullWidth
                  value={uuidCount}
                  onChange={(e) => {
                    const val = Number(e.target.value)
                    setUuidCount(val)
                  }}
                  helperText='Generate multiple UUIDs at once'
                  sx={{
                    '.MuiOutlinedInput-notchedOutline': {
                      border:
                        '1px solid var(--p-fg-st-color)'
                    }
                  }}
                />

                <CSelect
                  select
                  label='UUID Version'
                  fullWidth
                  value={uuidVersion}
                  onChange={(e) =>
                    setUuidVersion(e.target.value)
                  }
                  sx={{
                    '.MuiOutlinedInput-notchedOutline': {
                      border:
                        '1px solid var(--p-fg-st-color)'
                    }
                  }}
                >
                  <MenuItem value='v4'>
                    UUID v4 (Random)
                  </MenuItem>
                </CSelect>

                <CButton
                  size='large'
                  label='Generate UUIDs'
                  onClick={generateUUIDs}
                />

                {isValid ? (
                  <Alert severity='success'>
                    UUIDs generated successfully
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
                    UUID Generator Formula
                  </CTypography>

                  <CTypography cvariant='th' sx={{ mb: 1 }}>
                    Random → Hex → Standard UUID Format
                  </CTypography>

                  <CTypography cvariant='c'>
                    Generates RFC-compliant UUID v4
                    identifiers.
                    <br />
                    <br />
                    Uses crypto.randomUUID when
                    available, fallback included.
                    <br />
                    <br />
                    Produces globally unique identifiers
                    for systems and databases.
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
                      Generated UUIDs
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
                      {generatedUUIDs.length > 0 ? (
                        generatedUUIDs.join('\n')
                      ) : (
                        <span style={{ color: 'var(--red-color)' }}>
                          {errorMessage ||
                            'No UUIDs generated'}
                        </span>
                      )}
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