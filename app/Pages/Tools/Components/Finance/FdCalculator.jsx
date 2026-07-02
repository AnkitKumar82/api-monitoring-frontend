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
  { name: 'Principal', value: 1000 },
  { name: 'Interest', value: 0 }
]

const downloadCSV = (
  summary,
  yearlySchedule
) => {
  let csv = ''

  csv += `Deposit Amount,${summary.depositAmount}\n`
  csv += `Interest Rate,${summary.interestRate}\n`
  csv += `Investment Duration (Years),${summary.investmentYears}\n`
  csv += `Compounding Frequency,${summary.compoundingFrequency}\n`
  csv += `Principal Amount,${summary.principalAmount}\n`
  csv += `Interest Earned,${summary.interestEarned}\n`
  csv += `Maturity Amount,${summary.maturityAmount}\n\n`

  csv +=
    'Year,Principal,Interest Earned,Maturity Value\n'

  yearlySchedule.forEach((row) => {
    csv += `${row.year},${row.principal},${row.interestEarned},${row.maturityValue}\n`
  })

  const blob = new Blob([csv], {
    type: 'text/csv;charset=utf-8;',
  })

  saveAs(blob, 'fd-calculation.csv')
}
export default function FdCalculatorPage() {
  const [depositAmount, setDepositAmount] = useState(1000)
  const [interestRate, setInterestRate] = useState('7.00')
  const [investmentYears, setInvestmentYears] = useState(5)
  const [compoundingFrequency, setCompoundingFrequency] =
    useState('4')

  const [isDepositAmountInvalid, setIsDepositAmountInvalid] =
    useState(false)
  const [isInterestRateInvalid, setIsInterestRateInvalid] =
    useState(false)
  const [isInvestmentYearsInvalid, setIsInvestmentYearsInvalid] =
    useState(false)

  const [principalAmount, setPrincipalAmount] = useState(0.0)
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
    const calculateFdOnClickHandler = () => {
    const numDepositAmount = parseFloat(depositAmount)
    const numInterestRate = parseFloat(interestRate)
    const numInvestmentYears = parseFloat(investmentYears)
    const compoundsPerYear = parseInt(compoundingFrequency)

    if (
      isDepositAmountInvalid ||
      isInterestRateInvalid ||
      isInvestmentYearsInvalid ||
      numDepositAmount <= 0 ||
      numInterestRate <= 0 ||
      numInvestmentYears <= 0
    ) {
      return
    }

    const maturity =
      numDepositAmount *
      Math.pow(
        1 + numInterestRate / (100 * compoundsPerYear),
        compoundsPerYear * numInvestmentYears
      )

    const interest = maturity - numDepositAmount

    setPrincipalAmount(numDepositAmount)
    setInterestEarned(interest)
    setMaturityAmount(maturity)

    setPieChart([
      {
        name: 'Principal',
        value: numDepositAmount
      },
      {
        name: 'Interest',
        value: interest
      }
    ])

    const options = {
      principal: numDepositAmount,
      annualRate: numInterestRate,
      investmentYears: numInvestmentYears,
      compoundsPerYear
    }

    const result = generateYearlySchedule(options)

    setYearlySchedule(result)
  }
    const generateYearlySchedule = ({
    principal,
    annualRate,
    investmentYears,
    compoundsPerYear
  }) => {
    const schedule = []

    for (let year = 1; year <= investmentYears; year++) {
      const maturity =
        principal *
        Math.pow(
          1 + annualRate / (100 * compoundsPerYear),
          compoundsPerYear * year
        )

      const interest = maturity - principal

      schedule.push({
        year,
        principal: Number(principal.toFixed(2)),
        interestEarned: Number(interest.toFixed(2)),
        maturityValue: Number(maturity.toFixed(2))
      })
    }

    return schedule
  }

  const saveCSV = () => {
    const summary = {
      depositAmount: Number(depositAmount).toFixed(2),
      interestRate: Number(interestRate).toFixed(2),
      investmentYears: Number(investmentYears).toFixed(2),
      compoundingFrequency:
        compoundingFrequency === '1'
          ? 'Annually'
          : compoundingFrequency === '2'
          ? 'Half-Yearly'
          : compoundingFrequency === '4'
          ? 'Quarterly'
          : 'Monthly',
      principalAmount: principalAmount.toFixed(2),
      interestEarned: interestEarned.toFixed(2),
      maturityAmount: maturityAmount.toFixed(2)
    }

    downloadCSV(summary, yearlySchedule)
  }

  useEffect(() => {
    calculateFdOnClickHandler()
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
              <CTypography cvariant='sh'>FD Details</CTypography>

              <Stack spacing={3}>
                <CTextField
                  label='Deposit Amount'
                  fullWidth
                  value={depositAmount.toLocaleString()}
                  helperText={`0 < Amount < ${(1000000000).toLocaleString()}`}
                  helperTextStyle={{ pl: '4px' }}
                  sx={{
                    border: isDepositAmountInvalid
                      ? '1px solid var(--red-color)'
                      : '1px solid var(--p-fg-st-color)',
                    borderRadius: '8px',
                    ':hover': {
                      border: isDepositAmountInvalid
                        ? '1px solid var(--red-color)'
                        : '1px solid var(--p-fg-st-color)',
                    }
                  }}
                  onChange={(e) => {
                    const rawValue = e.target.value.replace(/,/g, '')
                    const num = Number(rawValue)

                    if (!isNaN(num)) {
                      setDepositAmount(num)

                      const isInvalid =
                        num <= 0 || num > 1000000000

                      setIsDepositAmountInvalid(isInvalid)
                    } else {
                      setIsDepositAmountInvalid(true)
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
                  label='Calculate FD'
                  onClick={calculateFdOnClickHandler}
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
                    FD Formula
                  </CTypography>

                  <CTypography
                    cvariant='th'
                    sx={{ mb: '8px' }}
                  >
                    A = P × (1 + r / n)<sup>n × t</sup>
                  </CTypography>

                  <CTypography cvariant='c'>
                    P = Principal Amount
                    <br />
                    r = Annual Interest Rate
                    <br />
                    n = Compounding Frequency
                    <br />
                    t = Investment Duration (Years)
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
                      Principal Amount
                    </CTypography>
                    <Typography variant='h6'>
                      ${principalAmount.toFixed(2)}
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

      {/* Yearly FD Schedule */}
      <Box mb={6}>
        <CTypography
          cvariant='sh'
          sx={{ px: '4px', mb: '4px' }}
        >
          FD Growth Schedule
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
                <TableCell align='right'>Principal</TableCell>
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
                    ${item.principal?.toLocaleString()}
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