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
  { name: 'Deposits', value: 1000 },
  { name: 'Interest', value: 0 }
]

const downloadCSV = (
  summary,
  monthlySchedule
) => {
  let csv = ''

  csv += `Monthly Deposit,${summary.monthlyDeposit}\n`
  csv += `Interest Rate,${summary.interestRate}\n`
  csv += `Investment Duration (Months),${summary.investmentMonths}\n`
  csv += `Compounding Frequency,${summary.compoundingFrequency}\n`
  csv += `Total Deposits,${summary.totalDeposits}\n`
  csv += `Interest Earned,${summary.interestEarned}\n`
  csv += `Maturity Amount,${summary.maturityAmount}\n\n`

  csv +=
    'Month,Total Deposits,Interest Earned,Maturity Value\n'

  monthlySchedule.forEach((row) => {
    csv += `${row.month},${row.totalDeposits},${row.interestEarned},${row.maturityValue}\n`
  })

  const blob = new Blob([csv], {
    type: 'text/csv;charset=utf-8;',
  })

  saveAs(blob, 'rd-calculation.csv')
}
export default function RdCalculatorPage() {
  const [monthlyDeposit, setMonthlyDeposit] = useState(1000)
  const [interestRate, setInterestRate] = useState('7.00')
  const [investmentMonths, setInvestmentMonths] = useState(12)
  const [compoundingFrequency, setCompoundingFrequency] =
    useState('4')

  const [isMonthlyDepositInvalid, setIsMonthlyDepositInvalid] =
    useState(false)
  const [isInterestRateInvalid, setIsInterestRateInvalid] =
    useState(false)
  const [isInvestmentMonthsInvalid, setIsInvestmentMonthsInvalid] =
    useState(false)

  const [totalDeposits, setTotalDeposits] = useState(0.0)
  const [interestEarned, setInterestEarned] = useState(0.0)
  const [maturityAmount, setMaturityAmount] = useState(0.0)

  const [pieChart, setPieChart] =
    useState(pieChartData)

  const [monthlySchedule, setMonthlySchedule] =
    useState([])

  const [page, setPage] = useState(0)

  const paginatedSchedule = monthlySchedule.slice(
    page * 12,
    page * 12 + 12
  )
    const calculateRdOnClickHandler = () => {
    const numMonthlyDeposit = parseFloat(monthlyDeposit)
    const numInterestRate = parseFloat(interestRate)
    const numInvestmentMonths = parseFloat(investmentMonths)
    const compoundsPerYear = parseInt(compoundingFrequency)

    if (
      isMonthlyDepositInvalid ||
      isInterestRateInvalid ||
      isInvestmentMonthsInvalid ||
      numMonthlyDeposit <= 0 ||
      numInterestRate <= 0 ||
      numInvestmentMonths <= 0
    ) {
      return
    }

    let maturity = 0

    for (let month = 1; month <= numInvestmentMonths; month++) {
      const remainingMonths =
        numInvestmentMonths - month + 1

      maturity +=
        numMonthlyDeposit *
        Math.pow(
          1 + numInterestRate / (100 * compoundsPerYear),
          (compoundsPerYear * remainingMonths) / 12
        )
    }

    const deposits =
      numMonthlyDeposit * numInvestmentMonths

    const interest = maturity - deposits

    setTotalDeposits(deposits)
    setInterestEarned(interest)
    setMaturityAmount(maturity)

    setPieChart([
      {
        name: 'Deposits',
        value: deposits
      },
      {
        name: 'Interest',
        value: interest
      }
    ])

    const options = {
      monthlyDeposit: numMonthlyDeposit,
      annualRate: numInterestRate,
      investmentMonths: numInvestmentMonths,
      compoundsPerYear
    }

    const result = generateMonthlySchedule(options)

    setMonthlySchedule(result)
  }
    const generateMonthlySchedule = ({
    monthlyDeposit,
    annualRate,
    investmentMonths,
    compoundsPerYear
  }) => {
    const schedule = []

    for (let currentMonth = 1; currentMonth <= investmentMonths; currentMonth++) {
      let maturity = 0

      for (let depositMonth = 1; depositMonth <= currentMonth; depositMonth++) {
        const remainingMonths =
          currentMonth - depositMonth + 1

        maturity +=
          monthlyDeposit *
          Math.pow(
            1 + annualRate / (100 * compoundsPerYear),
            (compoundsPerYear * remainingMonths) / 12
          )
      }

      const deposits = monthlyDeposit * currentMonth
      const interest = maturity - deposits

      schedule.push({
        month: currentMonth,
        totalDeposits: Number(deposits.toFixed(2)),
        interestEarned: Number(interest.toFixed(2)),
        maturityValue: Number(maturity.toFixed(2))
      })
    }

    return schedule
  }

  const saveCSV = () => {
    const summary = {
      monthlyDeposit: Number(monthlyDeposit).toFixed(2),
      interestRate: Number(interestRate).toFixed(2),
      investmentMonths: Number(investmentMonths).toFixed(2),
      compoundingFrequency:
        compoundingFrequency === '1'
          ? 'Annually'
          : compoundingFrequency === '2'
          ? 'Half-Yearly'
          : compoundingFrequency === '4'
          ? 'Quarterly'
          : 'Monthly',
      totalDeposits: totalDeposits.toFixed(2),
      interestEarned: interestEarned.toFixed(2),
      maturityAmount: maturityAmount.toFixed(2)
    }

    downloadCSV(summary, monthlySchedule)
  }

  useEffect(() => {
    calculateRdOnClickHandler()
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
              <CTypography cvariant='sh'>RD Details</CTypography>

              <Stack spacing={3}>
                <CTextField
                  label='Monthly Deposit'
                  fullWidth
                  value={monthlyDeposit.toLocaleString()}
                  helperText={`0 < Amount < ${(1000000000).toLocaleString()}`}
                  helperTextStyle={{ pl: '4px' }}
                  sx={{
                    border: isMonthlyDepositInvalid
                      ? '1px solid var(--red-color)'
                      : '1px solid var(--p-fg-st-color)',
                    borderRadius: '8px',
                    ':hover': {
                      border: isMonthlyDepositInvalid
                        ? '1px solid var(--red-color)'
                        : '1px solid var(--p-fg-st-color)',
                    }
                  }}
                  onChange={(e) => {
                    const rawValue = e.target.value.replace(/,/g, '')
                    const num = Number(rawValue)

                    if (!isNaN(num)) {
                      setMonthlyDeposit(num)

                      const isInvalid =
                        num <= 0 || num > 1000000000

                      setIsMonthlyDepositInvalid(isInvalid)
                    } else {
                      setIsMonthlyDepositInvalid(true)
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
                  label='Investment Duration (Months)'
                  fullWidth
                  value={investmentMonths.toLocaleString()}
                  helperText={`0 < Duration < ${(600).toLocaleString()}`}
                  helperTextStyle={{ pl: '4px' }}
                  sx={{
                    border: isInvestmentMonthsInvalid
                      ? '1px solid var(--red-color)'
                      : '1px solid var(--p-fg-st-color)',
                    borderRadius: '8px',
                    ':hover': {
                      border: isInvestmentMonthsInvalid
                        ? '1px solid var(--red-color)'
                        : '1px solid var(--p-fg-st-color)',
                    }
                  }}
                  onChange={(e) => {
                    const rawValue = e.target.value.replace(/,/g, '')
                    const num = Number(rawValue)

                    if (!isNaN(num)) {
                      setInvestmentMonths(num)

                      const isInvalid =
                        num <= 0 || num > 600

                      setIsInvestmentMonthsInvalid(isInvalid)
                    } else {
                      setIsInvestmentMonthsInvalid(true)
                    }
                  }}
                />

                <CSelect
                  select
                  label='Compounding Frequency'
                  fullWidth
                  value={compoundingFrequency}
                  onChange={(e) =>
                    setCompoundingFrequency(e.target.value)
                  }
                  sx={{
                    '.MuiOutlinedInput-notchedOutline': { 
                        border: '1px solid var(--p-fg-st-color)'
                    }
                  }}
                >
                  <MenuItem value='1'>Annually</MenuItem>
                  <MenuItem value='2'>Half-Yearly</MenuItem>
                  <MenuItem value='4'>Quarterly</MenuItem>
                  <MenuItem value='12'>Monthly</MenuItem>
                </CSelect>

                <CButton
                  size='large'
                  label='Calculate RD'
                  onClick={calculateRdOnClickHandler}
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
                    RD Formula
                  </CTypography>

                  <CTypography
                    cvariant='th'
                    sx={{ mb: '8px' }}
                  >
                    Maturity Value = Sum of each monthly deposit compounded till maturity
                  </CTypography>

                  <CTypography cvariant='c'>
                    Monthly Deposit is invested every month
                    <br />
                    Interest is compounded based on the selected frequency
                    <br />
                    Maturity Value = Total Deposits + Interest Earned
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
                      Total Deposits
                    </CTypography>
                    <Typography variant='h6'>
                      ${totalDeposits.toFixed(2)}
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

      {/* Monthly RD Schedule */}
      <Box mb={6}>
        <CTypography
          cvariant='sh'
          sx={{ px: '4px', mb: '4px' }}
        >
          RD Growth Schedule
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
                <TableCell align='center'>Month</TableCell>
                <TableCell align='right'>Total Deposits</TableCell>
                <TableCell align='right'>Interest Earned</TableCell>
                <TableCell align='right'>Maturity Value</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {paginatedSchedule.map((item) => (
                <TableRow key={item.month}>
                  <TableCell align='center'>
                    {item.month}
                  </TableCell>

                  <TableCell align='right'>
                    ${item.totalDeposits?.toLocaleString()}
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
          count={monthlySchedule.length}
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