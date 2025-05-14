import classNames from 'classnames/bind';
import style from './Checkout.module.scss';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import BASE_URL from '~/Api/config';
import authApi from '~/Api/authApi';

const cx = classNames.bind(style);
function Checkout() {
    const navigate = useNavigate();
    const location = useLocation();
    const [cartItems, setCartItems] = useState([]);
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [name, setName] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    const SHIPPING_FEE = 45000;

    const handlePlaceOrder = async () => {
        if (!name || !phone || !address) {
            console.log('Vui lòng nhập đủ thông tin');
            return;
        }

        const user = JSON.parse(localStorage.getItem('currentUser'));
        const userId = user?.id;
        const cartKey = `cartItems_${userId}`;
        const storedCart = JSON.parse(localStorage.getItem(cartKey)) || [];

        const orderData = {
            customer_name: name,
            phone,
            address,
            details: cartItems.map((item) => ({
                product_id: item.id,
                size: parseInt(item.size),
                quantity: item.quantity,
                price: item.price,
            })),
        };

        try {
            const response = await authApi.checkout(orderData);

            if (response.status === 200 || response.status === 201) {
                console.log('✅ Đặt hàng thành công!');

                const remainingItems = storedCart.filter(
                    (item) =>
                        !orderData.details.some(
                            (ordered) =>
                                ordered.product_id === item.id &&
                                ordered.size === parseInt(item.size),
                        ),
                );

                localStorage.setItem(cartKey, JSON.stringify(remainingItems));
                setCartItems(remainingItems);
                setTimeout(() => {
                    navigate('/shopping-cart', { state: { reload: true } });
                }, 100);
            } else {
                console.error('Đặt hàng thất bại:', response);
            }
        } catch (error) {
            console.error('Lỗi khi đặt hàng:', error);
        }
    };

    // Tính tổng tiền hàng
    const totalProductPrice = cartItems.reduce((total, item) => {
        return total + item.price * item.quantity;
    }, 0);

    // Tổng thanh toán = tiền hàng + ship
    const totalPayment = totalProductPrice + SHIPPING_FEE;

    // Giải mã dữ liệu từ URL
    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const encodedData = queryParams.get('state');

        if (encodedData) {
            try {
                const decodedData = atob(encodedData); // Giải mã Base64
                const items = JSON.parse(decodedData); // Chuyển đổi chuỗi JSON thành mảng đối tượng
                setCartItems(items); // Lưu vào state
            } catch (error) {
                console.error('Error decoding cart items:', error);
            }
        }
    }, [location.search]);

    // Các hàm xử lý địa chỉ
    const handleEditAddress = () => {
        setIsEditing(true);
    };

    const handleCancel = () => {
        setIsEditing(false);
    };

    const handleSave = () => {
        const newAddress = document.getElementById('new-address').value;
        const newPhone = document.getElementById('new-phone').value;
        const newName = document.getElementById('new-name').value;
        setAddress(newAddress);
        setName(newName);
        setPhone(newPhone);
        setIsEditing(false);
    };

    return (
        <div className={cx('cart__wrapper')}>
            <div className={cx('container')}>
                <div className={cx('address__position')}></div>
                <div className={cx('address')}>
                    <p className={cx('address__desc')}>Địa chỉ nhận hàng</p>
                    {address ? (
                        <div className={cx('address_item')}>
                            <div className={cx('out__address')}>
                                <p className={cx('out__address--desc')}>
                                    {name}
                                </p>
                                <p className={cx('out__address--desc')}>
                                    {phone}
                                </p>
                                <p>{address}</p>
                            </div>
                            <button onClick={handleEditAddress}>
                                Thay đổi
                            </button>
                        </div>
                    ) : (
                        <div className={cx('address_item')}>
                            <p>Chưa có địa chỉ nhận hàng</p>
                            <button
                                className={cx('btn__action')}
                                onClick={handleEditAddress}
                            >
                                Thêm địa chỉ nhận hàng
                            </button>
                        </div>
                    )}
                </div>

                {/* Form chỉnh sửa địa chỉ */}
                {isEditing && (
                    <div className={cx('address-form')}>
                        <div className={cx('form-wrapper')}>
                            <div>
                                <input
                                    type="text"
                                    id="new-name"
                                    placeholder="Nhập tên"
                                    defaultValue={name}
                                />
                                <input
                                    type="text"
                                    id="new-phone"
                                    placeholder="Nhập số điện thoại"
                                    defaultValue={phone}
                                />
                            </div>
                            <input
                                type="text"
                                id="new-address"
                                placeholder="Tỉnh/Thành Phố, Quận/Huyện, Phường/Xã"
                                defaultValue={address}
                            />
                            <textarea
                                placeholder="Địa chỉ chi tiết"
                                className={cx('textArea')}
                                defaultValue={address}
                            />
                            <div>
                                <button
                                    className={cx('btn__action')}
                                    onClick={handleCancel}
                                >
                                    Hủy
                                </button>
                                <button
                                    className={cx('btn__action')}
                                    onClick={handleSave}
                                >
                                    Thành công
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Hiển thị các sản phẩm */}
                <div className={cx('checkout__main')}>
                    <p>Sản phẩm</p>
                    <p>Đơn giá</p>
                    <p>Số lượng</p>
                    <p>Thành tiền</p>
                </div>
                <div className={cx('check__main--product')}>
                    {cartItems.length > 0 ? (
                        <ul className={cx('checkout-cart')}>
                            {cartItems.map((item) => (
                                <li className={cx('cart__list')} key={item.id}>
                                    <div className={cx('wapper-cart')}>
                                        <img
                                            src={`${BASE_URL}${item.image}`}
                                            alt={item.name}
                                        />
                                        <p>{item.name}</p>
                                        <p
                                            className={cx('size')}
                                        >{`Size: ${item.size}`}</p>
                                    </div>
                                    <p>{item.price?.toLocaleString()} VND</p>
                                    <p>{item.quantity}</p>
                                    <p>
                                        {(
                                            item.price * item.quantity
                                        )?.toLocaleString()}
                                        VND
                                    </p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>Không có sản phẩm trong giỏ hàng</p>
                    )}
                </div>
                <div className={cx('checkout_buy')}>
                    <h3>Phương thức thanh toán</h3>
                    <div className={cx('checkout__items')}>
                        <input
                            type="radio"
                            id="ThanhToan1"
                            name="ThanhToan"
                            value="COD"
                            defaultChecked
                        />
                        <label htmlFor="ThanhToan1">
                            Thanh Toán khi nhận hàng
                        </label>
                    </div>
                    <div className={cx('checkout__items')}>
                        <input
                            type="radio"
                            id="ThanhToan2"
                            name="ThanhToan"
                            value="CreditCard"
                            disabled
                        />
                        <label htmlFor="ThanhToan2">Thẻ Tín dụng/Ghi nợ</label>
                    </div>
                    <div className={cx('checkout__items')}>
                        <input
                            type="radio"
                            id="ThanhToan3"
                            name="ThanhToan"
                            value="GooglePay"
                            disabled
                        />
                        <label htmlFor="ThanhToan3">Google Pay</label>
                    </div>
                </div>
                <div className={cx('checkout__price')}>
                    <div className={cx('check__price--item')}>
                        <div className={cx('price__All', 'price')}>
                            <p>Tổng tiền hàng</p>
                            <p>{totalProductPrice.toLocaleString()} VND</p>
                        </div>
                        <div className={cx('price__Ship', 'price')}>
                            <p>Tổng tiền phí vận chuyển</p>
                            <p>{SHIPPING_FEE.toLocaleString()} VND</p>
                        </div>
                        <div className={cx('all_buy', 'price')}>
                            <p>Tổng thanh toán</p>
                            <p className={cx('totalPay')}>
                                {totalPayment.toLocaleString()} VND
                            </p>
                        </div>
                    </div>
                </div>
                <div className={cx('action__buy')}>
                    <p>
                        Khi nhấn 'Đặt hàng', bạn đã xác nhận rằng bạn đồng ý với{' '}
                        <Link to="#" className={cx('Link')}>
                            Điều khoản
                        </Link>{' '}
                        Three Fairies Bakery của Three Fairies Bakery
                    </p>
                    <button
                        onClick={handlePlaceOrder}
                        className={cx('btn__action--buy')}
                    >
                        Đặt hàng
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Checkout;
