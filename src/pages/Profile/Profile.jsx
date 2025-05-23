import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import style from './Profile.module.scss';
import authApi from '~/Api/authApi';
import BASE_URL from '~/Api/config';
import ShoppingBuy from '../ShoppingBuy/ShoppingBuy';

const cx = classNames.bind(style);

function Profile() {
    const [user, setUser] = useState(null);
    const [selectedTab, setSelectedTab] = useState('info');
    const [formData, setFormData] = useState({
        UserName: '',
        Phone: '',
        Address: '',
        Avatar: '',
    });
    const [isEditing, setIsEditing] = useState(false);
    const [previewAvatar, setPreviewAvatar] = useState(null);

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const isAdmin = JSON.parse(localStorage.getItem('isAdmin')) === true;

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userId = currentUser?.id;
                if (!userId) return;

                const response = await authApi.profile(userId);
                const data = response.data;
                setUser(data);
                setFormData({
                    UserName: data.userName || '',
                    Phone: data.phone || '',
                    Address: data.address || '',
                    Avatar: '',
                });
            } catch (error) {
                console.error('Lỗi khi lấy thông tin người dùng:', error);
            }
        };

        fetchUser();
    }, [currentUser?.id]);

    if (!user) {
        return <div className={cx('loading')}>Đang tải thông tin...</div>;
    }

    const avatarUrl = previewAvatar
        ? URL.createObjectURL(previewAvatar)
        : user.avatar
        ? `${BASE_URL}${user.avatar}`
        : '/images/default-avatar.png';

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData((prev) => ({ ...prev, Avatar: file }));
            setPreviewAvatar(file);
        }
    };

    const handleSubmit = async () => {
        try {
            const updateData = new FormData();
            if (formData.UserName)
                updateData.append('UserName', formData.UserName);
            if (formData.Phone) updateData.append('Phone', formData.Phone);
            if (formData.Address)
                updateData.append('Address', formData.Address);
            if (formData.Avatar && typeof formData.Avatar !== 'string') {
                updateData.append('Avatar', formData.Avatar);
            }

            await authApi.updateProfile(currentUser.id, updateData);
            setIsEditing(false);
            window.location.reload();
        } catch (error) {
            console.error('Lỗi khi cập nhật hồ sơ:', error);
        }
    };

    return (
        <div className={cx('profile-wrapper')}>
            <div className={cx('sidebar')}>
                <h3>Menu</h3>
                <ul>
                    <li
                        className={cx({ active: selectedTab === 'info' })}
                        onClick={() => setSelectedTab('info')}
                    >
                        Trang cá nhân
                    </li>
                    <li
                        className={cx({ active: selectedTab === 'orders' })}
                        onClick={() => setSelectedTab('orders')}
                    >
                        Lịch sử mua hàng
                    </li>
                    {isAdmin && (
                        <li onClick={() => (window.location.href = '/admin')}>
                            Chuyển qua trang admin
                        </li>
                    )}
                </ul>
            </div>

            <div className={cx('content')}>
                {selectedTab === 'info' && (
                    <div className={cx('profile-card')}>
                        <div className={cx('profile-title')}>
                            <h3>Thông tin cá nhân</h3>
                            <p>
                                Quản lý thông tin cá nhân để bảo mật tài khoản
                            </p>
                        </div>
                        <div className={cx('profile-content')}>
                            <div className={cx('avatar-overlay')}>
                                <div className={cx('info')}>
                                    <h2 className={cx('name')}>
                                        Tên:{' '}
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                name="UserName"
                                                value={formData.UserName}
                                                onChange={handleInputChange}
                                                className={cx('name-value')}
                                            />
                                        ) : (
                                            <span className={cx('name-value')}>
                                                {user.userName || 'Chưa có tên'}
                                            </span>
                                        )}
                                    </h2>
                                    <p>
                                        <strong>Email:</strong>{' '}
                                        {user.email || 'Chưa có email'}
                                    </p>
                                    <p>
                                        <strong>SĐT:</strong>{' '}
                                        {isEditing ? (
                                            <input
                                                className={cx(
                                                    'name-value__input',
                                                )}
                                                type="text"
                                                name="Phone"
                                                value={formData.Phone}
                                                onChange={handleInputChange}
                                            />
                                        ) : (
                                            user.phone ||
                                            'Chưa có số điện thoại'
                                        )}
                                    </p>
                                    <p>
                                        <strong>Địa chỉ:</strong>{' '}
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                name="Address"
                                                value={formData.Address}
                                                onChange={handleInputChange}
                                                className={cx(
                                                    'name-value__input',
                                                )}
                                            />
                                        ) : (
                                            user.address || 'Chưa có địa chỉ'
                                        )}
                                    </p>
                                </div>
                                {isEditing ? (
                                    <button
                                        className={cx('edit-button')}
                                        onClick={handleSubmit}
                                    >
                                        Lưu thay đổi
                                    </button>
                                ) : (
                                    <button
                                        className={cx('edit-button')}
                                        onClick={() => setIsEditing(true)}
                                    >
                                        Chỉnh sửa hồ sơ
                                    </button>
                                )}
                            </div>
                            <div className={cx('profile-description')}>
                                <img
                                    src={avatarUrl}
                                    alt="avatar"
                                    className={cx('avatar')}
                                />
                                <label
                                    htmlFor="avatarUpload"
                                    className={cx('change-avatar-button')}
                                >
                                    Thay đổi ảnh đại diện
                                </label>
                                <input
                                    type="file"
                                    id="avatarUpload"
                                    style={{ display: 'none' }}
                                    accept="image/png"
                                    onChange={handleAvatarChange}
                                />
                                <p className={cx('desc')}>
                                    <span>Dung lượng tối đa 1 MB</span>
                                    <span>Định dạng: PNG</span>
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {selectedTab === 'orders' && (
                    <div className={cx('order-history')}>
                        <ShoppingBuy className={cx('order-history__child')} />
                    </div>
                )}
            </div>
        </div>
    );
}

export default Profile;
