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

const weightUnits = [
  { value: 'metricTon', label: 'Metric Ton', factor: 1000 },
  { value: 'quintal', label: 'Quintal', factor: 100 },
  { value: 'kilogram', label: 'Kilogram', factor: 1 },
  { value: 'gram', label: 'Gram', factor: 0.001 },
  { value: 'milligram', label: 'Milligram', factor: 0.000001 },
  { value: 'microgram', label: 'Microgram', factor: 0.000000001 },
  { value: 'nanogram', label: 'Nanogram', factor: 0.000000000001 },
  { value: 'picogram', label: 'Picogram', factor: 0.000000000000001 },
  { value: 'pound', label: 'Pound', factor: 0.45359237 },
  { value: 'ounce', label: 'Ounce', factor: 0.028349523125 },
  { value: 'stone', label: 'Stone', factor: 6.35029318 },
  { value: 'shortTon', label: 'Short Ton', factor: 907.18474 },
  { value: 'longTon', label: 'Long Ton', factor: 1016.0469088 },
  { value: 'hundredweightUs', label: 'Hundredweight US', factor: 45.359237 },
  { value: 'hundredweightUk', label: 'Hundredweight UK', factor: 50.80234544 },
  { value: 'grain', label: 'Grain', factor: 0.00006479891 },
  { value: 'dram', label: 'Dram', factor: 0.0017718451953125 },
  { value: 'carat', label: 'Carat', factor: 0.0002 },
  { value: 'troyOunce', label: 'Troy Ounce', factor: 0.0311034768 },
  { value: 'pennyweight', label: 'Pennyweight', factor: 0.00155517384 },
  { value: 'slug', label: 'Slug', factor: 14.59390294 },
  { value: 'atomicMassUnit', label: 'Atomic Mass Unit', factor: 0.0000000000000000000000000016605390666 }
]

const getUnitLabel = (unit) => {
  const selectedUnit = weightUnits.find((item) => item.value === unit)

  return selectedUnit ? selectedUnit.label : unit
}

const getUnitFactor = (unit) => {
  const selectedUnit = weightUnits.find((item) => item.value === unit)

  return selectedUnit ? selectedUnit.factor : 1
}

const downloadCSV = (
  summary,
  conversionTable
) => {
  let csv = ''

  csv += `Weight Value,${summary.weightValue}\n`
  csv += `From Unit,${summary.fromUnit}\n`
  csv += `To Unit,${summary.toUnit}\n`
  csv += `Converted Value,${summary.convertedValue}\n`
  csv += `Conversion Rate,${summary.conversionRate}\n`
  csv += `Value In Kilograms,${summary.valueInKilograms}\n\n`

  csv +=
    'Unit,Converted Value,Factor To Kilogram\n'

  conversionTable.forEach((row) => {
    csv += `${row.unit},${row.convertedValue},${row.factorToKilogram}\n`
  })

  const blob = new Blob([csv], {
    type: 'text/csv;charset=utf-8;',
  })

  saveAs(blob, 'weight-conversion.csv')
}
export default function WeightConverterPage() {
  const [weightValue, setWeightValue] = useState(1)
  const [fromUnit, setFromUnit] =
    useState('kilogram')
  const [toUnit, setToUnit] =
    useState('gram')

  const [isWeightValueInvalid, setIsWeightValueInvalid] =
    useState(false)

  const [convertedValue, setConvertedValue] = useState(0.0)
  const [conversionRate, setConversionRate] = useState(0.0)
  const [valueInKilograms, setValueInKilograms] = useState(0.0)

  const [conversionTable, setConversionTable] =
    useState([])

  const [page, setPage] = useState(0)

  const paginatedSchedule = conversionTable.slice(
    page * 12,
    page * 12 + 12
  )
    const calculateWeightOnClickHandler = () => {
    const numWeightValue = parseFloat(weightValue)
    const fromFactor = getUnitFactor(fromUnit)
    const toFactor = getUnitFactor(toUnit)

    if (
      isWeightValueInvalid ||
      numWeightValue < 0
    ) {
      return
    }

    const kilograms =
      numWeightValue * fromFactor

    const converted =
      kilograms / toFactor

    const rate =
      fromFactor / toFactor

    setConvertedValue(converted)
    setConversionRate(rate)
    setValueInKilograms(kilograms)

    const options = {
      valueInKilograms: kilograms
    }

    const result = generateConversionTable(options)

    setConversionTable(result)
  }
    const generateConversionTable = ({
    valueInKilograms
  }) => {
    const schedule = []

    weightUnits.forEach((unit) => {
      const converted =
        valueInKilograms / unit.factor

      schedule.push({
        unit: unit.label,
        convertedValue: Number(converted.toFixed(8)),
        factorToKilogram: unit.factor
      })
    })

    return schedule
  }

  const saveCSV = () => {
    const summary = {
      weightValue: Number(weightValue).toFixed(8),
      fromUnit: getUnitLabel(fromUnit),
      toUnit: getUnitLabel(toUnit),
      convertedValue: convertedValue.toFixed(8),
      conversionRate: conversionRate.toFixed(8),
      valueInKilograms: valueInKilograms.toFixed(8)
    }

    downloadCSV(summary, conversionTable)
  }

  useEffect(() => {
    calculateWeightOnClickHandler()
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
              <CTypography cvariant='sh'>Weight Details</CTypography>

              <Stack spacing={3}>
                <CTextField
                  label='Weight Value'
                  fullWidth
                  value={weightValue.toLocaleString()}
                  helperText={`0 <= Weight < ${(1000000000).toLocaleString()}`}
                  helperTextStyle={{ pl: '4px' }}
                  sx={{
                    border: isWeightValueInvalid
                      ? '1px solid var(--red-color)'
                      : '1px solid var(--p-fg-st-color)',
                    borderRadius: '8px',
                    ':hover': {
                      border: isWeightValueInvalid
                        ? '1px solid var(--red-color)'
                        : '1px solid var(--p-fg-st-color)',
                    }
                  }}
                  onChange={(e) => {
                    const rawValue = e.target.value.replace(/,/g, '')
                    const num = Number(rawValue)

                    if (!isNaN(num)) {
                      setWeightValue(num)

                      const isInvalid =
                        num < 0 || num > 1000000000

                      setIsWeightValueInvalid(isInvalid)
                    } else {
                      setIsWeightValueInvalid(true)
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
                  {weightUnits.map((unit) => (
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
                  {weightUnits.map((unit) => (
                    <MenuItem key={unit.value} value={unit.value}>
                      {unit.label}
                    </MenuItem>
                  ))}
                </CSelect>

                <CButton
                  size='large'
                  label='Convert Weight'
                  onClick={calculateWeightOnClickHandler}
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
                    Weight Conversion Formula
                  </CTypography>

                  <CTypography
                    cvariant='th'
                    sx={{ mb: '8px' }}
                  >
                    Converted Value = Weight Value * From Unit Factor / To Unit Factor
                  </CTypography>

                  <CTypography cvariant='c'>
                    Each unit is first converted into kilograms
                    <br />
                    Kilogram value is converted into the selected target unit
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
                      Value In Kilograms
                    </CTypography>
                    <Typography variant='h6'>
                      {valueInKilograms.toFixed(8)}
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

      {/* Weight Conversion Table */}
      <Box mb={6}>
        <CTypography
          cvariant='sh'
          sx={{ px: '4px', mb: '4px' }}
        >
          Weight Conversion Table
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
                <TableCell align='right'>Factor To Kilogram</TableCell>
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
                    {item.factorToKilogram?.toLocaleString()}
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