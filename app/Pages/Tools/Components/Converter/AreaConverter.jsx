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

const areaUnits = [
  { value: 'squareKilometer', label: 'Square Kilometer', factor: 1000000 },
  { value: 'hectare', label: 'Hectare', factor: 10000 },
  { value: 'are', label: 'Are', factor: 100 },
  { value: 'squareMeter', label: 'Square Meter', factor: 1 },
  { value: 'squareDecimeter', label: 'Square Decimeter', factor: 0.01 },
  { value: 'squareCentimeter', label: 'Square Centimeter', factor: 0.0001 },
  { value: 'squareMillimeter', label: 'Square Millimeter', factor: 0.000001 },
  { value: 'squareMicrometer', label: 'Square Micrometer', factor: 0.000000000001 },
  { value: 'acre', label: 'Acre', factor: 4046.8564224 },
  { value: 'squareMile', label: 'Square Mile', factor: 2589988.110336 },
  { value: 'squareYard', label: 'Square Yard', factor: 0.83612736 },
  { value: 'squareFoot', label: 'Square Foot', factor: 0.09290304 },
  { value: 'squareInch', label: 'Square Inch', factor: 0.00064516 },
  { value: 'squareNauticalMile', label: 'Square Nautical Mile', factor: 3429904 },
  { value: 'squareRod', label: 'Square Rod', factor: 25.29285264 },
  { value: 'squareChain', label: 'Square Chain', factor: 404.68564224 },
  { value: 'squareLink', label: 'Square Link', factor: 0.040468564224 },
  { value: 'rood', label: 'Rood', factor: 1011.7141056 },
  { value: 'perch', label: 'Perch', factor: 25.29285264 },
  { value: 'section', label: 'Section', factor: 2589988.110336 },
  { value: 'township', label: 'Township', factor: 93239571.972096 },
  { value: 'dunam', label: 'Dunam', factor: 1000 },
  { value: 'cent', label: 'Cent', factor: 40.468564224 },
  { value: 'guntha', label: 'Guntha', factor: 101.17141056 },
  { value: 'ground', label: 'Ground', factor: 222.967296 },
  { value: 'marla', label: 'Marla', factor: 25.29285264 },
  { value: 'kanal', label: 'Kanal', factor: 505.8570528 },
  { value: 'barn', label: 'Barn', factor: 0.0000000000000000000000000001 }
]

const getUnitLabel = (unit) => {
  const selectedUnit = areaUnits.find((item) => item.value === unit)

  return selectedUnit ? selectedUnit.label : unit
}

const getUnitFactor = (unit) => {
  const selectedUnit = areaUnits.find((item) => item.value === unit)

  return selectedUnit ? selectedUnit.factor : 1
}

