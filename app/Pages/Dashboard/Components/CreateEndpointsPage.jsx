import React, { useState } from 'react'
import { Box, Grid, Paper, Stack, MenuItem } from '@mui/material'
import CTypography from '../../../Components/CTypography'
import CButton from '../../../Components/CButton'
import CSelect from '../../../Components/CSelect'
import CTextField from '../../../Components/CTextField'
import Panel from './Panel'
import Link from 'next/link'

// Mock data for notification groups (similar to notifications page)
const mockNotificationGroups = [
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
  }
]

// Mock data for time intervals
const timeIntervals = [
  { value: '1 min', label: 'Every 1 minute' },
  { value: '5 min', label: 'Every 5 minutes' },
  { value: '15 min', label: 'Every 15 minutes' },
  { value: '1 hour', label: 'Every 1 hour' },
  { value: '1 day', label: 'Every 1 day' }
]

// Mock data for HTTP methods
const httpMethods = [
  { value: 'GET', label: 'GET' },
  { value: 'POST', label: 'POST' },
  { value: 'PUT', label: 'PUT' },
  { value: 'DELETE', label: 'DELETE' },
  { value: 'PATCH', label: 'PATCH' }
]

// Mock data for response types
const responseTypes = [
  { value: 'status_code', label: 'HTTP Status Code (e.g. 200, 204)' },
  { value: 'json_match', label: 'JSON Response Matching' },
  { value: 'xml_match', label: 'XML Response Matching' },
  { value: 'string_match', label: 'String Matching in Response' }
]

