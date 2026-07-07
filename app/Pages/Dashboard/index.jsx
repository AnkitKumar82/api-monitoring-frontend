import * as React from 'react'
import Main from './Main'
import { Box } from '@mui/material'

function Dashboard (props) {
  return (
    <Box>
      <Main view={props.view}/>
    </Box>
  )
}

export default Dashboard