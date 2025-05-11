import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';

import GlobalStyle from '~/Components/Global';
import { LoadingProvider } from '~/contexts/LoadingContext';
import { ToastProvider } from '~/contexts/ToastContext';
import { CartProvider } from './contexts/CartContext';

const storedUser = localStorage.getItem('currentUser');
const currentUser = storedUser ? JSON.parse(storedUser) : null;
const userId = currentUser?.id || null;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <GlobalStyle>
            <LoadingProvider>
                <ToastProvider>
                    <CartProvider userId={userId}>
                        <App />
                    </CartProvider>
                </ToastProvider>
            </LoadingProvider>
        </GlobalStyle>
    </React.StrictMode>,
);
reportWebVitals();
