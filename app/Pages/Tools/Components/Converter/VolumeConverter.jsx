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

const volumeUnits = [
  { value: 'cubicMeter', label: 'Cubic Meter', factor: 1 },
  { value: 'cubicKilometer', label: 'Cubic Kilometer', factor: 1000000000 },
  { value: 'cubicCentimeter', label: 'Cubic Centimeter', factor: 0.000001 },
  { value: 'cubicMillimeter', label: 'Cubic Millimeter', factor: 0.000000001 },
  { value: 'liter', label: 'Liter', factor: 0.001 },
  { value: 'milliliter', label: 'Milliliter', factor: 0.000001 },
  { value: 'centiliter', label: 'Centiliter', factor: 0.00001 },
  { value: 'deciliter', label: 'Deciliter', factor: 0.0001 },
  { value: 'kiloliter', label: 'Kiloliter', factor: 1 },
  { value: 'megaliter', label: 'Megaliter', factor: 1000 },
  { value: 'cubicMile', label: 'Cubic Mile', factor: 4168181825.4405794 },
  { value: 'cubicYard', label: 'Cubic Yard', factor: 0.764554857984 },
  { value: 'cubicFoot', label: 'Cubic Foot', factor: 0.028316846592 },
  { value: 'cubicInch', label: 'Cubic Inch', factor: 0.000016387064 },
  { value: 'acreFoot', label: 'Acre Foot', factor: 1233.48183754752 },
  { value: 'usGallon', label: 'US Gallon', factor: 0.003785411784 },
  { value: 'usQuart', label: 'US Quart', factor: 0.000946352946 },
  { value: 'usPint', label: 'US Pint', factor: 0.000473176473 },
  { value: 'usCup', label: 'US Cup', factor: 0.0002365882365 },
  { value: 'usFluidOunce', label: 'US Fluid Ounce', factor: 0.0000295735295625 },
  { value: 'usTablespoon', label: 'US Tablespoon', factor: 0.00001478676478125 },
  { value: 'usTeaspoon', label: 'US Teaspoon', factor: 0.00000492892159375 },
  { value: 'imperialGallon', label: 'Imperial Gallon', factor: 0.00454609 },
  { value: 'imperialQuart', label: 'Imperial Quart', factor: 0.0011365225 },
  { value: 'imperialPint', label: 'Imperial Pint', factor: 0.00056826125 },
  { value: 'imperialFluidOunce', label: 'Imperial Fluid Ounce', factor: 0.0000284130625 },
  { value: 'imperialTablespoon', label: 'Imperial Tablespoon', factor: 0.0000177581640625 },
  { value: 'imperialTeaspoon', label: 'Imperial Teaspoon', factor: 0.000005919388020833333 },
  { value: 'oilBarrel', label: 'Oil Barrel', factor: 0.158987294928 },
  { value: 'usBushel', label: 'US Bushel', factor: 0.03523907016688 },
  { value: 'usPeck', label: 'US Peck', factor: 0.00880976754172 },
  { value: 'cord', label: 'Cord', factor: 3.624556363776 },
  { value: 'boardFoot', label: 'Board Foot', factor: 0.002359737216 }
]

const getUnitLabel = (unit) => {
  const selectedUnit = volumeUnits.find((item) => item.value === unit)

  return selectedUnit ? selectedUnit.label : unit
}

const getUnitFactor = (unit) => {
  const selectedUnit = volumeUnits.find((item) => item.value === unit)

  return selectedUnit ? selectedUnit.factor : 1
}

