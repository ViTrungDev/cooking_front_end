import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import style from './EditUserForm.module.scss';

const cx = classNames.bind(style);

function EditUserForm({ user, onSave, onCancel }) {
    const [userName, setUserName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');

    // Khi user thay đổi, cập nhật state form
    useEffect(() => {
        if (user) {
            setUserName(user.userName || '');
            setPhone(user.phone || '');
            setEmail(user.email || '');
            setAddress(user.address || '');
        }
    }, [user]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({
            ...user,
            userName,
            phone,
            email,
            address,
        });
    };

    if (!user) return null; // Không hiện gì nếu không có user

    return (
        <div className={cx('modal')}>
            <div className={cx('modal-content')}>
                <h3>Chỉnh sửa người dùng</h3>
                <form onSubmit={handleSubmit} className={cx('edit-form')}>
                    <label>
                        Tên người dùng:
                        <input
                            type="text"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Số điện thoại:
                        <input
                            type="text"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </label>
                    <label>
                        Email:
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </label>
                    <label>
                        Địa chỉ:
                        <textarea
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </label>
                    <div className={cx('form-actions')}>
                        <button type="submit" className={cx('btn-save')}>
                            Lưu
                        </button>
                        <button
                            type="button"
                            className={cx('btn-cancel')}
                            onClick={onCancel}
                        >
                            Huỷ
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditUserForm;
