import * as React from 'react'
import Main from './Main'
import NavBar from '../../Commons/NavBar'
import { Box } from '@mui/material'

function Home () {
  return (
    <Box sx={{
        minHeight: '100vh',
        background: `
          radial-gradient(circle at 10% 20%, rgba(92, 107, 192, 0.15) 0%, transparent 20%),
          radial-gradient(circle at 90% 80%, rgba(132, 206, 255, 0.15) 0%, transparent 20%),
          radial-gradient(circle at 50% 50%, rgba(167, 134, 255, 0.1) 0%, transparent 30%),
          radial-gradient(circle at 80% 30%, rgba(255, 107, 192, 0.1) 0%, transparent 20%),
          radial-gradient(circle at 20% 70%, rgba(107, 206, 192, 0.1) 0%, transparent 20%)
        `,
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed'
      }}>
      <NavBar />
      <Main />
    </Box>
  )
}

export default Home