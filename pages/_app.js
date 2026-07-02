import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '@fontsource/inter/700.css'
import '@fontsource/inter/800.css'
import '../styles/globals.css'
import React from 'react'
import { AppProvider } from '../app/DataStores/AppContext'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

const customTheme = createTheme({
  typography: {
    fontFamily: [
      'inter',
      'sans-serif'
    ].join(',')
  }
})

function MyApp(props) {
  const { Component, pageProps } = props
  return (
    <AppProvider>
      <ThemeProvider theme={customTheme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </AppProvider>
  )
}

export default MyApp