import { useState, useEffect } from 'react'
import {
  Alert,
  Card,
  CardContent,
  Container,
  Grid,
  MenuItem,
  Paper,
  Stack,
  Typography
} from '@mui/material'

import copy from 'copy-to-clipboard'

import CButton from '../../../../Components/CButton'
import CSelect from '../../../../Components/CSelect'
import CTextField from '../../../../Components/CTextField'
import CTypography from '../../../../Components/CTypography'

import { useApp } from '../../../../DataStores/AppContext'

export default function CronExpressionBuilderPage() {
  const { setAlert } = useApp()

  const [minute, setMinute] = useState('*')
  const [hour, setHour] = useState('*')
  const [dayOfMonth, setDayOfMonth] = useState('*')
  const [month, setMonth] = useState('*')
  const [dayOfWeek, setDayOfWeek] = useState('*')

  const [expression, setExpression] = useState('')
  const [description, setDescription] = useState('')

  const [isValid, setIsValid] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  const [expressionLength, setExpressionLength] = useState(0)

  /**
   * Build cron expression
   */
  const buildCron = ({
    minute,
    hour,
    dayOfMonth,
    month,
    dayOfWeek
  }) => {
    return `${minute} ${hour} ${dayOfMonth} ${month} ${dayOfWeek}`
  }

  /**
   * Basic cron validation
   */
  const validateCron = (cron) => {
    const parts = cron.trim().split(' ')

    if (parts.length !== 5) {
      throw new Error('Cron must have 5 parts')
    }

    return true
  }

  /**
   * Simple description generator
   */
  const generateDescription = (cron) => {
    const [m, h, dom, mon, dow] = cron.split(' ')

    return `Runs at ${h === '*' ? 'every hour' : h + 'h'}:${m === '*' ? 'every minute' : m} on ${
      dom === '*' ? 'every day' : 'day ' + dom
    }, month ${mon === '*' ? 'every month' : mon}, weekday ${dow === '*' ? 'every day of week' : dow}`
  }

  /**
   * Main handler
   */
  const handleGenerate = () => {
    try {
      const cron = buildCron({
        minute,
        hour,
        dayOfMonth,
        month,
        dayOfWeek
      })

      validateCron(cron)

      setExpression(cron)
      setDescription(generateDescription(cron))

      setExpressionLength(cron.length)

      setIsValid(true)
      setErrorMessage('')
    } catch (err) {
      setExpression('')
      setDescription('')

      setIsValid(false)
      setErrorMessage(err.message)

      setExpressionLength(0)
    }
  }

  /**
   * Copy cron
   */
  const handleCopy = () => {
    if (!expression) return

    try {
      copy(expression)

      setAlert({
        show: true,
        severity: 'success',
        duration: 5000,
        message: 'Cron copied to clipboard'
      })
    } catch (err) {
      setAlert({
        show: true,
        severity: 'error',
        duration: 5000,
        message: 'Failed to copy'
      })
    }
  }

  useEffect(() => {
    handleGenerate()
  }, [])

    const statsStyle = {
        p: 2,
        border: '1px solid var(--p-fg-st-color)',
        boxShadow: '0 0 2500px var(--p-b-color)',
        borderRadius: '8px'
    }


  return (
    <Container>

      <Grid container spacing={3} mb={4}>
                {/* LEFT PANEL */}

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
              <CTypography cvariant='sh'>
                Cron Builder
              </CTypography>

              <Stack spacing={3}>

                {/* PRESETS */}
                <CSelect
                  select
                  label='Quick Presets'
                  fullWidth
                  value='custom'
                  onChange={(e) => {
                    const value = e.target.value

                    if (value === 'hourly') {
                      setMinute('0')
                      setHour('*')
                      setDayOfMonth('*')
                      setMonth('*')
                      setDayOfWeek('*')
                    }

                    if (value === 'daily') {
                      setMinute('0')
                      setHour('0')
                      setDayOfMonth('*')
                      setMonth('*')
                      setDayOfWeek('*')
                    }

                    if (value === 'weekly') {
                      setMinute('0')
                      setHour('0')
                      setDayOfMonth('*')
                      setMonth('*')
                      setDayOfWeek('0')
                    }

                    if (value === 'monthly') {
                      setMinute('0')
                      setHour('0')
                      setDayOfMonth('1')
                      setMonth('*')
                      setDayOfWeek('*')
                    }
                  }}
                  sx={{
                    '.MuiOutlinedInput-notchedOutline': {
                      border:
                        '1px solid var(--p-fg-st-color)'
                    }
                  }}
                >
                  <MenuItem value='custom'>Custom</MenuItem>
                  <MenuItem value='hourly'>Hourly</MenuItem>
                  <MenuItem value='daily'>Daily</MenuItem>
                  <MenuItem value='weekly'>Weekly</MenuItem>
                  <MenuItem value='monthly'>Monthly</MenuItem>
                </CSelect>

                {/* FIELDS */}
                <CTextField
                  label='Minute (0-59 or *)'
                  fullWidth
                  value={minute}
                  onChange={(e) => setMinute(e.target.value)}
                />

                <CTextField
                  label='Hour (0-23 or *)'
                  fullWidth
                  value={hour}
                  onChange={(e) => setHour(e.target.value)}
                />

                <CTextField
                  label='Day of Month (1-31 or *)'
                  fullWidth
                  value={dayOfMonth}
                  onChange={(e) => setDayOfMonth(e.target.value)}
                />

                <CTextField
                  label='Month (1-12 or *)'
                  fullWidth
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                />

                <CTextField
                  label='Day of Week (0-6 or *)'
                  fullWidth
                  value={dayOfWeek}
                  onChange={(e) => setDayOfWeek(e.target.value)}
                />

                <CButton
                  size='large'
                  label='Generate Cron'
                  onClick={handleGenerate}
                />

                {isValid ? (
                  <Alert severity='success'>
                    Cron expression is valid
                  </Alert>
                ) : (
                  <Alert severity='error'>
                    {errorMessage}
                  </Alert>
                )}

                {/* INFO CARD */}
                <Paper
                  sx={{
                    p: 2,
                    border:
                      '1px solid var(--p-fg-st-color)',
                    boxShadow: 'none',
                    borderRadius: '8px'
                  }}
                >
                  <CTypography cvariant='c' sx={{ mb: 1 }}>
                    Cron Format
                  </CTypography>

                  <CTypography cvariant='th' sx={{ mb: 1 }}>
                    minute hour day month weekday
                  </CTypography>

                  <CTypography cvariant='c'>
                    * = every value
                    <br />
                    0 0 * * * = daily at midnight
                    <br />
                    0 * * * * = every hour
                  </CTypography>
                </Paper>

              </Stack>
            </CardContent>
          </Card>
        </Grid>
        {/* RIGHT PANEL */}

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
              <CTypography cvariant='sh'>
                Results
              </CTypography>

              <Grid container spacing={2} sx={{ mt: 1 }}>

                {/* OUTPUT */}
                <Grid item xs={12}>
                  <Paper
                    sx={{
                      p: 2,
                      border: '1px solid var(--p-fg-st-color)',
                      boxShadow: '0 0 2500px var(--p-b-color)',
                      borderRadius: '8px'
                    }}
                  >
                    <CTypography cvariant='c'>
                      Cron Expression
                    </CTypography>

                    <Typography
                      onClick={handleCopy}
                      sx={{
                        mt: 1,
                        p: 2,
                        borderRadius: '8px',
                        fontFamily:
                          'Consolas, Monaco, monospace',
                        cursor: 'pointer',
                        bgcolor: 'transparent',
                        '&:hover': {
                          bgcolor: 'var(--s-bg-color)'
                        }
                      }}
                    >
                      {expression ? (
                        expression
                      ) : (
                        <span style={{ color: 'var(--red-color)' }}>
                          {errorMessage ||
                            'No cron expression generated'}
                        </span>
                      )}
                    </Typography>
                  </Paper>
                </Grid>

                {/* DESCRIPTION */}
                <Grid item xs={12}>
                  <Paper
                    sx={{
                      p: 2,
                      border: '1px solid var(--p-fg-st-color)',
                      boxShadow: '0 0 2500px var(--p-b-color)',
                      borderRadius: '8px'
                    }}
                  >
                    <CTypography cvariant='c'>
                      Human Description
                    </CTypography>

                    <Typography variant='body2'>
                      {description || 'No description available'}
                    </Typography>
                  </Paper>
                </Grid>

                {/* STATS */}

                <Grid item xs={12} sm={6}>
                  <Paper sx={statsStyle}>
                    <CTypography cvariant='c'>
                      Expression Length
                    </CTypography>
                    <Typography variant='h6'>
                      {expressionLength.toLocaleString()}
                    </Typography>
                  </Paper>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Paper sx={statsStyle}>
                    <CTypography cvariant='c'>
                      Fields Count
                    </CTypography>
                    <Typography variant='h6'>
                      5
                    </Typography>
                  </Paper>
                </Grid>

              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  )
}