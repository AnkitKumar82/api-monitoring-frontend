import React from 'react'
import { Box, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import CTypography from '../../../Components/CTypography'
import Panel from './Panel'

const members = [
  { name: 'Maya Chen', email: 'maya@company.dev', role: 'Owner' },
  { name: 'Liam Ortiz', email: 'liam@company.dev', role: 'Admin' },
  { name: 'Nina Patel', email: 'nina@company.dev', role: 'Viewer' }
]

export default function TeamPage() {
  return (
    <Box>
      <Panel title="Team" subtitle="Keep your operations team aligned with the right permissions.">
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: 'var(--s-fg-color)', fontWeight: 700 }}>Name</TableCell>
                <TableCell sx={{ color: 'var(--s-fg-color)', fontWeight: 700 }}>Email</TableCell>
                <TableCell sx={{ color: 'var(--s-fg-color)', fontWeight: 700 }}>Role</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {members.map((member) => (
                <TableRow key={member.email}>
                  <TableCell sx={{ color: 'var(--p-fg-color)' }}>{member.name}</TableCell>
                  <TableCell sx={{ color: 'var(--s-fg-color)' }}>{member.email}</TableCell>
                  <TableCell sx={{ color: 'var(--p-fg-color)' }}>{member.role}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Panel>
    </Box>
  )
}
