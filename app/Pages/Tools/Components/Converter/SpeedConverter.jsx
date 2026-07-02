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

const speedUnits = [
  { value: 'meterPerSecond', label: 'Meter / Second', factor: 1 },
  { value: 'kilometerPerHour', label: 'Kilometer / Hour', factor: 1000 / 3600 },
  { value: 'kilometerPerSecond', label: 'Kilometer / Second', factor: 1000 },
  { value: 'meterPerMinute', label: 'Meter / Minute', factor: 1 / 60 },
  { value: 'kilometerPerMinute', label: 'Kilometer / Minute', factor: 1000 / 60 },
  { value: 'centimeterPerSecond', label: 'Centimeter / Second', factor: 0.01 },
  { value: 'millimeterPerSecond', label: 'Millimeter / Second', factor: 0.001 },
  { value: 'milePerHour', label: 'Mile / Hour', factor: 1609.344 / 3600 },
  { value: 'milePerSecond', label: 'Mile / Second', factor: 1609.344 },
  { value: 'milePerMinute', label: 'Mile / Minute', factor: 1609.344 / 60 },
  { value: 'yardPerSecond', label: 'Yard / Second', factor: 0.9144 },
  { value: 'yardPerMinute', label: 'Yard / Minute', factor: 0.9144 / 60 },
  { value: 'yardPerHour', label: 'Yard / Hour', factor: 0.9144 / 3600 },
  { value: 'footPerSecond', label: 'Foot / Second', factor: 0.3048 },
  { value: 'footPerMinute', label: 'Foot / Minute', factor: 0.3048 / 60 },
  { value: 'footPerHour', label: 'Foot / Hour', factor: 0.3048 / 3600 },
  { value: 'inchPerSecond', label: 'Inch / Second', factor: 0.0254 },
  { value: 'inchPerMinute', label: 'Inch / Minute', factor: 0.0254 / 60 },
  { value: 'inchPerHour', label: 'Inch / Hour', factor: 0.0254 / 3600 },
  { value: 'knot', label: 'Knot', factor: 1852 / 3600 },
  { value: 'nauticalMilePerHour', label: 'Nautical Mile / Hour', factor: 1852 / 3600 },
  { value: 'mach', label: 'Mach', factor: 340.29 },
  { value: 'speedOfLight', label: 'Speed Of Light', factor: 299792458 }
]

const getUnitLabel = (unit) => {
  const selectedUnit = speedUnits.find((item) => item.value === unit)

  return selectedUnit ? selectedUnit.label : unit
}

const getUnitFactor = (unit) => {
  const selectedUnit = speedUnits.find((item) => item.value === unit)

  return selectedUnit ? selectedUnit.factor : 1
}

