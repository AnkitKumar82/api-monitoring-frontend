import React, { useState } from 'react'
import { Box, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Divider } from '@mui/material'
import CTypography from '../../../Components/CTypography'
import CButton from '../../../Components/CButton'
import Panel from './Panel'

// Mock data for payment history
const mockPayments = [
  {
    id: 1,
    date: '2024-06-01',
    planName: 'Pro Plan',
    amount: '$79.00',
    status: 'Completed',
    invoiceId: 'INV-001'
  },
  {
    id: 2,
    date: '2024-05-01',
    planName: 'Pro Plan',
    amount: '$79.00',
    status: 'Completed',
    invoiceId: 'INV-002'
  },
  {
    id: 3,
    date: '2024-04-01',
    planName: 'Pro Plan',
    amount: '$79.00',
    status: 'Completed',
    invoiceId: 'INV-003'
  },
  {
    id: 4,
    date: '2024-03-01',
    planName: 'Pro Plan',
    amount: '$79.00',
    status: 'Completed',
    invoiceId: 'INV-004'
  }
]

export default function BillingPage() {
  const [payments] = useState(mockPayments)
  
  // Mock current plan data
  const currentPlan = {
    name: 'Pro Plan',
    price: '$79/month',
    endpoints: 250,
    nextBilling: 'August 1, 2026',
    autoPay: true
  }

  return (
    <Box>
      <Panel title="Billing" subtitle="Plan usage, invoices, and payment history.">
        {/* Current Plan Summary */}
        <Grid container spacing={2.5} sx={{ mb: 3 }}>
          <Grid item xs={12} md={6}>
            <Box 
              sx={{ 
                border: '1px solid var(--p-b-color)', 
                borderRadius: 4, 
                p: 2.25, 
                background: 'rgba(255,255,255,0.62)',
                backdropFilter: 'blur(20px)'
              }}
            >
              <CTypography cvariant="sh" sx={{ mb: 0.75 }}>{currentPlan.name}</CTypography>
              <CTypography cvariant="caption">{currentPlan.price} • {currentPlan.endpoints} monitored endpoints</CTypography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box 
              sx={{ 
                border: '1px solid var(--p-b-color)',
                borderRadius: 4, 
                p: 2.25, 
                background: 'rgba(255,255,255,0.62)',
                backdropFilter: 'blur(20px)'
              }}
            >
              <CTypography cvariant="sh" sx={{ mb: 0.75 }}>Next invoice</CTypography>
              <CTypography cvariant="caption">{currentPlan.nextBilling} • Auto-pay {currentPlan.autoPay ? 'enabled' : 'disabled'}</CTypography>
            </Box>
          </Grid>
        </Grid>

        {/* Payment History */}
        <Divider sx={{ mb: 2 }} />
        
        <CTypography cvariant="h6" sx={{ mb: 2 }}>Payment History</CTypography>
        
        <TableContainer 
          component={Paper} 
          sx={{ 
            border: '1px solid rgba(255,255,255,0.7)',
            borderRadius: '12px',
            boxShadow: 'none',
          }}
        >
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: 'var(--p-fg-color)', fontWeight: 700 }}>Date</TableCell>
                <TableCell sx={{ color: 'var(--p-fg-color)', fontWeight: 700 }}>Plan</TableCell>
                <TableCell sx={{ color: 'var(--p-fg-color)', fontWeight: 700 }}>Amount</TableCell>
                <TableCell sx={{ color: 'var(--p-fg-color)', fontWeight: 700 }}>Status</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {payments.map((payment) => (
                <TableRow key={payment.id} hover>
                  <TableCell><CTypography cvariant="c">{payment.date}</CTypography></TableCell>
                  <TableCell><CTypography cvariant="c">{payment.planName}</CTypography></TableCell>
                  <TableCell><CTypography cvariant="c">{payment.amount}</CTypography></TableCell>
                  <TableCell>
                    <CTypography cvariant="c" sx={{ color: payment.status === 'Completed' ? 'var(--green-color)' : 'var(--p-fg-color)' }}>
                      {payment.status}
                    </CTypography>
                  </TableCell>
                  <TableCell>
                    <CButton 
                      label="Download Invoice" 
                      cvariant="t" 
                      size="small"
                      onClick={() => alert(`Viewing invoice ${payment.invoiceId}`)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Panel>
    </Box>
  )
}
