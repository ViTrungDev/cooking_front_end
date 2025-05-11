import classNames from 'classnames/bind';
import style from './ButtonAction.module.scss';
import useAddToCart from '~/hooks/useAddToCart';
import { useCart } from '~/contexts/CartContext';

const cx = classNames.bind(style);

function ButtonAction({ variant = 'pink', product }) {
    const { addToCart } = useCart();
    const { isAdding, handleAddToCart } = useAddToCart();

    const handleAddClick = () => {
        if (!product) {
            console.warn('Không có sản phẩm để thêm!');
            return;
        }
        addToCart(product);
        handleAddToCart((e) => {
            console.log('Đã thêm sản phẩm:', product);
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

            <button className={cx('btn__buy-now', variant)}>Mua ngay</button>
        </div>
    );
}

export default ButtonAction;
