import React, { useState } from 'react';
import classNames from 'classnames/bind';
import style from './login.module.scss';
import imgHeader from '~/assets/image/image_header.png';
import star from '~/assets/image/star.png';
import InputField from '../Register/InputField';
import { Link } from 'react-router-dom';
import authApi from '~/Api/authApi';
import { useLoading } from '~/contexts/LoadingContext';

const cx = classNames.bind(style);

function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);
    const { setLoading } = useLoading();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
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

        try {
            const res = await authApi.login(formData);
            console.log(res.data);

            if (res.data) {
                setMessage('Đăng nhập thành công!');
                setIsError(false);

                setFormData({
                    email: '',
                    password: '',
                });

                localStorage.setItem('user', JSON.stringify(res.data.userName));
                localStorage.setItem('isAdmin', res.data.isAdmin);
                sessionStorage.setItem('accessToken', res.data.accessToken);
                // Cài đặt cookie refreshToken
                document.cookie = `refreshToken=${res.data.refreshToken}`;
                console.log(document.cookie); // Kiểm tra cookie trong console

                setTimeout(() => {
                    window.location.href = '/';
                });
            }
        } catch (error) {
            setMessage('Đăng nhập thất bại. Vui lòng thử lại.');
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
                <h2>Đăng nhập</h2>
                <form onSubmit={handleSubmit} className={cx('form')}>
                    <div className={cx('row')}>
                        <InputField
                            name="email"
                            placeholder="Email"
                            type="email"
                            value={formData.email}
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

                    <button type="submit">Đăng nhập</button>

                    <p className={cx('action')}>
                        Chưa có tài khoản?{' '}
                        <Link to="/register" className={cx('link_action')}>
                            Đăng ký
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

export default Login;
