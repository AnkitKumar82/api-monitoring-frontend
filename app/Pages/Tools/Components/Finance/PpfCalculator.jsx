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
  { name: 'Total Investment', value: 500 },
  { name: 'Interest', value: 0 }
]

const downloadCSV = (
  summary,
  yearlySchedule
) => {
  let csv = ''

  csv += `Yearly Investment,${summary.yearlyInvestment}\n`
  csv += `Interest Rate,${summary.interestRate}\n`
  csv += `Investment Duration (Years),${summary.investmentYears}\n`
  csv += `Total Investment,${summary.totalInvestment}\n`
  csv += `Interest Earned,${summary.interestEarned}\n`
  csv += `Maturity Amount,${summary.maturityAmount}\n\n`

  csv +=
    'Year,Total Investment,Interest Earned,Maturity Value\n'

  yearlySchedule.forEach((row) => {
    csv += `${row.year},${row.totalInvestment},${row.interestEarned},${row.maturityValue}\n`
  })

  const blob = new Blob([csv], {
    type: 'text/csv;charset=utf-8;',
  })

  saveAs(blob, 'ppf-calculation.csv')
}

export default function PpfCalculatorPage() {
  const [yearlyInvestment, setYearlyInvestment] = useState(500)
  const [interestRate, setInterestRate] = useState('7.10')
  const [investmentYears, setInvestmentYears] = useState(15)

  const [isYearlyInvestmentInvalid, setIsYearlyInvestmentInvalid] =
    useState(false)
  const [isInterestRateInvalid, setIsInterestRateInvalid] =
    useState(false)
  const [isInvestmentYearsInvalid, setIsInvestmentYearsInvalid] =
    useState(false)

  const [totalInvestment, setTotalInvestment] = useState(0.0)
  const [interestEarned, setInterestEarned] = useState(0.0)
  const [maturityAmount, setMaturityAmount] = useState(0.0)

  const [pieChart, setPieChart] =
    useState(pieChartData)

  const [yearlySchedule, setYearlySchedule] =
    useState([])

  const [page, setPage] = useState(0)

  const paginatedSchedule = yearlySchedule.slice(
    page * 12,
    page * 12 + 12
  )

  const calculatePpfOnClickHandler = () => {
    const numYearlyInvestment = parseFloat(yearlyInvestment)
    const numInterestRate = parseFloat(interestRate)
    const numInvestmentYears = parseFloat(investmentYears)

    if (
      isYearlyInvestmentInvalid ||
      isInterestRateInvalid ||
      isInvestmentYearsInvalid ||
      numYearlyInvestment <= 0 ||
      numInterestRate <= 0 ||
      numInvestmentYears <= 0
    ) {
      return
    }

    const r = numInterestRate / 100
    const n = Math.floor(numInvestmentYears)

    // PPF formula: A = P × [((1 + r)^n - 1) / r] × (1 + r)
    const maturity =
      numYearlyInvestment *
      (((Math.pow(1 + r, n) - 1) / r) * (1 + r))

    const invested = numYearlyInvestment * n
    const interest = maturity - invested

    setTotalInvestment(invested)
    setInterestEarned(interest)
    setMaturityAmount(maturity)

    setPieChart([
      {
        name: 'Total Investment',
        value: invested
      },
      {
        name: 'Interest',
        value: interest
      }
    ])

    const result = generateYearlySchedule({
      yearlyInvestment: numYearlyInvestment,
      annualRate: numInterestRate,
      investmentYears: n
    })

    setYearlySchedule(result)
  }

  const generateYearlySchedule = ({
    yearlyInvestment,
    annualRate,
    investmentYears
  }) => {
    const schedule = []
    const r = annualRate / 100
    let balance = 0

    for (let year = 1; year <= investmentYears; year++) {
      balance = (balance + yearlyInvestment) * (1 + r)
      const invested = yearlyInvestment * year
      const interest = balance - invested

      schedule.push({
        year,
        totalInvestment: Number(invested.toFixed(2)),
        interestEarned: Number(interest.toFixed(2)),
        maturityValue: Number(balance.toFixed(2))
      })
    }

    return schedule
  }

  const saveCSV = () => {
    const summary = {
      yearlyInvestment: Number(yearlyInvestment).toFixed(2),
      interestRate: Number(interestRate).toFixed(2),
      investmentYears: Number(investmentYears).toFixed(2),
      totalInvestment: totalInvestment.toFixed(2),
      interestEarned: interestEarned.toFixed(2),
      maturityAmount: maturityAmount.toFixed(2)
    }

    downloadCSV(summary, yearlySchedule)
  }

  useEffect(() => {
    calculatePpfOnClickHandler()
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
              <CTypography cvariant='sh'>PPF Details</CTypography>

              <Stack spacing={3}>
                <CTextField
                  label='Yearly Investment'
                  fullWidth
                  value={yearlyInvestment.toLocaleString()}
                  helperText={`500 ≤ Amount ≤ ${(150000).toLocaleString()}`}
                  helperTextStyle={{ pl: '4px' }}
                  sx={{
                    border: isYearlyInvestmentInvalid
                      ? '1px solid var(--red-color)'
                      : '1px solid var(--p-fg-st-color)',
                    borderRadius: '8px',
                    ':hover': {
                      border: isYearlyInvestmentInvalid
                        ? '1px solid var(--red-color)'
                        : '1px solid var(--p-fg-st-color)',
                    }
                  }}
                  onChange={(e) => {
                    const rawValue = e.target.value.replace(/,/g, '')
                    const num = Number(rawValue)

                    if (!isNaN(num)) {
                      setYearlyInvestment(num)

                      const isInvalid =
                        num < 500 || num > 150000

                      setIsYearlyInvestmentInvalid(isInvalid)
                    } else {
                      setIsYearlyInvestmentInvalid(true)
                    }
                  }}
                />

                <CTextField
                  label='Interest Rate (%)'
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
                        : '1px solid var(--p-fg-st-color)',
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
                  helperText={`15 ≤ Years ≤ ${(50).toLocaleString()}`}
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
                        num < 15 || num > 50

                      setIsInvestmentYearsInvalid(isInvalid)
                    } else {
                      setIsInvestmentYearsInvalid(true)
                    }
                  }}
                />

                <CButton
                  size='large'
                  label='Calculate PPF'
                  onClick={calculatePpfOnClickHandler}
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
                    PPF Formula
                  </CTypography>

                  <CTypography
                    cvariant='th'
                    sx={{ mb: '8px' }}
                  >
                    A = P × [((1 + r)<sup>n</sup> - 1) / r] × (1 + r)
                  </CTypography>

                  <CTypography cvariant='c'>
                    P = Yearly Investment
                    <br />
                    r = Annual Interest Rate
                    <br />
                    n = Investment Duration (Years)
                    <br />
                    A = Maturity Amount
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
                      Total Investment
                    </CTypography>
                    <Typography variant='h6'>
                      ${totalInvestment.toFixed(2)}
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
                      Interest Earned
                    </CTypography>
                    <Typography variant='h6'>
                      ${interestEarned.toFixed(2)}
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
                      Maturity Amount
                    </CTypography>
                    <Typography variant='h6'>
                      ${maturityAmount.toFixed(2)}
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
      </Stack>

      {/* Yearly PPF Schedule */}
      <Box mb={6}>
        <CTypography
          cvariant='sh'
          sx={{ px: '4px', mb: '4px' }}
        >
          PPF Growth Schedule
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
                <TableCell align='right'>Total Investment</TableCell>
                <TableCell align='right'>Interest Earned</TableCell>
                <TableCell align='right'>Maturity Value</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {paginatedSchedule.map((item) => (
                <TableRow key={item.year}>
                  <TableCell align='center'>
                    {item.year}
                  </TableCell>

                  <TableCell align='right'>
                    ${item.totalInvestment?.toLocaleString()}
                  </TableCell>

                  <TableCell align='right'>
                    ${item.interestEarned?.toLocaleString()}
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
