import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import style from './ShoppingCart.module.scss';
import Banner_header from '~/assets/image/Banner__header.png';
import { useCart } from '~/contexts/CartContext';
import BASE_URL from '~/Api/config';
import { useState } from 'react';
import star from '~/assets/image/star.png';

const cx = classNames.bind(style);

function ShoppingCard() {
    const { cartItems, removeFromCart, updateQuantity } = useCart();
    const [selectItems, setSelectItems] = useState([]);
    const navigate = useNavigate();

    const handleSelectALL = () => {
        if (selectItems.length === cartItems.length) {
            setSelectItems([]);
        } else {
            setSelectItems(cartItems.map((item) => item.id));
        }
    };
    const handleBuy = () => {
        const selectedProducts = cartItems.filter((item) =>
            selectItems.includes(item.id),
        );

        const encodedData = btoa(JSON.stringify(selectedProducts));
        navigate(`/checkout?state=${encodedData}`);
    };

    const handleCheckBoxChange = (id) => {
        setSelectItems((prev) =>
            prev.includes(id)
                ? prev.filter((itemId) => itemId !== id)
                : [...prev, id],
        );
    };

    const handleDeleteSelected = () => {
        selectItems.forEach((id) => removeFromCart(id));
        setSelectItems([]);
    };

    const totalSelected = cartItems.filter((item) =>
        selectItems.includes(item.id),
    );
    const totalCount = totalSelected.length;
    const totalPrice = totalSelected.reduce(
        (sum, item) => sum + item.quantity * item.price,
        0,
    );

    return (
        <div className={cx('Shopping_cart')}>
            <div className={cx('Shopping_cart--header')}>
                <img src={Banner_header} alt="banner" />
            </div>

            <div className={cx('shopping_cart--content')}>
                <div className={cx('shopping_cart--content__title')}>
                    <h1 className={cx('title')}>GIỎ HÀNG</h1>
                </div>

                <div className={cx('shopping_cart--container')}>
                    <div className={cx('shopping_cart--title')}>
                        <div className={cx('shopping__cart--title__item')}>
                            <p>THÔNG TIN SẢN PHẨM</p>
                            <p>ĐƠN GIÁ</p>
                            <p>SỐ LƯỢNG</p>
                            <p>TỔNG GIÁ</p>
                            <p>HÀNH ĐỘNG</p>
                        </div>
                        <div className={cx('wapper__list')}>
                            {cartItems.length === 0 ? (
                                <p className={cx('empty-cart')}>
                                    Hiện tại chưa có sản phẩm trong giỏ hàng.
                                </p>
                            ) : (
                                cartItems.map((item, index) => (
                                    <div
                                        key={item.id || index}
                                        className={cx('product__item')}
                                    >
                                        <div className={cx('product__info')}>
                                            <div
                                                className={cx(
                                                    'product__checkbox',
                                                )}
                                            >
                                                <input
                                                    type="checkbox"
                                                    checked={selectItems.includes(
                                                        item.id,
                                                    )}
                                                    onChange={() =>
                                                        handleCheckBoxChange(
                                                            item.id,
                                                        )
                                                    }
                                                />
                                            </div>
                                            <div>
                                                <img
                                                    src={
                                                        item.image
                                                            ? `${BASE_URL}${item.image}`
                                                            : '/placeholder.png'
                                                    }
                                                    alt={item.name || 'No name'}
                                                />
                                                <h2>{item.name}</h2>
                                            </div>
                                        </div>
                                        <p>{item.price?.toLocaleString()}đ</p>
                                        <div className={cx('count__wrapper')}>
                                            <div
                                                className={cx('count__action')}
                                            >
                                                <button
                                                    className={cx('btn__minus')}
                                                    onClick={() =>
                                                        updateQuantity(
                                                            item.id,
                                                            item.quantity - 1,
                                                        )
                                                    }
                                                    disabled={
                                                        item.quantity <= 1
                                                    }
                                                >
                                                    -
                                                </button>
                                                <input
                                                    type="number"
                                                    className={cx('count')}
                                                    readOnly
                                                    value={item.quantity}
                                                />
                                                <button
                                                    className={cx('btn__plus')}
                                                    onClick={() =>
                                                        updateQuantity(
                                                            item.id,
                                                            item.quantity + 1,
                                                        )
                                                    }
                                                    disabled={
                                                        item.quantity >= 20
                                                    }
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>

                                        <p>
                                            {(
                                                item.price * item.quantity
                                            )?.toLocaleString()}
                                            đ
                                        </p>

                                        <div className={cx('product__action')}>
                                            <button
                                                onClick={() =>
                                                    removeFromCart(item.id)
                                                }
                                                className={cx('btn__remove')}
                                            >
                                                Xóa
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className={cx('form__buy')}>
                <div className={cx('form__left')}>
                    <div className={cx('wapper__check')}>
                        <div className={cx('product__checkbox')}>
                            <input
                                type="checkbox"
                                onChange={handleSelectALL}
                                checked={
                                    cartItems.length > 0 &&
                                    selectItems.length === cartItems.length
                                }
                            />
                        </div>
                        <label>Chọn tất cả</label>
                    </div>
                    <button onClick={handleDeleteSelected}>Xóa</button>
                </div>
                <div className={cx('buy__right')}>
                    <p>Tổng cộng ( {totalCount} sản phẩm ):</p>
                    <span>{totalPrice.toLocaleString()} VND</span>
                    <button
                        onClick={handleBuy}
                        disabled={selectItems.length === 0}
                    >
                        Mua hàng
                    </button>
                </div>
            </div>
            <div className={cx('footer-section')}>
                <img src={star} alt="star" className={cx('star')} />
                <h2>Bánh ngọt 2024</h2>
                <h3>THREE FAIRIES BAKERY</h3>
            </div>
        </div>
    );
}

export default ShoppingCard;
