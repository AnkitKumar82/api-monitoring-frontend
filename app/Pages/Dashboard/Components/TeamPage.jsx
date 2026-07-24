import React, { useState, useEffect } from 'react'
import { Box, Stack, Table, TableBody, TableCell, MenuItem, TableContainer, TableHead, TableRow, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material'
import CTypography from '../../../Components/CTypography'
import CButton from '../../../Components/CButton'
import CModal from '../../../Components/CModal'
import CTextField from '../../../Components/CTextField'
import CSelect from '../../../Components/CSelect'
import Panel from './Panel'
import { AddRounded as AddIcon, DeleteRounded as DeleteIcon } from '@mui/icons-material'
import { teamApi } from '../../../Helpers/teamApi'

export default function TeamPage() {
  const [teams, setTeams] = useState([])
  const [loading, setLoading] = useState(true)
  const [openModal, setOpenModal] = useState(false)
  const [editingTeam, setEditingTeam] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  })
  const [errors, setErrors] = useState({})
  const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false)
  const [teamToDelete, setTeamToDelete] = useState(null)

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  // Open modal for adding new team
  const handleAddTeam = () => {
    setEditingTeam(null)
    setFormData({
      name: '',
      description: ''
    })
    setErrors({})
    setOpenModal(true)
  }

  // Open modal for editing existing team
  const handleEditTeam = (team) => {
    setEditingTeam(team)
    setFormData({
      name: team.name,
      description: team.description
    })
    setErrors({})
    setOpenModal(true)
  }

  // Close modal
  const handleCloseModal = () => {
    setOpenModal(false)
    setEditingTeam(null)
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

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (validateForm()) {
      try {
        const token = localStorage.getItem('authToken'); // Assuming token is stored in localStorage
        
        if (editingTeam) {
          // Update existing team
          const updatedTeam = await teamApi.updateTeam(editingTeam._id, {
            name: formData.name,
            description: formData.description
          }, token);
          
          setTeams(prev => prev.map(team => 
            team._id === editingTeam._id ? updatedTeam : team
          ))
        } else {
          // Add new team
          const newTeam = await teamApi.createTeam({
            name: formData.name,
            description: formData.description
          }, token);
          
          setTeams(prev => [...prev, newTeam])
        }
        handleCloseModal()
      } catch (error) {
        console.error('Error saving team:', error);
        // You might want to show an error message to the user here
      }
    }
  }

  // Delete team
  const handleDelete = (team) => {
    setTeamToDelete(team)
    setOpenDeleteConfirm(true)
  }

  // Confirm delete
  const confirmDelete = async () => {
    if (teamToDelete) {
      try {
        const token = localStorage.getItem('authToken'); // Assuming token is stored in localStorage
        await teamApi.deleteTeam(teamToDelete._id, token);
        setTeams(prev => prev.filter(team => team._id !== teamToDelete._id))
        setOpenDeleteConfirm(false)
        setTeamToDelete(null)
      } catch (error) {
        console.error('Error deleting team:', error);
        // You might want to show an error message to the user here
      }
    }
  }

  // Cancel delete
  const cancelDelete = () => {
    setOpenDeleteConfirm(false)
    setTeamToDelete(null)
  }

  // Fetch teams on component mount
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const token = localStorage.getItem('authToken'); // Assuming token is stored in localStorage
        const teams = await teamApi.getAllTeams(token);
        setTeams(teams);
      } catch (error) {
        console.error('Error fetching teams:', error);
        // Handle error appropriately - maybe show an error message to user
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  // Render action buttons
  const renderActions = (team) => {
    return (
      <Stack direction="row" spacing={1}>
        <CButton 
          label='Edit'  
          active 
          cvariant='t'
          size='small'
          onClick={() => handleEditTeam(team)}
        />
        <CButton
          label='Delete'  
          active 
          cvariant='s'
          size='small' 
          onClick={() => handleDelete(team)}
        />
      </Stack>
    )
  }

  return (
    <Box>
      <Panel 
        title="Teams" 
        subtitle="Manage your project teams and their descriptions." 
        actions={
          <Stack direction="row" spacing={1}>
            <CButton
              active
              label="Add Team"
              cvariant="s"
              startIcon={AddIcon}
              size="normal"
              onClick={handleAddTeam}
            />
          </Stack>
        }
      >
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
            <CTypography cvariant="c">Loading teams...</CTypography>
          </Box>
        ) : (
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ color: 'var(--s-fg-color)', fontWeight: 700 }}>Name</TableCell>
                  <TableCell sx={{ color: 'var(--s-fg-color)', fontWeight: 700 }}>Description</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {teams.map((team) => (
                  <TableRow key={team._id}>
                    <TableCell><CTypography cvariant="c" sx={{color: 'var(--p-fg-color)'}}>{team.name}</CTypography></TableCell>
                    <TableCell><CTypography cvariant="c" sx={{color: 'var(--p-fg-color)'}}>{team.description}</CTypography></TableCell>
                    <TableCell>
                      {renderActions(team)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Panel>

      {/* Add/Edit Team Modal */}
      <CModal
        open={openModal}
        onClose={handleCloseModal}
        title={editingTeam ? `Edit ${editingTeam.name}` : 'Add Team'}
        maxWidth="sm"
        sx={{ p: 2, minWidth: '60vw' }}
      >
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <CTypography cvariant="th" sx={{fontWeight: '600', color: 'var(--p-fg-color)'}}>
            {editingTeam ? `Edit ${editingTeam.name}` : 'Add Team'}
          </CTypography>
          <CTextField
            fullWidth
            label="Team Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            error={!!errors.name}
            helperText={errors.name || 'Required'}
          />
          
          <CTextField
            fullWidth
            label="Description"
            name="description"
            multiline
            rows={3}
            value={formData.description}
            onChange={handleInputChange}
            error={!!errors.description}
            helperText={errors.description || ''}
            labelStyle={{ mt: 2 }}
            helperTextStyle={{ mb: 2 }}
          />
          
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, mt: 2 }}>
            <CButton label="Cancel" cvariant="ghost" onClick={handleCloseModal} />
            <CButton label={editingTeam ? "Update Team" : "Add Team"} cvariant="primary" type="submit" />
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
          {teamToDelete ? `Delete ${teamToDelete.name}` : 'Delete Team'}
        </DialogTitle>
        <DialogContent>
          <CTypography cvariant="c">
            Are you sure you want to delete this team? All members will lose access.
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
