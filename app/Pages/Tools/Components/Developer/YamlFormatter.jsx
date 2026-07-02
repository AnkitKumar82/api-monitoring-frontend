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

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'

import YAML from 'yaml'
import copy from 'copy-to-clipboard'

import CButton from '../../../../Components/CButton'
import CSelect from '../../../../Components/CSelect'
import CTextField from '../../../../Components/CTextField'
import CTypography from '../../../../Components/CTypography'

import { useApp } from '../../../../DataStores/AppContext'

export default function YamlFormatterPage() {
  const { setAlert } = useApp()

  const [yamlInput, setYamlInput] = useState(`name: John Doe
age: 30
isAdmin: false
address:
  city: New York
  zip: "10001"
skills:
  - React
  - Node.js
  - TypeScript
projects:
  - name: Portfolio
    year: 2024
  - name: Dashboard
    year: 2025`)

  const [formattedYaml, setFormattedYaml] = useState('')

  const [indent, setIndent] = useState(2)

  const [isValid, setIsValid] = useState(true)

  const [errorMessage, setErrorMessage] = useState('')

  const [totalCharacters, setTotalCharacters] = useState(0)
  const [charactersWithoutSpaces, setCharactersWithoutSpaces] = useState(0)
  const [lineCount, setLineCount] = useState(0)
  const [keyCount, setKeyCount] = useState(0)
  const [maxDepth, setMaxDepth] = useState(0)

  /**
   * Count keys recursively
   */
  const countKeys = (value) => {
    if (value === null || typeof value !== 'object') {
      return 0
    }

    let total = Object.keys(value).length

    Object.values(value).forEach((v) => {
      total += countKeys(v)
    })

    return total
  }

  /**
   * Calculate nesting depth
   */
  const getMaxDepth = (value, depth = 1) => {
    if (value === null || typeof value !== 'object') {
      return depth
    }

    const children = Object.values(value)

    if (!children.length) return depth

    return Math.max(
      depth,
      ...children.map((v) => getMaxDepth(v, depth + 1))
    )
  }

  /**
   * Format YAML
   */
  const formatYamlHandler = () => {
    try {
      const parsed = YAML.parse(yamlInput)

      const pretty = YAML.stringify(parsed, {
        indent
      })

      setFormattedYaml(pretty)

      setIsValid(true)
      setErrorMessage('')

      setTotalCharacters(pretty.length)
      setCharactersWithoutSpaces(pretty.replace(/\s/g, '').length)
      setLineCount(pretty.split('\n').length)

      setKeyCount(countKeys(parsed))
      setMaxDepth(getMaxDepth(parsed))
    } catch (err) {
      setFormattedYaml('')

      setIsValid(false)
      setErrorMessage(err.message)

      setTotalCharacters(0)
      setCharactersWithoutSpaces(0)
      setLineCount(0)
      setKeyCount(0)
      setMaxDepth(0)
    }
  }

  /**
   * Copy formatted YAML
   */
  const handleCopyToClipboard = () => {
    if (!formattedYaml) return

    try {
      copy(formattedYaml)

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
    formatYamlHandler()
  }, [])

  useEffect(() => {
    formatYamlHandler()
  }, [indent])

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
                YAML Formatter Details
              </CTypography>

              <Stack spacing={3}>

                <CTextField
                  label='YAML Input'
                  multiline
                  rows={18}
                  fullWidth
                  value={yamlInput}
                  onChange={(e) =>
                    setYamlInput(e.target.value)
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
                  label='Indentation'
                  fullWidth
                  value={indent}
                  onChange={(e) =>
                    setIndent(Number(e.target.value))
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
                  <MenuItem value={8}>8 Spaces</MenuItem>
                </CSelect>

                <CButton
                  size='large'
                  label='Format YAML'
                  onClick={formatYamlHandler}
                />

                {isValid ? (
                  <Alert severity='success'>
                    YAML is valid.
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
                    YAML Formatter Formula
                  </CTypography>

                  <CTypography cvariant='th' sx={{ mb: 1 }}>
                    Parse → Validate → Pretty Print
                  </CTypography>

                  <CTypography cvariant='c'>
                    Converts YAML into structured data
                    <br />
                    Applies consistent indentation
                    <br />
                    Regenerates clean readable YAML output
                    <br />
                    Computes structural statistics
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

                {/* YAML OUTPUT */}
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
                      Formatted YAML
                    </CTypography>

                    <Typography
                      component='div'
                      onClick={handleCopyToClipboard}
                      sx={{
                        mt: 1,
                        borderRadius: '8px',
                        overflow: 'auto',
                        cursor: 'pointer',
                        '& pre': {
                          margin: 0,
                          background: 'transparent !important'
                        },
                        '&:hover': {
                          bgcolor: 'var(--s-bg-color)'
                        }
                      }}
                    >
                      {formattedYaml ? (
                        <SyntaxHighlighter
                          language='yaml'
                          wrapLongLines
                          customStyle={{
                            margin: 0,
                            padding: '16px',
                            borderRadius: '8px',
                            background: 'transparent'
                          }}
                        >
                          {formattedYaml}
                        </SyntaxHighlighter>
                      ) : (
                        <Typography
                          color='error'
                          sx={{
                            p: 2,
                            fontFamily:
                              'Consolas, Monaco, monospace'
                          }}
                        >
                          {errorMessage ||
                            'No formatted YAML'}
                        </Typography>
                      )}
                    </Typography>
                  </Paper>
                </Grid>

                {/* STATS CARDS */}

                <Grid item xs={12} sm={4}>
                  <Paper sx={statsStyle}>
                    <CTypography cvariant='c'>
                      Valid YAML
                    </CTypography>
                    <Typography variant='h6'>
                      {isValid ? 'Yes' : 'No'}
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
                      Without Spaces
                    </CTypography>
                    <Typography variant='h6'>
                      {charactersWithoutSpaces.toLocaleString()}
                    </Typography>
                  </Paper>
                </Grid>

                <Grid item xs={12} sm={4}>
                  <Paper sx={statsStyle}>
                    <CTypography cvariant='c'>
                      Total Lines
                    </CTypography>
                    <Typography variant='h6'>
                      {lineCount.toLocaleString()}
                    </Typography>
                  </Paper>
                </Grid>

                <Grid item xs={12} sm={4}>
                  <Paper sx={statsStyle}>
                    <CTypography cvariant='c'>
                      Total Keys
                    </CTypography>
                    <Typography variant='h6'>
                      {keyCount.toLocaleString()}
                    </Typography>
                  </Paper>
                </Grid>

                <Grid item xs={12} sm={4}>
                  <Paper sx={statsStyle}>
                    <CTypography cvariant='c'>
                      Maximum Depth
                    </CTypography>
                    <Typography variant='h6'>
                      {maxDepth.toLocaleString()}
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