const downloadCSV = (
  summary,
  conversionTable
) => {
  let csv = ''

  csv += `Volume Value,${summary.volumeValue}\n`
  csv += `From Unit,${summary.fromUnit}\n`
  csv += `To Unit,${summary.toUnit}\n`
  csv += `Converted Value,${summary.convertedValue}\n`
  csv += `Conversion Rate,${summary.conversionRate}\n`
  csv += `Value In Cubic Meters,${summary.valueInCubicMeters}\n\n`

  csv +=
    'Unit,Converted Value,Factor To Cubic Meter\n'

  conversionTable.forEach((row) => {
    csv += `${row.unit},${row.convertedValue},${row.factorToCubicMeter}\n`
  })

  const blob = new Blob([csv], {
    type: 'text/csv;charset=utf-8;',
  })

  saveAs(blob, 'volume-conversion.csv')
}
export default function VolumeConverterPage() {
  const [volumeValue, setVolumeValue] = useState(1)
  const [fromUnit, setFromUnit] =
    useState('liter')
  const [toUnit, setToUnit] =
    useState('milliliter')

  const [isVolumeValueInvalid, setIsVolumeValueInvalid] =
    useState(false)

  const [convertedValue, setConvertedValue] = useState(0.0)
  const [conversionRate, setConversionRate] = useState(0.0)
  const [valueInCubicMeters, setValueInCubicMeters] = useState(0.0)

  const [conversionTable, setConversionTable] =
    useState([])

  const [page, setPage] = useState(0)

  const paginatedSchedule = conversionTable.slice(
    page * 12,
    page * 12 + 12
  )
    const calculateVolumeOnClickHandler = () => {
    const numVolumeValue = parseFloat(volumeValue)
    const fromFactor = getUnitFactor(fromUnit)
    const toFactor = getUnitFactor(toUnit)

    if (
      isVolumeValueInvalid ||
      numVolumeValue < 0
    ) {
      return
    }

    const cubicMeters =
      numVolumeValue * fromFactor

    const converted =
      cubicMeters / toFactor

    const rate =
      fromFactor / toFactor

    setConvertedValue(converted)
    setConversionRate(rate)
    setValueInCubicMeters(cubicMeters)

    const options = {
      valueInCubicMeters: cubicMeters
    }

    const result = generateConversionTable(options)

    setConversionTable(result)
  }
    const generateConversionTable = ({
    valueInCubicMeters
  }) => {
    const schedule = []

    volumeUnits.forEach((unit) => {
      const converted =
        valueInCubicMeters / unit.factor

      schedule.push({
        unit: unit.label,
        convertedValue: Number(converted.toFixed(8)),
        factorToCubicMeter: unit.factor
      })
    })

    return schedule
  }

  const saveCSV = () => {
    const summary = {
      volumeValue: Number(volumeValue).toFixed(8),
      fromUnit: getUnitLabel(fromUnit),
      toUnit: getUnitLabel(toUnit),
      convertedValue: convertedValue.toFixed(8),
      conversionRate: conversionRate.toFixed(8),
      valueInCubicMeters: valueInCubicMeters.toFixed(8)
    }

    downloadCSV(summary, conversionTable)
  }

  useEffect(() => {
    calculateVolumeOnClickHandler()
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
              <CTypography cvariant='sh'>Volume Details</CTypography>

              <Stack spacing={3}>
                <CTextField
                  label='Volume Value'
                  fullWidth
                  value={volumeValue.toLocaleString()}
                  helperText={`0 <= Volume < ${(1000000000).toLocaleString()}`}
                  helperTextStyle={{ pl: '4px' }}
                  sx={{
                    border: isVolumeValueInvalid
                      ? '1px solid var(--red-color)'
                      : '1px solid var(--p-fg-st-color)',
                    borderRadius: '8px',
                    ':hover': {
                      border: isVolumeValueInvalid
                        ? '1px solid var(--red-color)'
                        : '1px solid var(--p-fg-st-color)',
                    }
                  }}
                  onChange={(e) => {
                    const rawValue = e.target.value.replace(/,/g, '')
                    const num = Number(rawValue)

                    if (!isNaN(num)) {
                      setVolumeValue(num)

                      const isInvalid =
                        num < 0 || num > 1000000000

                      setIsVolumeValueInvalid(isInvalid)
                    } else {
                      setIsVolumeValueInvalid(true)
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
                  {volumeUnits.map((unit) => (
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
                  {volumeUnits.map((unit) => (
                    <MenuItem key={unit.value} value={unit.value}>
                      {unit.label}
                    </MenuItem>
                  ))}
                </CSelect>

                <CButton
                  size='large'
                  label='Convert Volume'
                  onClick={calculateVolumeOnClickHandler}
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
                    Volume Conversion Formula
                  </CTypography>

                  <CTypography
                    cvariant='th'
                    sx={{ mb: '8px' }}
                  >
                    Converted Value = Volume Value * From Unit Factor / To Unit Factor
                  </CTypography>

                  <CTypography cvariant='c'>
                    Each unit is first converted into cubic meters
                    <br />
                    Cubic meter value is converted into the selected target unit
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
                      Value In Cubic Meters
                    </CTypography>
                    <Typography variant='h6'>
                      {valueInCubicMeters.toFixed(8)}
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

      {/* Volume Conversion Table */}
      <Box mb={6}>
        <CTypography
          cvariant='sh'
          sx={{ px: '4px', mb: '4px' }}
        >
          Volume Conversion Table
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
                <TableCell align='right'>Factor To Cubic Meter</TableCell>
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
                    {item.factorToCubicMeter?.toLocaleString()}
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