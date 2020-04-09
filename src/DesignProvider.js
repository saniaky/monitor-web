import React from 'react'
import { MuiThemeProvider, StylesProvider } from '@material-ui/core/styles'
import { ThemeProvider } from 'styled-components'
import CssBaseline from '@material-ui/core/CssBaseline'
import { ToastContainer } from 'react-toastify'
import theme from './config/theme'

export default ({ children }) => {
  return (
    //  Make sure the Material stylesheet is placed above your own styles so you can overwrite them
    <StylesProvider injectFirst>

      {/* Use the theme in the ThemeProvider for Material-UI so styles are applied to the Material-UI components */}
      <MuiThemeProvider theme={theme}>
        <CssBaseline />

        {/* Use also the ThemeProvider for Styled-Components so you can access the theme in your own css */}
        <ThemeProvider theme={theme}>
          {children}
        </ThemeProvider>
      </MuiThemeProvider>
      <ToastContainer />
    </StylesProvider>
  )
}
