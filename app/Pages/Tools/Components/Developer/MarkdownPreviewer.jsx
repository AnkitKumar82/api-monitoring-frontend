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
import { marked } from 'marked'

import CButton from '../../../../Components/CButton'
import CSelect from '../../../../Components/CSelect'
import CTextField from '../../../../Components/CTextField'
import CTypography from '../../../../Components/CTypography'

import { useApp } from '../../../../DataStores/AppContext'

export default function MarkdownPreviewerPage() {
  const { setAlert } = useApp()

  const [markdown, setMarkdown] = useState(
`# Hello Markdown

This is a **live markdown previewer**.

- Supports lists
- Supports **bold** and *italic*
- Supports code blocks

\`\`\`js
console.log("Hello world")
\`\`\`
`
  )

  const [htmlOutput, setHtmlOutput] = useState('')

  const [isValid, setIsValid] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  const [textLength, setTextLength] = useState(0)
  const [htmlLength, setHtmlLength] = useState(0)

  /**
   * Convert Markdown → HTML
   */
  const convertMarkdown = (md) => {
    try {
      const html = marked.parse(md, {
        breaks: true,
        gfm: true
      })

      return html
    } catch (err) {
      throw new Error('Invalid markdown format')
    }
  }

  /**
   * Main handler
   */
  const handlePreview = () => {
    try {
      const html = convertMarkdown(markdown)

      setHtmlOutput(html)

      setTextLength(markdown.length)
      setHtmlLength(html.length)

      setIsValid(true)
      setErrorMessage('')
    } catch (err) {
      setHtmlOutput('')

      setIsValid(false)
      setErrorMessage(err.message)

      setTextLength(0)
      setHtmlLength(0)
    }
  }

  /**
   * Copy HTML output
   */
  const handleCopy = () => {
    if (!htmlOutput) return

    try {
      copy(htmlOutput)

      setAlert({
        show: true,
        severity: 'success',
        duration: 5000,
        message: 'Copied HTML output'
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
    handlePreview()
  }, [])

  useEffect(() => {
    handlePreview()
  }, [markdown])

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
                Markdown Editor
              </CTypography>

              <Stack spacing={3}>

                <CTextField
                  label='Markdown Input'
                  fullWidth
                  multiline
                  rows={18}
                  value={markdown}
                  onChange={(e) =>
                    setMarkdown(e.target.value)
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

                <CButton
                  size='large'
                  label='Render Preview'
                  onClick={handlePreview}
                />

                {isValid ? (
                  <Alert severity='success'>
                    Markdown rendered successfully
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
                    Markdown Syntax Support
                  </CTypography>

                  <CTypography cvariant='th' sx={{ mb: 1 }}>
                    GitHub Flavored Markdown (GFM)
                  </CTypography>

                  <CTypography cvariant='c'>
                    Supports headings, lists, links,
                    tables, and code blocks.
                    <br />
                    <br />
                    Live preview updates automatically.
                    <br />
                    HTML output can be copied directly.
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
                Preview
              </CTypography>

              <Grid container spacing={2} sx={{ mt: 1 }}>

                {/* RENDERED OUTPUT */}
                <Grid item xs={12}>
                  <Paper
                    sx={{
                      p: 2,
                      border: '1px solid var(--p-fg-st-color)',
                      boxShadow: '0 0 2500px var(--p-b-color)',
                      borderRadius: '8px',
                      maxHeight: '500px',
                      overflow: 'auto'
                    }}
                  >
                    <CTypography cvariant='c'>
                      Rendered HTML
                    </CTypography>

                    <Typography
                      onClick={handleCopy}
                      sx={{
                        mt: 1,
                        p: 2,
                        borderRadius: '8px',
                        fontFamily:
                          'Consolas, Monaco, monospace',
                        fontSize: '13px',
                        whiteSpace: 'pre-wrap',
                        wordBreak: 'break-word',
                        cursor: 'pointer',
                        bgcolor: 'transparent',
                        '&:hover': {
                          bgcolor: 'var(--s-bg-color)'
                        }
                      }}
                    >
                      {htmlOutput ? (
                        htmlOutput
                      ) : (
                        <span style={{ color: 'var(--red-color)' }}>
                          {errorMessage ||
                            'No preview available'}
                        </span>
                      )}
                    </Typography>
                  </Paper>
                </Grid>

                {/* STATS */}

                <Grid item xs={12} sm={6}>
                  <Paper sx={statsStyle}>
                    <CTypography cvariant='c'>
                      Markdown Length
                    </CTypography>
                    <Typography variant='h6'>
                      {textLength.toLocaleString()}
                    </Typography>
                  </Paper>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Paper sx={statsStyle}>
                    <CTypography cvariant='c'>
                      HTML Length
                    </CTypography>
                    <Typography variant='h6'>
                      {htmlLength.toLocaleString()}
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