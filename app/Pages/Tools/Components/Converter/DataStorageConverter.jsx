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

const dataStorageUnits = [
  { value: 'bit', label: 'Bit', factor: 0.125 },
  { value: 'nibble', label: 'Nibble', factor: 0.5 },
  { value: 'byte', label: 'Byte', factor: 1 },

  { value: 'kilobit', label: 'Kilobit', factor: 1000 / 8 },
  { value: 'kibibit', label: 'Kibibit', factor: 1024 / 8 },
  { value: 'kilobyte', label: 'Kilobyte', factor: 1000 },
  { value: 'kibibyte', label: 'Kibibyte', factor: 1024 },

  { value: 'megabit', label: 'Megabit', factor: 1000000 / 8 },
  { value: 'mebibit', label: 'Mebibit', factor: 1048576 / 8 },
  { value: 'megabyte', label: 'Megabyte', factor: 1000000 },
  { value: 'mebibyte', label: 'Mebibyte', factor: 1048576 },

  { value: 'gigabit', label: 'Gigabit', factor: 1000000000 / 8 },
  { value: 'gibibit', label: 'Gibibit', factor: 1073741824 / 8 },
  { value: 'gigabyte', label: 'Gigabyte', factor: 1000000000 },
  { value: 'gibibyte', label: 'Gibibyte', factor: 1073741824 },

  { value: 'terabit', label: 'Terabit', factor: 1000000000000 / 8 },
  { value: 'tebibit', label: 'Tebibit', factor: 1099511627776 / 8 },
  { value: 'terabyte', label: 'Terabyte', factor: 1000000000000 },
  { value: 'tebibyte', label: 'Tebibyte', factor: 1099511627776 },

  { value: 'petabit', label: 'Petabit', factor: 1000000000000000 / 8 },
  { value: 'pebibit', label: 'Pebibit', factor: 1125899906842624 / 8 },
  { value: 'petabyte', label: 'Petabyte', factor: 1000000000000000 },
  { value: 'pebibyte', label: 'Pebibyte', factor: 1125899906842624 },

  { value: 'exabit', label: 'Exabit', factor: 1000000000000000000 / 8 },
  { value: 'exbibit', label: 'Exbibit', factor: 1152921504606846976 / 8 },
  { value: 'exabyte', label: 'Exabyte', factor: 1000000000000000000 },
  { value: 'exbibyte', label: 'Exbibyte', factor: 1152921504606846976 },

  { value: 'zettabit', label: 'Zettabit', factor: 1000000000000000000000 / 8 },
  { value: 'zebibit', label: 'Zebibit', factor: 1180591620717411303424 / 8 },
  { value: 'zettabyte', label: 'Zettabyte', factor: 1000000000000000000000 },
  { value: 'zebibyte', label: 'Zebibyte', factor: 1180591620717411303424 },

  { value: 'yottabit', label: 'Yottabit', factor: 1000000000000000000000000 / 8 },
  { value: 'yobibit', label: 'Yobibit', factor: 1208925819614629174706176 / 8 },
  { value: 'yottabyte', label: 'Yottabyte', factor: 1000000000000000000000000 },
  { value: 'yobibyte', label: 'Yobibyte', factor: 1208925819614629174706176 },

  { value: 'block', label: 'Block', factor: 512 },
  { value: 'sector', label: 'Sector', factor: 512 },
  { value: 'floppyDisk', label: 'Floppy Disk', factor: 1474560 },
  { value: 'cd', label: 'CD', factor: 737280000 },
  { value: 'dvd', label: 'DVD', factor: 4700000000 },
  { value: 'bluRay', label: 'Blu-ray Disc', factor: 25000000000 }
]

const getUnitLabel = (unit) => {
  const selectedUnit = dataStorageUnits.find((item) => item.value === unit)

  return selectedUnit ? selectedUnit.label : unit
}

const getUnitFactor = (unit) => {
  const selectedUnit = dataStorageUnits.find((item) => item.value === unit)

  return selectedUnit ? selectedUnit.factor : 1
}

