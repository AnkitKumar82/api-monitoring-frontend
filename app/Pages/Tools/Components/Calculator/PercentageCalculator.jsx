import { useState, useEffect } from 'react'
import {
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  Paper,
  Stack,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination
} from '@mui/material'
import CTextField from '../../../../Components/CTextField'
import CTypography from '../../../../Components/CTypography'
import CButton from '../../../../Components/CButton'
import { saveAs } from 'file-saver'

const pieChartData = [
  { name: 'Part', value: 0 },
  { name: 'Remainder', value: 100 }
]

const downloadCSV = (summary, breakdownSchedule) => {
  let csv = ''

  csv += `Base Value,${summary.baseValue}\n`
  csv += `Percentage,${summary.percentage}\n`
  csv += `Percentage Value,${summary.percentageValue}\n`
  csv += `Remainder,${summary.remainder}\n\n`

  csv += `Original Value,${summary.originalValue}\n`
  csv += `New Value,${summary.newValue}\n`
  csv += `Absolute Change,${summary.absoluteChange}\n`
  csv += `Percentage Change,${summary.percentageChange}\n\n`

  csv += `Part Value,${summary.partValue}\n`
  csv += `Whole Value,${summary.wholeValue}\n`
  csv += `Part is What Percent,${summary.partIsWhatPercent}\n\n`

  csv += 'Percentage,Value,Remainder\n'
  breakdownSchedule.forEach((row) => {
    csv += `${row.percentage}%,${row.value},${row.remainder}\n`
  })

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  saveAs(blob, 'percentage-calculation.csv')
}

