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

const temperatureUnits = [
  { value: 'celsius', label: 'Celsius' },
  { value: 'fahrenheit', label: 'Fahrenheit' },
  { value: 'kelvin', label: 'Kelvin' }
]

const getUnitLabel = (unit) => {
  const selectedUnit = temperatureUnits.find((item) => item.value === unit)

  return selectedUnit ? selectedUnit.label : unit
}

const getMinimumValue = (unit) => {
  if (unit === 'celsius') {
    return -273.15
  }

  if (unit === 'fahrenheit') {
    return -459.67
  }

  return 0
}

const convertToCelsius = (value, unit) => {
  if (unit === 'fahrenheit') {
    return (value - 32) * 5 / 9
  }

  if (unit === 'kelvin') {
    return value - 273.15
  }

  return value
}

const convertFromCelsius = (value, unit) => {
  if (unit === 'fahrenheit') {
    return value * 9 / 5 + 32
  }

  if (unit === 'kelvin') {
    return value + 273.15
  }

  return value
}

const downloadCSV = (
  summary,
  conversionTable
) => {
  let csv = ''

  csv += `Temperature Value,${summary.temperatureValue}\n`
  csv += `From Unit,${summary.fromUnit}\n`
  csv += `To Unit,${summary.toUnit}\n`
  csv += `Converted Value,${summary.convertedValue}\n`
  csv += `Value In Celsius,${summary.valueInCelsius}\n`
  csv += `Value In Fahrenheit,${summary.valueInFahrenheit}\n`
  csv += `Value In Kelvin,${summary.valueInKelvin}\n\n`

  csv +=
    'Unit,Converted Value\n'

  conversionTable.forEach((row) => {
    csv += `${row.unit},${row.convertedValue}\n`
  })

  const blob = new Blob([csv], {
    type: 'text/csv;charset=utf-8;',
  })

  saveAs(blob, 'temperature-conversion.csv')
}
export default function TemperatureConverterPage() {
  const [temperatureValue, setTemperatureValue] = useState(25)
  const [fromUnit, setFromUnit] =
    useState('celsius')
  const [toUnit, setToUnit] =
    useState('fahrenheit')

  const [isTemperatureValueInvalid, setIsTemperatureValueInvalid] =
    useState(false)

  const [convertedValue, setConvertedValue] = useState(0.0)
  const [valueInCelsius, setValueInCelsius] = useState(0.0)
  const [valueInFahrenheit, setValueInFahrenheit] = useState(0.0)
  const [valueInKelvin, setValueInKelvin] = useState(0.0)

  const [conversionTable, setConversionTable] =
    useState([])

  const [page, setPage] = useState(0)

  const paginatedSchedule = conversionTable.slice(
    page * 12,
    page * 12 + 12
  )
    const calculateTemperatureOnClickHandler = () => {
    const numTemperatureValue = parseFloat(temperatureValue)
    const minimumValue = getMinimumValue(fromUnit)

    if (
      isTemperatureValueInvalid ||
      numTemperatureValue < minimumValue
    ) {
      return
    }

    const celsius =
      convertToCelsius(numTemperatureValue, fromUnit)

    const converted =
      convertFromCelsius(celsius, toUnit)

    const fahrenheit =
      convertFromCelsius(celsius, 'fahrenheit')

    const kelvin =
      convertFromCelsius(celsius, 'kelvin')

    setConvertedValue(converted)
    setValueInCelsius(celsius)
    setValueInFahrenheit(fahrenheit)
    setValueInKelvin(kelvin)

    const options = {
      valueInCelsius: celsius
    }

    const result = generateConversionTable(options)

    setConversionTable(result)
  }
    const generateConversionTable = ({
    valueInCelsius
  }) => {
    const schedule = []

    temperatureUnits.forEach((unit) => {
      const converted =
        convertFromCelsius(valueInCelsius, unit.value)

      schedule.push({
        unit: unit.label,
        convertedValue: Number(converted.toFixed(2))
      })
    })

    return schedule
  }

  const saveCSV = () => {
    const summary = {
      temperatureValue: Number(temperatureValue).toFixed(2),
      fromUnit: getUnitLabel(fromUnit),
      toUnit: getUnitLabel(toUnit),
      convertedValue: convertedValue.toFixed(2),
      valueInCelsius: valueInCelsius.toFixed(2),
      valueInFahrenheit: valueInFahrenheit.toFixed(2),
      valueInKelvin: valueInKelvin.toFixed(2)
    }

    downloadCSV(summary, conversionTable)
  }

  useEffect(() => {
    calculateTemperatureOnClickHandler()
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
              <CTypography cvariant='sh'>Temperature Details</CTypography>

              <Stack spacing={3}>
                <CTextField
                  label='Temperature Value'
                  fullWidth
                  value={temperatureValue.toLocaleString()}
                  helperText={`Minimum value is ${getMinimumValue(fromUnit).toLocaleString()}`}
                  helperTextStyle={{ pl: '4px' }}
                  sx={{
                    border: isTemperatureValueInvalid
                      ? '1px solid var(--red-color)'
                      : '1px solid var(--p-fg-st-color)',
                    borderRadius: '8px',
                    ':hover': {
                      border: isTemperatureValueInvalid
                        ? '1px solid var(--red-color)'
                        : '1px solid var(--p-fg-st-color)',
                    }
                  }}
                  onChange={(e) => {
                    const rawValue = e.target.value.replace(/,/g, '')
                    const num = Number(rawValue)

                    if (!isNaN(num)) {
                      setTemperatureValue(num)

                      const isInvalid =
                        num < getMinimumValue(fromUnit)

                      setIsTemperatureValueInvalid(isInvalid)
                    } else {
                      setIsTemperatureValueInvalid(true)
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
                  {temperatureUnits.map((unit) => (
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
                  {temperatureUnits.map((unit) => (
                    <MenuItem key={unit.value} value={unit.value}>
                      {unit.label}
                    </MenuItem>
                  ))}
                </CSelect>

                <CButton
                  size='large'
                  label='Convert Temperature'
                  onClick={calculateTemperatureOnClickHandler}
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
                    Temperature Conversion Formula
                  </CTypography>

                  <CTypography
                    cvariant='th'
                    sx={{ mb: '8px' }}
                  >
                    Celsius = (Fahrenheit - 32) * 5 / 9
                  </CTypography>

                  <CTypography cvariant='c'>
                    Fahrenheit = Celsius * 9 / 5 + 32
                    <br />
                    Kelvin = Celsius + 273.15
                    <br />
                    Temperature values are converted through Celsius
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
                      Converted Value
                    </CTypography>
                    <Typography variant='h6'>
                      {convertedValue.toFixed(2)}
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
                      Celsius
                    </CTypography>
                    <Typography variant='h6'>
                      {valueInCelsius.toFixed(2)}
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
                      Fahrenheit
                    </CTypography>
                    <Typography variant='h6'>
                      {valueInFahrenheit.toFixed(2)}
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
                      Kelvin
                    </CTypography>
                    <Typography variant='h6'>
                      {valueInKelvin.toFixed(2)}
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

      {/* Temperature Conversion Table */}
      <Box mb={6}>
        <CTypography
          cvariant='sh'
          sx={{ px: '4px', mb: '4px' }}
        >
          Temperature Conversion Table
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