import classNames from 'classnames/bind';
import style from './Checkout.module.scss';
import { useState } from 'react';

const cx = classNames.bind(style);

function Checkout() {
    // State để kiểm tra nếu có địa chỉ hay chưa
    const [address, setAddress] = useState('');
    const [isEditing, setIsEditing] = useState(false); // State để kiểm tra nếu đang chỉnh sửa

    // Khi người dùng nhấn "Thêm địa chỉ" hoặc "Thay đổi"
    const handleEditAddress = () => {
        setIsEditing(true);
    };

    // Khi người dùng nhấn "Hủy" trong form chỉnh sửa
    const handleCancel = () => {
        setIsEditing(false);
    };

    // Khi người dùng nhấn "Thành công" trong form chỉnh sửa
    const handleSave = () => {
        const newAddress = document.getElementById('new-address').value;
        setAddress(newAddress);
        setIsEditing(false);
    };

    return (
        <div className={cx('cart__wrapper')}>
            <div className={cx('container')}>
                <div className={cx('address')}>
                    <p>Địa chỉ nhận hàng</p>
                    {address ? (
                        <div>
                            <p>{address}</p>
                            <button onClick={handleEditAddress}>
                                Thay đổi
                            </button>
                        </div>
                    ) : (
                        <div>
                            <p>Chưa có địa chỉ nhận hàng</p>
                            <button onClick={handleEditAddress}>
                                Thêm địa chỉ nhận hàng
                            </button>
                        </div>
                    )}
                </div>

                {/* Form chỉnh sửa địa chỉ xuất hiện khi isEditing là true */}
                {isEditing && (
                    <div className={cx('address-form')}>
                        <div className={cx('form-wrapper')}>
                            <input
                                type="text"
                                id="new-address"
                                placeholder="Nhập địa chỉ mới"
                                defaultValue={address} // Nếu muốn mặc định giá trị cũ
                            />
                            <div>
                                <button onClick={handleCancel}>Hủy</button>
                                <button onClick={handleSave}>Thành công</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Checkout;
