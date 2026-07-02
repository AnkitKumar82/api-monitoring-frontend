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

const timeZones = [
  { value: 'UTC', label: 'UTC' },
  { value: 'Europe/London', label: 'UK - London' },
  { value: 'Europe/Paris', label: 'France - Paris' },
  { value: 'Europe/Berlin', label: 'Germany - Berlin' },
  { value: 'Europe/Madrid', label: 'Spain - Madrid' },
  { value: 'Europe/Rome', label: 'Italy - Rome' },
  { value: 'Europe/Amsterdam', label: 'Netherlands - Amsterdam' },
  { value: 'Europe/Zurich', label: 'Switzerland - Zurich' },
  { value: 'Europe/Stockholm', label: 'Sweden - Stockholm' },
  { value: 'Europe/Istanbul', label: 'Turkey - Istanbul' },
  { value: 'Europe/Moscow', label: 'Russia - Moscow' },
  { value: 'Africa/Cairo', label: 'Egypt - Cairo' },
  { value: 'Africa/Johannesburg', label: 'South Africa - Johannesburg' },
  { value: 'Africa/Nairobi', label: 'Kenya - Nairobi' },
  { value: 'Africa/Lagos', label: 'Nigeria - Lagos' },
  { value: 'Asia/Kolkata', label: 'India - Kolkata' },
  { value: 'Asia/Dubai', label: 'UAE - Dubai' },
  { value: 'Asia/Singapore', label: 'Singapore' },
  { value: 'Asia/Tokyo', label: 'Japan - Tokyo' },
  { value: 'Asia/Shanghai', label: 'China - Shanghai' },
  { value: 'Asia/Hong_Kong', label: 'Hong Kong' },
  { value: 'Asia/Seoul', label: 'South Korea - Seoul' },
  { value: 'Asia/Bangkok', label: 'Thailand - Bangkok' },
  { value: 'Asia/Jakarta', label: 'Indonesia - Jakarta' },
  { value: 'Asia/Kuala_Lumpur', label: 'Malaysia - Kuala Lumpur' },
  { value: 'Asia/Manila', label: 'Philippines - Manila' },
  { value: 'Asia/Kathmandu', label: 'Nepal - Kathmandu' },
  { value: 'Asia/Dhaka', label: 'Bangladesh - Dhaka' },
  { value: 'Asia/Karachi', label: 'Pakistan - Karachi' },
  { value: 'Asia/Riyadh', label: 'Saudi Arabia - Riyadh' },
  { value: 'Asia/Qatar', label: 'Qatar - Doha' },
  { value: 'Asia/Jerusalem', label: 'Israel - Jerusalem' },
  { value: 'Asia/Tehran', label: 'Iran - Tehran' },
  { value: 'America/New_York', label: 'US - New York' },
  { value: 'America/Chicago', label: 'US - Chicago' },
  { value: 'America/Denver', label: 'US - Denver' },
  { value: 'America/Los_Angeles', label: 'US - Los Angeles' },
  { value: 'America/Phoenix', label: 'US - Phoenix' },
  { value: 'America/Anchorage', label: 'US - Anchorage' },
  { value: 'Pacific/Honolulu', label: 'US - Honolulu' },
  { value: 'America/Toronto', label: 'Canada - Toronto' },
  { value: 'America/Vancouver', label: 'Canada - Vancouver' },
  { value: 'America/Mexico_City', label: 'Mexico - Mexico City' },
  { value: 'America/Sao_Paulo', label: 'Brazil - Sao Paulo' },
  { value: 'America/Argentina/Buenos_Aires', label: 'Argentina - Buenos Aires' },
  { value: 'America/Santiago', label: 'Chile - Santiago' },
  { value: 'America/Bogota', label: 'Colombia - Bogota' },
  { value: 'America/Lima', label: 'Peru - Lima' },
  { value: 'Australia/Sydney', label: 'Australia - Sydney' },
  { value: 'Australia/Melbourne', label: 'Australia - Melbourne' },
  { value: 'Australia/Brisbane', label: 'Australia - Brisbane' },
  { value: 'Australia/Perth', label: 'Australia - Perth' },
  { value: 'Pacific/Auckland', label: 'New Zealand - Auckland' },
  { value: 'Pacific/Fiji', label: 'Fiji' }
]

const getTimeZoneLabel = (timeZone) => {
  const selectedTimeZone = timeZones.find((item) => item.value === timeZone)

  return selectedTimeZone ? selectedTimeZone.label : timeZone
}

const getTimeZoneOffset = (date, timeZone) => {
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone,
    hour12: false,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })

  const parts = formatter.formatToParts(date)
  const values = {}

  parts.forEach((part) => {
    values[part.type] = part.value
  })

  const utcDate = Date.UTC(
    Number(values.year),
    Number(values.month) - 1,
    Number(values.day),
    Number(values.hour),
    Number(values.minute),
    Number(values.second)
  )

  return utcDate - date.getTime()
}