const downloadCSV = (
  summary,
  conversionTable
) => {
  let csv = ''

  csv += `Speed Value,${summary.speedValue}\n`
  csv += `From Unit,${summary.fromUnit}\n`
  csv += `To Unit,${summary.toUnit}\n`
  csv += `Converted Value,${summary.convertedValue}\n`
  csv += `Conversion Rate,${summary.conversionRate}\n`
  csv += `Value In Meters Per Second,${summary.valueInMetersPerSecond}\n\n`

  csv +=
    'Unit,Converted Value,Factor To Meter Per Second\n'

  conversionTable.forEach((row) => {
    csv += `${row.unit},${row.convertedValue},${row.factorToMeterPerSecond}\n`
  })

  const blob = new Blob([csv], {
    type: 'text/csv;charset=utf-8;',
  })

  saveAs(blob, 'speed-conversion.csv')
}
export default function SpeedConverterPage() {
  const [speedValue, setSpeedValue] = useState(60)
  const [fromUnit, setFromUnit] =
    useState('kilometerPerHour')
  const [toUnit, setToUnit] =
    useState('meterPerSecond')

  const [isSpeedValueInvalid, setIsSpeedValueInvalid] =
    useState(false)

  const [convertedValue, setConvertedValue] = useState(0.0)
  const [conversionRate, setConversionRate] = useState(0.0)
  const [valueInMetersPerSecond, setValueInMetersPerSecond] = useState(0.0)

  const [conversionTable, setConversionTable] =
    useState([])

  const [page, setPage] = useState(0)

  const paginatedSchedule = conversionTable.slice(
    page * 12,
    page * 12 + 12
  )
    const calculateSpeedOnClickHandler = () => {
    const numSpeedValue = parseFloat(speedValue)
    const fromFactor = getUnitFactor(fromUnit)
    const toFactor = getUnitFactor(toUnit)

    if (
      isSpeedValueInvalid ||
      numSpeedValue < 0
    ) {
      return
    }

    const metersPerSecond =
      numSpeedValue * fromFactor

    const converted =
      metersPerSecond / toFactor

    const rate =
      fromFactor / toFactor

    setConvertedValue(converted)
    setConversionRate(rate)
    setValueInMetersPerSecond(metersPerSecond)

    const options = {
      valueInMetersPerSecond: metersPerSecond
    }

    const result = generateConversionTable(options)

    setConversionTable(result)
  }
    const generateConversionTable = ({
    valueInMetersPerSecond
  }) => {
    const schedule = []

    speedUnits.forEach((unit) => {
      const converted =
        valueInMetersPerSecond / unit.factor

      schedule.push({
        unit: unit.label,
        convertedValue: Number(converted.toFixed(8)),
        factorToMeterPerSecond: unit.factor
      })
    })

    return schedule
  }

  const saveCSV = () => {
    const summary = {
      speedValue: Number(speedValue).toFixed(8),
      fromUnit: getUnitLabel(fromUnit),
      toUnit: getUnitLabel(toUnit),
      convertedValue: convertedValue.toFixed(8),
      conversionRate: conversionRate.toFixed(8),
      valueInMetersPerSecond: valueInMetersPerSecond.toFixed(8)
    }

    downloadCSV(summary, conversionTable)
  }

  useEffect(() => {
    calculateSpeedOnClickHandler()
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
              <CTypography cvariant='sh'>Speed Details</CTypography>

              <Stack spacing={3}>
                <CTextField
                  label='Speed Value'
                  fullWidth
                  value={speedValue.toLocaleString()}
                  helperText={`0 <= Speed < ${(1000000000).toLocaleString()}`}
                  helperTextStyle={{ pl: '4px' }}
                  sx={{
                    border: isSpeedValueInvalid
                      ? '1px solid var(--red-color)'
                      : '1px solid var(--p-fg-st-color)',
                    borderRadius: '8px',
                    ':hover': {
                      border: isSpeedValueInvalid
                        ? '1px solid var(--red-color)'
                        : '1px solid var(--p-fg-st-color)',
                    }
                  }}
                  onChange={(e) => {
                    const rawValue = e.target.value.replace(/,/g, '')
                    const num = Number(rawValue)

                    if (!isNaN(num)) {
                      setSpeedValue(num)

                      const isInvalid =
                        num < 0 || num > 1000000000

                      setIsSpeedValueInvalid(isInvalid)
                    } else {
                      setIsSpeedValueInvalid(true)
                    }
                  }}
                />

                <CSelect
                  select
                  label='From Unit'
                  fullWidth
                  value={fromUnit}
                  onChange={(e) =>
                    setFromUnit(e.target.value)
                  }
                  sx={{
                    '.MuiOutlinedInput-notchedOutline': { 
                        border: '1px solid var(--p-fg-st-color)'
                    }
                  }}
                >
                  {speedUnits.map((unit) => (
                    <MenuItem key={unit.value} value={unit.value}>
                      {unit.label}
                    </MenuItem>
                  ))}
                </CSelect>

                <CSelect
                  select
                  label='To Unit'
                  fullWidth
                  value={toUnit}
                  onChange={(e) =>
                    setToUnit(e.target.value)
                  }
                  sx={{
                    '.MuiOutlinedInput-notchedOutline': { 
                        border: '1px solid var(--p-fg-st-color)'
                    }
                  }}
                >
                  {speedUnits.map((unit) => (
                    <MenuItem key={unit.value} value={unit.value}>
                      {unit.label}
                    </MenuItem>
                  ))}
                </CSelect>

                <CButton
                  size='large'
                  label='Convert Speed'
                  onClick={calculateSpeedOnClickHandler}
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
                    Speed Conversion Formula
                  </CTypography>

                  <CTypography
                    cvariant='th'
                    sx={{ mb: '8px' }}
                  >
                    Converted Value = Speed Value * From Unit Factor / To Unit Factor
                  </CTypography>

                  <CTypography cvariant='c'>
                    Each unit is first converted into meters per second
                    <br />
                    Meter per second value is converted into the selected target unit
                    <br />
                    Conversion table shows equivalent value in all available units
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
                      Converted Value
                    </CTypography>
                    <Typography variant='h6'>
                      {convertedValue.toFixed(8)}
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
                      Conversion Rate
                    </CTypography>
                    <Typography variant='h6'>
                      {conversionRate.toFixed(8)}
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
                      Value In Meters Per Second
                    </CTypography>
                    <Typography variant='h6'>
                      {valueInMetersPerSecond.toFixed(8)}
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

      {/* Speed Conversion Table */}
      <Box mb={6}>
        <CTypography
          cvariant='sh'
          sx={{ px: '4px', mb: '4px' }}
        >
          Speed Conversion Table
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
                <TableCell align='center'>Unit</TableCell>
                <TableCell align='right'>Converted Value</TableCell>
                <TableCell align='right'>Factor To Meter Per Second</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {paginatedSchedule.map((item) => (
                <TableRow key={item.unit}>
                  <TableCell align='center'>
                    {item.unit}
                  </TableCell>

                  <TableCell align='right'>
                    {item.convertedValue?.toLocaleString()}
                  </TableCell>

                  <TableCell align='right'>
                    {item.factorToMeterPerSecond?.toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
                <TablePagination
          component={Paper}
          count={conversionTable.length}
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