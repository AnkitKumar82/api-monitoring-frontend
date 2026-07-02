import { useState, useEffect } from 'react'
import {
  Box,
  Button,
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
import CPieChart from '../../../../Components/CPieChart'
import { saveAs } from 'file-saver'

const pieChartData = [
  { name: 'Invested Amount', value: 1000 },
  { name: 'Returns', value: 0 }
]

const downloadCSV = (
  summary,
  yearlySchedule
) => {
  let csv = ''

  csv += `Monthly Investment,${summary.monthlyInvestment}\n`
  csv += `Expected Return,${summary.interestRate}\n`
  csv += `Investment Duration (Years),${summary.investmentYears}\n`
  csv += `Total Invested,${summary.totalInvested}\n`
  csv += `Estimated Returns,${summary.totalReturns}\n`
  csv += `Maturity Value,${summary.maturityValue}\n\n`

  csv +=
    'Year,Invested Amount,Estimated Returns,Maturity Value\n'

  yearlySchedule.forEach((row) => {
    csv += `${row.year},${row.investedAmount},${row.estimatedReturns},${row.maturityValue}\n`
  })

  const blob = new Blob([csv], {
    type: 'text/csv;charset=utf-8;',
  })

  saveAs(blob, 'sip-calculation.csv')
}

export default function SipCalculatorPage() {
  const [monthlyInvestment, setMonthlyInvestment] = useState(1000)
  const [interestRate, setInterestRate] = useState('12.00')
  const [investmentYears, setInvestmentYears] = useState(10)

  const [isMonthlyInvestmentInvalid, setIsMonthlyInvestmentInvalid] =
    useState(false)
  const [isInterestRateInvalid, setIsInterestRateInvalid] =
    useState(false)
  const [isInvestmentYearsInvalid, setIsInvestmentYearsInvalid] =
    useState(false)

  const [totalInvested, setTotalInvested] = useState(0.0)
  const [estimatedReturns, setEstimatedReturns] = useState(0.0)
  const [maturityValue, setMaturityValue] = useState(0.0)

  const [pieChart, setPieChart] = useState(pieChartData)

  const [yearlySchedule, setYearlySchedule] = useState([])

  const [page, setPage] = useState(0)

  const paginatedSchedule = yearlySchedule.slice(
    page * 12,
    page * 12 + 12
  )

  const calculateSipOnClickHandler = () => {
    const numMonthlyInvestment = parseFloat(monthlyInvestment)
    const numInterestRate = parseFloat(interestRate)
    const numInvestmentYears = parseFloat(investmentYears)

    if (
      isMonthlyInvestmentInvalid ||
      isInterestRateInvalid ||
      isInvestmentYearsInvalid ||
      numMonthlyInvestment <= 0 ||
      numInterestRate <= 0 ||
      numInvestmentYears <= 0
    ) {
      return
    }

    const monthlyRate = numInterestRate / 12 / 100
    const totalMonths = numInvestmentYears * 12

    const maturity =
      numMonthlyInvestment *
      ((Math.pow(1 + monthlyRate, totalMonths) - 1) /
        monthlyRate) *
      (1 + monthlyRate)

    const invested = numMonthlyInvestment * totalMonths
    const returns = maturity - invested

    setTotalInvested(invested)
    setEstimatedReturns(returns)
    setMaturityValue(maturity)

    setPieChart([
      {
        name: 'Invested Amount',
        value: invested
      },
      {
        name: 'Returns',
        value: returns
      }
    ])

    const result = generateYearlySchedule({
      monthlyInvestment: numMonthlyInvestment,
      annualRate: numInterestRate,
      investmentYears: numInvestmentYears
    })

    setYearlySchedule(result)
  }

  const generateYearlySchedule = ({
    monthlyInvestment,
    annualRate,
    investmentYears
  }) => {
    const monthlyRate = annualRate / 12 / 100

    const schedule = []

    for (let year = 1; year <= investmentYears; year++) {
      const totalMonths = year * 12

      const maturity =
        monthlyInvestment *
        ((Math.pow(1 + monthlyRate, totalMonths) - 1) /
          monthlyRate) *
        (1 + monthlyRate)

      const invested = monthlyInvestment * totalMonths
      const returns = maturity - invested

      schedule.push({
        year,
        investedAmount: Number(invested.toFixed(2)),
        estimatedReturns: Number(returns.toFixed(2)),
        maturityValue: Number(maturity.toFixed(2))
      })
    }

    return schedule
  }

  const saveCSV = () => {
    const summary = {
      monthlyInvestment: Number(monthlyInvestment).toFixed(2),
      interestRate: Number(interestRate).toFixed(2),
      investmentYears: Number(investmentYears).toFixed(2),
      totalInvested: totalInvested.toFixed(2),
      totalReturns: estimatedReturns.toFixed(2),
      maturityValue: maturityValue.toFixed(2)
    }

    downloadCSV(summary, yearlySchedule)
  }

  useEffect(() => {
    calculateSipOnClickHandler()
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
              <CTypography cvariant='sh'>
                SIP Details
              </CTypography>

              <Stack spacing={3}>
                <CTextField
                  label='Monthly Investment'
                  fullWidth
                  value={monthlyInvestment.toLocaleString()}
                  helperText={`0 < Amount < ${(1000000000).toLocaleString()}`}
                  helperTextStyle={{ pl: '4px' }}
                  sx={{
                    border: isMonthlyInvestmentInvalid
                      ? '1px solid var(--red-color)'
                      : '1px solid var(--p-fg-st-color)',
                    borderRadius: '8px',
                    ':hover': {
                      border: isMonthlyInvestmentInvalid
                        ? '1px solid var(--red-color)'
                        : '1px solid var(--p-fg-st-color)'
                    }
                  }}
                  onChange={(e) => {
                    const rawValue = e.target.value.replace(/,/g, '')
                    const num = Number(rawValue)

                    if (!isNaN(num)) {
                      setMonthlyInvestment(num)
                      const isInvalid =
                        num <= 0 || num > 1000000000
                      setIsMonthlyInvestmentInvalid(isInvalid)
                    } else {
                      setIsMonthlyInvestmentInvalid(true)
                    }
                  }}
                />

                <CTextField
                  label='Expected Return (%)'
                  fullWidth
                  value={interestRate}
                  helperText={'0 < Interest Rate < 100'}
                  helperTextStyle={{ pl: '4px' }}
                  sx={{
                    border: isInterestRateInvalid
                      ? '1px solid var(--red-color)'
                      : '1px solid var(--p-fg-st-color)',
                    borderRadius: '8px',
                    ':hover': {
                      border: isInterestRateInvalid
                        ? '1px solid var(--red-color)'
                        : '1px solid var(--p-fg-st-color)'
                    }
                  }}
                  onChange={(e) => {
                    const value = e.target.value.replace(/,/g, '')

                    if (/^\d*\.?\d*$/.test(value)) {
                      setInterestRate(value)

                      const isInvalid =
                        parseFloat(value) <= 0 ||
                        parseFloat(value) > 100

                      setIsInterestRateInvalid(isInvalid)
                    } else {
                      setIsInterestRateInvalid(true)
                    }
                  }}
                />

                <CTextField
                  label='Investment Duration (Years)'
                  fullWidth
                  value={investmentYears.toLocaleString()}
                  helperText={`0 < Years < ${(100).toLocaleString()}`}
                  helperTextStyle={{ pl: '4px' }}
                  sx={{
                    border: isInvestmentYearsInvalid
                      ? '1px solid var(--red-color)'
                      : '1px solid var(--p-fg-st-color)',
                    borderRadius: '8px',
                    ':hover': {
                      border: isInvestmentYearsInvalid
                        ? '1px solid var(--red-color)'
                        : '1px solid var(--p-fg-st-color)'
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
                  label='Calculate SIP'
                  onClick={calculateSipOnClickHandler}
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
                    SIP Formula
                  </CTypography>

                  <CTypography
                    cvariant='th'
                    sx={{ mb: '8px' }}
                  >
                    M = P × (((1 + i)^n − 1) / i) × (1 + i)
                  </CTypography>

                  <CTypography cvariant='c'>
                    P = Monthly Investment
                    <br />
                    i = Monthly Rate of Return
                    <br />
                    n = Total Number of Monthly Investments
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
                      Total Invested
                    </CTypography>
                    <Typography variant='h6'>
                      ${totalInvested.toFixed(2)}
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
                      Estimated Returns
                    </CTypography>
                    <Typography variant='h6'>
                      ${estimatedReturns.toFixed(2)}
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
                      Maturity Value
                    </CTypography>
                    <Typography variant='h6'>
                      ${maturityValue.toFixed(2)}
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>

              {/* Chart */}
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

      {/* Yearly Schedule */}
      <Box mb={6}>
        <CTypography
          cvariant='sh'
          sx={{ px: '4px', mb: '4px' }}
        >
          Year-wise SIP Growth
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
                <TableCell align='center'>
                  Year
                </TableCell>
                <TableCell align='right'>
                  Invested Amount
                </TableCell>
                <TableCell align='right'>
                  Estimated Returns
                </TableCell>
                <TableCell align='right'>
                  Maturity Value
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {paginatedSchedule.map((item) => (
                <TableRow key={item.year}>
                  <TableCell align='center'>
                    {item.year}
                  </TableCell>

                  <TableCell align='right'>
                    ${item.investedAmount?.toLocaleString()}
                  </TableCell>

                  <TableCell align='right'>
                    ${item.estimatedReturns?.toLocaleString()}
                  </TableCell>

                  <TableCell align='right'>
                    ${item.maturityValue?.toLocaleString()}
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