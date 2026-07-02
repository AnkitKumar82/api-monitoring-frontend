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
import CPieChart from '../../../../Components/CPieChart'
import { saveAs } from 'file-saver'

const pieChartData = [
  { name: 'Total Invested', value: 100000 },
  { name: 'Total Withdrawn', value: 0 }
]

const downloadCSV = (summary, yearlySchedule) => {
  let csv = ''

  csv += `Initial Investment,${summary.initialInvestment}\n`
  csv += `Monthly Withdrawal,${summary.monthlyWithdrawal}\n`
  csv += `Annual Return Rate (%),${summary.annualReturnRate}\n`
  csv += `Investment Duration (Years),${summary.investmentYears}\n`
  csv += `Total Invested,${summary.totalInvested}\n`
  csv += `Total Withdrawn,${summary.totalWithdrawn}\n`
  csv += `Returns Earned,${summary.returnsEarned}\n`
  csv += `Final Value,${summary.finalValue}\n\n`

  csv += 'Year,Opening Balance,Annual Withdrawal,Returns Earned,Closing Balance\n'

  yearlySchedule.forEach((row) => {
    csv += `${row.year},${row.openingBalance},${row.annualWithdrawal},${row.returnsEarned},${row.closingBalance}\n`
  })

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  saveAs(blob, 'swp-calculation.csv')
}

