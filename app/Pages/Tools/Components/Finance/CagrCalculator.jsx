import { useState, useEffect } from 'react'
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  MenuItem,
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
import CPieChart from '../../../../Components/CPieChart'
import CSelect from '../../../../Components/CSelect'
import { saveAs } from 'file-saver'


const pieChartData = [
  { name: 'Initial Value', value: 1000 },
  { name: 'Gain', value: 0 }
]

const downloadCSV = (
  summary,
  yearlySchedule
) => {
  let csv = ''

  csv += `Initial Value,${summary.initialValue}\n`
  csv += `Final Value,${summary.finalValue}\n`
  csv += `Investment Duration (Years),${summary.investmentYears}\n`
  csv += `CAGR,${summary.cagr}\n`
  csv += `Absolute Gain,${summary.absoluteGain}\n`
  csv += `Total Return,${summary.totalReturn}\n\n`

  csv +=
    'Year,Starting Value,Growth,Ending Value\n'

  yearlySchedule.forEach((row) => {
    csv += `${row.year},${row.startingValue},${row.growth},${row.endingValue}\n`
  })

  const blob = new Blob([csv], {
    type: 'text/csv;charset=utf-8;',
  })

  saveAs(blob, 'cagr-calculation.csv')
}
export default function CagrCalculatorPage() {
  const [initialValue, setInitialValue] = useState(1000)
  const [finalValue, setFinalValue] = useState(2000)
  const [investmentYears, setInvestmentYears] = useState(5)

  const [isInitialValueInvalid, setIsInitialValueInvalid] =
    useState(false)
  const [isFinalValueInvalid, setIsFinalValueInvalid] =
    useState(false)
  const [isInvestmentYearsInvalid, setIsInvestmentYearsInvalid] =
    useState(false)

  const [cagr, setCagr] = useState(0.0)
  const [absoluteGain, setAbsoluteGain] = useState(0.0)
  const [totalReturn, setTotalReturn] = useState(0.0)

  const [pieChart, setPieChart] =
    useState(pieChartData)

  const [yearlySchedule, setYearlySchedule] =
    useState([])

  const [page, setPage] = useState(0)

  const paginatedSchedule = yearlySchedule.slice(
    page * 12,
    page * 12 + 12
  )
    const calculateCagrOnClickHandler = () => {
    const numInitialValue = parseFloat(initialValue)
    const numFinalValue = parseFloat(finalValue)
    const numInvestmentYears = parseFloat(investmentYears)

    if (
      isInitialValueInvalid ||
      isFinalValueInvalid ||
      isInvestmentYearsInvalid ||
      numInitialValue <= 0 ||
      numFinalValue <= 0 ||
      numInvestmentYears <= 0
    ) {
      return
    }

    const calculatedCagr =
      (Math.pow(numFinalValue / numInitialValue, 1 / numInvestmentYears) - 1) * 100

    const gain = numFinalValue - numInitialValue

    const returnPercentage =
      (gain / numInitialValue) * 100

    setCagr(calculatedCagr)
    setAbsoluteGain(gain)
    setTotalReturn(returnPercentage)

    setPieChart([
      {
        name: 'Initial Value',
        value: numInitialValue
      },
      {
        name: gain >= 0 ? 'Gain' : 'Loss',
        value: Math.abs(gain)
      }
    ])

    const options = {
      initialValue: numInitialValue,
      finalValue: numFinalValue,
      investmentYears: numInvestmentYears,
      annualRate: calculatedCagr
    }

    const result = generateYearlySchedule(options)

    setYearlySchedule(result)
  }
    const generateYearlySchedule = ({
    initialValue,
    finalValue,
    investmentYears,
    annualRate
  }) => {
    const schedule = []

    for (let currentYear = 1; currentYear <= investmentYears; currentYear++) {
      const startingValue =
        initialValue *
        Math.pow(
          1 + annualRate / 100,
          currentYear - 1
        )

      const endingValue =
        currentYear === investmentYears
          ? finalValue
          : initialValue *
            Math.pow(
              1 + annualRate / 100,
              currentYear
            )

      const growth = endingValue - startingValue

      schedule.push({
        year: currentYear,
        startingValue: Number(startingValue.toFixed(2)),
        growth: Number(growth.toFixed(2)),
        endingValue: Number(endingValue.toFixed(2))
      })
    }

    return schedule
  }

  const saveCSV = () => {
    const summary = {
      initialValue: Number(initialValue).toFixed(2),
      finalValue: Number(finalValue).toFixed(2),
      investmentYears: Number(investmentYears).toFixed(2),
      cagr: cagr.toFixed(2),
      absoluteGain: absoluteGain.toFixed(2),
      totalReturn: totalReturn.toFixed(2)
    }

    downloadCSV(summary, yearlySchedule)
  }

  useEffect(() => {
    calculateCagrOnClickHandler()
  }, [])

  return (    <Container>
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
              <CTypography cvariant='sh'>CAGR Details</CTypography>

              <Stack spacing={3}>
                <CTextField
                  label='Initial Value'
                  fullWidth
                  value={initialValue.toLocaleString()}
                  helperText={`0 < Amount < ${(1000000000).toLocaleString()}`}
                  helperTextStyle={{ pl: '4px' }}
                  sx={{
                    border: isInitialValueInvalid
                      ? '1px solid var(--red-color)'
                      : '1px solid var(--p-fg-st-color)',
                    borderRadius: '8px',
                    ':hover': {
                      border: isInitialValueInvalid
                        ? '1px solid var(--red-color)'
                        : '1px solid var(--p-fg-st-color)',
                    }
                  }}
                  onChange={(e) => {
                    const rawValue = e.target.value.replace(/,/g, '')
                    const num = Number(rawValue)

                    if (!isNaN(num)) {
                      setInitialValue(num)

                      const isInvalid =
                        num <= 0 || num > 1000000000

                      setIsInitialValueInvalid(isInvalid)
                    } else {
                      setIsInitialValueInvalid(true)
                    }
                  }}
                />

                <CTextField
                  label='Final Value'
                  fullWidth
                  value={finalValue.toLocaleString()}
                  helperText={`0 < Amount < ${(1000000000).toLocaleString()}`}
                  helperTextStyle={{ pl: '4px' }}
                  sx={{
                    border: isFinalValueInvalid
                      ? '1px solid var(--red-color)'
                      : '1px solid var(--p-fg-st-color)',
                    borderRadius: '8px',
                    ':hover': {
                      border: isFinalValueInvalid
                        ? '1px solid var(--red-color)'
                        : '1px solid var(--p-fg-st-color)',
                    }
                  }}
                  onChange={(e) => {
                    const rawValue = e.target.value.replace(/,/g, '')
                    const num = Number(rawValue)

                    if (!isNaN(num)) {
                      setFinalValue(num)

                      const isInvalid =
                        num <= 0 || num > 1000000000

                      setIsFinalValueInvalid(isInvalid)
                    } else {
                      setIsFinalValueInvalid(true)
                    }
                  }}
                />

                <CTextField
                  label='Investment Duration (Years)'
                  fullWidth
                  value={investmentYears.toLocaleString()}
                  helperText={`0 < Duration < ${(100).toLocaleString()}`}
                  helperTextStyle={{ pl: '4px' }}
                  sx={{
                    border: isInvestmentYearsInvalid
                      ? '1px solid var(--red-color)'
                      : '1px solid var(--p-fg-st-color)',
                    borderRadius: '8px',
                    ':hover': {
                      border: isInvestmentYearsInvalid
                        ? '1px solid var(--red-color)'
                        : '1px solid var(--p-fg-st-color)',
                    }
                  }}
                  onChange={(e) => {
                    const rawValue = e.target.value.replace(/,/g, '')
                    const num = Number(rawValue)

                    if (!isNaN(num)) {
                      setInvestmentYears(num)

                      const isInvalid =
                        num <= 0 || num > 100

                      setIsInvestmentYearsInvalid(isInvalid)
                    } else {
                      setIsInvestmentYearsInvalid(true)
                    }
                  }}
                />

                <CButton
                  size='large'
                  label='Calculate CAGR'
                  onClick={calculateCagrOnClickHandler}
                />

                <Paper
                  sx={{
                    p: 2,
                    border: '1px solid var(--p-fg-st-color)',
                    boxShadow: 'none',
                    borderRadius: '8px',
                  }}
                >
                  <CTypography
                    cvariant='c'
                    sx={{ mb: '8px' }}
                  >
                    CAGR Formula
                  </CTypography>

                  <CTypography
                    cvariant='th'
                    sx={{ mb: '8px' }}
                  >
                    CAGR = ((Final Value / Initial Value) ^ (1 / Years) - 1) * 100
                  </CTypography>

                  <CTypography cvariant='c'>
                    Initial Value is the starting investment amount
                    <br />
                    Final Value is the ending investment amount
                    <br />
                    CAGR shows the annual growth rate over the selected duration
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
                <Grid item xs={12} sm={4}>
                  <Paper
                    sx={{
                      p: 2,
                      border: '1px solid var(--p-fg-st-color)',
                      boxShadow: '0 0 2500px var(--p-b-color)',
                      borderRadius: '8px'
                    }}
                  >
                    <CTypography cvariant='c'>
                      CAGR
                    </CTypography>
                    <Typography variant='h6'>
                      {cagr.toFixed(2)}%
                    </Typography>
                  </Paper>
                </Grid>

                <Grid item xs={12} sm={4}>
                  <Paper
                    sx={{
                      p: 2,
                      border: '1px solid var(--p-fg-st-color)',
                      boxShadow: '0 0 2500px var(--p-b-color)',
                      borderRadius: '8px'
                    }}
                  >
                    <CTypography cvariant='c'>
                      Absolute Gain
                    </CTypography>
                    <Typography variant='h6'>
                      ${absoluteGain.toFixed(2)}
                    </Typography>
                  </Paper>
                </Grid>

                <Grid item xs={12} sm={4}>
                  <Paper
                    sx={{
                      p: 2,
                      border: '1px solid var(--p-fg-st-color)',
                      boxShadow: '0 0 2500px var(--p-b-color)',
                      borderRadius: '8px'
                    }}
                  >
                    <CTypography cvariant='c'>
                      Total Return
                    </CTypography>
                    <Typography variant='h6'>
                      {totalReturn.toFixed(2)}%
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>

              {/* Chart Placeholder */}
              <Paper
                sx={{
                  mt: 3,
                  p: 4,
                  textAlign: 'center',
                  border: '1px solid var(--p-fg-st-color)',
                  boxShadow: '0 0 2500px var(--p-b-color)',
                  borderRadius: '8px'
                }}
              >
                <CPieChart data={pieChart} />
              </Paper>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
            {/* Download Actions */}
      <Stack
        direction='row'
        spacing={2}
        mb={'4px'}
      >
        <CButton
          size='large'
          cvariant='l'
          onClick={saveCSV}
          label='Download CSV'
        />
        {/* <CButton size='large' cvariant='l' label='Download PDF' /> */}
      </Stack>

      {/* Yearly CAGR Schedule */}
      <Box mb={6}>
        <CTypography
          cvariant='sh'
          sx={{ px: '4px', mb: '4px' }}
        >
          CAGR Growth Schedule
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
                <TableCell align='center'>Year</TableCell>
                <TableCell align='right'>Starting Value</TableCell>
                <TableCell align='right'>Growth</TableCell>
                <TableCell align='right'>Ending Value</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {paginatedSchedule.map((item) => (
                <TableRow key={item.year}>
                  <TableCell align='center'>
                    {item.year}
                  </TableCell>

                  <TableCell align='right'>
                    ${item.startingValue?.toLocaleString()}
                  </TableCell>

                  <TableCell align='right'>
                    ${item.growth?.toLocaleString()}
                  </TableCell>

                  <TableCell align='right'>
                    ${item.endingValue?.toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
                <TablePagination
          component={Paper}
          count={yearlySchedule.length}
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