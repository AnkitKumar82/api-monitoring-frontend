import React, { useState } from 'react'
import { Box, Grid, Paper, Stack, MenuItem, TablePagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Tooltip } from '@mui/material'
import CTypography from '../../../Components/CTypography'
import CButton from '../../../Components/CButton'
import CModal from '../../../Components/CModal'
import CTextField from '../../../Components/CTextField'
import CChip from '../../../Components/CChip'
import CBadge from '../../../Components/CBadge'
import Panel from './Panel'
import { EmailRounded as EmailIcon, AddRounded as AddIcon, EditRounded as EditIcon, DeleteRounded as DeleteIcon, VisibilityRounded as VisibilityIcon, NotificationsRounded as NotificationsIcon } from '@mui/icons-material'

// Mock data for notification channels
const mockChannels = [
  {
    id: 1,
    name: 'Backend Team',
    type: 'Email',
    destination: ['backend@example.com', 'devops@example.com', 'admin@example.com'],
    status: 'Active',
    usedBy: 12
  },
  {
    id: 2,
    name: 'Production Slack',
    type: 'Slack',
    destination: 'https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXXXXXX',
    status: 'Active',
    usedBy: 3
  },
  {
    id: 3,
    name: 'QA Alerts',
    type: 'Slack',
    destination: 'https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXXXXXX',
    status: 'Pending Verification',
    usedBy: 0
  },
  {
    id: 4,
    name: 'Engineering',
    type: 'Email',
    destination: ['backend@example.com', 'devops@example.com'],
    status: 'Active',
    usedBy: 5
  },
  {
    id: 5,
    name: 'DevOps',
    type: 'Slack',
    destination: 'https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXXXXXX',
    status: 'Invalid',
    usedBy: 8
  }
]

// Mock data for summary cards
const summaryData = {
  totalChannels: mockChannels.length,
  emailChannels: mockChannels.filter(channel => channel.type === 'Email').length,
  slackChannels: mockChannels.filter(channel => channel.type === 'Slack').length
}