const getUtcDateFromTimeZone = (dateValue, timeValue, timeZone) => {
  const dateParts = dateValue.split('-').map(Number)
  const timeParts = timeValue.split(':').map(Number)

  const utcGuess = new Date(Date.UTC(
    dateParts[0],
    dateParts[1] - 1,
    dateParts[2],
    timeParts[0],
    timeParts[1],
    0
  ))

  const offset = getTimeZoneOffset(utcGuess, timeZone)
  const firstResult = new Date(utcGuess.getTime() - offset)
  const refinedOffset = getTimeZoneOffset(firstResult, timeZone)

  return new Date(utcGuess.getTime() - refinedOffset)
}

const formatDateTime = (date, timeZone) => {
  return new Intl.DateTimeFormat('en-US', {
    timeZone,
    hour12: true,
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
}

const formatDateOnly = (date, timeZone) => {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).format(date)
}

const formatTimeOnly = (date, timeZone) => {
  return new Intl.DateTimeFormat('en-US', {
    timeZone,
    hour12: true,
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
}

const getOffsetHours = (date, timeZone) => {
  return getTimeZoneOffset(date, timeZone) / (1000 * 60 * 60)
}

const downloadCSV = (
  summary,
  timeZoneSchedule
) => {
  let csv = ''

  csv += `Input Date,${summary.inputDate}\n`
  csv += `Input Time,${summary.inputTime}\n`
  csv += `From Time Zone,${summary.fromTimeZone}\n`
  csv += `To Time Zone,${summary.toTimeZone}\n`
  csv += `Converted Date Time,${summary.convertedDateTime}\n`
  csv += `UTC Date Time,${summary.utcDateTime}\n`
  csv += `From UTC Offset,${summary.fromUtcOffset}\n`
  csv += `To UTC Offset,${summary.toUtcOffset}\n`
  csv += `Offset Difference,${summary.offsetDifference}\n\n`

  csv +=
    'Time Zone,Date,Time,UTC Offset\n'

  timeZoneSchedule.forEach((row) => {
    csv += `${row.timeZone},${row.date},${row.time},${row.utcOffset}\n`
  })

  const blob = new Blob([csv], {
    type: 'text/csv;charset=utf-8;',
  })

  saveAs(blob, 'time-zone-conversion.csv')
}
export default function TimeZoneConverterPage() {
  const [dateValue, setDateValue] = useState('2026-06-26')
  const [timeValue, setTimeValue] = useState('12:00')
  const [fromTimeZone, setFromTimeZone] =
    useState('Asia/Singapore')
  const [toTimeZone, setToTimeZone] =
    useState('UTC')

  const [isDateValueInvalid, setIsDateValueInvalid] =
    useState(false)
  const [isTimeValueInvalid, setIsTimeValueInvalid] =
    useState(false)

  const [convertedDateTime, setConvertedDateTime] = useState('')
  const [utcDateTime, setUtcDateTime] = useState('')
  const [fromUtcOffset, setFromUtcOffset] = useState(0.0)
  const [toUtcOffset, setToUtcOffset] = useState(0.0)
  const [offsetDifference, setOffsetDifference] = useState(0.0)

  const [timeZoneSchedule, setTimeZoneSchedule] =
    useState([])

  const [page, setPage] = useState(0)

  const paginatedSchedule = timeZoneSchedule.slice(
    page * 12,
    page * 12 + 12
  )
    const calculateTimeZoneOnClickHandler = () => {
    if (
      isDateValueInvalid ||
      isTimeValueInvalid ||
      !dateValue ||
      !timeValue
    ) {
      return
    }

    const utcDate =
      getUtcDateFromTimeZone(
        dateValue,
        timeValue,
        fromTimeZone
      )

    const fromOffset =
      getOffsetHours(utcDate, fromTimeZone)

    const toOffset =
      getOffsetHours(utcDate, toTimeZone)

    const offsetDiff =
      toOffset - fromOffset

    const converted =
      formatDateTime(utcDate, toTimeZone)

    const utcFormatted =
      formatDateTime(utcDate, 'UTC')

    setConvertedDateTime(converted)
    setUtcDateTime(utcFormatted)
    setFromUtcOffset(fromOffset)
    setToUtcOffset(toOffset)
    setOffsetDifference(offsetDiff)

    const options = {
      utcDate
    }

    const result = generateTimeZoneSchedule(options)

    setTimeZoneSchedule(result)
  }
    const generateTimeZoneSchedule = ({
    utcDate
  }) => {
    const schedule = []

    timeZones.forEach((timeZone) => {
      schedule.push({
        timeZone: timeZone.label,
        date: formatDateOnly(utcDate, timeZone.value),
        time: formatTimeOnly(utcDate, timeZone.value),
        utcOffset: Number(getOffsetHours(utcDate, timeZone.value).toFixed(2))
      })
    })

    return schedule
  }

  const saveCSV = () => {
    const summary = {
      inputDate: dateValue,
      inputTime: timeValue,
      fromTimeZone: getTimeZoneLabel(fromTimeZone),
      toTimeZone: getTimeZoneLabel(toTimeZone),
      convertedDateTime,
      utcDateTime,
      fromUtcOffset: fromUtcOffset.toFixed(2),
      toUtcOffset: toUtcOffset.toFixed(2),
      offsetDifference: offsetDifference.toFixed(2)
    }

    downloadCSV(summary, timeZoneSchedule)
  }

  useEffect(() => {
    calculateTimeZoneOnClickHandler()
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
              <CTypography cvariant='sh'>Time Zone Details</CTypography>

              <Stack spacing={3}>
                <CTextField
                  label='Date'
                  type='date'
                  fullWidth
                  value={dateValue}
                  helperText={'Select date'}
                  helperTextStyle={{ pl: '4px' }}
                  sx={{
                    border: isDateValueInvalid
                      ? '1px solid var(--red-color)'
                      : '1px solid var(--p-fg-st-color)',
                    borderRadius: '8px',
                    ':hover': {
                      border: isDateValueInvalid
                        ? '1px solid var(--red-color)'
                        : '1px solid var(--p-fg-st-color)',
                    }
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(e) => {
                    const value = e.target.value

                    setDateValue(value)

                    const isInvalid =
                      !value ||
                      isNaN(new Date(value).getTime())

                    setIsDateValueInvalid(isInvalid)
                  }}
                />

                <CTextField
                  label='Time'
                  type='time'
                  fullWidth
                  value={timeValue}
                  helperText={'Select time'}
                  helperTextStyle={{ pl: '4px' }}
                  sx={{
                    border: isTimeValueInvalid
                      ? '1px solid var(--red-color)'
                      : '1px solid var(--p-fg-st-color)',
                    borderRadius: '8px',
                    ':hover': {
                      border: isTimeValueInvalid
                        ? '1px solid var(--red-color)'
                        : '1px solid var(--p-fg-st-color)',
                    }
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(e) => {
                    const value = e.target.value

                    setTimeValue(value)

                    const isInvalid =
                      !value ||
                      !/^([01]\d|2[0-3]):([0-5]\d)$/.test(value)

                    setIsTimeValueInvalid(isInvalid)
                  }}
                />

                <CSelect
                  select
                  label='From Time Zone'
                  fullWidth
                  value={fromTimeZone}
                  onChange={(e) =>
                    setFromTimeZone(e.target.value)
                  }
                  sx={{
                    '.MuiOutlinedInput-notchedOutline': { 
                        border: '1px solid var(--p-fg-st-color)'
                    }
                  }}
                >
                  {timeZones.map((timeZone) => (
                    <MenuItem key={timeZone.value} value={timeZone.value}>
                      {timeZone.label}
                    </MenuItem>
                  ))}
                </CSelect>

                <CSelect
                  select
                  label='To Time Zone'
                  fullWidth
                  value={toTimeZone}
                  onChange={(e) =>
                    setToTimeZone(e.target.value)
                  }
                  sx={{
                    '.MuiOutlinedInput-notchedOutline': { 
                        border: '1px solid var(--p-fg-st-color)'
                    }
                  }}
                >
                  {timeZones.map((timeZone) => (
                    <MenuItem key={timeZone.value} value={timeZone.value}>
                      {timeZone.label}
                    </MenuItem>
                  ))}
                </CSelect>

                <CButton
                  size='large'
                  label='Convert Time Zone'
                  onClick={calculateTimeZoneOnClickHandler}
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
                    Time Zone Conversion Formula
                  </CTypography>

                  <CTypography
                    cvariant='th'
                    sx={{ mb: '8px' }}
                  >
                    Target Time = Source Time converted to UTC, then converted to target region
                  </CTypography>

                  <CTypography cvariant='c'>
                    Source date and time are interpreted in selected source time zone
                    <br />
                    UTC offset is calculated for the selected date
                    <br />
                    Converted time is shown in the selected target time zone
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
                      Converted Date Time
                    </CTypography>
                    <Typography variant='h6'>
                      {convertedDateTime}
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
                      UTC Date Time
                    </CTypography>
                    <Typography variant='h6'>
                      {utcDateTime}
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
                      From UTC Offset
                    </CTypography>
                    <Typography variant='h6'>
                      {fromUtcOffset.toFixed(2)}
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
                      To UTC Offset
                    </CTypography>
                    <Typography variant='h6'>
                      {toUtcOffset.toFixed(2)}
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
                      Offset Difference
                    </CTypography>
                    <Typography variant='h6'>
                      {offsetDifference.toFixed(2)}
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

      {/* Time Zone Conversion Table */}
      <Box mb={6}>
        <CTypography
          cvariant='sh'
          sx={{ px: '4px', mb: '4px' }}
        >
          Time Zone Conversion Table
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
                <TableCell align='center'>Time Zone</TableCell>
                <TableCell align='center'>Date</TableCell>
                <TableCell align='center'>Time</TableCell>
                <TableCell align='right'>UTC Offset</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {paginatedSchedule.map((item) => (
                <TableRow key={item.timeZone}>
                  <TableCell align='center'>
                    {item.timeZone}
                  </TableCell>

                  <TableCell align='center'>
                    {item.date}
                  </TableCell>

                  <TableCell align='center'>
                    {item.time}
                  </TableCell>

                  <TableCell align='right'>
                    {item.utcOffset?.toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
                <TablePagination
          component={Paper}
          count={timeZoneSchedule.length}
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