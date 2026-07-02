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
import CPieChart from '../../../../Components/CPieChart'
import CSelect from '../../../../Components/CSelect'
import { saveAs } from 'file-saver'


const pieChartData = [
  { name: 'Final Price', value: 900 },
  { name: 'Savings', value: 100 }
]

const downloadCSV = (
  summary,
  discountBreakdown
) => {
  let csv = ''

  csv += `Original Price,${summary.originalPrice}\n`
  csv += `Discount Type,${summary.discountType}\n`
  csv += `Discount Value,${summary.discountValue}\n`
  csv += `Discount Amount,${summary.discountAmount}\n`
  csv += `Final Price,${summary.finalPrice}\n`
  csv += `Savings Percentage,${summary.savingsPercentage}\n\n`

  csv +=
    'Description,Amount,Percentage\n'

  discountBreakdown.forEach((row) => {
    csv += `${row.description},${row.amount},${row.percentage}\n`
  })

  const blob = new Blob([csv], {
    type: 'text/csv;charset=utf-8;',
  })

  saveAs(blob, 'discount-calculation.csv')
}
export default function DiscountCalculatorPage() {
  const [originalPrice, setOriginalPrice] = useState(1000)
  const [discountType, setDiscountType] =
    useState('percentage')
  const [discountValue, setDiscountValue] = useState('10.00')

  const [isOriginalPriceInvalid, setIsOriginalPriceInvalid] =
    useState(false)
  const [isDiscountValueInvalid, setIsDiscountValueInvalid] =
    useState(false)

  const [discountAmount, setDiscountAmount] = useState(0.0)
  const [finalPrice, setFinalPrice] = useState(0.0)
  const [savingsPercentage, setSavingsPercentage] = useState(0.0)

  const [pieChart, setPieChart] =
    useState(pieChartData)

  const [discountBreakdown, setDiscountBreakdown] =
    useState([])

  const [page, setPage] = useState(0)

  const paginatedSchedule = discountBreakdown.slice(
    page * 12,
    page * 12 + 12
  )
    const calculateDiscountOnClickHandler = () => {
    const numOriginalPrice = parseFloat(originalPrice)
    const numDiscountValue = parseFloat(discountValue)

    if (
      isOriginalPriceInvalid ||
      isDiscountValueInvalid ||
      numOriginalPrice <= 0 ||
      numDiscountValue < 0 ||
      (discountType === 'percentage' && numDiscountValue > 100) ||
      (discountType === 'amount' && numDiscountValue > numOriginalPrice)
    ) {
      return
    }

    let savings = 0

    if (discountType === 'percentage') {
      savings =
        numOriginalPrice * numDiscountValue / 100
    } else {
      savings = numDiscountValue
    }

    const priceAfterDiscount =
      numOriginalPrice - savings

    const savingsPercent =
      savings / numOriginalPrice * 100

    setDiscountAmount(savings)
    setFinalPrice(priceAfterDiscount)
    setSavingsPercentage(savingsPercent)

    setPieChart([
      {
        name: 'Final Price',
        value: priceAfterDiscount
      },
      {
        name: 'Savings',
        value: savings
      }
    ])

    const options = {
      originalPrice: numOriginalPrice,
      discountAmount: savings,
      finalPrice: priceAfterDiscount,
      savingsPercentage: savingsPercent
    }

    const result = generateDiscountBreakdown(options)

    setDiscountBreakdown(result)
  }
    const generateDiscountBreakdown = ({
    originalPrice,
    discountAmount,
    finalPrice,
    savingsPercentage
  }) => {
    const schedule = []

    schedule.push({
      description: 'Original Price',
      amount: Number(originalPrice.toFixed(2)),
      percentage: Number((100).toFixed(2))
    })

    schedule.push({
      description: 'Savings',
      amount: Number(discountAmount.toFixed(2)),
      percentage: Number(savingsPercentage.toFixed(2))
    })

    schedule.push({
      description: 'Final Price',
      amount: Number(finalPrice.toFixed(2)),
      percentage: Number((100 - savingsPercentage).toFixed(2))
    })

    return schedule
  }

  const saveCSV = () => {
    const summary = {
      originalPrice: Number(originalPrice).toFixed(2),
      discountType:
        discountType === 'percentage'
          ? 'Percentage'
          : 'Fixed Amount',
      discountValue: Number(discountValue).toFixed(2),
      discountAmount: discountAmount.toFixed(2),
      finalPrice: finalPrice.toFixed(2),
      savingsPercentage: savingsPercentage.toFixed(2)
    }

    downloadCSV(summary, discountBreakdown)
  }

  useEffect(() => {
    calculateDiscountOnClickHandler()
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
              <CTypography cvariant='sh'>Discount Details</CTypography>

              <Stack spacing={3}>
                <CTextField
                  label='Original Price'
                  fullWidth
                  value={originalPrice.toLocaleString()}
                  helperText={`0 < Amount < ${(1000000000).toLocaleString()}`}
                  helperTextStyle={{ pl: '4px' }}
                  sx={{
                    border: isOriginalPriceInvalid
                      ? '1px solid var(--red-color)'
                      : '1px solid var(--p-fg-st-color)',
                    borderRadius: '8px',
                    ':hover': {
                      border: isOriginalPriceInvalid
                        ? '1px solid var(--red-color)'
                        : '1px solid var(--p-fg-st-color)',
                    }
                  }}
                  onChange={(e) => {
                    const rawValue = e.target.value.replace(/,/g, '')
                    const num = Number(rawValue)

                    if (!isNaN(num)) {
                      setOriginalPrice(num)

                      const isInvalid =
                        num <= 0 || num > 1000000000

                      setIsOriginalPriceInvalid(isInvalid)
                    } else {
                      setIsOriginalPriceInvalid(true)
                    }
                  }}
                />

                <CSelect
                  select
                  label='Discount Type'
                  fullWidth
                  value={discountType}
                  onChange={(e) =>
                    setDiscountType(e.target.value)
                  }
                  sx={{
                    '.MuiOutlinedInput-notchedOutline': { 
                        border: '1px solid var(--p-fg-st-color)'
                    }
                  }}
                >
                  <MenuItem value='percentage'>Percentage</MenuItem>
                  <MenuItem value='amount'>Fixed Amount</MenuItem>
                </CSelect>

                <CTextField
                  label='Discount Value'
                  fullWidth
                  value={discountValue}
                  helperText={
                    discountType === 'percentage'
                      ? '0 <= Discount <= 100'
                      : `0 <= Discount <= ${originalPrice.toLocaleString()}`
                  }
                  helperTextStyle={{ pl: '4px' }}
                  sx={{
                    border: isDiscountValueInvalid
                      ? '1px solid var(--red-color)'
                      : '1px solid var(--p-fg-st-color)',
                    borderRadius: '8px',
                    ':hover': {
                      border: isDiscountValueInvalid
                        ? '1px solid var(--red-color)'
                        : '1px solid var(--p-fg-st-color)',
                    }
                  }}
                  onChange={(e) => {
                    const value = e.target.value.replace(/,/g, '')

                    if (/^\d*\.?\d*$/.test(value)) {
                      setDiscountValue(value)

                      const isInvalid =
                        parseFloat(value) < 0 ||
                        (discountType === 'percentage' &&
                          parseFloat(value) > 100) ||
                        (discountType === 'amount' &&
                          parseFloat(value) > originalPrice)

                      setIsDiscountValueInvalid(isInvalid)
                    } else {
                      setIsDiscountValueInvalid(true)
                    }
                  }}
                />

                <CButton
                  size='large'
                  label='Calculate Discount'
                  onClick={calculateDiscountOnClickHandler}
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
                    Discount Formula
                  </CTypography>

                  <CTypography
                    cvariant='th'
                    sx={{ mb: '8px' }}
                  >
                    Final Price = Original Price - Discount Amount
                  </CTypography>

                  <CTypography cvariant='c'>
                    Percentage discount is calculated from original price
                    <br />
                    Fixed discount is subtracted directly from original price
                    <br />
                    Savings Percentage = Discount Amount / Original Price * 100
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
                      Discount Amount
                    </CTypography>
                    <Typography variant='h6'>
                      ${discountAmount.toFixed(2)}
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
                      Final Price
                    </CTypography>
                    <Typography variant='h6'>
                      ${finalPrice.toFixed(2)}
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
                      Savings Percentage
                    </CTypography>
                    <Typography variant='h6'>
                      {savingsPercentage.toFixed(2)}%
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>

              {/* Chart Placeholder */}
              <Paper
                sx={{
                  mt: 3,
                  p: 4,
                  textAlign: 'center',
                  border: '1px solid var(--p-fg-st-color)',
                  boxShadow: '0 0 2500px var(--p-b-color)',
                  borderRadius: '8px'
                }}
              >
                <CPieChart data={pieChart} />
              </Paper>
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

      {/* Discount Breakdown */}
      <Box mb={6}>
        <CTypography
          cvariant='sh'
          sx={{ px: '4px', mb: '4px' }}
        >
          Discount Breakdown
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
                <TableCell align='center'>Description</TableCell>
                <TableCell align='right'>Amount</TableCell>
                <TableCell align='right'>Percentage</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {paginatedSchedule.map((item) => (
                <TableRow key={item.description}>
                  <TableCell align='center'>
                    {item.description}
                  </TableCell>

                  <TableCell align='right'>
                    ${item.amount?.toLocaleString()}
                  </TableCell>

                  <TableCell align='right'>
                    {item.percentage?.toLocaleString()}%
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
                <TablePagination
          component={Paper}
          count={discountBreakdown.length}
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