import * as React from 'react'
import Main from './Main'
import NavBar from './Components/NavBar'
import { Box } from '@mui/material'

function Dashboard () {
  return (
    <Box>
      <NavBar />
      <Main />
    </Box>
  )
}

export default Dashboard