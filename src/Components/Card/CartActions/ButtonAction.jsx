import classNames from 'classnames/bind';
import style from './ButtonAction.module.scss';
import useAddToCart from '~/hooks/useAddToCart';
import { useCart } from '~/contexts/CartContext';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(style);

function ButtonAction({ variant = 'pink', product, count, selectedSize }) {
    const { addToCart } = useCart();
    const { isAdding, handleAddToCart } = useAddToCart();
    const navigate = useNavigate();

    const handleToBuy = (e, product) => {
        e.preventDefault();
        e.stopPropagation();
        const size = selectedSize || 19;
        const quantity = count || 1;
        const itemToBuy = [
            {
                ...product,
                size,
                quantity,
            },
        ];
        const encodedData = btoa(JSON.stringify(itemToBuy)); // ✅ Mã hóa đúng chuẩn Base64
        navigate(`/checkout?state=${encodedData}`);
    };

    const handleAddClick = () => {
        if (!product) {
            console.warn('Không có sản phẩm để thêm!');
            return;
        }

        const finalSize = selectedSize || '19';
        const finalCount = count || 1;

        const sizePriceOffset = {
            19: 0,
            21: 10000,
            25: 20000,
        };

        const finalProduct = {
            ...product,
            size: finalSize,
            quantity: finalCount,
            price: product.price + (sizePriceOffset[finalSize] || 0),
        };

        handleAddToCart(finalProduct, (finalProductWithExtras) => {
            addToCart(finalProductWithExtras);
            console.log('Đã thêm sản phẩm:', finalProductWithExtras);
        });
    };

    return (
        <div className={cx('btn__action')}>
            <button
                className={cx('btn__add-to-cart', variant)}
                onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    handleAddClick();
                }}
                disabled={isAdding}
            >
                {isAdding ? 'Đang thêm...' : 'Thêm vào giỏ hàng'}
            </button>

            <button
                className={cx('btn__buy-now', variant)}
                onClick={(e) => handleToBuy(e, product)}
            >
                Mua ngay
            </button>
        </div>
    );
}

export default ButtonAction;