export default function CreateEndpointsPage() {
  const [formData, setFormData] = useState({
    name: '',
    urls: '',
    method: '',
    responseType: '',
    statusCode: '',
    jsonMatch: '',
    xmlMatch: '',
    stringMatch: '',
    headers: '',
    notificationGroups: [],
    interval: ''
  })
  const [errors, setErrors] = useState({})

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  // Handle notification group selection
  const handleNotificationGroupChange = (e) => {
    const { value } = e.target
    setFormData(prev => ({ ...prev, notificationGroups: value }))
  }

  // Handle interval selection
  const handleIntervalChange = (e) => {
    const { value } = e.target
    setFormData(prev => ({ ...prev, interval: value }))
  }

// Validate form
  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Endpoint name is required'
    } else if (formData.name.length > 100) {
      newErrors.name = 'Name must be less than 100 characters'
    }

    // Validate URLs - check if there's at least one valid URL
    if (!formData.urls.trim()) {
      newErrors.urls = 'At least one URL is required'
    } else {
      const urls = formData.urls.split('\n').filter(url => url.trim() !== '')
      const urlRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?(\?[^\s]*)?$/
      const invalidUrls = urls.filter(url => !urlRegex.test(url.trim()))
      if (invalidUrls.length > 0) {
        newErrors.urls = 'One or more URLs are invalid'
      }
    }

    if (!formData.method) {
      newErrors.method = 'HTTP method is required'
    }

    if (!formData.responseType) {
      newErrors.responseType = 'Response type is required'
    } else {
      // Validate response type specific fields
      if (formData.responseType === 'status_code' && !formData.statusCode.trim()) {
        newErrors.statusCode = 'HTTP status code is required'
      }
      if (formData.responseType === 'json_match' && !formData.jsonMatch.trim()) {
        newErrors.jsonMatch = 'Expected JSON response is required'
      }
      if (formData.responseType === 'xml_match' && !formData.xmlMatch.trim()) {
        newErrors.xmlMatch = 'Expected XML response is required'
      }
      if (formData.responseType === 'string_match' && !formData.stringMatch.trim()) {
        newErrors.stringMatch = 'String to match is required'
      }
    }

    if (formData.notificationGroups.length === 0) {
      newErrors.notificationGroups = 'At least one notification group is required'
    }

    if (!formData.interval) {
      newErrors.interval = 'Monitoring interval is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      // In a real application, this would make an API call to create the endpoint
      console.log('Endpoint created with data:', formData)
      alert('Endpoint created successfully!')
      // Reset form after successful submission
      setFormData({
        name: '',
        urls: '',
        method: '',
        responseType: '',
        notificationGroups: [],
        interval: ''
      })
    }
  }

  return (
    <Box>      
      <Panel 
        title="Create Endpoint" 
        subtitle="Add a new API endpoint to monitor for uptime and response validation."
        actions={<Link
            href="/dashboard/overview"
            style={{
              textDecoration: 'none',
              color: 'inherit',
            }}
          >
            <CButton label='Back to Overview' cvariant='s' size='normal'/>
          </Link>}
      >
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <Grid container spacing={3}>
            {/* Endpoint Name */}
            <Grid item xs={12} md={6}>
              <CTextField
                fullWidth
                label="Endpoint Name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                error={!!errors.name}
                helperText={errors.name || 'Enter a descriptive name for this endpoint'}
              />
            </Grid>

            {/* HTTP Method */}
            <Grid item xs={12} md={6}>
              <CSelect
                cvariant='s'
                name='method'
                label='HTTP Method'
                value={formData.method}
                onChange={handleInputChange}
                error={!!errors.method}
                helperText={errors.method}
                fullWidth
              >
                {httpMethods.map(method => (
                  <MenuItem key={method.value} value={method.value}>{method.label}</MenuItem>
                ))}
              </CSelect>
            </Grid>

            {/* URLs - Multiline Input */}
            <Grid item xs={12}>
              <CTextField
                fullWidth
                label="Endpoint URLs"
                name="urls"
                value={formData.urls}
                onChange={handleInputChange}
                error={!!errors.urls}
                helperText={errors.urls || 'Enter one URL per line (e.g. https://api.example.com/users)'}
                multiline
                rows={4}
              />
            </Grid>
            {/* HTTP Headers */}
            <Grid item xs={12}>
              <CTextField
                fullWidth
                label="HTTP Request Headers"
                name="headers"
                value={formData.headers}
                onChange={handleInputChange}
                error={!!errors.headers}
                helperText={errors.headers || 'Enter one header per line as key: value pairs (e.g. x-api-key: xxxxxx-xxxxx-xxxxxx)'}
                multiline
                rows={2}
              />
            </Grid>

            {/* Response Type */}
            <Grid item xs={12} md={6}>
              <CSelect
                cvariant='s'
                name='responseType'
                label='Expected Response Type'
                value={formData.responseType}
                onChange={handleInputChange}
                error={!!errors.responseType}
                helperText={errors.responseType}
                fullWidth
              >
                {responseTypes.map(type => (
                  <MenuItem key={type.value} value={type.value}>{type.label}</MenuItem>
                ))}
              </CSelect>
            </Grid>

            {/* Response Type Specific Fields */}
            {formData.responseType === 'status_code' && (
              <Grid item xs={12}>
                <CTextField
                  fullWidth
                  label="HTTP Status Code"
                  name="statusCode"
                  value={formData.statusCode}
                  onChange={handleInputChange}
                  error={!!errors.statusCode}
                  helperText={errors.statusCode || 'Enter HTTP status code(s) (e.g. 200, 204)'}
                />
              </Grid>
            )}

            {formData.responseType === 'json_match' && (
              <Grid item xs={12}>
                <CTextField
                  fullWidth
                  label="Expected JSON Response"
                  name="jsonMatch"
                  value={formData.jsonMatch}
                  onChange={handleInputChange}
                  error={!!errors.jsonMatch}
                  helperText={errors.jsonMatch || 'Enter exact JSON response for matching'}
                  multiline
                  rows={4}
                />
              </Grid>
            )}

            {formData.responseType === 'xml_match' && (
              <Grid item xs={12}>
                <CTextField
                  fullWidth
                  label="Expected XML Response"
                  name="xmlMatch"
                  value={formData.xmlMatch}
                  onChange={handleInputChange}
                  error={!!errors.xmlMatch}
                  helperText={errors.xmlMatch || 'Enter exact XML response for matching'}
                  multiline
                  rows={4}
                />
              </Grid>
            )}

            {formData.responseType === 'string_match' && (
              <Grid item xs={12}>
                <CTextField
                  fullWidth
                  label="String to Match"
                  name="stringMatch"
                  value={formData.stringMatch}
                  onChange={handleInputChange}
                  error={!!errors.stringMatch}
                  helperText={errors.stringMatch || 'Enter string to match in response'}
                />
              </Grid>
            )}

            {/* Notification Groups */}
            <Grid item xs={12} md={6}>
              <CSelect
                multiple
                cvariant='s'
                name='notificationGroups'
                label='Notification Groups'
                value={formData.notificationGroups}
                onChange={handleNotificationGroupChange}
                error={!!errors.notificationGroups}
                helperText={errors.notificationGroups || 'Select notification groups to assign'}
                fullWidth
              >
                {mockNotificationGroups.map(group => (
                  <MenuItem key={group.id} value={group.id}>{group.name}</MenuItem>
                ))}
              </CSelect>
            </Grid>

            {/* Monitoring Interval */}
            <Grid item xs={12} md={6}>
              <CSelect
                cvariant='s'
                name='interval'
                label='Monitoring Interval'
                value={formData.interval}
                onChange={handleIntervalChange}
                error={!!errors.interval}
                helperText={errors.interval}
                fullWidth
              >
                {timeIntervals.map(interval => (
                  <MenuItem key={interval.value} value={interval.value}>{interval.label}</MenuItem>
                ))}
              </CSelect>
            </Grid>

            {/* Submit Button */}
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <CButton 
                  label="Create Endpoint" 
                  cvariant="primary" 
                  type="submit" 
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Panel>
    </Box>
  )
}