const downloadCSV = (
  summary,
  conversionTable
) => {
  let csv = ''

  csv += `Area Value,${summary.areaValue}\n`
  csv += `From Unit,${summary.fromUnit}\n`
  csv += `To Unit,${summary.toUnit}\n`
  csv += `Converted Value,${summary.convertedValue}\n`
  csv += `Conversion Rate,${summary.conversionRate}\n`
  csv += `Value In Square Meters,${summary.valueInSquareMeters}\n\n`

  csv +=
    'Unit,Converted Value,Factor To Square Meter\n'

  conversionTable.forEach((row) => {
    csv += `${row.unit},${row.convertedValue},${row.factorToSquareMeter}\n`
  })

  const blob = new Blob([csv], {
    type: 'text/csv;charset=utf-8;',
  })

  saveAs(blob, 'area-conversion.csv')
}
export default function AreaConverterPage() {
  const [areaValue, setAreaValue] = useState(1)
  const [fromUnit, setFromUnit] =
    useState('squareMeter')
  const [toUnit, setToUnit] =
    useState('squareCentimeter')

  const [isAreaValueInvalid, setIsAreaValueInvalid] =
    useState(false)

  const [convertedValue, setConvertedValue] = useState(0.0)
  const [conversionRate, setConversionRate] = useState(0.0)
  const [valueInSquareMeters, setValueInSquareMeters] = useState(0.0)

  const [conversionTable, setConversionTable] =
    useState([])

  const [page, setPage] = useState(0)

  const paginatedSchedule = conversionTable.slice(
    page * 12,
    page * 12 + 12
  )
    const calculateAreaOnClickHandler = () => {
    const numAreaValue = parseFloat(areaValue)
    const fromFactor = getUnitFactor(fromUnit)
    const toFactor = getUnitFactor(toUnit)

    if (
      isAreaValueInvalid ||
      numAreaValue < 0
    ) {
      return
    }

    const squareMeters =
      numAreaValue * fromFactor

    const converted =
      squareMeters / toFactor

    const rate =
      fromFactor / toFactor

    setConvertedValue(converted)
    setConversionRate(rate)
    setValueInSquareMeters(squareMeters)

    const options = {
      valueInSquareMeters: squareMeters
    }

    const result = generateConversionTable(options)

    setConversionTable(result)
  }
    const generateConversionTable = ({
    valueInSquareMeters
  }) => {
    const schedule = []

    areaUnits.forEach((unit) => {
      const converted =
        valueInSquareMeters / unit.factor

      schedule.push({
        unit: unit.label,
        convertedValue: Number(converted.toFixed(8)),
        factorToSquareMeter: unit.factor
      })
    })

    return schedule
  }

  const saveCSV = () => {
    const summary = {
      areaValue: Number(areaValue).toFixed(8),
      fromUnit: getUnitLabel(fromUnit),
      toUnit: getUnitLabel(toUnit),
      convertedValue: convertedValue.toFixed(8),
      conversionRate: conversionRate.toFixed(8),
      valueInSquareMeters: valueInSquareMeters.toFixed(8)
    }

    downloadCSV(summary, conversionTable)
  }

  useEffect(() => {
    calculateAreaOnClickHandler()
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
              <CTypography cvariant='sh'>Area Details</CTypography>

              <Stack spacing={3}>
                <CTextField
                  label='Area Value'
                  fullWidth
                  value={areaValue.toLocaleString()}
                  helperText={`0 <= Area < ${(1000000000).toLocaleString()}`}
                  helperTextStyle={{ pl: '4px' }}
                  sx={{
                    border: isAreaValueInvalid
                      ? '1px solid var(--red-color)'
                      : '1px solid var(--p-fg-st-color)',
                    borderRadius: '8px',
                    ':hover': {
                      border: isAreaValueInvalid
                        ? '1px solid var(--red-color)'
                        : '1px solid var(--p-fg-st-color)',
                    }
                  }}
                  onChange={(e) => {
                    const rawValue = e.target.value.replace(/,/g, '')
                    const num = Number(rawValue)

                    if (!isNaN(num)) {
                      setAreaValue(num)

                      const isInvalid =
                        num < 0 || num > 1000000000

                      setIsAreaValueInvalid(isInvalid)
                    } else {
                      setIsAreaValueInvalid(true)
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
                  {areaUnits.map((unit) => (
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
                  {areaUnits.map((unit) => (
                    <MenuItem key={unit.value} value={unit.value}>
                      {unit.label}
                    </MenuItem>
                  ))}
                </CSelect>

                <CButton
                  size='large'
                  label='Convert Area'
                  onClick={calculateAreaOnClickHandler}
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
                    Area Conversion Formula
                  </CTypography>

                  <CTypography
                    cvariant='th'
                    sx={{ mb: '8px' }}
                  >
                    Converted Value = Area Value * From Unit Factor / To Unit Factor
                  </CTypography>

                  <CTypography cvariant='c'>
                    Each unit is first converted into square meters
                    <br />
                    Square meter value is converted into the selected target unit
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
                      Value In Square Meters
                    </CTypography>
                    <Typography variant='h6'>
                      {valueInSquareMeters.toFixed(8)}
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

      {/* Area Conversion Table */}
      <Box mb={6}>
        <CTypography
          cvariant='sh'
          sx={{ px: '4px', mb: '4px' }}
        >
          Area Conversion Table
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
                <TableCell align='right'>Factor To Square Meter</TableCell>
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
                    {item.factorToSquareMeter?.toLocaleString()}
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