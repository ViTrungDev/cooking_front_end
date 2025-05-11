import { useState } from 'react';
import { useToast } from '~/contexts/ToastContext';

export default function useAddToCart() {
    const [isAdding, setIsAdding] = useState(false);
    const { showToast } = useToast(); // Dùng toast toàn cục

    const handleAddToCart = (onAddCallBack) => {
        setIsAdding(true);
        setTimeout(() => {
            if (typeof onAddCallBack === 'function') {
                onAddCallBack();
            }
            setIsAdding(false);
            showToast('Thêm thành công!');
        }, 1000);
    };

    return {
        isAdding,
        handleAddToCart,
    };
}
