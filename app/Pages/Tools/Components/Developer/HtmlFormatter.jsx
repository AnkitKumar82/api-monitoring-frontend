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

export default function HtmlFormatterPage() {
  const { setAlert } = useApp()

  const [inputHtml, setInputHtml] = useState(
`<div><h1>Hello</h1><p>This is <b>HTML</b></p></div>`
  )

  const [formattedHtml, setFormattedHtml] = useState('')

  const [indentSize, setIndentSize] = useState(2)

  const [isValid, setIsValid] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  const [inputLength, setInputLength] = useState(0)
  const [outputLength, setOutputLength] = useState(0)

  /**
   * Simple HTML beautifier (no external deps)
   */
  const formatHtml = (html, indent = 2) => {
    try {
      const voidTags = [
        'area',
        'base',
        'br',
        'col',
        'embed',
        'hr',
        'img',
        'input',
        'link',
        'meta',
        'param',
        'source',
        'track',
        'wbr'
      ]

      let formatted = ''
      let indentLevel = 0

      const tokens = html
        .replace(/>\s*</g, '><')
        .split(/(?=<)|(?<=>)/g)
        .filter(Boolean)

      tokens.forEach((token) => {
        const isClosing = token.startsWith('</')
        const isOpening = token.startsWith('<') && !isClosing
        const tagNameMatch = token.match(/<\/?([a-zA-Z0-9-]+)/)
        const tagName = tagNameMatch?.[1]?.toLowerCase()

        if (isClosing) {
          indentLevel = Math.max(indentLevel - 1, 0)
        }

        const indentation = ' '.repeat(indentLevel * indent)

        formatted += indentation + token.trim() + '\n'

        if (
          isOpening &&
          tagName &&
          !voidTags.includes(tagName) &&
          !token.endsWith('/>')
        ) {
          indentLevel++
        }
      })

      return formatted.trim()
    } catch (err) {
      throw new Error('Invalid HTML input')
    }
  }

  /**
   * Main handler
   */
  const handleFormat = () => {
    try {
      const formatted = formatHtml(inputHtml, indentSize)

      setFormattedHtml(formatted)

      setInputLength(inputHtml.length)
      setOutputLength(formatted.length)

      setIsValid(true)
      setErrorMessage('')
    } catch (err) {
      setFormattedHtml('')

      setIsValid(false)
      setErrorMessage(err.message)

      setInputLength(0)
      setOutputLength(0)
    }
  }

  /**
   * Copy formatted HTML
   */
  const handleCopy = () => {
    if (!formattedHtml) return

    try {
      copy(formattedHtml)

      setAlert({
        show: true,
        severity: 'success',
        duration: 5000,
        message: 'HTML copied to clipboard'
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
    handleFormat()
  }, [])

  useEffect(() => {
    handleFormat()
  }, [inputHtml, indentSize])

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
                HTML Formatter
              </CTypography>

              <Stack spacing={3}>

                <CTextField
                  label='HTML Input'
                  fullWidth
                  multiline
                  rows={16}
                  value={inputHtml}
                  onChange={(e) =>
                    setInputHtml(e.target.value)
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
                      fontSize: '14px',
                      lineHeight: 1.4
                    }
                  }}
                />

                <CSelect
                  select
                  label='Indent Size'
                  fullWidth
                  value={indentSize}
                  onChange={(e) =>
                    setIndentSize(Number(e.target.value))
                  }
                  sx={{
                    '.MuiOutlinedInput-notchedOutline': {
                      border:
                        '1px solid var(--p-fg-st-color)'
                    }
                  }}
                >
                  <MenuItem value={2}>2 Spaces</MenuItem>
                  <MenuItem value={4}>4 Spaces</MenuItem>
                  <MenuItem value={6}>6 Spaces</MenuItem>
                  <MenuItem value={8}>8 Spaces</MenuItem>
                </CSelect>

                <CButton
                  size='large'
                  label='Format HTML'
                  onClick={handleFormat}
                />

                {isValid ? (
                  <Alert severity='success'>
                    HTML formatted successfully
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
                    HTML Formatter Rules
                  </CTypography>

                  <CTypography cvariant='th' sx={{ mb: 1 }}>
                    Token-based indentation engine
                  </CTypography>

                  <CTypography cvariant='c'>
                    Automatically formats nested HTML tags.
                    <br />
                    <br />
                    Preserves void elements like img, br,
                    input.
                    <br />
                    Supports custom indentation size.
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
                      Formatted HTML
                    </CTypography>

                    <Typography
                      onClick={handleCopy}
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
                      {formattedHtml ? (
                        formattedHtml
                      ) : (
                        <span style={{ color: 'var(--red-color)' }}>
                          {errorMessage ||
                            'No formatted output available'}
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

              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  )
}