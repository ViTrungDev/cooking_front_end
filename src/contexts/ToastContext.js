import { createContext, useState, useContext } from 'react';
import ToastPortal from '~/Components/ToastPortal/index';

const ToastContext = createContext();

export function useToast() {
    return useContext(ToastContext);
}

export function ToastProvider({ children }) {
    const [toast, setToast] = useState({ show: false, message: '' });

    const showToast = (message) => {
        setToast({ show: true, message });
        setTimeout(() => setToast({ show: false, message: '' }), 3000);
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <ToastPortal show={toast.show} message={toast.message} />
        </ToastContext.Provider>
    );
}
