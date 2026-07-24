import React, { useState, useEffect } from 'react'
import { Box, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Divider, FormControlLabel } from '@mui/material'
import CTypography from '../../../Components/CTypography'
import CButton from '../../../Components/CButton'
import Panel from './Panel'
import CSwitch from '../../../Components/CSwitch'
import { workspaceApi } from '../../../Helpers/workspaceApi'

export default function BillingPage() {
  const [payments, setPayments] = useState([])
  const [autoPay, setAutoPay] = useState(true)
  const [currentPlan, setCurrentPlan] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Mock token - in real app this would come from authentication
  const token = localStorage.getItem('authToken') || 'mock-token'

  useEffect(() => {
    const fetchBillingData = async () => {
      try {
        setLoading(true)
        
        // Get current workspace plan details
        const workspaceResponse = await workspaceApi.getCurrentWorkspace(token)
        const workspaceData = workspaceResponse.data
        
        setPayments(workspaceData.payments || [])
        setCurrentPlan({
          name: workspaceData.plan || 'Pro Plan',
          price: workspaceData.plan === 'BASIC' ? '$29/month' : '$79/month',
          endpoints: workspaceData.plan === 'BASIC' ? 50 : 250,
          nextBilling: 'August 1, 2026',
          autoPay: true
        })
      } catch (err) {
        setError(err.message)
        console.error('Error fetching billing data:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchBillingData()
  }, [])

  return (
    <Box>
      <Panel title='Billing' subtitle='Plan usage, invoices, and payment history.'>
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
              <CTypography cvariant='sh' sx={{ mb: 0.75 }}>{currentPlan?.name}</CTypography>
              <CTypography cvariant='caption'>{currentPlan?.price} • {currentPlan?.endpoints} monitored endpoints</CTypography>
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
              <CTypography cvariant='sh' sx={{ mb: 0.75 }}>Next invoice</CTypography>
              <CTypography cvariant='caption'>{currentPlan?.nextBilling} • Auto-pay {autoPay ? 'enabled' : 'disabled'}</CTypography>
            </Box>
          </Grid>
        </Grid>

        {/* Auto-pay Toggle */}
        <Box sx={{ mb: 3, ml: '12px' }}>
          <FormControlLabel
            control={
              <CSwitch
                checked={autoPay}
                onChange={(e) => setAutoPay(e.target.checked)}
              />
            }
            label={<CTypography sx={{ml: '12px'}} cvariant='c'>{`${autoPay ? 'Disable' : 'Enable'} Auto-pay for future invoices`}</CTypography>}
          />
        </Box>

        {/* Payment History */}
        <Divider sx={{ mb: 2 }} />
        
        <CTypography cvariant='h6' sx={{ mb: 2 }}>Payment History</CTypography>
        
        <TableContainer 
          component={Paper} 
          sx={{ 
            border: '1px solid rgba(255,255,255,0.7)',
            borderRadius: '12px',
            boxShadow: 'none',
          }}
        >
          <Table size='small'>
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: 'var(--p-fg-color)', fontWeight: 700 }}>Date</TableCell>
                <TableCell sx={{ color: 'var(--p-fg-color)', fontWeight: 700 }}>Plan Name</TableCell>
                <TableCell sx={{ color: 'var(--p-fg-color)', fontWeight: 700 }}>Amount</TableCell>
                <TableCell sx={{ color: 'var(--p-fg-color)', fontWeight: 700 }}>Status</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {payments.map((payment) => (
                <TableRow key={payment.id} hover>
                  <TableCell><CTypography cvariant='c'>{payment.date}</CTypography></TableCell>
                  <TableCell><CTypography cvariant='c'>{payment.planName}</CTypography></TableCell>
                  <TableCell><CTypography cvariant='c'>{payment.amount}</CTypography></TableCell>
                  <TableCell>
                    <CTypography cvariant='c' sx={{ color: payment.status === 'Completed' ? 'var(--green-color)' : 'var(--p-fg-color)' }}>
                      {payment.status}
                    </CTypography>
                  </TableCell>
                  <TableCell>
                    <CButton 
                      label='Download Invoice' 
                      cvariant='t' 
                      size='small'
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
