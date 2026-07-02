import { useState, useEffect } from 'react'
import {
  Box,
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

const pieChartData = [
  { name: 'BMI', value: 22 },
  { name: 'Remaining to 40', value: 18 }
]

const downloadCSV = (summary, bmiRangeSchedule) => {
  let csv = ''

  csv += `Weight,${summary.weight}\n`
  csv += `Height,${summary.height}\n`
  csv += `Unit System,${summary.unitSystem}\n`
  csv += `BMI,${summary.bmi}\n`
  csv += `Category,${summary.category}\n`
  csv += `Healthy Weight Range,${summary.healthyWeightRange}\n\n`

  csv += 'Category,BMI Range,Status\n'
  bmiRangeSchedule.forEach((row) => {
    csv += `${row.category},${row.bmiRange},${row.status}\n`
  })

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  saveAs(blob, 'bmi-calculation.csv')
}

const getBmiCategory = (bmi) => {
  if (bmi < 18.5) return 'Underweight'
  if (bmi < 25) return 'Normal weight'
  if (bmi < 30) return 'Overweight'
  if (bmi < 35) return 'Obese (Class I)'
  if (bmi < 40) return 'Obese (Class II)'
  return 'Obese (Class III)'
}

const bmiRangeSchedule = [
  { category: 'Underweight',      bmiRange: '< 18.5',    status: 'Below Normal' },
  { category: 'Normal weight',    bmiRange: '18.5 – 24.9', status: 'Healthy' },
  { category: 'Overweight',       bmiRange: '25.0 – 29.9', status: 'Above Normal' },
  { category: 'Obese (Class I)',  bmiRange: '30.0 – 34.9', status: 'Obese' },
  { category: 'Obese (Class II)', bmiRange: '35.0 – 39.9', status: 'Severely Obese' },
  { category: 'Obese (Class III)',bmiRange: '≥ 40.0',    status: 'Morbidly Obese' },
]

export default function BmiCalculatorPage() {
  const [unitSystem, setUnitSystem] = useState('metric')
  const [weight, setWeight] = useState(70)
  const [height, setHeight] = useState(175)

  const [isWeightInvalid, setIsWeightInvalid] = useState(false)
  const [isHeightInvalid, setIsHeightInvalid] = useState(false)

  const [bmi, setBmi] = useState(0.0)
  const [category, setCategory] = useState('')
  const [healthyWeightMin, setHealthyWeightMin] = useState(0.0)
  const [healthyWeightMax, setHealthyWeightMax] = useState(0.0)
  const [bmiToNormal, setBmiToNormal] = useState(0.0)

  const [page, setPage] = useState(0)

  const paginatedSchedule = bmiRangeSchedule.slice(page * 12, page * 12 + 12)

  const weightLabel = unitSystem === 'metric' ? 'Weight (kg)' : 'Weight (lbs)'
  const heightLabel = unitSystem === 'metric' ? 'Height (cm)' : 'Height (inches)'
  const weightHelper = unitSystem === 'metric' ? '0 < Weight ≤ 500 kg' : '0 < Weight ≤ 1100 lbs'
  const heightHelper = unitSystem === 'metric' ? '0 < Height ≤ 300 cm' : '0 < Height ≤ 120 inches'
  const weightUnit = unitSystem === 'metric' ? 'kg' : 'lbs'
  const heightMax = unitSystem === 'metric' ? 300 : 120
  const weightMax = unitSystem === 'metric' ? 500 : 1100

  const calculateBmiOnClickHandler = () => {
    const numWeight = parseFloat(weight)
    const numHeight = parseFloat(height)

    if (
      isWeightInvalid ||
      isHeightInvalid ||
      numWeight <= 0 ||
      numHeight <= 0
    ) {
      return
    }

    let bmiVal
    let heightM

    if (unitSystem === 'metric') {
      heightM = numHeight / 100
      bmiVal = numWeight / (heightM * heightM)
    } else {
      // Imperial: BMI = (weight in lbs / height in inches²) × 703
      bmiVal = (numWeight / (numHeight * numHeight)) * 703
      heightM = (numHeight * 2.54) / 100
    }

    const cat = getBmiCategory(bmiVal)

    // Healthy weight range for this height (BMI 18.5 – 24.9)
    const minW = unitSystem === 'metric'
      ? 18.5 * heightM * heightM
      : (18.5 * numHeight * numHeight) / 703
    const maxW = unitSystem === 'metric'
      ? 24.9 * heightM * heightM
      : (24.9 * numHeight * numHeight) / 703

    // How far from normal
    const toNormal = bmiVal < 18.5
      ? 18.5 - bmiVal
      : bmiVal > 24.9
      ? bmiVal - 24.9
      : 0

    setBmi(bmiVal)
    setCategory(cat)
    setHealthyWeightMin(minW)
    setHealthyWeightMax(maxW)
    setBmiToNormal(toNormal)

    // Pie: BMI vs remaining to 40 scale cap
    const cappedBmi = Math.min(bmiVal, 40)
  }

  const saveCSV = () => {
    const summary = {
      weight: `${Number(weight).toFixed(1)} ${weightUnit}`,
      height: `${Number(height).toFixed(1)} ${unitSystem === 'metric' ? 'cm' : 'in'}`,
      unitSystem: unitSystem === 'metric' ? 'Metric' : 'Imperial',
      bmi: bmi.toFixed(2),
      category,
      healthyWeightRange: `${healthyWeightMin.toFixed(1)} – ${healthyWeightMax.toFixed(1)} ${weightUnit}`
    }

    downloadCSV(summary, bmiRangeSchedule)
  }

  useEffect(() => {
    calculateBmiOnClickHandler()
  }, [])

  // Reset defaults when unit system changes
  const handleUnitSystemChange = (e) => {
    const val = e.target.value
    setUnitSystem(val)
    if (val === 'metric') {
      setWeight(70)
      setHeight(175)
    } else {
      setWeight(154)
      setHeight(69)
    }
    setIsWeightInvalid(false)
    setIsHeightInvalid(false)
  }

  return (
    <Container>
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
              <CTypography cvariant='sh'>BMI Details</CTypography>

              <Stack spacing={3}>
                <CSelect
                  select
                  label='Unit System'
                  fullWidth
                  value={unitSystem}
                  onChange={handleUnitSystemChange}
                  sx={{
                    '.MuiOutlinedInput-notchedOutline': {
                      border: '1px solid var(--p-fg-st-color)'
                    }
                  }}
                >
                  <MenuItem value='metric'>Metric (kg, cm)</MenuItem>
                  <MenuItem value='imperial'>Imperial (lbs, inches)</MenuItem>
                </CSelect>

                <CTextField
                  label={weightLabel}
                  fullWidth
                  value={weight.toLocaleString()}
                  helperText={weightHelper}
                  helperTextStyle={{ pl: '4px' }}
                  sx={{
                    border: isWeightInvalid
                      ? '1px solid var(--red-color)'
                      : '1px solid var(--p-fg-st-color)',
                    borderRadius: '8px',
                    ':hover': {
                      border: isWeightInvalid
                        ? '1px solid var(--red-color)'
                        : '1px solid var(--p-fg-st-color)',
                    }
                  }}
                  onChange={(e) => {
                    const rawValue = e.target.value.replace(/,/g, '')
                    const num = Number(rawValue)
                    if (!isNaN(num)) {
                      setWeight(num)
                      const isInvalid = num <= 0 || num > weightMax
                      setIsWeightInvalid(isInvalid)
                    } else {
                      setIsWeightInvalid(true)
                    }
                  }}
                />

                <CTextField
                  label={heightLabel}
                  fullWidth
                  value={height.toLocaleString()}
                  helperText={heightHelper}
                  helperTextStyle={{ pl: '4px' }}
                  sx={{
                    border: isHeightInvalid
                      ? '1px solid var(--red-color)'
                      : '1px solid var(--p-fg-st-color)',
                    borderRadius: '8px',
                    ':hover': {
                      border: isHeightInvalid
                        ? '1px solid var(--red-color)'
                        : '1px solid var(--p-fg-st-color)',
                    }
                  }}
                  onChange={(e) => {
                    const rawValue = e.target.value.replace(/,/g, '')
                    const num = Number(rawValue)
                    if (!isNaN(num)) {
                      setHeight(num)
                      const isInvalid = num <= 0 || num > heightMax
                      setIsHeightInvalid(isInvalid)
                    } else {
                      setIsHeightInvalid(true)
                    }
                  }}
                />

                <CButton
                  size='large'
                  label='Calculate BMI'
                  onClick={calculateBmiOnClickHandler}
                />

                <Paper
                  sx={{
                    p: 2,
                    border: '1px solid var(--p-fg-st-color)',
                    boxShadow: 'none',
                    borderRadius: '8px',
                  }}
                >
                  <CTypography cvariant='c' sx={{ mb: '8px' }}>
                    BMI Formula
                  </CTypography>

                  <CTypography cvariant='th' sx={{ mb: '8px' }}>
                    BMI = Weight (kg) / Height (m)<sup>2</sup>
                  </CTypography>

                  <CTypography cvariant='c'>
                    Weight = Body weight in kilograms
                    <br />
                    Height = Body height in metres
                    <br />
                    Imperial: BMI = (lbs / in<sup>2</sup>) × 703
                    <br />
                    Healthy range: 18.5 – 24.9
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
                    <CTypography cvariant='c'>BMI</CTypography>
                    <Typography variant='h6'>{bmi.toFixed(2)}</Typography>
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
                    <CTypography cvariant='c'>Category</CTypography>
                    <Typography variant='h6'>{category}</Typography>
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
                    <CTypography cvariant='c'>BMI from Normal</CTypography>
                    <Typography variant='h6'>
                      {bmiToNormal === 0 ? 'In range' : `${bmiToNormal.toFixed(2)} away`}
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
                      Healthy Weight Min
                    </CTypography>
                    <Typography variant='h6'>
                      {healthyWeightMin.toFixed(1)} {weightUnit}
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
                      Healthy Weight Max
                    </CTypography>
                    <Typography variant='h6'>
                      {healthyWeightMax.toFixed(1)} {weightUnit}
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Download Actions */}
      <Stack direction='row' spacing={2} mb={'4px'}>
        <CButton
          size='large'
          cvariant='l'
          onClick={saveCSV}
          label='Download CSV'
        />
      </Stack>

      {/* BMI Range Schedule */}
      <Box mb={6}>
        <CTypography cvariant='sh' sx={{ px: '4px', mb: '4px' }}>
          BMI Category Schedule
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
                <TableCell align='center'>Category</TableCell>
                <TableCell align='center'>BMI Range</TableCell>
                <TableCell align='center'>Status</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {paginatedSchedule.map((item, index) => (
                <TableRow key={index}>
                  <TableCell align='center'>{item.category}</TableCell>
                  <TableCell align='center'>{item.bmiRange}</TableCell>
                  <TableCell align='center'>{item.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          component={Paper}
          count={bmiRangeSchedule.length}
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