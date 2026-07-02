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


const lengthUnits = [
  { value: 'kilometer', label: 'Kilometer', factor: 1000 },
  { value: 'meter', label: 'Meter', factor: 1 },
  { value: 'decimeter', label: 'Decimeter', factor: 0.1 },
  { value: 'centimeter', label: 'Centimeter', factor: 0.01 },
  { value: 'millimeter', label: 'Millimeter', factor: 0.001 },
  { value: 'micrometer', label: 'Micrometer', factor: 0.000001 },
  { value: 'nanometer', label: 'Nanometer', factor: 0.000000001 },
  { value: 'picometer', label: 'Picometer', factor: 0.000000000001 },
  { value: 'mile', label: 'Mile', factor: 1609.344 },
  { value: 'yard', label: 'Yard', factor: 0.9144 },
  { value: 'foot', label: 'Foot', factor: 0.3048 },
  { value: 'inch', label: 'Inch', factor: 0.0254 },
  { value: 'nauticalMile', label: 'Nautical Mile', factor: 1852 },
  { value: 'furlong', label: 'Furlong', factor: 201.168 },
  { value: 'chain', label: 'Chain', factor: 20.1168 },
  { value: 'rod', label: 'Rod', factor: 5.0292 },
  { value: 'fathom', label: 'Fathom', factor: 1.8288 },
  { value: 'link', label: 'Link', factor: 0.201168 },
  { value: 'hand', label: 'Hand', factor: 0.1016 },
  { value: 'mil', label: 'Mil', factor: 0.0000254 },
  { value: 'angstrom', label: 'Angstrom', factor: 0.0000000001 },
  { value: 'astronomicalUnit', label: 'Astronomical Unit', factor: 149597870700 },
  { value: 'lightYear', label: 'Light Year', factor: 9460730472580800 },
  { value: 'parsec', label: 'Parsec', factor: 30856775814913673 }
]

const getUnitLabel = (unit) => {
  const selectedUnit = lengthUnits.find((item) => item.value === unit)

  return selectedUnit ? selectedUnit.label : unit
}

const getUnitFactor = (unit) => {
  const selectedUnit = lengthUnits.find((item) => item.value === unit)

  return selectedUnit ? selectedUnit.factor : 1
}

const downloadCSV = (
  summary,
  conversionTable
) => {
  let csv = ''

  csv += `Length Value,${summary.lengthValue}\n`
  csv += `From Unit,${summary.fromUnit}\n`
  csv += `To Unit,${summary.toUnit}\n`
  csv += `Converted Value,${summary.convertedValue}\n`
  csv += `Conversion Rate,${summary.conversionRate}\n`
  csv += `Value In Meters,${summary.valueInMeters}\n\n`

  csv +=
    'Unit,Converted Value,Factor To Meter\n'

  conversionTable.forEach((row) => {
    csv += `${row.unit},${row.convertedValue},${row.factorToMeter}\n`
  })

  const blob = new Blob([csv], {
    type: 'text/csv;charset=utf-8;',
  })

  saveAs(blob, 'length-conversion.csv')
}
export default function LengthConverterPage() {
  const [lengthValue, setLengthValue] = useState(1)
  const [fromUnit, setFromUnit] =
    useState('meter')
  const [toUnit, setToUnit] =
    useState('centimeter')

  const [isLengthValueInvalid, setIsLengthValueInvalid] =
    useState(false)

  const [convertedValue, setConvertedValue] = useState(0.0)
  const [conversionRate, setConversionRate] = useState(0.0)
  const [valueInMeters, setValueInMeters] = useState(0.0)

  const [conversionTable, setConversionTable] =
    useState([])

  const [page, setPage] = useState(0)

  const paginatedSchedule = conversionTable.slice(
    page * 12,
    page * 12 + 12
  )
    const calculateLengthOnClickHandler = () => {
    const numLengthValue = parseFloat(lengthValue)
    const fromFactor = getUnitFactor(fromUnit)
    const toFactor = getUnitFactor(toUnit)

    if (
      isLengthValueInvalid ||
      numLengthValue < 0
    ) {
      return
    }

    const meters =
      numLengthValue * fromFactor

    const converted =
      meters / toFactor

    const rate =
      fromFactor / toFactor

    setConvertedValue(converted)
    setConversionRate(rate)
    setValueInMeters(meters)

    const options = {
      valueInMeters: meters
    }

    const result = generateConversionTable(options)

    setConversionTable(result)
  }
    const generateConversionTable = ({
    valueInMeters
  }) => {
    const schedule = []

    lengthUnits.forEach((unit) => {
      const converted =
        valueInMeters / unit.factor

      schedule.push({
        unit: unit.label,
        convertedValue: Number(converted.toFixed(8)),
        factorToMeter: unit.factor
      })
    })

    return schedule
  }

  const saveCSV = () => {
    const summary = {
      lengthValue: Number(lengthValue).toFixed(8),
      fromUnit: getUnitLabel(fromUnit),
      toUnit: getUnitLabel(toUnit),
      convertedValue: convertedValue.toFixed(8),
      conversionRate: conversionRate.toFixed(8),
      valueInMeters: valueInMeters.toFixed(8)
    }

    downloadCSV(summary, conversionTable)
  }

  useEffect(() => {
    calculateLengthOnClickHandler()
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
              <CTypography cvariant='sh'>Length Details</CTypography>

              <Stack spacing={3}>
                <CTextField
                  label='Length Value'
                  fullWidth
                  value={lengthValue.toLocaleString()}
                  helperText={`0 <= Length < ${(1000000000).toLocaleString()}`}
                  helperTextStyle={{ pl: '4px' }}
                  sx={{
                    border: isLengthValueInvalid
                      ? '1px solid var(--red-color)'
                      : '1px solid var(--p-fg-st-color)',
                    borderRadius: '8px',
                    ':hover': {
                      border: isLengthValueInvalid
                        ? '1px solid var(--red-color)'
                        : '1px solid var(--p-fg-st-color)',
                    }
                  }}
                  onChange={(e) => {
                    const rawValue = e.target.value.replace(/,/g, '')
                    const num = Number(rawValue)

                    if (!isNaN(num)) {
                      setLengthValue(num)

                      const isInvalid =
                        num < 0 || num > 1000000000

                      setIsLengthValueInvalid(isInvalid)
                    } else {
                      setIsLengthValueInvalid(true)
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
                  {lengthUnits.map((unit) => (
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
                  {lengthUnits.map((unit) => (
                    <MenuItem key={unit.value} value={unit.value}>
                      {unit.label}
                    </MenuItem>
                  ))}
                </CSelect>

                <CButton
                  size='large'
                  label='Convert Length'
                  onClick={calculateLengthOnClickHandler}
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
                    Length Conversion Formula
                  </CTypography>

                  <CTypography
                    cvariant='th'
                    sx={{ mb: '8px' }}
                  >
                    Converted Value = Length Value * From Unit Factor / To Unit Factor
                  </CTypography>

                  <CTypography cvariant='c'>
                    Each unit is first converted into meters
                    <br />
                    Meter value is converted into the selected target unit
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
                      Value In Meters
                    </CTypography>
                    <Typography variant='h6'>
                      {valueInMeters.toFixed(8)}
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

      {/* Length Conversion Table */}
      <Box mb={6}>
        <CTypography
          cvariant='sh'
          sx={{ px: '4px', mb: '4px' }}
        >
          Length Conversion Table
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
                <TableCell align='right'>Factor To Meter</TableCell>
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
                    {item.factorToMeter?.toLocaleString()}
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