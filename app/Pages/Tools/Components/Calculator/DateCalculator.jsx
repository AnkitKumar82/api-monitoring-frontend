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
import CSelect from '../../../../Components/CSelect'
import { saveAs } from 'file-saver'

const downloadCSV = (
  summary,
  dateBreakdown
) => {
  let csv = ''

  csv += `Start Date,${summary.startDate}\n`
  csv += `End Date,${summary.endDate}\n`
  csv += `Total Days,${summary.totalDays}\n`
  csv += `Total Weeks,${summary.totalWeeks}\n`
  csv += `Total Months,${summary.totalMonths}\n`
  csv += `Total Years,${summary.totalYears}\n\n`

  csv +=
    'Description,Date,Days From Start\n'

  dateBreakdown.forEach((row) => {
    csv += `${row.description},${row.date},${row.daysFromStart}\n`
  })

  const blob = new Blob([csv], {
    type: 'text/csv;charset=utf-8;',
  })

  saveAs(blob, 'date-difference-calculation.csv')
}
export default function DateDifferenceCalculatorPage() {
  const [startDate, setStartDate] = useState('2026-01-01')
  const [endDate, setEndDate] = useState('2026-12-31')

  const [isStartDateInvalid, setIsStartDateInvalid] =
    useState(false)
  const [isEndDateInvalid, setIsEndDateInvalid] =
    useState(false)

  const [totalDays, setTotalDays] = useState(0.0)
  const [totalWeeks, setTotalWeeks] = useState(0.0)
  const [totalMonths, setTotalMonths] = useState(0.0)
  const [totalYears, setTotalYears] = useState(0.0)

  const [dateBreakdown, setDateBreakdown] =
    useState([])

  const [page, setPage] = useState(0)

  const paginatedSchedule = dateBreakdown.slice(
    page * 12,
    page * 12 + 12
  )
    const calculateDateDifferenceOnClickHandler = () => {
    const start = new Date(startDate)
    const end = new Date(endDate)

    if (
      isStartDateInvalid ||
      isEndDateInvalid ||
      !startDate ||
      !endDate ||
      isNaN(start.getTime()) ||
      isNaN(end.getTime())
    ) {
      return
    }

    const differenceTime =
      end.getTime() - start.getTime()

    const differenceDays =
      Math.abs(differenceTime / (1000 * 60 * 60 * 24))

    const weeks =
      differenceDays / 7

    const months =
      differenceDays / 30.44

    const years =
      differenceDays / 365.25

    setTotalDays(differenceDays)
    setTotalWeeks(weeks)
    setTotalMonths(months)
    setTotalYears(years)

    const options = {
      startDate,
      endDate,
      totalDays: differenceDays
    }

    const result = generateDateBreakdown(options)

    setDateBreakdown(result)
  }
    const generateDateBreakdown = ({
    startDate,
    endDate,
    totalDays
  }) => {
    const schedule = []

    schedule.push({
      description: 'Start Date',
      date: startDate,
      daysFromStart: Number((0).toFixed(2))
    })

    schedule.push({
      description: 'End Date',
      date: endDate,
      daysFromStart: Number(totalDays.toFixed(2))
    })

    return schedule
  }

  const saveCSV = () => {
    const summary = {
      startDate,
      endDate,
      totalDays: totalDays.toFixed(2),
      totalWeeks: totalWeeks.toFixed(2),
      totalMonths: totalMonths.toFixed(2),
      totalYears: totalYears.toFixed(2)
    }

    downloadCSV(summary, dateBreakdown)
  }

  useEffect(() => {
    calculateDateDifferenceOnClickHandler()
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
              <CTypography cvariant='sh'>Date Difference Details</CTypography>

              <Stack spacing={3}>
                <CTextField
                  label='Start Date'
                  type='date'
                  fullWidth
                  value={startDate}
                  helperText={'Select start date'}
                  helperTextStyle={{ pl: '4px' }}
                  sx={{
                    border: isStartDateInvalid
                      ? '1px solid var(--red-color)'
                      : '1px solid var(--p-fg-st-color)',
                    borderRadius: '8px',
                    ':hover': {
                      border: isStartDateInvalid
                        ? '1px solid var(--red-color)'
                        : '1px solid var(--p-fg-st-color)',
                    }
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(e) => {
                    const value = e.target.value

                    setStartDate(value)

                    const isInvalid =
                      !value ||
                      isNaN(new Date(value).getTime())

                    setIsStartDateInvalid(isInvalid)
                  }}
                />

                <CTextField
                  label='End Date'
                  type='date'
                  fullWidth
                  value={endDate}
                  helperText={'Select end date'}
                  helperTextStyle={{ pl: '4px' }}
                  sx={{
                    border: isEndDateInvalid
                      ? '1px solid var(--red-color)'
                      : '1px solid var(--p-fg-st-color)',
                    borderRadius: '8px',
                    ':hover': {
                      border: isEndDateInvalid
                        ? '1px solid var(--red-color)'
                        : '1px solid var(--p-fg-st-color)',
                    }
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(e) => {
                    const value = e.target.value

                    setEndDate(value)

                    const isInvalid =
                      !value ||
                      isNaN(new Date(value).getTime())

                    setIsEndDateInvalid(isInvalid)
                  }}
                />

                <CButton
                  size='large'
                  label='Calculate Date Difference'
                  onClick={calculateDateDifferenceOnClickHandler}
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
                    Date Difference Formula
                  </CTypography>

                  <CTypography
                    cvariant='th'
                    sx={{ mb: '8px' }}
                  >
                    Total Days = End Date - Start Date
                  </CTypography>

                  <CTypography cvariant='c'>
                    Start date and end date are converted into time values
                    <br />
                    Difference is calculated in milliseconds
                    <br />
                    Milliseconds are converted into days, weeks, months and years
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
                      Total Days
                    </CTypography>
                    <Typography variant='h6'>
                      {totalDays.toFixed(2)}
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
                      Total Weeks
                    </CTypography>
                    <Typography variant='h6'>
                      {totalWeeks.toFixed(2)}
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
                      Total Months
                    </CTypography>
                    <Typography variant='h6'>
                      {totalMonths.toFixed(2)}
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
                      Total Years
                    </CTypography>
                    <Typography variant='h6'>
                      {totalYears.toFixed(2)}
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>
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

      {/* Date Difference Breakdown */}
      <Box mb={6}>
        <CTypography
          cvariant='sh'
          sx={{ px: '4px', mb: '4px' }}
        >
          Date Difference Breakdown
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
                <TableCell align='center'>Description</TableCell>
                <TableCell align='center'>Date</TableCell>
                <TableCell align='right'>Days From Start</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {paginatedSchedule.map((item) => (
                <TableRow key={item.description}>
                  <TableCell align='center'>
                    {item.description}
                  </TableCell>

                  <TableCell align='center'>
                    {item.date}
                  </TableCell>

                  <TableCell align='right'>
                    {item.daysFromStart?.toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
                <TablePagination
          component={Paper}
          count={dateBreakdown.length}
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