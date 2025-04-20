import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';

import GlobalStyle from '~/Components/Global';
import { LoadingProvider } from '~/contexts/LoadingContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <GlobalStyle>
            <LoadingProvider>
                <App />
            </LoadingProvider>
        </GlobalStyle>
    </React.StrictMode>,
);
reportWebVitals();
