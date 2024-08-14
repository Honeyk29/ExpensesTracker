import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { GlobalStyle } from './styles/Globalstyle.jsx'
import { GlobalProvider } from './context/globalContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GlobalStyle/>
    <GlobalProvider>
      <App />
    </GlobalProvider>
  </StrictMode>
)
