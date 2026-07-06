import React, { useState } from 'react'
import { Box, Stack, Table, TableBody, TableCell, MenuItem, TableContainer, TableHead, TableRow, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material'
import CTypography from '../../../Components/CTypography'
import CButton from '../../../Components/CButton'
import CModal from '../../../Components/CModal'
import CTextField from '../../../Components/CTextField'
import CSelect from '../../../Components/CSelect'
import Panel from './Panel'
import { AddRounded as AddIcon, DeleteRounded as DeleteIcon } from '@mui/icons-material'

const initialMembers = [
  { name: 'Maya Chen', email: 'maya@company.dev', role: 'Owner' },
  { name: 'Maya Chen', email: 'maya@company.dev', role: 'Editor' },
  { name: 'Liam Ortiz', email: 'liam@company.dev', role: 'Admin' },
  { name: 'Nina Patel', email: 'nina@company.dev', role: 'Viewer' }
]

export default function TeamPage() {
  const [members, setMembers] = useState(initialMembers)
  const [openModal, setOpenModal] = useState(false)
  const [editingMember, setEditingMember] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'Viewer'
  })
  const [errors, setErrors] = useState({})
  const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false)
  const [memberToDelete, setMemberToDelete] = useState(null)

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  // Open modal for adding new team member
  const handleAddMember = () => {
    setEditingMember(null)
    setFormData({
      name: '',
      email: '',
      role: 'Viewer'
    })
    setErrors({})
    setOpenModal(true)
  }

  // Open modal for editing existing team member
  const handleEditMember = (member) => {
    setEditingMember(member)
    setFormData({
      name: member.name,
      email: member.email,
      role: member.role
    })
    setErrors({})
    setOpenModal(true)
  }

  // Close modal
  const handleCloseModal = () => {
    setOpenModal(false)
    setEditingMember(null)
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

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      if (editingMember) {
        // Update existing member
        setMembers(prev => prev.map(member => 
          member.email === editingMember.email ? { ...member, name: formData.name, email: formData.email, role: formData.role } : member
        ))
      } else {
        // Add new member
        const newMember = {
          name: formData.name,
          email: formData.email,
          role: formData.role
        }
        setMembers(prev => [...prev, newMember])
      }
      handleCloseModal()
    }
  }

  // Delete member
  const handleDelete = (member) => {
    setMemberToDelete(member)
    setOpenDeleteConfirm(true)
  }

  // Confirm delete
  const confirmDelete = () => {
    if (memberToDelete) {
      setMembers(prev => prev.filter(member => member.email !== memberToDelete.email))
      setOpenDeleteConfirm(false)
      setMemberToDelete(null)
    }
  }

  // Cancel delete
  const cancelDelete = () => {
    setOpenDeleteConfirm(false)
    setMemberToDelete(null)
  }

  // Render action buttons
  const renderActions = (member) => {
    return (
      <Stack direction="row" spacing={1}>
        <CButton 
          label='Edit'  
          active 
          cvariant='t'
          size='small'
          onClick={() => handleEditMember(member)}
        />
        <CButton
          label='Delete'  
          active 
          cvariant='s'
          size='small' 
          onClick={() => handleDelete(member)}
        />
      </Stack>
    )
  }

  return (
    <Box>
      <Panel 
        title="Team" 
        subtitle="Keep your operations team aligned with the right permissions." 
        actions={
          <Stack direction="row" spacing={1}>
            <CButton
              active
              label="Add Team Member"
              cvariant="s"
              startIcon={AddIcon}
              size="normal"
              onClick={handleAddMember}
            />
          </Stack>
        }
      >
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: 'var(--s-fg-color)', fontWeight: 700 }}>Name</TableCell>
                <TableCell sx={{ color: 'var(--s-fg-color)', fontWeight: 700 }}>Email</TableCell>
                <TableCell sx={{ color: 'var(--s-fg-color)', fontWeight: 700 }}>Role</TableCell>
                <TableCell sx={{ color: 'var(--s-fg-color)', fontWeight: 700 }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {members.map((member) => (
                <TableRow key={member.email}>
                  <TableCell><CTypography cvariant="c" sx={{color: 'var(--p-fg-color)'}}>{member.name}</CTypography></TableCell>
                  <TableCell><CTypography cvariant="c" sx={{color: 'var(--p-fg-color)'}}>{member.email}</CTypography></TableCell>
                  <TableCell><CTypography cvariant="c" sx={{color: 'var(--p-fg-color)'}}>{member.role}</CTypography></TableCell>
                  <TableCell>
                    {renderActions(member)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Panel>

      {/* Add/Edit Member Modal */}
      <CModal
        open={openModal}
        onClose={handleCloseModal}
        title={editingMember ? `Edit ${editingMember.name}` : 'Add Team Member'}
        maxWidth="sm"
        sx={{ p: 2, minWidth: '60vw' }}
      >
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <CTypography cvariant="th" sx={{fontWeight: '600', color: 'var(--p-fg-color)'}}>
            {editingMember ? `Edit ${editingMember.name}` : 'Add Team Member'}
          </CTypography>
          <CTextField
            fullWidth
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            error={!!errors.name}
            helperText={errors.name || 'Required'}
          />
          
          <CTextField
            fullWidth
            label="Email Address"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            error={!!errors.email}
            helperText={errors.email || 'Required'}
            labelStyle={{ mt: 2 }}
            helperTextStyle={{ mb: 2 }}
          />
          
          <Box sx={{ mb: 2 }}>
            <CSelect
              cvariant='s'
              name='role'
              label='Role'
              value={formData.role}
              onChange={handleInputChange}
              error={!!errors.role}
              helperText={errors.role}
              fullWidth
            >
              <MenuItem value={'Admin'}>Admin</MenuItem>
              <MenuItem value={'Editor'}>Editor</MenuItem>
              <MenuItem value={'Viewer'}>Viewer</MenuItem>
            </CSelect>
          </Box>
          
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, mt: 2 }}>
            <CButton label="Cancel" cvariant="ghost" onClick={handleCloseModal} />
            <CButton label={editingMember ? "Update Member" : "Add Member"} cvariant="primary" type="submit" />
          </Box>
        </Box>
      </CModal>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={openDeleteConfirm}
        onClose={cancelDelete}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
        PaperProps={{
          sx: {
            p: '0px 16px 16px 0px',
            borderRadius: "16px", // Change as needed
          },
        }}
      >
        <DialogTitle id="delete-dialog-title">
          {memberToDelete ? `Delete ${memberToDelete.name}` : 'Delete Team Member'}
        </DialogTitle>
        <DialogContent>
          <CTypography cvariant="c">
            Are you sure you want to remove this team member? They will lose access to the system.
          </CTypography>
        </DialogContent>
        <DialogActions>
          <CButton label="Cancel" cvariant="ghost" onClick={cancelDelete} />
          <CButton label="Delete" cvariant="danger" onClick={confirmDelete} />
        </DialogActions>
      </Dialog>
    </Box>
  )
}