export default function SwpCalculatorPage() {
  const [initialInvestment, setInitialInvestment] = useState(100000)
  const [monthlyWithdrawal, setMonthlyWithdrawal] = useState(1000)
  const [annualReturnRate, setAnnualReturnRate] = useState('8.00')
  const [investmentYears, setInvestmentYears] = useState(10)

  const [isInitialInvestmentInvalid, setIsInitialInvestmentInvalid] = useState(false)
  const [isMonthlyWithdrawalInvalid, setIsMonthlyWithdrawalInvalid] = useState(false)
  const [isAnnualReturnRateInvalid, setIsAnnualReturnRateInvalid] = useState(false)
  const [isInvestmentYearsInvalid, setIsInvestmentYearsInvalid] = useState(false)

  const [totalInvested, setTotalInvested] = useState(0.0)
  const [totalWithdrawn, setTotalWithdrawn] = useState(0.0)
  const [returnsEarned, setReturnsEarned] = useState(0.0)
  const [finalValue, setFinalValue] = useState(0.0)

  const [pieChart, setPieChart] = useState(pieChartData)
  const [yearlySchedule, setYearlySchedule] = useState([])
  const [page, setPage] = useState(0)

  const paginatedSchedule = yearlySchedule.slice(page * 12, page * 12 + 12)

  const calculateSwpOnClickHandler = () => {
    const numInitialInvestment = parseFloat(initialInvestment)
    const numMonthlyWithdrawal = parseFloat(monthlyWithdrawal)
    const numAnnualReturnRate = parseFloat(annualReturnRate)
    const numInvestmentYears = parseFloat(investmentYears)

    if (
      isInitialInvestmentInvalid ||
      isMonthlyWithdrawalInvalid ||
      isAnnualReturnRateInvalid ||
      isInvestmentYearsInvalid ||
      numInitialInvestment <= 0 ||
      numMonthlyWithdrawal <= 0 ||
      numAnnualReturnRate <= 0 ||
      numInvestmentYears <= 0
    ) {
      return
    }

    const result = generateYearlySchedule({
      initialInvestment: numInitialInvestment,
      monthlyWithdrawal: numMonthlyWithdrawal,
      annualReturnRate: numAnnualReturnRate,
      investmentYears: Math.floor(numInvestmentYears)
    })

    const last = result[result.length - 1]
    const totalW = numMonthlyWithdrawal * 12 * Math.floor(numInvestmentYears)
    const totalR = result.reduce((sum, row) => sum + row.returnsEarned, 0)

    setTotalInvested(numInitialInvestment)
    setTotalWithdrawn(totalW)
    setReturnsEarned(totalR)
    setFinalValue(Math.max(last.closingBalance, 0))

    setPieChart([
      { name: 'Total Invested', value: numInitialInvestment },
      { name: 'Total Withdrawn', value: totalW }
    ])

    setYearlySchedule(result)
  }

  const generateYearlySchedule = ({
    initialInvestment,
    monthlyWithdrawal,
    annualReturnRate,
    investmentYears
  }) => {
    const schedule = []
    const monthlyRate = annualReturnRate / 100 / 12
    let balance = initialInvestment

    for (let year = 1; year <= investmentYears; year++) {
      const openingBalance = balance
      let annualReturns = 0

      for (let month = 1; month <= 12; month++) {
        const monthlyReturn = balance * monthlyRate
        annualReturns += monthlyReturn
        balance = balance + monthlyReturn - monthlyWithdrawal
        if (balance < 0) balance = 0
      }

      const annualWithdrawal = Math.min(
        monthlyWithdrawal * 12,
        openingBalance + annualReturns
      )

      schedule.push({
        year,
        openingBalance: Number(openingBalance.toFixed(2)),
        annualWithdrawal: Number(annualWithdrawal.toFixed(2)),
        returnsEarned: Number(annualReturns.toFixed(2)),
        closingBalance: Number(Math.max(balance, 0).toFixed(2))
      })

      if (balance <= 0) break
    }

    return schedule
  }

  const saveCSV = () => {
    const summary = {
      initialInvestment: Number(initialInvestment).toFixed(2),
      monthlyWithdrawal: Number(monthlyWithdrawal).toFixed(2),
      annualReturnRate: Number(annualReturnRate).toFixed(2),
      investmentYears: Number(investmentYears).toFixed(2),
      totalInvested: totalInvested.toFixed(2),
      totalWithdrawn: totalWithdrawn.toFixed(2),
      returnsEarned: returnsEarned.toFixed(2),
      finalValue: finalValue.toFixed(2)
    }

    downloadCSV(summary, yearlySchedule)
  }

  useEffect(() => {
    calculateSwpOnClickHandler()
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
              <CTypography cvariant='sh'>SWP Details</CTypography>

              <Stack spacing={3}>
                <CTextField
                  label='Initial Investment'
                  fullWidth
                  value={initialInvestment.toLocaleString()}
                  helperText={`0 < Amount ≤ ${(1000000000).toLocaleString()}`}
                  helperTextStyle={{ pl: '4px' }}
                  sx={{
                    border: isInitialInvestmentInvalid
                      ? '1px solid var(--red-color)'
                      : '1px solid var(--p-fg-st-color)',
                    borderRadius: '8px',
                    ':hover': {
                      border: isInitialInvestmentInvalid
                        ? '1px solid var(--red-color)'
                        : '1px solid var(--p-fg-st-color)',
                    }
                  }}
                  onChange={(e) => {
                    const rawValue = e.target.value.replace(/,/g, '')
                    const num = Number(rawValue)

                    if (!isNaN(num)) {
                      setInitialInvestment(num)
                      const isInvalid = num <= 0 || num > 1000000000
                      setIsInitialInvestmentInvalid(isInvalid)
                    } else {
                      setIsInitialInvestmentInvalid(true)
                    }
                  }}
                />

                <CTextField
                  label='Monthly Withdrawal'
                  fullWidth
                  value={monthlyWithdrawal.toLocaleString()}
                  helperText={`0 < Amount ≤ ${(1000000000).toLocaleString()}`}
                  helperTextStyle={{ pl: '4px' }}
                  sx={{
                    border: isMonthlyWithdrawalInvalid
                      ? '1px solid var(--red-color)'
                      : '1px solid var(--p-fg-st-color)',
                    borderRadius: '8px',
                    ':hover': {
                      border: isMonthlyWithdrawalInvalid
                        ? '1px solid var(--red-color)'
                        : '1px solid var(--p-fg-st-color)',
                    }
                  }}
                  onChange={(e) => {
                    const rawValue = e.target.value.replace(/,/g, '')
                    const num = Number(rawValue)

                    if (!isNaN(num)) {
                      setMonthlyWithdrawal(num)
                      const isInvalid = num <= 0 || num > 1000000000
                      setIsMonthlyWithdrawalInvalid(isInvalid)
                    } else {
                      setIsMonthlyWithdrawalInvalid(true)
                    }
                  }}
                />

                <CTextField
                  label='Annual Return Rate (%)'
                  fullWidth
                  value={annualReturnRate}
                  helperText={'0 < Return Rate < 100'}
                  helperTextStyle={{ pl: '4px' }}
                  sx={{
                    border: isAnnualReturnRateInvalid
                      ? '1px solid var(--red-color)'
                      : '1px solid var(--p-fg-st-color)',
                    borderRadius: '8px',
                    ':hover': {
                      border: isAnnualReturnRateInvalid
                        ? '1px solid var(--red-color)'
                        : '1px solid var(--p-fg-st-color)',
                    }
                  }}
                  onChange={(e) => {
                    const value = e.target.value.replace(/,/g, '')

                    if (/^\d*\.?\d*$/.test(value)) {
                      setAnnualReturnRate(value)
                      const isInvalid = parseFloat(value) <= 0 || parseFloat(value) > 100
                      setIsAnnualReturnRateInvalid(isInvalid)
                    } else {
                      setIsAnnualReturnRateInvalid(true)
                    }
                  }}
                />

                <CTextField
                  label='Investment Duration (Years)'
                  fullWidth
                  value={investmentYears.toLocaleString()}
                  helperText={`0 < Years ≤ ${(50).toLocaleString()}`}
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
                      const isInvalid = num <= 0 || num > 50
                      setIsInvestmentYearsInvalid(isInvalid)
                    } else {
                      setIsInvestmentYearsInvalid(true)
                    }
                  }}
                />

                <CButton
                  size='large'
                  label='Calculate SWP'
                  onClick={calculateSwpOnClickHandler}
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
                    SWP Formula
                  </CTypography>

                  <CTypography cvariant='th' sx={{ mb: '8px' }}>
                    B<sub>n</sub> = B<sub>n-1</sub> × (1 + r) - W
                  </CTypography>

                  <CTypography cvariant='c'>
                    B<sub>n</sub> = Balance after month n
                    <br />
                    r = Monthly Return Rate
                    <br />
                    W = Monthly Withdrawal Amount
                    <br />
                    B<sub>0</sub> = Initial Investment
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
                <Grid item xs={12} sm={3}>
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
                      ₹{totalInvested.toFixed(2)}
                    </Typography>
                  </Paper>
                </Grid>

                <Grid item xs={12} sm={3}>
                  <Paper
                    sx={{
                      p: 2,
                      border: '1px solid var(--p-fg-st-color)',
                      boxShadow: '0 0 2500px var(--p-b-color)',
                      borderRadius: '8px'
                    }}
                  >
                    <CTypography cvariant='c'>
                      Total Withdrawn
                    </CTypography>
                    <Typography variant='h6'>
                      ₹{totalWithdrawn.toFixed(2)}
                    </Typography>
                  </Paper>
                </Grid>

                <Grid item xs={12} sm={3}>
                  <Paper
                    sx={{
                      p: 2,
                      border: '1px solid var(--p-fg-st-color)',
                      boxShadow: '0 0 2500px var(--p-b-color)',
                      borderRadius: '8px'
                    }}
                  >
                    <CTypography cvariant='c'>
                      Returns Earned
                    </CTypography>
                    <Typography variant='h6'>
                      ₹{returnsEarned.toFixed(2)}
                    </Typography>
                  </Paper>
                </Grid>

                <Grid item xs={12} sm={3}>
                  <Paper
                    sx={{
                      p: 2,
                      border: '1px solid var(--p-fg-st-color)',
                      boxShadow: '0 0 2500px var(--p-b-color)',
                      borderRadius: '8px'
                    }}
                  >
                    <CTypography cvariant='c'>
                      Final Value
                    </CTypography>
                    <Typography variant='h6'>
                      ₹{finalValue.toFixed(2)}
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
      <Stack direction='row' spacing={2} mb={'4px'}>
        <CButton
          size='large'
          cvariant='l'
          onClick={saveCSV}
          label='Download CSV'
        />
      </Stack>

      {/* Yearly SWP Schedule */}
      <Box mb={6}>
        <CTypography cvariant='sh' sx={{ px: '4px', mb: '4px' }}>
          SWP Withdrawal Schedule
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
                <TableCell align='right'>Opening Balance</TableCell>
                <TableCell align='right'>Annual Withdrawal</TableCell>
                <TableCell align='right'>Returns Earned</TableCell>
                <TableCell align='right'>Closing Balance</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {paginatedSchedule.map((item) => (
                <TableRow key={item.year}>
                  <TableCell align='center'>{item.year}</TableCell>
                  <TableCell align='right'>₹{item.openingBalance?.toLocaleString()}</TableCell>
                  <TableCell align='right'>₹{item.annualWithdrawal?.toLocaleString()}</TableCell>
                  <TableCell align='right'>₹{item.returnsEarned?.toLocaleString()}</TableCell>
                  <TableCell align='right'>₹{item.closingBalance?.toLocaleString()}</TableCell>
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