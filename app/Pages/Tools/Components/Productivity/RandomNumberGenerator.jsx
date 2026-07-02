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

export default function RandomNumberGeneratorPage() {
  const { setAlert } = useApp()

  // Core inputs
  const [min, setMin] = useState(1)
  const [max, setMax] = useState(100)
  const [count, setCount] = useState(10)

  // Options
  const [allowDuplicates, setAllowDuplicates] = useState('yes')
  const [outputType, setOutputType] = useState('list') // list | json | csv
  const [sortType, setSortType] = useState('none') // none | asc | desc

  // Output
  const [result, setResult] = useState([])
  const [resultText, setResultText] = useState('')

  // Stats
  const [minGenerated, setMinGenerated] = useState(0)
  const [maxGenerated, setMaxGenerated] = useState(0)
  const [avgGenerated, setAvgGenerated] = useState(0)

  // Validation
  const [isValid, setIsValid] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  /**
   * Secure random number (crypto if available)
   */
  const getRandomNumber = (min, max) => {
    const range = max - min + 1

    if (window.crypto && window.crypto.getRandomValues) {
      const array = new Uint32Array(1)
      window.crypto.getRandomValues(array)
      return min + (array[0] % range)
    }

    return Math.floor(Math.random() * range) + min
  }

  /**
   * Generate random numbers
   */
  const generateNumbers = () => {
    try {
      const minVal = Number(min)
      const maxVal = Number(max)
      const countVal = Number(count)

      if (minVal > maxVal) {
        throw new Error('Min cannot be greater than Max')
      }

      if (countVal <= 0) {
        throw new Error('Count must be greater than 0')
      }

      const numbers = []

      for (let i = 0; i < countVal; i++) {
        let num = getRandomNumber(minVal, maxVal)

        if (allowDuplicates === 'no') {
          while (numbers.includes(num)) {
            num = getRandomNumber(minVal, maxVal)
          }
        }

        numbers.push(num)
      }

      // Sorting
      if (sortType === 'asc') numbers.sort((a, b) => a - b)
      if (sortType === 'desc') numbers.sort((a, b) => b - a)

      // Stats
      const sum = numbers.reduce((a, b) => a + b, 0)
      const avg = numbers.length ? sum / numbers.length : 0

      setResult(numbers)
      setMinGenerated(Math.min(...numbers))
      setMaxGenerated(Math.max(...numbers))
      setAvgGenerated(avg)

      // Format output
      let formatted = ''

      if (outputType === 'list') {
        formatted = numbers.join('\n')
      }

      if (outputType === 'csv') {
        formatted = numbers.join(',')
      }

      if (outputType === 'json') {
        formatted = JSON.stringify(numbers, null, 2)
      }

      setResultText(formatted)

      setIsValid(true)
      setErrorMessage('')
    } catch (err) {
      setResult([])
      setResultText('')

      setIsValid(false)
      setErrorMessage(err.message)

      setMinGenerated(0)
      setMaxGenerated(0)
      setAvgGenerated(0)
    }
  }

  /**
   * Copy result
   */
  const handleCopy = () => {
    if (!resultText) return

    try {
      copy(resultText)

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
    generateNumbers()
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
                Random Number Generator
              </CTypography>

              <Stack spacing={3}>

                <CTextField
                  label='Minimum Value'
                  fullWidth
                  value={min}
                  onChange={(e) => setMin(e.target.value)}
                />

                <CTextField
                  label='Maximum Value'
                  fullWidth
                  value={max}
                  onChange={(e) => setMax(e.target.value)}
                />

                <CTextField
                  label='Count'
                  fullWidth
                  value={count}
                  onChange={(e) => setCount(e.target.value)}
                />

                {/* Allow duplicates */}
                <CSelect
                  select
                  label='Allow Duplicates'
                  fullWidth
                  value={allowDuplicates}
                  onChange={(e) =>
                    setAllowDuplicates(e.target.value)
                  }
                  sx={{
                    '.MuiOutlinedInput-notchedOutline': {
                      border:
                        '1px solid var(--p-fg-st-color)'
                    }
                  }}
                >
                  <MenuItem value='yes'>Yes</MenuItem>
                  <MenuItem value='no'>No</MenuItem>
                </CSelect>

                {/* Output type */}
                <CSelect
                  select
                  label='Output Format'
                  fullWidth
                  value={outputType}
                  onChange={(e) =>
                    setOutputType(e.target.value)
                  }
                  sx={{
                    '.MuiOutlinedInput-notchedOutline': {
                      border:
                        '1px solid var(--p-fg-st-color)'
                    }
                  }}
                >
                  <MenuItem value='list'>List</MenuItem>
                  <MenuItem value='csv'>CSV</MenuItem>
                  <MenuItem value='json'>JSON</MenuItem>
                </CSelect>

                {/* Sorting */}
                <CSelect
                  select
                  label='Sort Order'
                  fullWidth
                  value={sortType}
                  onChange={(e) =>
                    setSortType(e.target.value)
                  }
                  sx={{
                    '.MuiOutlinedInput-notchedOutline': {
                      border:
                        '1px solid var(--p-fg-st-color)'
                    }
                  }}
                >
                  <MenuItem value='none'>None</MenuItem>
                  <MenuItem value='asc'>Ascending</MenuItem>
                  <MenuItem value='desc'>Descending</MenuItem>
                </CSelect>

                {/* Generate Button */}
                <CButton
                  size='large'
                  label='Generate Numbers'
                  onClick={generateNumbers}
                />

                {/* Validation */}
                {isValid ? (
                  <Alert severity='success'>
                    Numbers generated successfully
                  </Alert>
                ) : (
                  <Alert severity='error'>
                    {errorMessage}
                  </Alert>
                )}

                {/* Info Panel */}
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
                    Generator Rules
                  </CTypography>

                  <CTypography cvariant='th' sx={{ mb: 1 }}>
                    Secure random generation supported
                  </CTypography>

                  <CTypography cvariant='c'>
                    Supports crypto-based randomness when available.
                    <br />
                    Duplicate control enabled.
                    <br />
                    Sorting and output formatting supported.
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
                      Generated Output
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
                      {resultText ? (
                        resultText
                      ) : (
                        <span style={{ color: 'var(--red-color)' }}>
                          {errorMessage ||
                            'No numbers generated'}
                        </span>
                      )}
                    </Typography>
                  </Paper>
                </Grid>

                {/* STATS */}

                <Grid item xs={12} sm={4}>
                  <Paper sx={statsStyle}>
                    <CTypography cvariant='c'>
                      Minimum
                    </CTypography>
                    <Typography variant='h6'>
                      {minGenerated}
                    </Typography>
                  </Paper>
                </Grid>

                <Grid item xs={12} sm={4}>
                  <Paper sx={statsStyle}>
                    <CTypography cvariant='c'>
                      Maximum
                    </CTypography>
                    <Typography variant='h6'>
                      {maxGenerated}
                    </Typography>
                  </Paper>
                </Grid>

                <Grid item xs={12} sm={4}>
                  <Paper sx={statsStyle}>
                    <CTypography cvariant='c'>
                      Average
                    </CTypography>
                    <Typography variant='h6'>
                      {avgGenerated.toFixed(2)}
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