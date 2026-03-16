import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App';
import { PortalProvider } from './contexts/PortalContext';
import { StoreProvider } from './contexts/StoreContext';
import { DateRangeProvider } from './contexts/DateRangeContext';
import { PersonaProvider } from './contexts/PersonaContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <PersonaProvider>
        <StoreProvider>
          <DateRangeProvider>
            <PortalProvider>
              <App />
            </PortalProvider>
          </DateRangeProvider>
        </StoreProvider>
      </PersonaProvider>
    </HashRouter>
  </React.StrictMode>
);
