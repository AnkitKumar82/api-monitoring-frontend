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
  { name: 'Current Salary', value: 50000 },
  { name: 'Increment', value: 5000 }
]

const downloadCSV = (
  summary,
  salarySchedule
) => {
  let csv = ''

  csv += `Calculation Type,${summary.calculationType}\n`
  csv += `Salary Type,${summary.salaryType}\n`
  csv += `Current Salary,${summary.currentSalary}\n`
  csv += `New Salary,${summary.newSalary}\n`
  csv += `Hike Percentage,${summary.hikePercentage}\n`
  csv += `Hike Amount,${summary.hikeAmount}\n`
  csv += `Annual Hike Rate,${summary.annualHikeRate}\n`
  csv += `Growth Duration,${summary.growthYears}\n`
  csv += `Monthly Increment,${summary.monthlyIncrement}\n`
  csv += `Annual Increment,${summary.annualIncrement}\n`
  csv += `Final Salary,${summary.finalSalary}\n\n`

  csv +=
    'Year,Monthly Salary,Annual Salary,Hike Amount,Hike Percentage\n'

  salarySchedule.forEach((row) => {
    csv += `${row.year},${row.monthlySalary},${row.annualSalary},${row.hikeAmount},${row.hikePercentage}\n`
  })

  const blob = new Blob([csv], {
    type: 'text/csv;charset=utf-8;',
  })

  saveAs(blob, 'salary-hike-calculation.csv')
}
export default function SalaryHikeCalculatorPage() {
  const [calculationType, setCalculationType] =
    useState('percentageHike')
  const [salaryType, setSalaryType] =
    useState('monthly')

  const [currentSalary, setCurrentSalary] = useState(50000)
  const [newSalary, setNewSalary] = useState(55000)
  const [hikePercentage, setHikePercentage] = useState('10.00')
  const [hikeAmount, setHikeAmount] = useState(5000)
  const [annualHikeRate, setAnnualHikeRate] = useState('10.00')
  const [growthYears, setGrowthYears] = useState(5)

  const [isCurrentSalaryInvalid, setIsCurrentSalaryInvalid] =
    useState(false)
  const [isNewSalaryInvalid, setIsNewSalaryInvalid] =
    useState(false)
  const [isHikePercentageInvalid, setIsHikePercentageInvalid] =
    useState(false)
  const [isHikeAmountInvalid, setIsHikeAmountInvalid] =
    useState(false)
  const [isAnnualHikeRateInvalid, setIsAnnualHikeRateInvalid] =
    useState(false)
  const [isGrowthYearsInvalid, setIsGrowthYearsInvalid] =
    useState(false)

  const [calculatedCurrentSalary, setCalculatedCurrentSalary] = useState(0.0)
  const [calculatedNewSalary, setCalculatedNewSalary] = useState(0.0)
  const [calculatedHikePercentage, setCalculatedHikePercentage] = useState(0.0)
  const [calculatedHikeAmount, setCalculatedHikeAmount] = useState(0.0)
  const [monthlyIncrement, setMonthlyIncrement] = useState(0.0)
  const [annualIncrement, setAnnualIncrement] = useState(0.0)
  const [finalSalary, setFinalSalary] = useState(0.0)

  const [pieChart, setPieChart] =
    useState(pieChartData)

  const [salarySchedule, setSalarySchedule] =
    useState([])

  const [page, setPage] = useState(0)

  const paginatedSchedule = salarySchedule.slice(
    page * 12,
    page * 12 + 12
  )
    const calculateSalaryHikeOnClickHandler = () => {
    const numCurrentSalary = parseFloat(currentSalary)
    const numNewSalary = parseFloat(newSalary)
    const numHikePercentage = parseFloat(hikePercentage)
    const numHikeAmount = parseFloat(hikeAmount)
    const numAnnualHikeRate = parseFloat(annualHikeRate)
    const numGrowthYears = parseFloat(growthYears)

    if (
      isCurrentSalaryInvalid ||
      isNewSalaryInvalid ||
      isHikePercentageInvalid ||
      isHikeAmountInvalid ||
      isAnnualHikeRateInvalid ||
      isGrowthYearsInvalid ||
      numCurrentSalary <= 0 ||
      (calculationType === 'percentageHike' &&
        numHikePercentage < 0) ||
      (calculationType === 'amountHike' &&
        numHikeAmount < 0) ||
      (calculationType === 'calculateHike' &&
        numNewSalary <= 0) ||
      (calculationType === 'reverseSalary' &&
        (numNewSalary <= 0 || numHikePercentage < 0)) ||
      (calculationType === 'growthProjection' &&
        (numAnnualHikeRate < 0 || numGrowthYears <= 0))
    ) {
      return
    }

    let oldSalary = numCurrentSalary
    let updatedSalary = numNewSalary
    let incrementAmount = 0
    let incrementPercentage = 0

    if (calculationType === 'percentageHike') {
      incrementAmount =
        numCurrentSalary * numHikePercentage / 100

      updatedSalary =
        numCurrentSalary + incrementAmount

      incrementPercentage =
        numHikePercentage
    }

    if (calculationType === 'amountHike') {
      incrementAmount =
        numHikeAmount

      updatedSalary =
        numCurrentSalary + numHikeAmount

      incrementPercentage =
        numHikeAmount / numCurrentSalary * 100
    }

    if (calculationType === 'calculateHike') {
      incrementAmount =
        numNewSalary - numCurrentSalary

      incrementPercentage =
        incrementAmount / numCurrentSalary * 100
    }

    if (calculationType === 'reverseSalary') {
      oldSalary =
        numNewSalary /
        (1 + numHikePercentage / 100)

      incrementAmount =
        numNewSalary - oldSalary

      updatedSalary =
        numNewSalary

      incrementPercentage =
        numHikePercentage
    }

    if (calculationType === 'growthProjection') {
      updatedSalary =
        numCurrentSalary *
        Math.pow(
          1 + numAnnualHikeRate / 100,
          numGrowthYears
        )

      incrementAmount =
        updatedSalary - numCurrentSalary

      incrementPercentage =
        incrementAmount / numCurrentSalary * 100
    }

    const monthlyDifference =
      salaryType === 'monthly'
        ? incrementAmount
        : incrementAmount / 12

    const annualDifference =
      salaryType === 'monthly'
        ? incrementAmount * 12
        : incrementAmount

    setCalculatedCurrentSalary(oldSalary)
    setCalculatedNewSalary(updatedSalary)
    setCalculatedHikePercentage(incrementPercentage)
    setCalculatedHikeAmount(incrementAmount)
    setMonthlyIncrement(monthlyDifference)
    setAnnualIncrement(annualDifference)
    setFinalSalary(updatedSalary)

    setPieChart([
      {
        name: 'Current Salary',
        value: Math.abs(oldSalary)
      },
      {
        name: incrementAmount >= 0 ? 'Increment' : 'Decrease',
        value: Math.abs(incrementAmount)
      }
    ])

    const options = {
      calculationType,
      salaryType,
      currentSalary: oldSalary,
      newSalary: updatedSalary,
      hikeAmount: incrementAmount,
      hikePercentage: incrementPercentage,
      annualHikeRate: numAnnualHikeRate,
      growthYears: numGrowthYears
    }

    const result = generateSalarySchedule(options)

    setSalarySchedule(result)
  }
    const generateSalarySchedule = ({
    calculationType,
    salaryType,
    currentSalary,
    newSalary,
    hikeAmount,
    hikePercentage,
    annualHikeRate,
    growthYears
  }) => {
    const schedule = []

    if (calculationType === 'growthProjection') {
      let salary = currentSalary

      schedule.push({
        year: 0,
        monthlySalary: Number((salaryType === 'monthly' ? salary : salary / 12).toFixed(2)),
        annualSalary: Number((salaryType === 'monthly' ? salary * 12 : salary).toFixed(2)),
        hikeAmount: Number((0).toFixed(2)),
        hikePercentage: Number((0).toFixed(2))
      })

      for (let currentYear = 1; currentYear <= growthYears; currentYear++) {
        const previousSalary = salary

        salary =
          salary *
          (1 + annualHikeRate / 100)

        const yearlyHike =
          salary - previousSalary

        schedule.push({
          year: currentYear,
          monthlySalary: Number((salaryType === 'monthly' ? salary : salary / 12).toFixed(2)),
          annualSalary: Number((salaryType === 'monthly' ? salary * 12 : salary).toFixed(2)),
          hikeAmount: Number(yearlyHike.toFixed(2)),
          hikePercentage: Number(annualHikeRate.toFixed(2))
        })
      }
    } else {
      schedule.push({
        year: 0,
        monthlySalary: Number((salaryType === 'monthly' ? currentSalary : currentSalary / 12).toFixed(2)),
        annualSalary: Number((salaryType === 'monthly' ? currentSalary * 12 : currentSalary).toFixed(2)),
        hikeAmount: Number((0).toFixed(2)),
        hikePercentage: Number((0).toFixed(2))
      })

      schedule.push({
        year: 1,
        monthlySalary: Number((salaryType === 'monthly' ? newSalary : newSalary / 12).toFixed(2)),
        annualSalary: Number((salaryType === 'monthly' ? newSalary * 12 : newSalary).toFixed(2)),
        hikeAmount: Number(hikeAmount.toFixed(2)),
        hikePercentage: Number(hikePercentage.toFixed(2))
      })
    }

    return schedule
  }

  const saveCSV = () => {
    const summary = {
      calculationType:
        calculationType === 'percentageHike'
          ? 'Salary After Percentage Hike'
          : calculationType === 'amountHike'
          ? 'Salary After Fixed Hike'
          : calculationType === 'calculateHike'
          ? 'Calculate Hike From Old And New Salary'
          : calculationType === 'reverseSalary'
          ? 'Calculate Old Salary From New Salary'
          : 'Salary Growth Projection',
      salaryType:
        salaryType === 'monthly'
          ? 'Monthly'
          : 'Annual',
      currentSalary: calculatedCurrentSalary.toFixed(2),
      newSalary: calculatedNewSalary.toFixed(2),
      hikePercentage: calculatedHikePercentage.toFixed(2),
      hikeAmount: calculatedHikeAmount.toFixed(2),
      annualHikeRate: Number(annualHikeRate).toFixed(2),
      growthYears: Number(growthYears).toFixed(2),
      monthlyIncrement: monthlyIncrement.toFixed(2),
      annualIncrement: annualIncrement.toFixed(2),
      finalSalary: finalSalary.toFixed(2)
    }

    downloadCSV(summary, salarySchedule)
  }

  useEffect(() => {
    calculateSalaryHikeOnClickHandler()
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
              <CTypography cvariant='sh'>Salary Hike Details</CTypography>

              <Stack spacing={3}>
                <CSelect
                  select
                  label='Calculation Type'
                  fullWidth
                  value={calculationType}
                  onChange={(e) =>
                    setCalculationType(e.target.value)
                  }
                  sx={{
                    '.MuiOutlinedInput-notchedOutline': { 
                        border: '1px solid var(--p-fg-st-color)'
                    }
                  }}
                >
                  <MenuItem value='percentageHike'>Salary After Percentage Hike</MenuItem>
                  <MenuItem value='amountHike'>Salary After Fixed Hike</MenuItem>
                  <MenuItem value='calculateHike'>Calculate Hike From Old And New Salary</MenuItem>
                  <MenuItem value='reverseSalary'>Calculate Old Salary From New Salary</MenuItem>
                  <MenuItem value='growthProjection'>Salary Growth Projection</MenuItem>
                </CSelect>

                <CSelect
                  select
                  label='Salary Type'
                  fullWidth
                  value={salaryType}
                  onChange={(e) =>
                    setSalaryType(e.target.value)
                  }
                  sx={{
                    '.MuiOutlinedInput-notchedOutline': { 
                        border: '1px solid var(--p-fg-st-color)'
                    }
                  }}
                >
                  <MenuItem value='monthly'>Monthly Salary</MenuItem>
                  <MenuItem value='annual'>Annual Salary</MenuItem>
                </CSelect>

                {calculationType !== 'reverseSalary' && (
                  <CTextField
                    label='Current Salary'
                    fullWidth
                    value={currentSalary.toLocaleString()}
                    helperText={`0 < Salary < ${(1000000000).toLocaleString()}`}
                    helperTextStyle={{ pl: '4px' }}
                    sx={{
                      border: isCurrentSalaryInvalid
                        ? '1px solid var(--red-color)'
                        : '1px solid var(--p-fg-st-color)',
                      borderRadius: '8px',
                      ':hover': {
                        border: isCurrentSalaryInvalid
                          ? '1px solid var(--red-color)'
                          : '1px solid var(--p-fg-st-color)',
                      }
                    }}
                    onChange={(e) => {
                      const rawValue = e.target.value.replace(/,/g, '')
                      const num = Number(rawValue)

                      if (!isNaN(num)) {
                        setCurrentSalary(num)

                        const isInvalid =
                          num <= 0 || num > 1000000000

                        setIsCurrentSalaryInvalid(isInvalid)
                      } else {
                        setIsCurrentSalaryInvalid(true)
                      }
                    }}
                  />
                )}

                {(calculationType === 'calculateHike' ||
                  calculationType === 'reverseSalary') && (
                  <CTextField
                    label='New Salary'
                    fullWidth
                    value={newSalary.toLocaleString()}
                    helperText={`0 < Salary < ${(1000000000).toLocaleString()}`}
                    helperTextStyle={{ pl: '4px' }}
                    sx={{
                      border: isNewSalaryInvalid
                        ? '1px solid var(--red-color)'
                        : '1px solid var(--p-fg-st-color)',
                      borderRadius: '8px',
                      ':hover': {
                        border: isNewSalaryInvalid
                          ? '1px solid var(--red-color)'
                          : '1px solid var(--p-fg-st-color)',
                      }
                    }}
                    onChange={(e) => {
                      const rawValue = e.target.value.replace(/,/g, '')
                      const num = Number(rawValue)

                      if (!isNaN(num)) {
                        setNewSalary(num)

                        const isInvalid =
                          num <= 0 || num > 1000000000

                        setIsNewSalaryInvalid(isInvalid)
                      } else {
                        setIsNewSalaryInvalid(true)
                      }
                    }}
                  />
                )}

                {(calculationType === 'percentageHike' ||
                  calculationType === 'reverseSalary') && (
                  <CTextField
                    label='Hike Percentage (%)'
                    fullWidth
                    value={hikePercentage}
                    helperText={'0 <= Hike Percentage'}
                    helperTextStyle={{ pl: '4px' }}
                    sx={{
                      border: isHikePercentageInvalid
                        ? '1px solid var(--red-color)'
                        : '1px solid var(--p-fg-st-color)',
                      borderRadius: '8px',
                      ':hover': {
                        border: isHikePercentageInvalid
                          ? '1px solid var(--red-color)'
                          : '1px solid var(--p-fg-st-color)',
                      }
                    }}
                    onChange={(e) => {
                      const value = e.target.value.replace(/,/g, '')

                      if (/^\d*\.?\d*$/.test(value)) {
                        setHikePercentage(value)

                        const isInvalid =
                          parseFloat(value) < 0

                        setIsHikePercentageInvalid(isInvalid)
                      } else {
                        setIsHikePercentageInvalid(true)
                      }
                    }}
                  />
                )}

                {calculationType === 'amountHike' && (
                  <CTextField
                    label='Hike Amount'
                    fullWidth
                    value={hikeAmount.toLocaleString()}
                    helperText={`0 <= Amount < ${(1000000000).toLocaleString()}`}
                    helperTextStyle={{ pl: '4px' }}
                    sx={{
                      border: isHikeAmountInvalid
                        ? '1px solid var(--red-color)'
                        : '1px solid var(--p-fg-st-color)',
                      borderRadius: '8px',
                      ':hover': {
                        border: isHikeAmountInvalid
                          ? '1px solid var(--red-color)'
                          : '1px solid var(--p-fg-st-color)',
                      }
                    }}
                    onChange={(e) => {
                      const rawValue = e.target.value.replace(/,/g, '')
                      const num = Number(rawValue)

                      if (!isNaN(num)) {
                        setHikeAmount(num)

                        const isInvalid =
                          num < 0 || num > 1000000000

                        setIsHikeAmountInvalid(isInvalid)
                      } else {
                        setIsHikeAmountInvalid(true)
                      }
                    }}
                  />
                )}

                {calculationType === 'growthProjection' && (
                  <>
                    <CTextField
                      label='Annual Hike Rate (%)'
                      fullWidth
                      value={annualHikeRate}
                      helperText={'0 <= Annual Hike Rate'}
                      helperTextStyle={{ pl: '4px' }}
                      sx={{
                        border: isAnnualHikeRateInvalid
                          ? '1px solid var(--red-color)'
                          : '1px solid var(--p-fg-st-color)',
                        borderRadius: '8px',
                        ':hover': {
                          border: isAnnualHikeRateInvalid
                            ? '1px solid var(--red-color)'
                            : '1px solid var(--p-fg-st-color)',
                        }
                      }}
                      onChange={(e) => {
                        const value = e.target.value.replace(/,/g, '')

                        if (/^\d*\.?\d*$/.test(value)) {
                          setAnnualHikeRate(value)

                          const isInvalid =
                            parseFloat(value) < 0

                          setIsAnnualHikeRateInvalid(isInvalid)
                        } else {
                          setIsAnnualHikeRateInvalid(true)
                        }
                      }}
                    />

                    <CTextField
                      label='Growth Duration (Years)'
                      fullWidth
                      value={growthYears.toLocaleString()}
                      helperText={`0 < Years < ${(100).toLocaleString()}`}
                      helperTextStyle={{ pl: '4px' }}
                      sx={{
                        border: isGrowthYearsInvalid
                          ? '1px solid var(--red-color)'
                          : '1px solid var(--p-fg-st-color)',
                        borderRadius: '8px',
                        ':hover': {
                          border: isGrowthYearsInvalid
                            ? '1px solid var(--red-color)'
                            : '1px solid var(--p-fg-st-color)',
                        }
                      }}
                      onChange={(e) => {
                        const rawValue = e.target.value.replace(/,/g, '')
                        const num = Number(rawValue)

                        if (!isNaN(num)) {
                          setGrowthYears(num)

                          const isInvalid =
                            num <= 0 || num > 100

                          setIsGrowthYearsInvalid(isInvalid)
                        } else {
                          setIsGrowthYearsInvalid(true)
                        }
                      }}
                    />
                  </>
                )}

                <CButton
                  size='large'
                  label='Calculate Salary Hike'
                  onClick={calculateSalaryHikeOnClickHandler}
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
                    Salary Hike Formula
                  </CTypography>

                  <CTypography
                    cvariant='th'
                    sx={{ mb: '8px' }}
                  >
                    New Salary = Current Salary + Hike Amount
                  </CTypography>

                  <CTypography cvariant='c'>
                    Hike Amount = Current Salary * Hike Percentage / 100
                    <br />
                    Hike Percentage = Hike Amount / Current Salary * 100
                    <br />
                    Growth salary is compounded by annual hike rate
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
                      Current Salary
                    </CTypography>
                    <Typography variant='h6'>
                      ${calculatedCurrentSalary.toFixed(2)}
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
                      New Salary
                    </CTypography>
                    <Typography variant='h6'>
                      ${calculatedNewSalary.toFixed(2)}
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
                      Hike Percentage
                    </CTypography>
                    <Typography variant='h6'>
                      {calculatedHikePercentage.toFixed(2)}%
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
                      Hike Amount
                    </CTypography>
                    <Typography variant='h6'>
                      ${calculatedHikeAmount.toFixed(2)}
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
                      Monthly Increment
                    </CTypography>
                    <Typography variant='h6'>
                      ${monthlyIncrement.toFixed(2)}
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
                      Annual Increment
                    </CTypography>
                    <Typography variant='h6'>
                      ${annualIncrement.toFixed(2)}
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

      {/* Salary Hike Schedule */}
      <Box mb={6}>
        <CTypography
          cvariant='sh'
          sx={{ px: '4px', mb: '4px' }}
        >
          Salary Growth Schedule
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
                <TableCell align='right'>Monthly Salary</TableCell>
                <TableCell align='right'>Annual Salary</TableCell>
                <TableCell align='right'>Hike Amount</TableCell>
                <TableCell align='right'>Hike Percentage</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {paginatedSchedule.map((item) => (
                <TableRow key={item.year}>
                  <TableCell align='center'>
                    {item.year}
                  </TableCell>

                  <TableCell align='right'>
                    ${item.monthlySalary?.toLocaleString()}
                  </TableCell>

                  <TableCell align='right'>
                    ${item.annualSalary?.toLocaleString()}
                  </TableCell>

                  <TableCell align='right'>
                    ${item.hikeAmount?.toLocaleString()}
                  </TableCell>

                  <TableCell align='right'>
                    {item.hikePercentage?.toLocaleString()}%
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
                <TablePagination
          component={Paper}
          count={salarySchedule.length}
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