const downloadCSV = (
  summary,
  conversionTable
) => {
  let csv = ''

  csv += `Data Value,${summary.dataValue}\n`
  csv += `From Unit,${summary.fromUnit}\n`
  csv += `To Unit,${summary.toUnit}\n`
  csv += `Converted Value,${summary.convertedValue}\n`
  csv += `Conversion Rate,${summary.conversionRate}\n`
  csv += `Value In Bytes,${summary.valueInBytes}\n\n`

  csv +=
    'Unit,Converted Value,Factor To Byte\n'

  conversionTable.forEach((row) => {
    csv += `${row.unit},${row.convertedValue},${row.factorToByte}\n`
  })

  const blob = new Blob([csv], {
    type: 'text/csv;charset=utf-8;',
  })

  saveAs(blob, 'data-storage-conversion.csv')
}
export default function DataStorageConverterPage() {
  const [dataValue, setDataValue] = useState(1)
  const [fromUnit, setFromUnit] =
    useState('gigabyte')
  const [toUnit, setToUnit] =
    useState('megabyte')

  const [isDataValueInvalid, setIsDataValueInvalid] =
    useState(false)

  const [convertedValue, setConvertedValue] = useState(0.0)
  const [conversionRate, setConversionRate] = useState(0.0)
  const [valueInBytes, setValueInBytes] = useState(0.0)

  const [conversionTable, setConversionTable] =
    useState([])

  const [page, setPage] = useState(0)

  const paginatedSchedule = conversionTable.slice(
    page * 12,
    page * 12 + 12
  )
    const calculateDataStorageOnClickHandler = () => {
    const numDataValue = parseFloat(dataValue)
    const fromFactor = getUnitFactor(fromUnit)
    const toFactor = getUnitFactor(toUnit)

    if (
      isDataValueInvalid ||
      numDataValue < 0
    ) {
      return
    }

    const bytes =
      numDataValue * fromFactor

    const converted =
      bytes / toFactor

    const rate =
      fromFactor / toFactor

    setConvertedValue(converted)
    setConversionRate(rate)
    setValueInBytes(bytes)

    const options = {
      valueInBytes: bytes
    }

    const result = generateConversionTable(options)

    setConversionTable(result)
  }
    const generateConversionTable = ({
    valueInBytes
  }) => {
    const schedule = []

    dataStorageUnits.forEach((unit) => {
      const converted =
        valueInBytes / unit.factor

      schedule.push({
        unit: unit.label,
        convertedValue: Number(converted.toFixed(8)),
        factorToByte: unit.factor
      })
    })

    return schedule
  }

  const saveCSV = () => {
    const summary = {
      dataValue: Number(dataValue).toFixed(8),
      fromUnit: getUnitLabel(fromUnit),
      toUnit: getUnitLabel(toUnit),
      convertedValue: convertedValue.toFixed(8),
      conversionRate: conversionRate.toFixed(8),
      valueInBytes: valueInBytes.toFixed(8)
    }

    downloadCSV(summary, conversionTable)
  }

  useEffect(() => {
    calculateDataStorageOnClickHandler()
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
              <CTypography cvariant='sh'>Data Storage Details</CTypography>

              <Stack spacing={3}>
                <CTextField
                  label='Data Value'
                  fullWidth
                  value={dataValue.toLocaleString()}
                  helperText={`0 <= Data < ${(1000000000).toLocaleString()}`}
                  helperTextStyle={{ pl: '4px' }}
                  sx={{
                    border: isDataValueInvalid
                      ? '1px solid var(--red-color)'
                      : '1px solid var(--p-fg-st-color)',
                    borderRadius: '8px',
                    ':hover': {
                      border: isDataValueInvalid
                        ? '1px solid var(--red-color)'
                        : '1px solid var(--p-fg-st-color)',
                    }
                  }}
                  onChange={(e) => {
                    const rawValue = e.target.value.replace(/,/g, '')
                    const num = Number(rawValue)

                    if (!isNaN(num)) {
                      setDataValue(num)

                      const isInvalid =
                        num < 0 || num > 1000000000

                      setIsDataValueInvalid(isInvalid)
                    } else {
                      setIsDataValueInvalid(true)
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
                  {dataStorageUnits.map((unit) => (
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
                  {dataStorageUnits.map((unit) => (
                    <MenuItem key={unit.value} value={unit.value}>
                      {unit.label}
                    </MenuItem>
                  ))}
                </CSelect>

                <CButton
                  size='large'
                  label='Convert Data Storage'
                  onClick={calculateDataStorageOnClickHandler}
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
                    Data Storage Conversion Formula
                  </CTypography>

                  <CTypography
                    cvariant='th'
                    sx={{ mb: '8px' }}
                  >
                    Converted Value = Data Value * From Unit Factor / To Unit Factor
                  </CTypography>

                  <CTypography cvariant='c'>
                    Each unit is first converted into bytes
                    <br />
                    Byte value is converted into the selected target unit
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
                      Value In Bytes
                    </CTypography>
                    <Typography variant='h6'>
                      {valueInBytes.toFixed(8)}
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

      {/* Data Storage Conversion Table */}
      <Box mb={6}>
        <CTypography
          cvariant='sh'
          sx={{ px: '4px', mb: '4px' }}
        >
          Data Storage Conversion Table
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
                <TableCell align='right'>Factor To Byte</TableCell>
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
                    {item.factorToByte?.toLocaleString()}
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