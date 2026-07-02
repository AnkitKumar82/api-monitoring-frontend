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
    { name: 'Current Savings Growth', value: 1000 },
    { name: 'Additional Savings Required', value: 0 }
]

const downloadCSV = (
  summary,
  yearlySchedule
) => {
  let csv = ''

  csv += `Current Age,${summary.currentAge}\n`
  csv += `Retirement Age,${summary.retirementAge}\n`
  csv += `Life Expectancy,${summary.lifeExpectancy}\n`
  csv += `Current Monthly Expenses,${summary.currentMonthlyExpenses}\n`
  csv += `Current Retirement Savings,${summary.currentSavings}\n`
  csv += `Inflation Rate,${summary.inflationRate}\n`
  csv += `Expected Return Before Retirement,${summary.preRetirementReturn}\n`
  csv += `Expected Return After Retirement,${summary.postRetirementReturn}\n`
  csv += `Years To Retirement,${summary.yearsToRetirement}\n`
  csv += `Future Monthly Expenses,${summary.futureMonthlyExpenses}\n`
  csv += `Retirement Corpus Required,${summary.retirementCorpus}\n`
  csv += `Monthly Savings Required,${summary.monthlySavingsRequired}\n\n`

  csv +=
    'Year,Age,Annual Savings,Interest Earned,Corpus Value\n'

  yearlySchedule.forEach((row) => {
    csv += `${row.year},${row.age},${row.annualSavings},${row.interestEarned},${row.corpusValue}\n`
  })

  const blob = new Blob([csv], {
    type: 'text/csv;charset=utf-8;',
  })

  saveAs(blob, 'retirement-calculation.csv')
}
export default function RetirementCalculatorPage() {
  const [currentAge, setCurrentAge] = useState(30)
  const [retirementAge, setRetirementAge] = useState(60)
  const [lifeExpectancy, setLifeExpectancy] = useState(85)
  const [currentMonthlyExpenses, setCurrentMonthlyExpenses] = useState(50000)
  const [currentSavings, setCurrentSavings] = useState(500000)
  const [inflationRate, setInflationRate] = useState('6.00')
  const [preRetirementReturn, setPreRetirementReturn] = useState('10.00')
  const [postRetirementReturn, setPostRetirementReturn] = useState('7.00')

  const [isCurrentAgeInvalid, setIsCurrentAgeInvalid] =
    useState(false)
  const [isRetirementAgeInvalid, setIsRetirementAgeInvalid] =
    useState(false)
  const [isLifeExpectancyInvalid, setIsLifeExpectancyInvalid] =
    useState(false)
  const [isCurrentMonthlyExpensesInvalid, setIsCurrentMonthlyExpensesInvalid] =
    useState(false)
  const [isCurrentSavingsInvalid, setIsCurrentSavingsInvalid] =
    useState(false)
  const [isInflationRateInvalid, setIsInflationRateInvalid] =
    useState(false)
  const [isPreRetirementReturnInvalid, setIsPreRetirementReturnInvalid] =
    useState(false)
  const [isPostRetirementReturnInvalid, setIsPostRetirementReturnInvalid] =
    useState(false)

  const [yearsToRetirement, setYearsToRetirement] = useState(0.0)
  const [futureMonthlyExpenses, setFutureMonthlyExpenses] = useState(0.0)
  const [retirementCorpus, setRetirementCorpus] = useState(0.0)
  const [monthlySavingsRequired, setMonthlySavingsRequired] = useState(0.0)

  const [pieChart, setPieChart] =
    useState(pieChartData)

  const [yearlySchedule, setYearlySchedule] =
    useState([])

  const [page, setPage] = useState(0)

  const paginatedSchedule = yearlySchedule.slice(
    page * 12,
    page * 12 + 12
  )
    const calculateRetirementOnClickHandler = () => {
    const numCurrentAge = parseFloat(currentAge)
    const numRetirementAge = parseFloat(retirementAge)
    const numLifeExpectancy = parseFloat(lifeExpectancy)
    const numCurrentMonthlyExpenses = parseFloat(currentMonthlyExpenses)
    const numCurrentSavings = parseFloat(currentSavings)
    const numInflationRate = parseFloat(inflationRate)
    const numPreRetirementReturn = parseFloat(preRetirementReturn)
    const numPostRetirementReturn = parseFloat(postRetirementReturn)

    if (
      isCurrentAgeInvalid ||
      isRetirementAgeInvalid ||
      isLifeExpectancyInvalid ||
      isCurrentMonthlyExpensesInvalid ||
      isCurrentSavingsInvalid ||
      isInflationRateInvalid ||
      isPreRetirementReturnInvalid ||
      isPostRetirementReturnInvalid ||
      numCurrentAge <= 0 ||
      numRetirementAge <= numCurrentAge ||
      numLifeExpectancy <= numRetirementAge ||
      numCurrentMonthlyExpenses <= 0 ||
      numCurrentSavings < 0 ||
      numInflationRate <= 0 ||
      numPreRetirementReturn <= 0 ||
      numPostRetirementReturn <= 0
    ) {
      return
    }

    const years =
      numRetirementAge - numCurrentAge

    const retirementYears =
      numLifeExpectancy - numRetirementAge

    const monthlyExpenseAtRetirement =
      numCurrentMonthlyExpenses *
      Math.pow(
        1 + numInflationRate / 100,
        years
      )

    const realReturnAfterRetirement =
      ((1 + numPostRetirementReturn / 100) /
        (1 + numInflationRate / 100)) - 1

    let corpus = 0

    if (realReturnAfterRetirement === 0) {
      corpus =
        monthlyExpenseAtRetirement * 12 * retirementYears
    } else {
      corpus =
        monthlyExpenseAtRetirement *
        12 *
        ((1 - Math.pow(1 + realReturnAfterRetirement, -retirementYears)) /
          realReturnAfterRetirement)
    }

    const currentSavingsAtRetirement =
      numCurrentSavings *
      Math.pow(
        1 + numPreRetirementReturn / 100,
        years
      )

    const additionalCorpusRequired =
      corpus - currentSavingsAtRetirement

    const monthlyRate =
      numPreRetirementReturn / 100 / 12

    const totalMonths =
      years * 12

    let monthlySavings = 0

    if (additionalCorpusRequired > 0) {
      monthlySavings =
        additionalCorpusRequired *
        monthlyRate /
        (Math.pow(1 + monthlyRate, totalMonths) - 1)
    }

    setYearsToRetirement(years)
    setFutureMonthlyExpenses(monthlyExpenseAtRetirement)
    setRetirementCorpus(corpus)
    setMonthlySavingsRequired(monthlySavings)

    setPieChart([
        {
          name: 'Additional Savings Required',
          value: additionalCorpusRequired > 0
            ? additionalCorpusRequired
            : 0
        },
        {
            name: 'Current Savings Growth',
            value: currentSavingsAtRetirement
        }
    ])

    const options = {
      currentAge: numCurrentAge,
      yearsToRetirement: years,
      currentSavings: numCurrentSavings,
      monthlySavings,
      annualRate: numPreRetirementReturn
    }

    const result = generateYearlySchedule(options)

    setYearlySchedule(result)
  }
    const generateYearlySchedule = ({
    currentAge,
    yearsToRetirement,
    currentSavings,
    monthlySavings,
    annualRate
  }) => {
    const schedule = []

    let corpus = currentSavings

    for (let currentYear = 1; currentYear <= yearsToRetirement; currentYear++) {
      const startingCorpus = corpus

      for (let month = 1; month <= 12; month++) {
        corpus =
          (corpus + monthlySavings) *
          (1 + annualRate / 100 / 12)
      }

      const annualSavings = monthlySavings * 12
      const interest = corpus - startingCorpus - annualSavings

      schedule.push({
        year: currentYear,
        age: currentAge + currentYear,
        annualSavings: Number(annualSavings.toFixed(2)),
        interestEarned: Number(interest.toFixed(2)),
        corpusValue: Number(corpus.toFixed(2))
      })
    }

    return schedule
  }

  const saveCSV = () => {
    const summary = {
      currentAge: Number(currentAge).toFixed(2),
      retirementAge: Number(retirementAge).toFixed(2),
      lifeExpectancy: Number(lifeExpectancy).toFixed(2),
      currentMonthlyExpenses: Number(currentMonthlyExpenses).toFixed(2),
      currentSavings: Number(currentSavings).toFixed(2),
      inflationRate: Number(inflationRate).toFixed(2),
      preRetirementReturn: Number(preRetirementReturn).toFixed(2),
      postRetirementReturn: Number(postRetirementReturn).toFixed(2),
      yearsToRetirement: yearsToRetirement.toFixed(2),
      futureMonthlyExpenses: futureMonthlyExpenses.toFixed(2),
      retirementCorpus: retirementCorpus.toFixed(2),
      monthlySavingsRequired: monthlySavingsRequired.toFixed(2)
    }

    downloadCSV(summary, yearlySchedule)
  }

  useEffect(() => {
    calculateRetirementOnClickHandler()
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
              <CTypography cvariant='sh'>Retirement Details</CTypography>

              <Stack spacing={3}>
                <CTextField
                  label='Current Age'
                  fullWidth
                  value={currentAge.toLocaleString()}
                  helperText={`0 < Age < ${(100).toLocaleString()}`}
                  helperTextStyle={{ pl: '4px' }}
                  sx={{
                    border: isCurrentAgeInvalid
                      ? '1px solid var(--red-color)'
                      : '1px solid var(--p-fg-st-color)',
                    borderRadius: '8px',
                    ':hover': {
                      border: isCurrentAgeInvalid
                        ? '1px solid var(--red-color)'
                        : '1px solid var(--p-fg-st-color)',
                    }
                  }}
                  onChange={(e) => {
                    const rawValue = e.target.value.replace(/,/g, '')
                    const num = Number(rawValue)

                    if (!isNaN(num)) {
                      setCurrentAge(num)

                      const isInvalid =
                        num <= 0 || num > 100

                      setIsCurrentAgeInvalid(isInvalid)
                    } else {
                      setIsCurrentAgeInvalid(true)
                    }
                  }}
                />

                <CTextField
                  label='Retirement Age'
                  fullWidth
                  value={retirementAge.toLocaleString()}
                  helperText={`Current Age < Age < ${(100).toLocaleString()}`}
                  helperTextStyle={{ pl: '4px' }}
                  sx={{
                    border: isRetirementAgeInvalid
                      ? '1px solid var(--red-color)'
                      : '1px solid var(--p-fg-st-color)',
                    borderRadius: '8px',
                    ':hover': {
                      border: isRetirementAgeInvalid
                        ? '1px solid var(--red-color)'
                        : '1px solid var(--p-fg-st-color)',
                    }
                  }}
                  onChange={(e) => {
                    const rawValue = e.target.value.replace(/,/g, '')
                    const num = Number(rawValue)

                    if (!isNaN(num)) {
                      setRetirementAge(num)

                      const isInvalid =
                        num <= currentAge || num > 100

                      setIsRetirementAgeInvalid(isInvalid)
                    } else {
                      setIsRetirementAgeInvalid(true)
                    }
                  }}
                />

                <CTextField
                  label='Life Expectancy'
                  fullWidth
                  value={lifeExpectancy.toLocaleString()}
                  helperText={`Retirement Age < Age < ${(120).toLocaleString()}`}
                  helperTextStyle={{ pl: '4px' }}
                  sx={{
                    border: isLifeExpectancyInvalid
                      ? '1px solid var(--red-color)'
                      : '1px solid var(--p-fg-st-color)',
                    borderRadius: '8px',
                    ':hover': {
                      border: isLifeExpectancyInvalid
                        ? '1px solid var(--red-color)'
                        : '1px solid var(--p-fg-st-color)',
                    }
                  }}
                  onChange={(e) => {
                    const rawValue = e.target.value.replace(/,/g, '')
                    const num = Number(rawValue)

                    if (!isNaN(num)) {
                      setLifeExpectancy(num)

                      const isInvalid =
                        num <= retirementAge || num > 120

                      setIsLifeExpectancyInvalid(isInvalid)
                    } else {
                      setIsLifeExpectancyInvalid(true)
                    }
                  }}
                />

                <CTextField
                  label='Current Monthly Expenses'
                  fullWidth
                  value={currentMonthlyExpenses.toLocaleString()}
                  helperText={`0 < Amount < ${(1000000000).toLocaleString()}`}
                  helperTextStyle={{ pl: '4px' }}
                  sx={{
                    border: isCurrentMonthlyExpensesInvalid
                      ? '1px solid var(--red-color)'
                      : '1px solid var(--p-fg-st-color)',
                    borderRadius: '8px',
                    ':hover': {
                      border: isCurrentMonthlyExpensesInvalid
                        ? '1px solid var(--red-color)'
                        : '1px solid var(--p-fg-st-color)',
                    }
                  }}
                  onChange={(e) => {
                    const rawValue = e.target.value.replace(/,/g, '')
                    const num = Number(rawValue)

                    if (!isNaN(num)) {
                      setCurrentMonthlyExpenses(num)

                      const isInvalid =
                        num <= 0 || num > 1000000000

                      setIsCurrentMonthlyExpensesInvalid(isInvalid)
                    } else {
                      setIsCurrentMonthlyExpensesInvalid(true)
                    }
                  }}
                />

                <CTextField
                  label='Current Retirement Savings'
                  fullWidth
                  value={currentSavings.toLocaleString()}
                  helperText={`0 <= Amount < ${(1000000000).toLocaleString()}`}
                  helperTextStyle={{ pl: '4px' }}
                  sx={{
                    border: isCurrentSavingsInvalid
                      ? '1px solid var(--red-color)'
                      : '1px solid var(--p-fg-st-color)',
                    borderRadius: '8px',
                    ':hover': {
                      border: isCurrentSavingsInvalid
                        ? '1px solid var(--red-color)'
                        : '1px solid var(--p-fg-st-color)',
                    }
                  }}
                  onChange={(e) => {
                    const rawValue = e.target.value.replace(/,/g, '')
                    const num = Number(rawValue)

                    if (!isNaN(num)) {
                      setCurrentSavings(num)

                      const isInvalid =
                        num < 0 || num > 1000000000

                      setIsCurrentSavingsInvalid(isInvalid)
                    } else {
                      setIsCurrentSavingsInvalid(true)
                    }
                  }}
                />

                <CTextField
                  label='Inflation Rate (%)'
                  fullWidth
                  value={inflationRate}
                  helperText={'0 < Inflation Rate < 100'}
                  helperTextStyle={{ pl: '4px' }}
                  sx={{
                    border: isInflationRateInvalid
                      ? '1px solid var(--red-color)'
                      : '1px solid var(--p-fg-st-color)',
                    borderRadius: '8px',
                    ':hover': {
                      border: isInflationRateInvalid
                        ? '1px solid var(--red-color)'
                        : '1px solid var(--p-fg-st-color)',
                    }
                  }}
                  onChange={(e) => {
                    const value = e.target.value.replace(/,/g, '')

                    if (/^\d*\.?\d*$/.test(value)) {
                      setInflationRate(value)

                      const isInvalid =
                        parseFloat(value) <= 0 ||
                        parseFloat(value) > 100

                      setIsInflationRateInvalid(isInvalid)
                    } else {
                      setIsInflationRateInvalid(true)
                    }
                  }}
                />

                <CTextField
                  label='Expected Return Before Retirement (%)'
                  fullWidth
                  value={preRetirementReturn}
                  helperText={'0 < Return < 100'}
                  helperTextStyle={{ pl: '4px' }}
                  sx={{
                    border: isPreRetirementReturnInvalid
                      ? '1px solid var(--red-color)'
                      : '1px solid var(--p-fg-st-color)',
                    borderRadius: '8px',
                    ':hover': {
                      border: isPreRetirementReturnInvalid
                        ? '1px solid var(--red-color)'
                        : '1px solid var(--p-fg-st-color)',
                    }
                  }}
                  onChange={(e) => {
                    const value = e.target.value.replace(/,/g, '')

                    if (/^\d*\.?\d*$/.test(value)) {
                      setPreRetirementReturn(value)

                      const isInvalid =
                        parseFloat(value) <= 0 ||
                        parseFloat(value) > 100

                      setIsPreRetirementReturnInvalid(isInvalid)
                    } else {
                      setIsPreRetirementReturnInvalid(true)
                    }
                  }}
                />

                <CTextField
                  label='Expected Return After Retirement (%)'
                  fullWidth
                  value={postRetirementReturn}
                  helperText={'0 < Return < 100'}
                  helperTextStyle={{ pl: '4px' }}
                  sx={{
                    border: isPostRetirementReturnInvalid
                      ? '1px solid var(--red-color)'
                      : '1px solid var(--p-fg-st-color)',
                    borderRadius: '8px',
                    ':hover': {
                      border: isPostRetirementReturnInvalid
                        ? '1px solid var(--red-color)'
                        : '1px solid var(--p-fg-st-color)',
                    }
                  }}
                  onChange={(e) => {
                    const value = e.target.value.replace(/,/g, '')

                    if (/^\d*\.?\d*$/.test(value)) {
                      setPostRetirementReturn(value)

                      const isInvalid =
                        parseFloat(value) <= 0 ||
                        parseFloat(value) > 100

                      setIsPostRetirementReturnInvalid(isInvalid)
                    } else {
                      setIsPostRetirementReturnInvalid(true)
                    }
                  }}
                />

                <CButton
                  size='large'
                  label='Calculate Retirement'
                  onClick={calculateRetirementOnClickHandler}
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
                    Retirement Formula
                  </CTypography>

                  <CTypography
                    cvariant='th'
                    sx={{ mb: '8px' }}
                  >
                    Corpus = Future Annual Expenses * Present Value factor of retirement years
                  </CTypography>

                  <CTypography cvariant='c'>
                    Future expenses are calculated using inflation
                    <br />
                    Current savings are grown till retirement
                    <br />
                    Monthly savings are calculated to cover the remaining corpus
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
                <Grid item xs={12} sm={6}>
                  <Paper
                    sx={{
                      p: 2,
                      border: '1px solid var(--p-fg-st-color)',
                      boxShadow: '0 0 2500px var(--p-b-color)',
                      borderRadius: '8px'
                    }}
                  >
                    <CTypography cvariant='c'>
                      Years To Retirement
                    </CTypography>
                    <Typography variant='h6'>
                      {yearsToRetirement.toFixed(2)}
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
                    <CTypography cvariant='c'>
                      Future Monthly Expenses
                    </CTypography>
                    <Typography variant='h6'>
                      ${futureMonthlyExpenses.toFixed(2)}
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
                    <CTypography cvariant='c'>
                      Retirement Corpus
                    </CTypography>
                    <Typography variant='h6'>
                      ${retirementCorpus.toFixed(2)}
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
                    <CTypography cvariant='c'>
                      Monthly Savings Required
                    </CTypography>
                    <Typography variant='h6'>
                      ${monthlySavingsRequired.toFixed(2)}
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

      {/* Yearly Retirement Schedule */}
      <Box mb={6}>
        <CTypography
          cvariant='sh'
          sx={{ px: '4px', mb: '4px' }}
        >
          Retirement Savings Schedule
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
                <TableCell align='center'>Age</TableCell>
                <TableCell align='right'>Annual Savings</TableCell>
                <TableCell align='right'>Interest Earned</TableCell>
                <TableCell align='right'>Corpus Value</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {paginatedSchedule.map((item) => (
                <TableRow key={item.year}>
                  <TableCell align='center'>
                    {item.year}
                  </TableCell>

                  <TableCell align='center'>
                    {item.age}
                  </TableCell>

                  <TableCell align='right'>
                    ${item.annualSavings?.toLocaleString()}
                  </TableCell>

                  <TableCell align='right'>
                    ${item.interestEarned?.toLocaleString()}
                  </TableCell>

                  <TableCell align='right'>
                    ${item.corpusValue?.toLocaleString()}
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