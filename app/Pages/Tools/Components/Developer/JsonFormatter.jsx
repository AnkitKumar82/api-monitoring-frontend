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

import copy from 'copy-to-clipboard'

import CButton from '../../../../Components/CButton'
import CSelect from '../../../../Components/CSelect'
import CTextField from '../../../../Components/CTextField'
import CTypography from '../../../../Components/CTypography'

import { useApp } from '../../../../DataStores/AppContext'

export default function JsonFormatterPage() {
  const {
    setAlert
  } = useApp()

  const [jsonInput, setJsonInput] = useState(`{
  "name": "John Doe",
  "age": 30,
  "isAdmin": false,
  "address": {
    "city": "New York",
    "zip": "10001"
  },
  "skills": [
    "React",
    "Node.js",
    "TypeScript"
  ],
  "projects": [
    {
      "name": "Portfolio",
      "year": 2024
    },
    {
      "name": "Dashboard",
      "year": 2025
    }
  ]
}`)

  const [formattedJson, setFormattedJson] = useState('')

  const [indent, setIndent] = useState(2)

  const [isValid, setIsValid] = useState(true)

  const [errorMessage, setErrorMessage] = useState('')

  const [totalCharacters, setTotalCharacters] =
    useState(0)

  const [charactersWithoutSpaces,
    setCharactersWithoutSpaces] =
    useState(0)

  const [lineCount, setLineCount] =
    useState(0)

  const [keyCount, setKeyCount] =
    useState(0)

  const [maxDepth, setMaxDepth] =
    useState(0)

  /**
   * Counts every key inside an object recursively
   */
  const countKeys = (value) => {
    if (
      value === null ||
      typeof value !== 'object'
    ) {
      return 0
    }

    let total =
      Object.keys(value).length

    Object.values(value).forEach((item) => {
      total += countKeys(item)
    })

    return total
  }

  const handleJsonKeyDown = (e) => {
    if (e.key !== 'Tab') {
        return
    }

    e.preventDefault()

    const textarea = e.target

    const start = textarea.selectionStart
    const end = textarea.selectionEnd

    const tab = '  ' // 2 spaces

    const newValue =
        jsonInput.substring(0, start) +
        tab +
        jsonInput.substring(end)

    setJsonInput(newValue)

    requestAnimationFrame(() => {
        textarea.selectionStart = start + tab.length
        textarea.selectionEnd = start + tab.length
    })
    }

  /**
   * Calculates maximum nesting depth
   */
  const getMaxDepth = (
    value,
    depth = 1
  ) => {
    if (
      value === null ||
      typeof value !== 'object'
    ) {
      return depth
    }

    const children =
      Object.values(value)

    if (children.length === 0) {
      return depth
    }

    return Math.max(
      depth,
      ...children.map((item) =>
        getMaxDepth(
          item,
          depth + 1
        )
      )
    )
  }

  /**
   * Formats JSON and calculates statistics
   */
  const formatJsonHandler = () => {
    try {
      const parsed =
        JSON.parse(jsonInput)

      const pretty =
        JSON.stringify(
          parsed,
          null,
          indent
        )

      setFormattedJson(pretty)

      setIsValid(true)

      setErrorMessage('')

      setTotalCharacters(
        pretty.length
      )

      setCharactersWithoutSpaces(
        pretty.replace(/\s/g, '')
          .length
      )

      setLineCount(
        pretty.split('\n').length
      )

      setKeyCount(
        countKeys(parsed)
      )

      setMaxDepth(
        getMaxDepth(parsed)
      )
    } catch (err) {
      setFormattedJson('')

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
   * Copies formatted JSON
   */
  const handleCopyToClipboard = () => {
    if (!formattedJson) {
      return
    }

    try {
      copy(formattedJson)

      setAlert({
        show: true,
        severity: 'success',
        duration: 5000,
        message:
          'Copied to clipboard'
      })
    } catch (err) {
      setAlert({
        show: true,
        severity: 'error',
        duration: 5000,
        message:
          'Failed to copy to clipboard'
      })
    }
  }

  useEffect(() => {
    formatJsonHandler()
  }, [])

  useEffect(() => {
    formatJsonHandler()
  }, [indent])

  return (
    <Container>

      {/* Calculator */}

      <Grid
        container
        spacing={3}
        mb={4}
      >
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
                JSON Formatter Details
              </CTypography>

              <Stack spacing={3}>

                <CTextField
                  label='JSON Input'
                  multiline
                  rows={18}
                  fullWidth
                  value={jsonInput}
                  onChange={(e) =>
                    setJsonInput(e.target.value)
                  }
                  onKeyDown={handleJsonKeyDown}
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
                    setIndent(
                      Number(e.target.value)
                    )
                  }
                  sx={{
                    '.MuiOutlinedInput-notchedOutline': {
                      border:
                        '1px solid var(--p-fg-st-color)'
                    }
                  }}
                >
                  <MenuItem value={2}>
                    2 Spaces
                  </MenuItem>

                  <MenuItem value={4}>
                    4 Spaces
                  </MenuItem>

                  <MenuItem value={8}>
                    8 Spaces
                  </MenuItem>
                </CSelect>

                <CButton
                  size='large'
                  label='Format JSON'
                  onClick={formatJsonHandler}
                />

                {isValid ? (
                  <Alert severity='success'>
                    JSON is valid.
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
                  <CTypography
                    cvariant='c'
                    sx={{ mb: '8px' }}
                  >
                    JSON Formatter Formula
                  </CTypography>

                  <CTypography
                    cvariant='th'
                    sx={{ mb: '8px' }}
                  >
                    Parse → Validate → Pretty Print
                  </CTypography>

                  <CTypography cvariant='c'>
                    Validates JSON syntax before
                    formatting.
                    <br />
                    <br />
                    Pretty prints the JSON using the
                    selected indentation level.
                    <br />
                    <br />
                    Calculates useful statistics such
                    as keys, nesting depth, line count
                    and character count.
                  </CTypography>
                </Paper>

              </Stack>
            </CardContent>
          </Card>
        </Grid>
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

              <Grid
                container
                spacing={2}
                sx={{ mt: 1 }}
              >

                <Grid item xs={12}>
                  <Paper
                    sx={{
                      p: 2,
                      border:
                        '1px solid var(--p-fg-st-color)',
                      boxShadow:
                        '0 0 2500px var(--p-b-color)',
                      borderRadius: '8px'
                    }}
                  >
                    <CTypography cvariant='c'>
                      Formatted JSON
                    </CTypography>

                    <Typography
                      component='div'
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
                      onClick={handleCopyToClipboard}
                    >
                      {formattedJson ? (
                        <SyntaxHighlighter
                          language='json'
                          wrapLongLines
                          customStyle={{
                            margin: 0,
                            padding: '16px',
                            borderRadius: '8px',
                            background: 'transparent'
                          }}
                        >
                          {formattedJson}
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
                            'No formatted JSON'}
                        </Typography>
                      )}
                    </Typography>
                  </Paper>
                </Grid>

                <Grid item xs={12} sm={4}>
                  <Paper
                    sx={{
                      p: 2,
                      border:
                        '1px solid var(--p-fg-st-color)',
                      boxShadow:
                        '0 0 2500px var(--p-b-color)',
                      borderRadius: '8px'
                    }}
                  >
                    <CTypography cvariant='c'>
                      Valid JSON
                    </CTypography>

                    <Typography variant='h6'>
                      {isValid ? 'Yes' : 'No'}
                    </Typography>
                  </Paper>
                </Grid>

                <Grid item xs={12} sm={4}>
                  <Paper
                    sx={{
                      p: 2,
                      border:
                        '1px solid var(--p-fg-st-color)',
                      boxShadow:
                        '0 0 2500px var(--p-b-color)',
                      borderRadius: '8px'
                    }}
                  >
                    <CTypography cvariant='c'>
                      Total Characters
                    </CTypography>

                    <Typography variant='h6'>
                      {totalCharacters.toLocaleString()}
                    </Typography>
                  </Paper>
                </Grid>

                <Grid item xs={12} sm={4}>
                  <Paper
                    sx={{
                      p: 2,
                      border:
                        '1px solid var(--p-fg-st-color)',
                      boxShadow:
                        '0 0 2500px var(--p-b-color)',
                      borderRadius: '8px'
                    }}
                  >
                    <CTypography cvariant='c'>
                      Without Spaces
                    </CTypography>

                    <Typography variant='h6'>
                      {charactersWithoutSpaces.toLocaleString()}
                    </Typography>
                  </Paper>
                </Grid>

                <Grid item xs={12} sm={4}>
                  <Paper
                    sx={{
                      p: 2,
                      border:
                        '1px solid var(--p-fg-st-color)',
                      boxShadow:
                        '0 0 2500px var(--p-b-color)',
                      borderRadius: '8px'
                    }}
                  >
                    <CTypography cvariant='c'>
                      Total Lines
                    </CTypography>

                    <Typography variant='h6'>
                      {lineCount.toLocaleString()}
                    </Typography>
                  </Paper>
                </Grid>

                <Grid item xs={12} sm={4}>
                  <Paper
                    sx={{
                      p: 2,
                      border:
                        '1px solid var(--p-fg-st-color)',
                      boxShadow:
                        '0 0 2500px var(--p-b-color)',
                      borderRadius: '8px'
                    }}
                  >
                    <CTypography cvariant='c'>
                      Total Keys
                    </CTypography>

                    <Typography variant='h6'>
                      {keyCount.toLocaleString()}
                    </Typography>
                  </Paper>
                </Grid>

                <Grid item xs={12} sm={4}>
                  <Paper
                    sx={{
                      p: 2,
                      border:
                        '1px solid var(--p-fg-st-color)',
                      boxShadow:
                        '0 0 2500px var(--p-b-color)',
                      borderRadius: '8px'
                    }}
                  >
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
