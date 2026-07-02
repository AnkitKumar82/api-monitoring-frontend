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
  { name: 'Total Contribution', value: 1000 },
  { name: 'Interest', value: 0 }
]

const downloadCSV = (summary, yearlySchedule) => {
  let csv = ''

  csv += `Basic Salary + DA,${summary.basicSalary}\n`
  csv += `Employee Contribution (%),${summary.employeeContribution}\n`
  csv += `Employer Contribution (%),${summary.employerContribution}\n`
  csv += `Annual Interest Rate (%),${summary.interestRate}\n`
  csv += `Investment Duration (Years),${summary.investmentYears}\n`
  csv += `Total Employee Contribution,${summary.totalEmployeeContribution}\n`
  csv += `Total Employer Contribution,${summary.totalEmployerContribution}\n`
  csv += `Interest Earned,${summary.interestEarned}\n`
  csv += `Maturity Amount,${summary.maturityAmount}\n\n`

  csv += 'Year,Employee Contribution,Employer Contribution,Interest Earned,Maturity Value\n'

  yearlySchedule.forEach((row) => {
    csv += `${row.year},${row.employeeContribution},${row.employerContribution},${row.interestEarned},${row.maturityValue}\n`
  })

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  saveAs(blob, 'epf-calculation.csv')
}

