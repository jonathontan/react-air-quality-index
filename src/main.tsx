import { ThemeProvider, createTheme, responsiveFontSizes } from '@mui/material'
import { SnackbarProvider } from "notistack"
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
  }
})

theme = responsiveFontSizes(theme)

createRoot(document.getElementById('root')!).render(
  <ThemeProvider theme={theme}>
    <StrictMode>
      <Provider store={store}>
        <SnackbarProvider
          hideIconVariant
          variant="error"
          style={{
            borderRadius: '25px',
            flexGrow: 1,
            justifyContent: 'center'
          }}
          autoHideDuration={5000}
          preventDuplicate={true}
          transitionDuration={{ enter: 200, exit: 395 }}
          anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}>
          <App />
        </SnackbarProvider>
      </Provider>
    </StrictMode>
  </ThemeProvider>
)