export default function PercentageCalculatorPage() {
  // What is X% of Y
  const [baseValue, setBaseValue] = useState(200)
  const [percentage, setPercentage] = useState('25')

  // Percentage change from X to Y
  const [originalValue, setOriginalValue] = useState(80)
  const [newValue, setNewValue] = useState(100)

  // X is what % of Y
  const [partValue, setPartValue] = useState(25)
  const [wholeValue, setWholeValue] = useState(200)

  const [isBaseValueInvalid, setIsBaseValueInvalid] = useState(false)
  const [isPercentageInvalid, setIsPercentageInvalid] = useState(false)
  const [isOriginalValueInvalid, setIsOriginalValueInvalid] = useState(false)
  const [isNewValueInvalid, setIsNewValueInvalid] = useState(false)
  const [isPartValueInvalid, setIsPartValueInvalid] = useState(false)
  const [isWholeValueInvalid, setIsWholeValueInvalid] = useState(false)

  // Results — section 1
  const [percentageValue, setPercentageValue] = useState(0.0)
  const [remainder, setRemainder] = useState(0.0)

  // Results — section 2
  const [absoluteChange, setAbsoluteChange] = useState(0.0)
  const [percentageChange, setPercentageChange] = useState(0.0)

  // Results — section 3
  const [partIsWhatPercent, setPartIsWhatPercent] = useState(0.0)

  const [breakdownSchedule, setBreakdownSchedule] = useState([])
  const [page, setPage] = useState(0)

  const paginatedSchedule = breakdownSchedule.slice(page * 12, page * 12 + 12)

  const calculatePercentageOnClickHandler = () => {
    const numBaseValue = parseFloat(baseValue)
    const numPercentage = parseFloat(percentage)
    const numOriginalValue = parseFloat(originalValue)
    const numNewValue = parseFloat(newValue)
    const numPartValue = parseFloat(partValue)
    const numWholeValue = parseFloat(wholeValue)

    if (
      isBaseValueInvalid ||
      isPercentageInvalid ||
      isOriginalValueInvalid ||
      isNewValueInvalid ||
      isPartValueInvalid ||
      isWholeValueInvalid
    ) {
      return
    }

    // Section 1: What is X% of Y
    const pVal = (numPercentage / 100) * numBaseValue
    const rem = numBaseValue - pVal
    setPercentageValue(pVal)
    setRemainder(rem)

    // Section 2: Percentage change
    const absChange = numNewValue - numOriginalValue
    const pctChange = numOriginalValue !== 0
      ? ((numNewValue - numOriginalValue) / Math.abs(numOriginalValue)) * 100
      : 0
    setAbsoluteChange(absChange)
    setPercentageChange(pctChange)

    // Section 3: X is what % of Y
    const partPct = numWholeValue !== 0
      ? (numPartValue / numWholeValue) * 100
      : 0
    setPartIsWhatPercent(partPct)

    setBreakdownSchedule(generateBreakdown(numBaseValue))
  }

  const generateBreakdown = (base) => {
    const steps = [10, 20, 25, 30, 40, 50, 60, 70, 75, 80, 90, 100, 110, 120, 125, 150, 200]
    return steps.map((pct) => {
      const val = (pct / 100) * base
      const rem = base - val
      return {
        percentage: pct,
        value: Number(val.toFixed(2)),
        remainder: Number(rem.toFixed(2))
      }
    })
  }

  const saveCSV = () => {
    const summary = {
      baseValue: Number(baseValue).toFixed(2),
      percentage: Number(percentage).toFixed(2),
      percentageValue: percentageValue.toFixed(2),
      remainder: remainder.toFixed(2),
      originalValue: Number(originalValue).toFixed(2),
      newValue: Number(newValue).toFixed(2),
      absoluteChange: absoluteChange.toFixed(2),
      percentageChange: percentageChange.toFixed(2) + '%',
      partValue: Number(partValue).toFixed(2),
      wholeValue: Number(wholeValue).toFixed(2),
      partIsWhatPercent: partIsWhatPercent.toFixed(2) + '%'
    }

    downloadCSV(summary, breakdownSchedule)
  }

  useEffect(() => {
    calculatePercentageOnClickHandler()
  }, [])

  return (
    <Container>
      {/* Calculator */}
      <Grid container spacing={3} mb={4}>
        {/* Inputs */}
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
              <CTypography cvariant='sh'>Percentage Details</CTypography>

              <Stack spacing={3}>

                {/* Section 1 */}
                <Paper
                  sx={{
                    p: 2,
                    border: '1px solid var(--p-fg-st-color)',
                    boxShadow: 'none',
                    borderRadius: '8px'
                  }}
                >
                  <CTypography cvariant='c' sx={{ mb: 2 }}>
                    What is X% of Y?
                  </CTypography>

                  <Stack spacing={2}>
                    <CTextField
                      label='Percentage (X)'
                      fullWidth
                      value={percentage}
                      helperText={'0 < Percentage ≤ 1000'}
                      helperTextStyle={{ pl: '4px' }}
                      sx={{
                        border: isPercentageInvalid
                          ? '1px solid var(--red-color)'
                          : '1px solid var(--p-fg-st-color)',
                        borderRadius: '8px',
                        ':hover': {
                          border: isPercentageInvalid
                            ? '1px solid var(--red-color)'
                            : '1px solid var(--p-fg-st-color)',
                        }
                      }}
                      onChange={(e) => {
                        const value = e.target.value.replace(/,/g, '')
                        if (/^\d*\.?\d*$/.test(value)) {
                          setPercentage(value)
                          const isInvalid = parseFloat(value) <= 0 || parseFloat(value) > 1000
                          setIsPercentageInvalid(isInvalid)
                        } else {
                          setIsPercentageInvalid(true)
                        }
                      }}
                    />

                    <CTextField
                      label='Base Value (Y)'
                      fullWidth
                      value={baseValue.toLocaleString()}
                      helperText={'Enter any numeric value'}
                      helperTextStyle={{ pl: '4px' }}
                      sx={{
                        border: isBaseValueInvalid
                          ? '1px solid var(--red-color)'
                          : '1px solid var(--p-fg-st-color)',
                        borderRadius: '8px',
                        ':hover': {
                          border: isBaseValueInvalid
                            ? '1px solid var(--red-color)'
                            : '1px solid var(--p-fg-st-color)',
                        }
                      }}
                      onChange={(e) => {
                        const rawValue = e.target.value.replace(/,/g, '')
                        const num = Number(rawValue)
                        if (!isNaN(num)) {
                          setBaseValue(num)
                          setIsBaseValueInvalid(rawValue === '')
                        } else {
                          setIsBaseValueInvalid(true)
                        }
                      }}
                    />
                  </Stack>
                </Paper>

                {/* Section 2 */}
                <Paper
                  sx={{
                    p: 2,
                    border: '1px solid var(--p-fg-st-color)',
                    boxShadow: 'none',
                    borderRadius: '8px'
                  }}
                >
                  <CTypography cvariant='c' sx={{ mb: 2 }}>
                    Percentage Change from X to Y
                  </CTypography>

                  <Stack spacing={2}>
                    <CTextField
                      label='Original Value (X)'
                      fullWidth
                      value={originalValue.toLocaleString()}
                      helperText={'Enter original value'}
                      helperTextStyle={{ pl: '4px' }}
                      sx={{
                        border: isOriginalValueInvalid
                          ? '1px solid var(--red-color)'
                          : '1px solid var(--p-fg-st-color)',
                        borderRadius: '8px',
                        ':hover': {
                          border: isOriginalValueInvalid
                            ? '1px solid var(--red-color)'
                            : '1px solid var(--p-fg-st-color)',
                        }
                      }}
                      onChange={(e) => {
                        const rawValue = e.target.value.replace(/,/g, '')
                        const num = Number(rawValue)
                        if (!isNaN(num)) {
                          setOriginalValue(num)
                          setIsOriginalValueInvalid(rawValue === '')
                        } else {
                          setIsOriginalValueInvalid(true)
                        }
                      }}
                    />

                    <CTextField
                      label='New Value (Y)'
                      fullWidth
                      value={newValue.toLocaleString()}
                      helperText={'Enter new value'}
                      helperTextStyle={{ pl: '4px' }}
                      sx={{
                        border: isNewValueInvalid
                          ? '1px solid var(--red-color)'
                          : '1px solid var(--p-fg-st-color)',
                        borderRadius: '8px',
                        ':hover': {
                          border: isNewValueInvalid
                            ? '1px solid var(--red-color)'
                            : '1px solid var(--p-fg-st-color)',
                        }
                      }}
                      onChange={(e) => {
                        const rawValue = e.target.value.replace(/,/g, '')
                        const num = Number(rawValue)
                        if (!isNaN(num)) {
                          setNewValue(num)
                          setIsNewValueInvalid(rawValue === '')
                        } else {
                          setIsNewValueInvalid(true)
                        }
                      }}
                    />
                  </Stack>
                </Paper>

                {/* Section 3 */}
                <Paper
                  sx={{
                    p: 2,
                    border: '1px solid var(--p-fg-st-color)',
                    boxShadow: 'none',
                    borderRadius: '8px'
                  }}
                >
                  <CTypography cvariant='c' sx={{ mb: 2 }}>
                    X is what % of Y?
                  </CTypography>

                  <Stack spacing={2}>
                    <CTextField
                      label='Part Value (X)'
                      fullWidth
                      value={partValue.toLocaleString()}
                      helperText={'Enter part value'}
                      helperTextStyle={{ pl: '4px' }}
                      sx={{
                        border: isPartValueInvalid
                          ? '1px solid var(--red-color)'
                          : '1px solid var(--p-fg-st-color)',
                        borderRadius: '8px',
                        ':hover': {
                          border: isPartValueInvalid
                            ? '1px solid var(--red-color)'
                            : '1px solid var(--p-fg-st-color)',
                        }
                      }}
                      onChange={(e) => {
                        const rawValue = e.target.value.replace(/,/g, '')
                        const num = Number(rawValue)
                        if (!isNaN(num)) {
                          setPartValue(num)
                          setIsPartValueInvalid(rawValue === '')
                        } else {
                          setIsPartValueInvalid(true)
                        }
                      }}
                    />

                    <CTextField
                      label='Whole Value (Y)'
                      fullWidth
                      value={wholeValue.toLocaleString()}
                      helperText={'Enter whole value'}
                      helperTextStyle={{ pl: '4px' }}
                      sx={{
                        border: isWholeValueInvalid
                          ? '1px solid var(--red-color)'
                          : '1px solid var(--p-fg-st-color)',
                        borderRadius: '8px',
                        ':hover': {
                          border: isWholeValueInvalid
                            ? '1px solid var(--red-color)'
                            : '1px solid var(--p-fg-st-color)',
                        }
                      }}
                      onChange={(e) => {
                        const rawValue = e.target.value.replace(/,/g, '')
                        const num = Number(rawValue)
                        if (!isNaN(num)) {
                          setWholeValue(num)
                          setIsWholeValueInvalid(rawValue === '')
                        } else {
                          setIsWholeValueInvalid(true)
                        }
                      }}
                    />
                  </Stack>
                </Paper>

                <CButton
                  size='large'
                  label='Calculate Percentage'
                  onClick={calculatePercentageOnClickHandler}
                />

                <Paper
                  sx={{
                    p: 2,
                    border: '1px solid var(--p-fg-st-color)',
                    boxShadow: 'none',
                    borderRadius: '8px',
                  }}
                >
                  <CTypography cvariant='c' sx={{ mb: '8px' }}>
                    Percentage Formulas
                  </CTypography>

                  <CTypography cvariant='th' sx={{ mb: '8px' }}>
                    P = (X / 100) × Y
                  </CTypography>

                  <CTypography cvariant='c'>
                    P = Percentage Value
                    <br />
                    X = Percentage
                    <br />
                    Y = Base Value
                    <br />
                    Change% = ((New − Old) / |Old|) × 100
                  </CTypography>
                </Paper>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* Results */}
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
              <CTypography cvariant='sh'>Results</CTypography>

              <Grid container spacing={2} sx={{ mt: 1 }}>

                {/* Section 1 results */}
                <Grid item xs={12}>
                  <CTypography cvariant='c' sx={{ px: '4px' }}>
                    What is {percentage}% of {Number(baseValue).toLocaleString()}?
                  </CTypography>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Paper
                    sx={{
                      p: 2,
                      border: '1px solid var(--p-fg-st-color)',
                      boxShadow: '0 0 2500px var(--p-b-color)',
                      borderRadius: '8px'
                    }}
                  >
                    <CTypography cvariant='c'>Percentage Value</CTypography>
                    <Typography variant='h6'>{percentageValue.toFixed(2)}</Typography>
                  </Paper>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Paper
                    sx={{
                      p: 2,
                      border: '1px solid var(--p-fg-st-color)',
                      boxShadow: '0 0 2500px var(--p-b-color)',
                      borderRadius: '8px'
                    }}
                  >
                    <CTypography cvariant='c'>Remainder</CTypography>
                    <Typography variant='h6'>{remainder.toFixed(2)}</Typography>
                  </Paper>
                </Grid>

                {/* Section 2 results */}
                <Grid item xs={12}>
                  <CTypography cvariant='c' sx={{ px: '4px' }}>
                    Percentage change from {Number(originalValue).toLocaleString()} to {Number(newValue).toLocaleString()}
                  </CTypography>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Paper
                    sx={{
                      p: 2,
                      border: '1px solid var(--p-fg-st-color)',
                      boxShadow: '0 0 2500px var(--p-b-color)',
                      borderRadius: '8px'
                    }}
                  >
                    <CTypography cvariant='c'>Absolute Change</CTypography>
                    <Typography variant='h6'>
                      {absoluteChange >= 0 ? '+' : ''}{absoluteChange.toFixed(2)}
                    </Typography>
                  </Paper>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Paper
                    sx={{
                      p: 2,
                      border: '1px solid var(--p-fg-st-color)',
                      boxShadow: '0 0 2500px var(--p-b-color)',
                      borderRadius: '8px'
                    }}
                  >
                    <CTypography cvariant='c'>Percentage Change</CTypography>
                    <Typography variant='h6'>
                      {percentageChange >= 0 ? '+' : ''}{percentageChange.toFixed(2)}%
                    </Typography>
                  </Paper>
                </Grid>

                {/* Section 3 results */}
                <Grid item xs={12}>
                  <CTypography cvariant='c' sx={{ px: '4px' }}>
                    {Number(partValue).toLocaleString()} is what % of {Number(wholeValue).toLocaleString()}?
                  </CTypography>
                </Grid>

                <Grid item xs={12} sm={12}>
                  <Paper
                    sx={{
                      p: 2,
                      border: '1px solid var(--p-fg-st-color)',
                      boxShadow: '0 0 2500px var(--p-b-color)',
                      borderRadius: '8px'
                    }}
                  >
                    <CTypography cvariant='c'>Part is What Percent</CTypography>
                    <Typography variant='h6'>{partIsWhatPercent.toFixed(2)}%</Typography>
                  </Paper>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Download Actions */}
      <Stack direction='row' spacing={2} mb={'4px'}>
        <CButton
          size='large'
          cvariant='l'
          onClick={saveCSV}
          label='Download CSV'
        />
      </Stack>

      {/* Percentage Breakdown Table */}
      <Box mb={6}>
        <CTypography cvariant='sh' sx={{ px: '4px', mb: '4px' }}>
          Percentage Breakdown Schedule
        </CTypography>

        <TableContainer
          component={Paper}
          sx={{
            textAlign: 'center',
            border: '1px solid var(--p-fg-st-color)',
            boxShadow: '0 0 2500px var(--p-b-color)',
            borderRadius: '8px'
          }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align='center'>Percentage</TableCell>
                <TableCell align='right'>Value of {Number(baseValue).toLocaleString()}</TableCell>
                <TableCell align='right'>Remainder</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {paginatedSchedule.map((item, index) => (
                <TableRow key={index}>
                  <TableCell align='center'>{item.percentage}%</TableCell>
                  <TableCell align='right'>{item.value?.toLocaleString()}</TableCell>
                  <TableCell align='right'>{item.remainder?.toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          component={Paper}
          count={breakdownSchedule.length}
          page={page}
          sx={{
            textAlign: 'center',
            border: '1px solid var(--p-fg-st-color)',
            boxShadow: '0 0 2500px var(--p-b-color)',
            borderRadius: '8px'
          }}
          onPageChange={(event, newPage) => setPage(newPage)}
          rowsPerPageOptions={[]}
          rowsPerPage={12}
        />
      </Box>
    </Container>
  )
}