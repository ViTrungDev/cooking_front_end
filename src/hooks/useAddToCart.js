import { useState } from 'react';
import { useToast } from '~/contexts/ToastContext';

export default function useAddToCart() {
    const [isAdding, setIsAdding] = useState(false);
    const { showToast } = useToast(); // Toast toàn cục

    const handleAddToCart = (product, onAddCallBack) => {
        setIsAdding(true);

        setTimeout(() => {
            if (typeof onAddCallBack === 'function') {
                onAddCallBack(product);
            }

            setIsAdding(false);
            showToast('Thêm sản phẩm vào giỏ hàng thành công!');
        }, 1000);
    };

    return {
        isAdding,
        handleAddToCart,
    };
}