export default function EpfCalculatorPage() {
  const [basicSalary, setBasicSalary] = useState(1000)
  const [employeeContribution, setEmployeeContribution] = useState('12')
  const [employerContribution, setEmployerContribution] = useState('12')
  const [interestRate, setInterestRate] = useState('8.25')
  const [investmentYears, setInvestmentYears] = useState(10)

  const [isBasicSalaryInvalid, setIsBasicSalaryInvalid] = useState(false)
  const [isEmployeeContributionInvalid, setIsEmployeeContributionInvalid] = useState(false)
  const [isEmployerContributionInvalid, setIsEmployerContributionInvalid] = useState(false)
  const [isInterestRateInvalid, setIsInterestRateInvalid] = useState(false)
  const [isInvestmentYearsInvalid, setIsInvestmentYearsInvalid] = useState(false)

  const [totalEmployeeContribution, setTotalEmployeeContribution] = useState(0.0)
  const [totalEmployerContribution, setTotalEmployerContribution] = useState(0.0)
  const [interestEarned, setInterestEarned] = useState(0.0)
  const [maturityAmount, setMaturityAmount] = useState(0.0)

  const [pieChart, setPieChart] = useState(pieChartData)
  const [yearlySchedule, setYearlySchedule] = useState([])
  const [page, setPage] = useState(0)

  const paginatedSchedule = yearlySchedule.slice(page * 12, page * 12 + 12)

  const calculateEpfOnClickHandler = () => {
    const numBasicSalary = parseFloat(basicSalary)
    const numEmployeeContribution = parseFloat(employeeContribution)
    const numEmployerContribution = parseFloat(employerContribution)
    const numInterestRate = parseFloat(interestRate)
    const numInvestmentYears = parseFloat(investmentYears)

    if (
      isBasicSalaryInvalid ||
      isEmployeeContributionInvalid ||
      isEmployerContributionInvalid ||
      isInterestRateInvalid ||
      isInvestmentYearsInvalid ||
      numBasicSalary <= 0 ||
      numEmployeeContribution <= 0 ||
      numEmployerContribution <= 0 ||
      numInterestRate <= 0 ||
      numInvestmentYears <= 0
    ) {
      return
    }

    const result = generateYearlySchedule({
      basicSalary: numBasicSalary,
      employeeRate: numEmployeeContribution,
      employerRate: numEmployerContribution,
      annualRate: numInterestRate,
      investmentYears: Math.floor(numInvestmentYears)
    })

    const last = result[result.length - 1]
    const totalEmp = numBasicSalary * (numEmployeeContribution / 100) * 12 * Math.floor(numInvestmentYears)
    const totalEmr = numBasicSalary * (numEmployerContribution / 100) * 12 * Math.floor(numInvestmentYears)
    const interest = last.maturityValue - totalEmp - totalEmr

    setTotalEmployeeContribution(totalEmp)
    setTotalEmployerContribution(totalEmr)
    setInterestEarned(interest)
    setMaturityAmount(last.maturityValue)

    setPieChart([
      { name: 'Total Contribution', value: totalEmp + totalEmr },
      { name: 'Interest', value: interest }
    ])

    setYearlySchedule(result)
  }

  const generateYearlySchedule = ({
    basicSalary,
    employeeRate,
    employerRate,
    annualRate,
    investmentYears
  }) => {
    const schedule = []
    const r = annualRate / 100
    const monthlyEmployee = basicSalary * (employeeRate / 100)
    const monthlyEmployer = basicSalary * (employerRate / 100)
    const monthlyTotal = monthlyEmployee + monthlyEmployer
    let balance = 0

    for (let year = 1; year <= investmentYears; year++) {
      // Monthly compounding within the year
      for (let month = 1; month <= 12; month++) {
        balance = (balance + monthlyTotal) * (1 + r / 12)
      }

      const totalEmpSoFar = monthlyEmployee * 12 * year
      const totalEmrSoFar = monthlyEmployer * 12 * year
      const interestSoFar = balance - totalEmpSoFar - totalEmrSoFar

      schedule.push({
        year,
        employeeContribution: Number(totalEmpSoFar.toFixed(2)),
        employerContribution: Number(totalEmrSoFar.toFixed(2)),
        interestEarned: Number(interestSoFar.toFixed(2)),
        maturityValue: Number(balance.toFixed(2))
      })
    }

    return schedule
  }

  const saveCSV = () => {
    const summary = {
      basicSalary: Number(basicSalary).toFixed(2),
      employeeContribution: Number(employeeContribution).toFixed(2),
      employerContribution: Number(employerContribution).toFixed(2),
      interestRate: Number(interestRate).toFixed(2),
      investmentYears: Number(investmentYears).toFixed(2),
      totalEmployeeContribution: totalEmployeeContribution.toFixed(2),
      totalEmployerContribution: totalEmployerContribution.toFixed(2),
      interestEarned: interestEarned.toFixed(2),
      maturityAmount: maturityAmount.toFixed(2)
    }

    downloadCSV(summary, yearlySchedule)
  }

  useEffect(() => {
    calculateEpfOnClickHandler()
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
              <CTypography cvariant='sh'>EPF Details</CTypography>

              <Stack spacing={3}>
                <CTextField
                  label='Basic Salary + DA (Monthly)'
                  fullWidth
                  value={basicSalary.toLocaleString()}
                  helperText={`0 < Amount ≤ ${(1000000).toLocaleString()}`}
                  helperTextStyle={{ pl: '4px' }}
                  sx={{
                    border: isBasicSalaryInvalid
                      ? '1px solid var(--red-color)'
                      : '1px solid var(--p-fg-st-color)',
                    borderRadius: '8px',
                    ':hover': {
                      border: isBasicSalaryInvalid
                        ? '1px solid var(--red-color)'
                        : '1px solid var(--p-fg-st-color)',
                    }
                  }}
                  onChange={(e) => {
                    const rawValue = e.target.value.replace(/,/g, '')
                    const num = Number(rawValue)

                    if (!isNaN(num)) {
                      setBasicSalary(num)
                      const isInvalid = num <= 0 || num > 1000000
                      setIsBasicSalaryInvalid(isInvalid)
                    } else {
                      setIsBasicSalaryInvalid(true)
                    }
                  }}
                />

                <CTextField
                  label='Employee Contribution (%)'
                  fullWidth
                  value={employeeContribution}
                  helperText={'0 < Contribution ≤ 100'}
                  helperTextStyle={{ pl: '4px' }}
                  sx={{
                    border: isEmployeeContributionInvalid
                      ? '1px solid var(--red-color)'
                      : '1px solid var(--p-fg-st-color)',
                    borderRadius: '8px',
                    ':hover': {
                      border: isEmployeeContributionInvalid
                        ? '1px solid var(--red-color)'
                        : '1px solid var(--p-fg-st-color)',
                    }
                  }}
                  onChange={(e) => {
                    const value = e.target.value.replace(/,/g, '')

                    if (/^\d*\.?\d*$/.test(value)) {
                      setEmployeeContribution(value)
                      const isInvalid = parseFloat(value) <= 0 || parseFloat(value) > 100
                      setIsEmployeeContributionInvalid(isInvalid)
                    } else {
                      setIsEmployeeContributionInvalid(true)
                    }
                  }}
                />

                <CTextField
                  label='Employer Contribution (%)'
                  fullWidth
                  value={employerContribution}
                  helperText={'0 < Contribution ≤ 100'}
                  helperTextStyle={{ pl: '4px' }}
                  sx={{
                    border: isEmployerContributionInvalid
                      ? '1px solid var(--red-color)'
                      : '1px solid var(--p-fg-st-color)',
                    borderRadius: '8px',
                    ':hover': {
                      border: isEmployerContributionInvalid
                        ? '1px solid var(--red-color)'
                        : '1px solid var(--p-fg-st-color)',
                    }
                  }}
                  onChange={(e) => {
                    const value = e.target.value.replace(/,/g, '')

                    if (/^\d*\.?\d*$/.test(value)) {
                      setEmployerContribution(value)
                      const isInvalid = parseFloat(value) <= 0 || parseFloat(value) > 100
                      setIsEmployerContributionInvalid(isInvalid)
                    } else {
                      setIsEmployerContributionInvalid(true)
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
                      const isInvalid = parseFloat(value) <= 0 || parseFloat(value) > 100
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
                  label='Calculate EPF'
                  onClick={calculateEpfOnClickHandler}
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
                    EPF Formula
                  </CTypography>

                  <CTypography cvariant='th' sx={{ mb: '8px' }}>
                    A = Σ (C × (1 + r/12)<sup>n-m</sup>)
                  </CTypography>

                  <CTypography cvariant='c'>
                    C = Monthly Total Contribution
                    <br />
                    r = Annual Interest Rate
                    <br />
                    n = Total Months
                    <br />
                    m = Month of Contribution
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
                      Employee Contribution
                    </CTypography>
                    <Typography variant='h6'>
                      ${totalEmployeeContribution.toFixed(2)}
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
                      Employer Contribution
                    </CTypography>
                    <Typography variant='h6'>
                      ${totalEmployerContribution.toFixed(2)}
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
                      Interest Earned
                    </CTypography>
                    <Typography variant='h6'>
                      ${interestEarned.toFixed(2)}
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
      <Stack direction='row' spacing={2} mb={'4px'}>
        <CButton
          size='large'
          cvariant='l'
          onClick={saveCSV}
          label='Download CSV'
        />
      </Stack>

      {/* Yearly EPF Schedule */}
      <Box mb={6}>
        <CTypography cvariant='sh' sx={{ px: '4px', mb: '4px' }}>
          EPF Growth Schedule
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
                <TableCell align='right'>Employee Contribution</TableCell>
                <TableCell align='right'>Employer Contribution</TableCell>
                <TableCell align='right'>Interest Earned</TableCell>
                <TableCell align='right'>Maturity Value</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {paginatedSchedule.map((item) => (
                <TableRow key={item.year}>
                  <TableCell align='center'>{item.year}</TableCell>
                  <TableCell align='right'>${item.employeeContribution?.toLocaleString()}</TableCell>
                  <TableCell align='right'>${item.employerContribution?.toLocaleString()}</TableCell>
                  <TableCell align='right'>${item.interestEarned?.toLocaleString()}</TableCell>
                  <TableCell align='right'>${item.maturityValue?.toLocaleString()}</TableCell>
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