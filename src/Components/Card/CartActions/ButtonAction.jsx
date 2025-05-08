import classNames from 'classnames/bind';
import style from './ButtonAction.module.scss';

const cx = classNames.bind(style);
function ButtonAction({ variant = 'pink' }) {
    return (
        <div className={cx('btn__action')}>
            <button className={cx('btn__add-to-cart', variant)}>
                Thêm vào giỏ hàng
            </button>
            <button className={cx('btn__buy-now', variant)}>Mua ngay</button>
        </div>
    );
}
export default ButtonAction;
