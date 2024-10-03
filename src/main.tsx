import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MantineProvider } from '@mantine/core';
import { GlobalStateProvider } from './Globalstate.tsx';
import App from './App.tsx'
import './index.css'
import '@mantine/core/styles.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider>
      <GlobalStateProvider>
        <App />
      </GlobalStateProvider>
    </MantineProvider>
  </StrictMode>,
)
