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
import { saveAs } from 'file-saver'

const downloadCSV = (summary, milestoneSchedule) => {
  let csv = ''

  csv += `Date of Birth,${summary.dateOfBirth}\n`
  csv += `Age at Date,${summary.ageAtDate}\n`
  csv += `Years,${summary.years}\n`
  csv += `Months,${summary.months}\n`
  csv += `Days,${summary.days}\n`
  csv += `Total Days Lived,${summary.totalDaysLived}\n`
  csv += `Total Weeks Lived,${summary.totalWeeksLived}\n`
  csv += `Total Months Lived,${summary.totalMonthsLived}\n`
  csv += `Next Birthday,${summary.nextBirthday}\n`
  csv += `Days to Next Birthday,${summary.daysToNextBirthday}\n\n`

  csv += 'Milestone,Date,Age\n'

  milestoneSchedule.forEach((row) => {
    csv += `${row.milestone},${row.date},${row.age}\n`
  })

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  saveAs(blob, 'age-calculation.csv')
}

export default function AgeCalculatorPage() {
  const today = new Date()
  const defaultDob = '1990-01-01'
  const defaultAgeAt = today.toISOString().split('T')[0]

  const [dateOfBirth, setDateOfBirth] = useState(defaultDob)
  const [ageAtDate, setAgeAtDate] = useState(defaultAgeAt)

  const [isDateOfBirthInvalid, setIsDateOfBirthInvalid] = useState(false)
  const [isAgeAtDateInvalid, setIsAgeAtDateInvalid] = useState(false)

  const [years, setYears] = useState(0)
  const [months, setMonths] = useState(0)
  const [days, setDays] = useState(0)
  const [totalDaysLived, setTotalDaysLived] = useState(0)
  const [totalWeeksLived, setTotalWeeksLived] = useState(0)
  const [totalMonthsLived, setTotalMonthsLived] = useState(0)
  const [nextBirthday, setNextBirthday] = useState('')
  const [daysToNextBirthday, setDaysToNextBirthday] = useState(0)

  const [milestoneSchedule, setMilestoneSchedule] = useState([])
  const [page, setPage] = useState(0)

  const paginatedSchedule = milestoneSchedule.slice(page * 12, page * 12 + 12)

  const calculateAgeOnClickHandler = () => {
    if (isDateOfBirthInvalid || isAgeAtDateInvalid || !dateOfBirth || !ageAtDate) return

    const dob = new Date(dateOfBirth)
    const ref = new Date(ageAtDate)

    if (dob >= ref) {
      setIsDateOfBirthInvalid(true)
      return
    }

    // Years, months, days
    let y = ref.getFullYear() - dob.getFullYear()
    let m = ref.getMonth() - dob.getMonth()
    let d = ref.getDate() - dob.getDate()

    if (d < 0) {
      m -= 1
      const prevMonth = new Date(ref.getFullYear(), ref.getMonth(), 0)
      d += prevMonth.getDate()
    }
    if (m < 0) {
      y -= 1
      m += 12
    }

    // Totals
    const msPerDay = 1000 * 60 * 60 * 24
    const totalDays = Math.floor((ref - dob) / msPerDay)
    const totalWeeks = Math.floor(totalDays / 7)
    const totalMonths = y * 12 + m

    // Next birthday
    let nextBd = new Date(ref.getFullYear(), dob.getMonth(), dob.getDate())
    if (nextBd <= ref) nextBd.setFullYear(ref.getFullYear() + 1)
    const daysToNext = Math.ceil((nextBd - ref) / msPerDay)
    const nextBdStr = nextBd.toLocaleDateString('en-IN', {
      day: '2-digit', month: 'long', year: 'numeric'
    })

    setYears(y)
    setMonths(m)
    setDays(d)
    setTotalDaysLived(totalDays)
    setTotalWeeksLived(totalWeeks)
    setTotalMonthsLived(totalMonths)
    setNextBirthday(nextBdStr)
    setDaysToNextBirthday(daysToNext)

    const yearsTo100 = 100 - y
    setMilestoneSchedule(generateMilestones(dob))
  }

  const generateMilestones = (dob) => {
    const milestones = [1, 5, 10, 13, 16, 18, 21, 25, 30, 40, 50, 60, 70, 75, 80, 90, 100]
    return milestones.map((age) => {
      const date = new Date(dob)
      date.setFullYear(dob.getFullYear() + age)
      return {
        milestone: `${age}${age === 1 ? 'st' : age === 2 ? 'nd' : age === 3 ? 'rd' : 'th'} Birthday`,
        date: date.toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' }),
        age: `${age} years`
      }
    })
  }

  const saveCSV = () => {
    const summary = {
      dateOfBirth: new Date(dateOfBirth).toLocaleDateString('en-IN', {
        day: '2-digit', month: 'long', year: 'numeric'
      }),
      ageAtDate: new Date(ageAtDate).toLocaleDateString('en-IN', {
        day: '2-digit', month: 'long', year: 'numeric'
      }),
      years,
      months,
      days,
      totalDaysLived,
      totalWeeksLived,
      totalMonthsLived,
      nextBirthday,
      daysToNextBirthday
    }

    downloadCSV(summary, milestoneSchedule)
  }

  useEffect(() => {
    calculateAgeOnClickHandler()
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
              <CTypography cvariant='sh'>Age Details</CTypography>

              <Stack spacing={3}>
                <CTextField
                  label='Date of Birth'
                  fullWidth
                  type='date'
                  value={dateOfBirth}
                  helperText={'Enter your date of birth'}
                  helperTextStyle={{ pl: '4px' }}
                  InputLabelProps={{ shrink: true }}
                  sx={{
                    border: isDateOfBirthInvalid
                      ? '1px solid var(--red-color)'
                      : '1px solid var(--p-fg-st-color)',
                    borderRadius: '8px',
                    ':hover': {
                      border: isDateOfBirthInvalid
                        ? '1px solid var(--red-color)'
                        : '1px solid var(--p-fg-st-color)',
                    }
                  }}
                  onChange={(e) => {
                    const value = e.target.value
                    setDateOfBirth(value)
                    const dob = new Date(value)
                    const ref = new Date(ageAtDate)
                    setIsDateOfBirthInvalid(!value || dob >= ref)
                  }}
                />

                <CTextField
                  label='Age At Date'
                  fullWidth
                  type='date'
                  value={ageAtDate}
                  helperText={'Calculate age at this date (defaults to today)'}
                  helperTextStyle={{ pl: '4px' }}
                  InputLabelProps={{ shrink: true }}
                  sx={{
                    border: isAgeAtDateInvalid
                      ? '1px solid var(--red-color)'
                      : '1px solid var(--p-fg-st-color)',
                    borderRadius: '8px',
                    ':hover': {
                      border: isAgeAtDateInvalid
                        ? '1px solid var(--red-color)'
                        : '1px solid var(--p-fg-st-color)',
                    }
                  }}
                  onChange={(e) => {
                    const value = e.target.value
                    setAgeAtDate(value)
                    const dob = new Date(dateOfBirth)
                    const ref = new Date(value)
                    setIsAgeAtDateInvalid(!value || dob >= ref)
                  }}
                />

                <CButton
                  size='large'
                  label='Calculate Age'
                  onClick={calculateAgeOnClickHandler}
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
                    Age Breakdown
                  </CTypography>

                  <CTypography cvariant='th' sx={{ mb: '8px' }}>
                    Age = (Ref Date) − (Date of Birth)
                  </CTypography>

                  <CTypography cvariant='c'>
                    Years = Full calendar years elapsed
                    <br />
                    Months = Remaining months after years
                    <br />
                    Days = Remaining days after months
                    <br />
                    Next Birthday = Next occurrence of DOB
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
                    <CTypography cvariant='c'>Years</CTypography>
                    <Typography variant='h6'>{years} yrs</Typography>
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
                    <CTypography cvariant='c'>Months</CTypography>
                    <Typography variant='h6'>{months} mos</Typography>
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
                    <CTypography cvariant='c'>Days</CTypography>
                    <Typography variant='h6'>{days} days</Typography>
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
                    <CTypography cvariant='c'>Total Days Lived</CTypography>
                    <Typography variant='h6'>{totalDaysLived.toLocaleString()}</Typography>
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
                    <CTypography cvariant='c'>Total Weeks Lived</CTypography>
                    <Typography variant='h6'>{totalWeeksLived.toLocaleString()}</Typography>
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
                    <CTypography cvariant='c'>Total Months Lived</CTypography>
                    <Typography variant='h6'>{totalMonthsLived.toLocaleString()}</Typography>
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
                    <CTypography cvariant='c'>Next Birthday</CTypography>
                    <Typography variant='h6'>{nextBirthday}</Typography>
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
                    <CTypography cvariant='c'>Days to Next Birthday</CTypography>
                    <Typography variant='h6'>{daysToNextBirthday.toLocaleString()} days</Typography>
                  </Paper>
                </Grid>
              </Grid>
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

      {/* Milestone Schedule */}
      <Box mb={6}>
        <CTypography cvariant='sh' sx={{ px: '4px', mb: '4px' }}>
          Age Milestone Schedule
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
                <TableCell align='center'>Milestone</TableCell>
                <TableCell align='center'>Date</TableCell>
                <TableCell align='center'>Age</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {paginatedSchedule.map((item, index) => (
                <TableRow key={index}>
                  <TableCell align='center'>{item.milestone}</TableCell>
                  <TableCell align='center'>{item.date}</TableCell>
                  <TableCell align='center'>{item.age}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          component={Paper}
          count={milestoneSchedule.length}
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