export default function NotificationsPage() {
  const [channels, setChannels] = useState(mockChannels)
  const [openModal, setOpenModal] = useState(false)
  const [modalType, setModalType] = useState('') // 'email' or 'slack'
  const [editingChannel, setEditingChannel] = useState(null)
  const [testLoading, setTestLoading] = useState({})
  const [formData, setFormData] = useState({
    name: '',
    type: 'Email', // New field for channel type
    recipients: [''],
    webhookUrl: ''
  })
  const [errors, setErrors] = useState({})

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  // Handle recipient changes
  const handleRecipientChange = (index, value) => {
    const newRecipients = [...formData.recipients]
    newRecipients[index] = value
    setFormData(prev => ({ ...prev, recipients: newRecipients }))
  }

  // Add a new recipient field
  const addRecipient = () => {
    if (formData.recipients.length < 5) {
      setFormData(prev => ({ ...prev, recipients: [...prev.recipients, ''] }))
    }
  }

  // Remove a recipient field
  const removeRecipient = (index) => {
    if (formData.recipients.length > 1) {
      const newRecipients = formData.recipients.filter((_, i) => i !== index)
      setFormData(prev => ({ ...prev, recipients: newRecipients }))
    }
  }

  // Open modal for adding new channel
  const handleAddChannel = (type) => {
    setModalType(type)
    setEditingChannel(null)
    setFormData({
      name: '',
      type: type.charAt(0).toUpperCase() + type.slice(1), // Set default type
      recipients: [''],
      webhookUrl: ''
    })
    setErrors({})
    setOpenModal(true)
  }

  // Open modal for editing existing channel
  const handleEditChannel = (channel) => {
    setModalType(channel.type.toLowerCase())
    setEditingChannel(channel)
    setFormData({
      name: channel.name,
      type: channel.type,
      recipients: Array.isArray(channel.destination) ? channel.destination : [''],
      webhookUrl: !Array.isArray(channel.destination) ? channel.destination : ''
    })
    setErrors({})
    setOpenModal(true)
  }

  // Close modal
  const handleCloseModal = () => {
    setOpenModal(false)
    setEditingChannel(null)
    setErrors({})
  }

  // Validate form
  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    } else if (formData.name.length > 50) {
      newErrors.name = 'Name must be less than 50 characters'
    }

    if (formData.type === 'Email') {
      // Validate recipients
      if (formData.recipients.length === 0 || (formData.recipients.length === 1 && !formData.recipients[0].trim())) {
        newErrors.recipients = 'At least one recipient is required'
      } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        const validRecipients = formData.recipients.filter(email => email.trim() !== '')
        const duplicateEmails = validRecipients.filter((email, index) => validRecipients.indexOf(email) !== index)
        if (duplicateEmails.length > 0) {
          newErrors.recipients = 'Duplicate emails are not allowed'
        } else {
          const invalidEmails = validRecipients.filter(email => !emailRegex.test(email.trim()))
          if (invalidEmails.length > 0) {
            newErrors.recipients = 'Invalid email format'
          }
        }
      }
    } else if (formData.type === 'Slack') {
      // Validate webhook URL
      if (!formData.webhookUrl.trim()) {
        newErrors.webhookUrl = 'Webhook URL is required'
      } else if (!formData.webhookUrl.startsWith('https://')) {
        newErrors.webhookUrl = 'URL must be HTTPS'
      } else if (!formData.webhookUrl.includes('hooks.slack.com')) {
        newErrors.webhookUrl = 'Invalid Slack webhook URL format'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      if (editingChannel) {
        // Update existing channel
        setChannels(prev => prev.map(channel => 
          channel.id === editingChannel.id ? { ...channel, name: formData.name } : channel
        ))
      } else {
        // Add new channel
        const newChannel = {
          id: channels.length + 1,
          name: formData.name,
          type: formData.type,
          destination: formData.type === 'Email' ? formData.recipients.filter(r => r.trim()) : formData.webhookUrl,
          status: 'Active',
          usedBy: 0
        }
        setChannels(prev => [...prev, newChannel])
      }
      handleCloseModal()
    }
  }

  // Delete channel
  const handleDelete = (channelId) => {
    if (window.confirm('Are you sure you want to delete this notification channel? Endpoints using this channel will no longer receive notifications.')) {
      setChannels(prev => prev.filter(channel => channel.id !== channelId))
    }
  }

  // Test notification
  const handleTestNotification = (channelId) => {
    setTestLoading(prev => ({ ...prev, [channelId]: true }))
    // Simulate API call
    setTimeout(() => {
      setTestLoading(prev => ({ ...prev, [channelId]: false }))
      alert('Test notification sent successfully!')
    }, 1500)
  }

  // Render recipient chips for email channels
  const renderRecipients = (recipients) => {
    if (!recipients || !Array.isArray(recipients)) return <CTypography cvariant="c">No recipients</CTypography>
    return (
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
        {recipients.slice(0, 3).map((recipient, index) => (
          <CChip key={index} cvariant='s' label={recipient} clickable size="small" labelStyle={{fontSize: '0.8rem' }} sx={{ fontSize: '0.8rem', bgcolor: 'var(--t-bg-color)', color: 'var(--p-fg-color)', }} />
        ))}
        {recipients.length > 3 && (
          <CTypography cvariant="c" sx={{ color: 'var(--p-fg-color)' }}>+{recipients.length - 3} more</CTypography>
        )}
      </Box>
    )
  }

  // Render destination based on type
  const renderDestination = (channel) => {
    if (channel.type === 'Email') {
      return renderRecipients(channel.destination)
    } else {
      return (
        <Tooltip title={channel.destination}>
          <CTypography cvariant="c" noWrap sx={{ color: 'var(--p-fg-color)', maxWidth: 200 }}>
            {channel.destination}
          </CTypography>
        </Tooltip>
      )
    }
  }

  // Render status badge
  const renderStatusBadge = (status) => {
    let color = 'success'
    if (status === 'Invalid') color = 'error'
    if (status === 'Pending Verification') color = 'warning'
    return <CBadge label={status} color={color} />
  }

  // Render action buttons
  const renderActions = (channel) => {
    return (
      <Stack direction="row" spacing={1}>
        <Tooltip title="View">
          <IconButton size="small" onClick={() => handleEditChannel(channel)}>
            <VisibilityIcon sx={{ fontSize: '1rem' }} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Edit">
          <IconButton size="small" onClick={() => handleEditChannel(channel)}>
            <EditIcon sx={{ fontSize: '1rem' }} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton size="small" onClick={() => handleDelete(channel.id)}>
            <DeleteIcon sx={{ fontSize: '1rem' }} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Test Notification">
          <IconButton size="small" onClick={() => handleTestNotification(channel.id)} disabled={testLoading[channel.id]}>
            {testLoading[channel.id] ? (
              <NotificationsIcon sx={{ fontSize: '1rem' }} /> // Could use a spinner here if needed
            ) : (
              <NotificationsIcon sx={{ fontSize: '1rem' }} />
            )}
          </IconButton>
        </Tooltip>
      </Stack>
    )
  }

  return (
    <Box>
      <Panel 
        title="Notifications" 
        subtitle="Configure reusable notification channels for incident alerts and recovery notifications." 
        actions={
          <Stack direction="row" spacing={1}>
            <CButton
              label="Add Notification Channel"
              cvariant="ghost"
              startIcon={AddIcon}
              onClick={() => handleAddChannel('email')}
            />
          </Stack>
        }
      >
        {/* Summary Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={4}>
            <Box sx={{ border: '1px solid var(--glass-border)', borderRadius: 2, p: 3, background: 'rgba(255,255,255,0.08)' }}>
              <CTypography cvariant="h6" sx={{ mb: 1 }}>Total Channels</CTypography>
              <CTypography cvariant="h4" sx={{ fontWeight: 'bold' }}>{summaryData.totalChannels}</CTypography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box sx={{ border: '1px solid var(--glass-border)', borderRadius: 2, p: 3, background: 'rgba(255,255,255,0.08)' }}>
              <CTypography cvariant="h6" sx={{ mb: 1 }}>Email Channels</CTypography>
              <CTypography cvariant="h4" sx={{ fontWeight: 'bold' }}>{summaryData.emailChannels}</CTypography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box sx={{ border: '1px solid var(--glass-border)', borderRadius: 2, p: 3, background: 'rgba(255,255,255,0.08)' }}>
              <CTypography cvariant="h6" sx={{ mb: 1 }}>Slack Channels</CTypography>
              <CTypography cvariant="h4" sx={{ fontWeight: 'bold' }}>{summaryData.slackChannels}</CTypography>
            </Box>
          </Grid>
        </Grid>

        {/* Notification Channels Table */}
        <TableContainer
          component={Paper}
          sx={{
            textAlign: 'center',
            border: '1px solid var(--p-b-color)',
            boxShadow: 'none',
            borderRadius: '12px'
          }}  
        >
          <Table size='small'>
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: 'var(--p-fg-color)', fontWeight: 700 }}>Channel Name</TableCell>
                <TableCell sx={{ color: 'var(--p-fg-color)', fontWeight: 700 }}>URL/Email</TableCell>
                <TableCell sx={{ color: 'var(--p-fg-color)', fontWeight: 700 }}>Channel Type</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {channels.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} sx={{ textAlign: 'center' }}>
                    <Box sx={{ p: 4 }}>
                      <CTypography cvariant="h6">No notification channels configured.</CTypography>
                      <CTypography cvariant="c" sx={{ mb: 2 }}>Create your first notification channel to receive monitoring alerts.</CTypography>
                      <CButton
                        label="Create Notification Channel"
                        cvariant="ghost"
                        startIcon={AddIcon}
                        onClick={() => handleAddChannel('email')}
                      />
                    </Box>
                  </TableCell>
                </TableRow>
              ) : (
                channels.map((channel) => (
                  <TableRow key={channel.id} sx={{':hover': { cursor: 'pointer', bgcolor: 'var(--t-bg-color)' }}}>
                    <TableCell><CTypography cvariant="c">{channel.name}</CTypography></TableCell>
                    <TableCell>{renderDestination(channel)}</TableCell>
                    <TableCell><CTypography cvariant="c">{channel.type}</CTypography></TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component={Paper}
          count={100}
          page={1}
          sx={{
            textAlign: 'center',
            border: '1px solid var(--p-b-color)',
            borderRadius: '12px',
            boxShadow: 'none',
            mt: '8px'
          }}
          // onPageChange={(event, newPage) => setPage(newPage)}
          rowsPerPageOptions={[]}
          rowsPerPage={50}
        />
      </Panel>

      {/* Add/Edit Channel Modal */}
      <CModal
        open={openModal}
        onClose={handleCloseModal}
        title={editingChannel ? `Edit ${editingChannel.name}` : `Add ${modalType.charAt(0).toUpperCase() + modalType.slice(1)} Notification Channel`}
        maxWidth="sm"
      >
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <CTextField
            fullWidth
            label="Notification Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            error={!!errors.name}
            helperText={errors.name || 'Required'}
            sx={{ mb: 2 }}
          />
          
          {/* Channel Type Selection */}
          <Box sx={{ mb: 2 }}>
            <CTextField
              fullWidth
              select
              label="Channel Type"
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              error={!!errors.type}
              helperText={errors.type || 'Select channel type'}
            >
              <MenuItem value={'Email'}>Email</MenuItem>
              <MenuItem value={'Slack'}>Slack Webhook</MenuItem>
            </CTextField>
          </Box>
          
          {formData.type === 'Email' ? (
            <Box>
              <CTypography cvariant="subtitle2" sx={{ mb: 1 }}>Email Recipients</CTypography>
              {formData.recipients.map((recipient, index) => (
                <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <CTextField
                    fullWidth
                    label={`Recipient ${index + 1}`}
                    value={recipient}
                    onChange={(e) => handleRecipientChange(index, e.target.value)}
                    error={!!errors.recipients}
                    helperText={errors.recipients || 'Maximum 5 email recipients.'}
                    sx={{ mr: 1 }}
                  />
                  {formData.recipients.length > 1 && (
                    <IconButton size="small" onClick={() => removeRecipient(index)}>
                      <DeleteIcon sx={{ fontSize: '1rem' }} />
                    </IconButton>
                  )}
                </Box>
              ))}
              <CButton
                label="Add Recipient"
                cvariant="ghost"
                onClick={addRecipient}
                disabled={formData.recipients.length >= 5}
                sx={{ mb: 2 }}
              />
            </Box>
          ) : (
            <Box>
              <CTypography cvariant="subtitle2" sx={{ mb: 1 }}>Slack Webhook URL</CTypography>
              <CTextField
                fullWidth
                label="Webhook URL"
                name="webhookUrl"
                value={formData.webhookUrl}
                onChange={handleInputChange}
                error={!!errors.webhookUrl}
                helperText={errors.webhookUrl || 'Maximum 5 Slack channels allowed on the current plan.'}
                sx={{ mb: 2 }}
              />
            </Box>
          )}
          
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, mt: 2 }}>
            <CButton label="Cancel" cvariant="ghost" onClick={handleCloseModal} />
            <CButton label={editingChannel ? "Update Channel" : "Add Channel"} cvariant="primary" type="submit" />
          </Box>
        </Box>
      </CModal>
    </Box>
  )
}
