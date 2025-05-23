import React, { useState } from 'react';
import classNames from 'classnames/bind';
import style from './register.module.scss';
import imgHeader from '~/assets/image/image_header.png';
import star from '~/assets/image/star.png';
import InputField from './InputField';
import { Link } from 'react-router-dom';
import authApi from '~/Api/authApi';
import { useLoading } from '~/contexts/LoadingContext';

const cx = classNames.bind(style);

function Register() {
    const { setLoading } = useLoading();
    const [showPassword, setShowPassword] = useState(false);
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false); // Thêm để style thông báo
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        // Kiểm tra mật khẩu nhập lại
        if (formData.password !== formData.confirmPassword) {
            setMessage('Mật khẩu không khớp!');
            setIsError(true);
            return;
        }
        const username = `${formData.lastName} ${formData.firstName}`.trim();

        // Dữ liệu gửi đi phù hợp với API
        const dataToSend = {
            Username: username,
            Password: formData.password,
            Email: formData.email,
        };

        try {
            // Gọi API đăng ký
            const res = await authApi.register(dataToSend);
            setMessage('Đăng ký thành công!');
            setIsError(false);
            console.log(res.data);
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                password: '',
                confirmPassword: '',
            });
            window.location.href = '/login';
        } catch (error) {
            setMessage('Đăng ký thất bại. Vui lòng thử lại.');
            setIsError(true);
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={cx('container')}>
            <div className={cx('content__header')}>
                <img src={imgHeader} alt="imgHeader" />
                <h1>Tài khoản</h1>
            </div>

            <div className={cx('centent')}>
                <h2>Đăng ký</h2>
                <form onSubmit={handleSubmit} className={cx('form')}>
                    <div className={cx('row')}>
                        <InputField
                            name="firstName"
                            placeholder="Họ"
                            value={formData.firstName}
                            onChange={handleChange}
                        />
                        <InputField
                            name="lastName"
                            placeholder="Tên"
                            value={formData.lastName}
                            onChange={handleChange}
                        />
                    </div>

                    <div className={cx('row')}>
                        <InputField
                            name="email"
                            placeholder="Email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        <InputField
                            name="phone"
                            placeholder="Số điện thoại"
                            value={formData.phone}
                            onChange={handleChange}
                        />
                    </div>

                    <div className={cx('row', 'full')}>
                        <InputField
                            name="password"
                            placeholder="Mật khẩu"
                            type={showPassword ? 'text' : 'password'}
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>

                    <div className={cx('row', 'full')}>
                        <InputField
                            name="confirmPassword"
                            placeholder="Nhập lại mật khẩu"
                            type={showPassword ? 'text' : 'password'}
                            value={formData.confirmPassword}
                            onChange={handleChange}
                        />
                    </div>

                    <label className={cx('show-password')}>
                        <input
                            type="checkbox"
                            onChange={toggleShowPassword}
                            checked={showPassword}
                        />
                        Hiển thị mật khẩu
                    </label>

                    {message && (
                        <p
                            className={cx(
                                'message',
                                isError ? 'error' : 'success',
                            )}
                        >
                            {message}
                        </p>
                    )}

                    <button type="submit">Đăng ký</button>

                    <p className={cx('action')}>
                        Đã có tài khoản?{' '}
                        <Link to="/login" className={cx('link_action')}>
                            Đăng nhập
                        </Link>
                    </p>
                </form>
                <div className={cx('footer-section')}>
                    <img src={star} alt="star" className={cx('star')} />
                    <h2>Bánh ngọt 2024</h2>
                    <h3>THREE FAIRIES BAKERY</h3>
                </div>
            </div>
        </div>
    );
}

export default Register;
