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
  timeBreakdown
) => {
  let csv = ''

  csv += `Operation,${summary.operation}\n`
  csv += `First Time,${summary.firstTime}\n`
  csv += `Second Time,${summary.secondTime}\n`
  csv += `Result Time,${summary.resultTime}\n`
  csv += `Total Result Seconds,${summary.totalResultSeconds}\n`
  csv += `Total Result Minutes,${summary.totalResultMinutes}\n`
  csv += `Total Result Hours,${summary.totalResultHours}\n\n`

  csv +=
    'Description,Days,Hours,Minutes,Seconds,Total Seconds\n'

  timeBreakdown.forEach((row) => {
    csv += `${row.description},${row.days},${row.hours},${row.minutes},${row.seconds},${row.totalSeconds}\n`
  })

  const blob = new Blob([csv], {
    type: 'text/csv;charset=utf-8;',
  })

  saveAs(blob, 'time-calculation.csv')
}
export default function TimeCalculatorPage() {
  const [operation, setOperation] =
    useState('add')

  const [firstDays, setFirstDays] = useState(0)
  const [firstHours, setFirstHours] = useState(1)
  const [firstMinutes, setFirstMinutes] = useState(30)
  const [firstSeconds, setFirstSeconds] = useState(0)

  const [secondDays, setSecondDays] = useState(0)
  const [secondHours, setSecondHours] = useState(0)
  const [secondMinutes, setSecondMinutes] = useState(45)
  const [secondSeconds, setSecondSeconds] = useState(0)

  const [isFirstDaysInvalid, setIsFirstDaysInvalid] =
    useState(false)
  const [isFirstHoursInvalid, setIsFirstHoursInvalid] =
    useState(false)
  const [isFirstMinutesInvalid, setIsFirstMinutesInvalid] =
    useState(false)
  const [isFirstSecondsInvalid, setIsFirstSecondsInvalid] =
    useState(false)

  const [isSecondDaysInvalid, setIsSecondDaysInvalid] =
    useState(false)
  const [isSecondHoursInvalid, setIsSecondHoursInvalid] =
    useState(false)
  const [isSecondMinutesInvalid, setIsSecondMinutesInvalid] =
    useState(false)
  const [isSecondSecondsInvalid, setIsSecondSecondsInvalid] =
    useState(false)

  const [resultDays, setResultDays] = useState(0.0)
  const [resultHours, setResultHours] = useState(0.0)
  const [resultMinutes, setResultMinutes] = useState(0.0)
  const [resultSeconds, setResultSeconds] = useState(0.0)
  const [totalResultSeconds, setTotalResultSeconds] = useState(0.0)
  const [totalResultMinutes, setTotalResultMinutes] = useState(0.0)
  const [totalResultHours, setTotalResultHours] = useState(0.0)

  const [timeBreakdown, setTimeBreakdown] =
    useState([])

  const [page, setPage] = useState(0)

  const paginatedSchedule = timeBreakdown.slice(
    page * 12,
    page * 12 + 12
  )
    const calculateTimeOnClickHandler = () => {
    const numFirstDays = parseFloat(firstDays)
    const numFirstHours = parseFloat(firstHours)
    const numFirstMinutes = parseFloat(firstMinutes)
    const numFirstSeconds = parseFloat(firstSeconds)

    const numSecondDays = parseFloat(secondDays)
    const numSecondHours = parseFloat(secondHours)
    const numSecondMinutes = parseFloat(secondMinutes)
    const numSecondSeconds = parseFloat(secondSeconds)

    if (
      isFirstDaysInvalid ||
      isFirstHoursInvalid ||
      isFirstMinutesInvalid ||
      isFirstSecondsInvalid ||
      isSecondDaysInvalid ||
      isSecondHoursInvalid ||
      isSecondMinutesInvalid ||
      isSecondSecondsInvalid ||
      numFirstDays < 0 ||
      numFirstHours < 0 ||
      numFirstHours >= 24 ||
      numFirstMinutes < 0 ||
      numFirstMinutes >= 60 ||
      numFirstSeconds < 0 ||
      numFirstSeconds >= 60 ||
      numSecondDays < 0 ||
      numSecondHours < 0 ||
      numSecondHours >= 24 ||
      numSecondMinutes < 0 ||
      numSecondMinutes >= 60 ||
      numSecondSeconds < 0 ||
      numSecondSeconds >= 60
    ) {
      return
    }

    const firstTotalSeconds =
      numFirstDays * 86400 +
      numFirstHours * 3600 +
      numFirstMinutes * 60 +
      numFirstSeconds

    const secondTotalSeconds =
      numSecondDays * 86400 +
      numSecondHours * 3600 +
      numSecondMinutes * 60 +
      numSecondSeconds

    let resultTotalSeconds = 0

    if (operation === 'add') {
      resultTotalSeconds =
        firstTotalSeconds + secondTotalSeconds
    } else {
      resultTotalSeconds =
        firstTotalSeconds - secondTotalSeconds
    }

    const absoluteSeconds = Math.abs(resultTotalSeconds)

    const days =
      Math.floor(absoluteSeconds / 86400)

    const hours =
      Math.floor((absoluteSeconds % 86400) / 3600)

    const minutes =
      Math.floor((absoluteSeconds % 3600) / 60)

    const seconds =
      absoluteSeconds % 60

    setResultDays(resultTotalSeconds < 0 ? -days : days)
    setResultHours(hours)
    setResultMinutes(minutes)
    setResultSeconds(seconds)
    setTotalResultSeconds(resultTotalSeconds)
    setTotalResultMinutes(resultTotalSeconds / 60)
    setTotalResultHours(resultTotalSeconds / 3600)

    const options = {
      firstDays: numFirstDays,
      firstHours: numFirstHours,
      firstMinutes: numFirstMinutes,
      firstSeconds: numFirstSeconds,
      secondDays: numSecondDays,
      secondHours: numSecondHours,
      secondMinutes: numSecondMinutes,
      secondSeconds: numSecondSeconds,
      firstTotalSeconds,
      secondTotalSeconds,
      resultDays: resultTotalSeconds < 0 ? -days : days,
      resultHours: hours,
      resultMinutes: minutes,
      resultSeconds: seconds,
      resultTotalSeconds
    }

    const result = generateTimeBreakdown(options)

    setTimeBreakdown(result)
  }
    const generateTimeBreakdown = ({
    firstDays,
    firstHours,
    firstMinutes,
    firstSeconds,
    secondDays,
    secondHours,
    secondMinutes,
    secondSeconds,
    firstTotalSeconds,
    secondTotalSeconds,
    resultDays,
    resultHours,
    resultMinutes,
    resultSeconds,
    resultTotalSeconds
  }) => {
    const schedule = []

    schedule.push({
      description: 'First Time',
      days: Number(firstDays.toFixed(2)),
      hours: Number(firstHours.toFixed(2)),
      minutes: Number(firstMinutes.toFixed(2)),
      seconds: Number(firstSeconds.toFixed(2)),
      totalSeconds: Number(firstTotalSeconds.toFixed(2))
    })

    schedule.push({
      description: 'Second Time',
      days: Number(secondDays.toFixed(2)),
      hours: Number(secondHours.toFixed(2)),
      minutes: Number(secondMinutes.toFixed(2)),
      seconds: Number(secondSeconds.toFixed(2)),
      totalSeconds: Number(secondTotalSeconds.toFixed(2))
    })

    schedule.push({
      description: 'Result Time',
      days: Number(resultDays.toFixed(2)),
      hours: Number(resultHours.toFixed(2)),
      minutes: Number(resultMinutes.toFixed(2)),
      seconds: Number(resultSeconds.toFixed(2)),
      totalSeconds: Number(resultTotalSeconds.toFixed(2))
    })

    return schedule
  }

  const saveCSV = () => {
    const summary = {
      operation:
        operation === 'add'
          ? 'Add'
          : 'Subtract',
      firstTime: `${firstDays} Days ${firstHours} Hours ${firstMinutes} Minutes ${firstSeconds} Seconds`,
      secondTime: `${secondDays} Days ${secondHours} Hours ${secondMinutes} Minutes ${secondSeconds} Seconds`,
      resultTime: `${resultDays} Days ${resultHours} Hours ${resultMinutes} Minutes ${resultSeconds} Seconds`,
      totalResultSeconds: totalResultSeconds.toFixed(2),
      totalResultMinutes: totalResultMinutes.toFixed(2),
      totalResultHours: totalResultHours.toFixed(2)
    }

    downloadCSV(summary, timeBreakdown)
  }

  useEffect(() => {
    calculateTimeOnClickHandler()
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
              <CTypography cvariant='sh'>Time Details</CTypography>

              <Stack spacing={3}>
                <CSelect
                  select
                  label='Operation'
                  fullWidth
                  value={operation}
                  onChange={(e) =>
                    setOperation(e.target.value)
                  }
                  sx={{
                    '.MuiOutlinedInput-notchedOutline': { 
                        border: '1px solid var(--p-fg-st-color)'
                    }
                  }}
                >
                  <MenuItem value='add'>Add</MenuItem>
                  <MenuItem value='subtract'>Subtract</MenuItem>
                </CSelect>

                <CTypography cvariant='c'>
                  First Time
                </CTypography>

                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <CTextField
                      label='Days'
                      fullWidth
                      value={firstDays.toLocaleString()}
                      helperText={`0 <= Days < ${(1000000).toLocaleString()}`}
                      helperTextStyle={{ pl: '4px' }}
                      sx={{
                        border: isFirstDaysInvalid
                          ? '1px solid var(--red-color)'
                          : '1px solid var(--p-fg-st-color)',
                        borderRadius: '8px',
                        ':hover': {
                          border: isFirstDaysInvalid
                            ? '1px solid var(--red-color)'
                            : '1px solid var(--p-fg-st-color)',
                        }
                      }}
                      onChange={(e) => {
                        const rawValue = e.target.value.replace(/,/g, '')
                        const num = Number(rawValue)

                        if (!isNaN(num)) {
                          setFirstDays(num)

                          const isInvalid =
                            num < 0 || num > 1000000

                          setIsFirstDaysInvalid(isInvalid)
                        } else {
                          setIsFirstDaysInvalid(true)
                        }
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <CTextField
                      label='Hours'
                      fullWidth
                      value={firstHours.toLocaleString()}
                      helperText={'0 <= Hours < 24'}
                      helperTextStyle={{ pl: '4px' }}
                      sx={{
                        border: isFirstHoursInvalid
                          ? '1px solid var(--red-color)'
                          : '1px solid var(--p-fg-st-color)',
                        borderRadius: '8px',
                        ':hover': {
                          border: isFirstHoursInvalid
                            ? '1px solid var(--red-color)'
                            : '1px solid var(--p-fg-st-color)',
                        }
                      }}
                      onChange={(e) => {
                        const rawValue = e.target.value.replace(/,/g, '')
                        const num = Number(rawValue)

                        if (!isNaN(num)) {
                          setFirstHours(num)

                          const isInvalid =
                            num < 0 || num >= 24

                          setIsFirstHoursInvalid(isInvalid)
                        } else {
                          setIsFirstHoursInvalid(true)
                        }
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <CTextField
                      label='Minutes'
                      fullWidth
                      value={firstMinutes.toLocaleString()}
                      helperText={'0 <= Minutes < 60'}
                      helperTextStyle={{ pl: '4px' }}
                      sx={{
                        border: isFirstMinutesInvalid
                          ? '1px solid var(--red-color)'
                          : '1px solid var(--p-fg-st-color)',
                        borderRadius: '8px',
                        ':hover': {
                          border: isFirstMinutesInvalid
                            ? '1px solid var(--red-color)'
                            : '1px solid var(--p-fg-st-color)',
                        }
                      }}
                      onChange={(e) => {
                        const rawValue = e.target.value.replace(/,/g, '')
                        const num = Number(rawValue)

                        if (!isNaN(num)) {
                          setFirstMinutes(num)

                          const isInvalid =
                            num < 0 || num >= 60

                          setIsFirstMinutesInvalid(isInvalid)
                        } else {
                          setIsFirstMinutesInvalid(true)
                        }
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <CTextField
                      label='Seconds'
                      fullWidth
                      value={firstSeconds.toLocaleString()}
                      helperText={'0 <= Seconds < 60'}
                      helperTextStyle={{ pl: '4px' }}
                      sx={{
                        border: isFirstSecondsInvalid
                          ? '1px solid var(--red-color)'
                          : '1px solid var(--p-fg-st-color)',
                        borderRadius: '8px',
                        ':hover': {
                          border: isFirstSecondsInvalid
                            ? '1px solid var(--red-color)'
                            : '1px solid var(--p-fg-st-color)',
                        }
                      }}
                      onChange={(e) => {
                        const rawValue = e.target.value.replace(/,/g, '')
                        const num = Number(rawValue)

                        if (!isNaN(num)) {
                          setFirstSeconds(num)

                          const isInvalid =
                            num < 0 || num >= 60

                          setIsFirstSecondsInvalid(isInvalid)
                        } else {
                          setIsFirstSecondsInvalid(true)
                        }
                      }}
                    />
                  </Grid>
                </Grid>

                <CTypography cvariant='c'>
                  Second Time
                </CTypography>

                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <CTextField
                      label='Days'
                      fullWidth
                      value={secondDays.toLocaleString()}
                      helperText={`0 <= Days < ${(1000000).toLocaleString()}`}
                      helperTextStyle={{ pl: '4px' }}
                      sx={{
                        border: isSecondDaysInvalid
                          ? '1px solid var(--red-color)'
                          : '1px solid var(--p-fg-st-color)',
                        borderRadius: '8px',
                        ':hover': {
                          border: isSecondDaysInvalid
                            ? '1px solid var(--red-color)'
                            : '1px solid var(--p-fg-st-color)',
                        }
                      }}
                      onChange={(e) => {
                        const rawValue = e.target.value.replace(/,/g, '')
                        const num = Number(rawValue)

                        if (!isNaN(num)) {
                          setSecondDays(num)

                          const isInvalid =
                            num < 0 || num > 1000000

                          setIsSecondDaysInvalid(isInvalid)
                        } else {
                          setIsSecondDaysInvalid(true)
                        }
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <CTextField
                      label='Hours'
                      fullWidth
                      value={secondHours.toLocaleString()}
                      helperText={'0 <= Hours < 24'}
                      helperTextStyle={{ pl: '4px' }}
                      sx={{
                        border: isSecondHoursInvalid
                          ? '1px solid var(--red-color)'
                          : '1px solid var(--p-fg-st-color)',
                        borderRadius: '8px',
                        ':hover': {
                          border: isSecondHoursInvalid
                            ? '1px solid var(--red-color)'
                            : '1px solid var(--p-fg-st-color)',
                        }
                      }}
                      onChange={(e) => {
                        const rawValue = e.target.value.replace(/,/g, '')
                        const num = Number(rawValue)

                        if (!isNaN(num)) {
                          setSecondHours(num)

                          const isInvalid =
                            num < 0 || num >= 24

                          setIsSecondHoursInvalid(isInvalid)
                        } else {
                          setIsSecondHoursInvalid(true)
                        }
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <CTextField
                      label='Minutes'
                      fullWidth
                      value={secondMinutes.toLocaleString()}
                      helperText={'0 <= Minutes < 60'}
                      helperTextStyle={{ pl: '4px' }}
                      sx={{
                        border: isSecondMinutesInvalid
                          ? '1px solid var(--red-color)'
                          : '1px solid var(--p-fg-st-color)',
                        borderRadius: '8px',
                        ':hover': {
                          border: isSecondMinutesInvalid
                            ? '1px solid var(--red-color)'
                            : '1px solid var(--p-fg-st-color)',
                        }
                      }}
                      onChange={(e) => {
                        const rawValue = e.target.value.replace(/,/g, '')
                        const num = Number(rawValue)

                        if (!isNaN(num)) {
                          setSecondMinutes(num)

                          const isInvalid =
                            num < 0 || num >= 60

                          setIsSecondMinutesInvalid(isInvalid)
                        } else {
                          setIsSecondMinutesInvalid(true)
                        }
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <CTextField
                      label='Seconds'
                      fullWidth
                      value={secondSeconds.toLocaleString()}
                      helperText={'0 <= Seconds < 60'}
                      helperTextStyle={{ pl: '4px' }}
                      sx={{
                        border: isSecondSecondsInvalid
                          ? '1px solid var(--red-color)'
                          : '1px solid var(--p-fg-st-color)',
                        borderRadius: '8px',
                        ':hover': {
                          border: isSecondSecondsInvalid
                            ? '1px solid var(--red-color)'
                            : '1px solid var(--p-fg-st-color)',
                        }
                      }}
                      onChange={(e) => {
                        const rawValue = e.target.value.replace(/,/g, '')
                        const num = Number(rawValue)

                        if (!isNaN(num)) {
                          setSecondSeconds(num)

                          const isInvalid =
                            num < 0 || num >= 60

                          setIsSecondSecondsInvalid(isInvalid)
                        } else {
                          setIsSecondSecondsInvalid(true)
                        }
                      }}
                    />
                  </Grid>
                </Grid>

                <CButton
                  size='large'
                  label='Calculate Time'
                  onClick={calculateTimeOnClickHandler}
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
                    Time Formula
                  </CTypography>

                  <CTypography
                    cvariant='th'
                    sx={{ mb: '8px' }}
                  >
                    Total Seconds = Days * 86400 + Hours * 3600 + Minutes * 60 + Seconds
                  </CTypography>

                  <CTypography cvariant='c'>
                    Time values are converted into total seconds
                    <br />
                    Selected operation is applied to total seconds
                    <br />
                    Result is converted back into days, hours, minutes and seconds
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
                      Days
                    </CTypography>
                    <Typography variant='h6'>
                      {resultDays.toFixed(2)}
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
                      Hours
                    </CTypography>
                    <Typography variant='h6'>
                      {resultHours.toFixed(2)}
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
                      Minutes
                    </CTypography>
                    <Typography variant='h6'>
                      {resultMinutes.toFixed(2)}
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
                      Seconds
                    </CTypography>
                    <Typography variant='h6'>
                      {resultSeconds.toFixed(2)}
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
                      Total Seconds
                    </CTypography>
                    <Typography variant='h6'>
                      {totalResultSeconds.toFixed(2)}
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
                      Total Minutes
                    </CTypography>
                    <Typography variant='h6'>
                      {totalResultMinutes.toFixed(2)}
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
                      Total Hours
                    </CTypography>
                    <Typography variant='h6'>
                      {totalResultHours.toFixed(2)}
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

      {/* Time Breakdown */}
      <Box mb={6}>
        <CTypography
          cvariant='sh'
          sx={{ px: '4px', mb: '4px' }}
        >
          Time Breakdown
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
                <TableCell align='right'>Days</TableCell>
                <TableCell align='right'>Hours</TableCell>
                <TableCell align='right'>Minutes</TableCell>
                <TableCell align='right'>Seconds</TableCell>
                <TableCell align='right'>Total Seconds</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {paginatedSchedule.map((item) => (
                <TableRow key={item.description}>
                  <TableCell align='center'>
                    {item.description}
                  </TableCell>

                  <TableCell align='right'>
                    {item.days?.toLocaleString()}
                  </TableCell>

                  <TableCell align='right'>
                    {item.hours?.toLocaleString()}
                  </TableCell>

                  <TableCell align='right'>
                    {item.minutes?.toLocaleString()}
                  </TableCell>

                  <TableCell align='right'>
                    {item.seconds?.toLocaleString()}
                  </TableCell>

                  <TableCell align='right'>
                    {item.totalSeconds?.toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
                <TablePagination
          component={Paper}
          count={timeBreakdown.length}
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