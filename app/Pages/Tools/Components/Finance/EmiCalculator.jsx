import { useState, useEffect } from 'react'
import {
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Grid,
  Link,
  Paper,
  Stack,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  TablePagination
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import CTextField from '../../../../Components/CTextField'
import CTypography from '../../../../Components/CTypography'
import CButton from '../../../../Components/CButton'
import CPieChart from '../../../../Components/CPieChart'
import { saveAs } from 'file-saver'

const pieChartData = [
  { name: 'Principal', value: 1000 },
  { name: 'Interest', value: 0 }
]

const downloadCSV = (
  summary,
  amortizationSchedule
) => {
  let csv = '';

  csv += `Loan Amount,${summary.loanAmount}\n`;
  csv += `Interest Rate,${summary.interestRate}\n`;
  csv += `Tenure,${summary.tenureMonths}\n`;
  csv += `Monthly EMI,${summary.emi}\n`;
  csv += `Total Interest,${summary.totalInterest}\n`;
  csv += `Total Payment,${summary.totalPayment}\n\n`;

  csv +=
    'Month,EMI,Principal,Interest,Balance\n';

  amortizationSchedule.forEach((row) => {
    csv += `${row.month},${row.emi},${row.principalPaid},${row.interestPaid},${row.remainingBalance}\n`;
  });

  const blob = new Blob([csv], {
    type: 'text/csv;charset=utf-8;',
  });

  saveAs(blob, 'emi-schedule.csv');
};

export default function EmiCalculatorPage() {
  const [loanAmount, setLoanAmount] = useState(1000)
  const [interestRate, setInterestRate] = useState('10.00')
  const [loanTenure, setLoanTenure] = useState(12)
  const [isLoanAmountInvalid, setIsLoanAmountInvalid] = useState(false)
  const [isInterestRateInvalid, setIsInterestRateInvalid] = useState(false)
  const [isLoanTenureInvalid, setIsLoanTenureInvalid] = useState(false)

  const [monthlyEmi, setMonthlyEmi] = useState(0.00)
  const [totalInterest, setTotalInterest] = useState(0.00)
  const [totalPayment, setTotalPayment] = useState(0.00)
  const [pieChart, setPieChat] = useState([])

  const [amortizationSchedule, setAmortizationSchedule] = useState([])
  const [page, setPage] = useState(0)
  const paginatedSchedule = amortizationSchedule.slice(
    page * 12,
    page * 12 + 12
  )

  const calculateEmiOnClickHandler = () => {
    const numLoanAmount = parseFloat(loanAmount)
    const numInterestRate = parseFloat(interestRate)
    const numLoanTenure = parseFloat(loanTenure)

    if(isLoanAmountInvalid || isInterestRateInvalid ||
        isLoanTenureInvalid || numLoanAmount <= 0 ||
        numInterestRate <= 0 || numLoanTenure <= 0) {
      return
    }

    const monthlyInterestRate = numInterestRate / 12 / 100
    const emi = (numLoanAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numLoanTenure)) /
                (Math.pow(1 + monthlyInterestRate, numLoanTenure) - 1)
    const totalPaymentCalculated = emi * numLoanTenure
    const totalInterestCalculated = totalPaymentCalculated - numLoanAmount
    setMonthlyEmi(emi)
    setTotalInterest(totalInterestCalculated)
    setTotalPayment(totalPaymentCalculated)
    setPieChat([
      { name: 'Principal', value: numLoanAmount },
      { name: 'Interest', value: totalInterestCalculated }
    ])

    const options = {
      principal: numLoanAmount,
      annualRate: numInterestRate,
      tenureMonths: numLoanTenure
    }
    const result = generateAmortizationSchedule(options)
    setAmortizationSchedule(result)
  }

  const generateAmortizationSchedule = ({
    principal,
    annualRate,
    tenureMonths
  }) => {
    const monthlyRate = annualRate / 12 / 100;

    const emi =
      (principal *
        monthlyRate *
        Math.pow(1 + monthlyRate, tenureMonths)) /
      (Math.pow(1 + monthlyRate, tenureMonths) - 1)

    let balance = principal

    const schedule = []

    for (let month = 1; month <= tenureMonths; month++) {
      const interest = balance * monthlyRate

      const principalPaid = emi - interest

      balance -= principalPaid

      schedule.push({
        month,
        emi: Number(emi.toFixed(2)),
        principalPaid: Number(
          principalPaid.toFixed(2)
        ),
        interestPaid: Number(
          interest.toFixed(2)
        ),
        remainingBalance: Number(
          Math.max(balance, 0).toFixed(2)
        )
      })
    }

    return schedule
  }

  const saveCSV = () => {
    const numLoanAmount = parseFloat(loanAmount)
    const numInterestRate = parseFloat(interestRate)
    const numLoanTenure = parseFloat(loanTenure)
    const summary = {
      loanAmount: numLoanAmount.toFixed(2),
      interestRate: numInterestRate.toFixed(2),
      tenureMonths: numLoanTenure.toFixed(2),
      emi: monthlyEmi.toFixed(2),
      totalInterest: totalInterest.toFixed(2),
      totalPayment: totalPayment.toFixed(2),
    }
    
    downloadCSV(summary, amortizationSchedule)

  }

  useEffect(() => {
    calculateEmiOnClickHandler()
  }, [])

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
              <CTypography cvariant='sh'>Loan Details</CTypography>
              <Stack spacing={3}>
                <CTextField
                  label='Loan Amount'
                  fullWidth
                  value={loanAmount.toLocaleString()}
                  helperText={`0 < Amount < ${(1000000000).toLocaleString()}`}
                  helperTextStyle={{ pl: '4px' }}
                  sx={{
                    border: isLoanAmountInvalid ? '1px solid var(--red-color)':'1px solid var(--p-fg-st-color)',
                    borderRadius: '8px',
                    ':hover': {
                      border: isLoanAmountInvalid ? '1px solid var(--red-color)':'1px solid var(--p-fg-st-color)',
                    }
                  }}
                  onChange={(e) => {
                    const rawValue = e.target.value.replace(/,/g, '');
                    const num = Number(rawValue);

                    if (!isNaN(num)) {
                      setLoanAmount(num)
                      const isInvalid = num <= 0 || num > 1000000000
                      setIsLoanAmountInvalid(isInvalid)
                    } else {
                      setIsLoanAmountInvalid(true)
                    }
                  }}
                />
                <CTextField
                  label='Interest Rate (%)'
                  fullWidth
                  value={interestRate}
                  helperText={'0 < Interest Rate < 100'}
                  helperTextStyle={{ pl: '4px' }}
                  sx={{
                    border: isInterestRateInvalid ? '1px solid var(--red-color)':'1px solid var(--p-fg-st-color)',
                    borderRadius: '8px',
                    ':hover': {
                      border: isInterestRateInvalid ? '1px solid var(--red-color)':'1px solid var(--p-fg-st-color)',
                    }
                  }}
                  onChange={(e) => {
                    const value = e.target.value.replace(/,/g, '')
                    if(/^\d*\.?\d*$/.test(value)) {
                      setInterestRate(value)
                      const isInvalid = parseFloat(value) <= 0 || parseFloat(value) > 100
                      setIsInterestRateInvalid(isInvalid)
                    } else {
                      setIsInterestRateInvalid(true)
                    }
                  }}
                />
                <CTextField
                  label='Loan Tenure (Months)'
                  fullWidth
                  value={loanTenure.toLocaleString()}
                  helperText={`0 < Loan Tenure < ${(1000).toLocaleString()}`}
                  helperTextStyle={{ pl: '4px' }}
                  sx={{
                    border: isLoanTenureInvalid ? '1px solid var(--red-color)':'1px solid var(--p-fg-st-color)',
                    borderRadius: '8px',
                    ':hover': {
                      border: isLoanTenureInvalid ? '1px solid var(--red-color)':'1px solid var(--p-fg-st-color)',
                    }
                  }}
                  onChange={(e) => {
                    const rawValue = e.target.value.replace(/,/g, '');
                    const num = Number(rawValue);

                    if (!isNaN(num)) {
                      setLoanTenure(num)
                      const isInvalid = num <= 0 || num > 1000
                      setIsLoanTenureInvalid(isInvalid)
                    } else {
                      setIsLoanTenureInvalid(true)
                    }
                  }}
                />
                <CButton size='large' label='Calculate EMI' onClick={calculateEmiOnClickHandler} />
                <Paper
                  sx={{
                    p: 2,
                    border: '1px solid var(--p-fg-st-color)',
                    boxShadow: 'none',
                    borderRadius: '8px',
                  }}>
                  <CTypography cvariant='c' sx={{mb: '8px'}}>
                    EMI Formula
                  </CTypography>
                  <CTypography cvariant='th' sx={{mb: '8px'}}>
                    EMI = P × R × (1 + R)^N /
                    ((1 + R)^N − 1)
                  </CTypography>
                  <CTypography
                    cvariant='c'
                  >
                    P = Principal Loan Amount<br />
                    R = Monthly Interest Rate<br />
                    N = Total Number of Monthly Installments
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
                    }}>
                    <CTypography cvariant='c'>Monthly EMI</CTypography>
                    <Typography variant='h6'>
                      ${monthlyEmi.toFixed(2)}
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
                    }}>
                    <CTypography cvariant='c'>Total Interest</CTypography>
                    <Typography variant='h6'>
                      ${totalInterest.toFixed(2)}
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
                    }}>
                    <CTypography cvariant='c'>Total Payment</CTypography>
                    <Typography variant='h6'>
                      ${totalPayment.toFixed(2)}
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
                <CPieChart data={pieChart}/>
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
        <CButton size='large' cvariant='l' onClick={saveCSV} label='Download CSV' />
        {/* <CButton size='large' cvariant='l' label='Download PDF' /> */}
      </Stack>

      {/* Amortization Schedule */}
      <Box mb={6}>
        <CTypography cvariant='sh' sx={{px: '4px', mb: '4px'}}>Amortization Schedule</CTypography>
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
                <TableCell align='center'>Month</TableCell>
                <TableCell align='right'>EMI</TableCell>
                <TableCell align='right'>Principal</TableCell>
                <TableCell align='right'>Interest</TableCell>
                <TableCell align='right'>Balance</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {paginatedSchedule.map((item) => (
                <TableRow key={item.month}>
                  <TableCell align='center'>{item.month}</TableCell>
                  <TableCell align='right'>${item.emi?.toLocaleString()}</TableCell>
                  <TableCell align='right'>${item.principalPaid?.toLocaleString()}</TableCell>
                  <TableCell align='right'>${item.interestPaid?.toLocaleString()}</TableCell>
                  <TableCell align='right'>${item.remainingBalance?.toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component={Paper}
          count={amortizationSchedule.length}
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
  );
}