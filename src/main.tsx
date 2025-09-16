import { ThemeProvider, createTheme, responsiveFontSizes } from '@mui/material'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App.tsx'
import store from './app/store.ts'
import './index.css'
import colors from './styles/colors.ts'

let theme = createTheme({
  palette: {
    background: { default: colors.backgroundColor },
  },
  typography: {
    fontFamily: ["MetricHPE_Web"].join(","),
  }
})

theme = responsiveFontSizes(theme)

createRoot(document.getElementById('root')!).render(
  <ThemeProvider theme={theme}>
    <StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </StrictMode>
  </ThemeProvider>
)
