import classNames from 'classnames/bind';
import style from './Manage.module.scss';
import logo from '~/assets/image/logo_pk.png';
import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

const cx = classNames.bind(style);
function Manage({ children }) {
    const [activeIndex, setActiveIndex] = useState(0);

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const useName = currentUser ? currentUser.userName : 'user';
    const navItems = useMemo(
        () => [
            { title: 'Bảng điều khiển', path: '/admin' },
            { title: 'Quản lý người dùng', path: '/manage/user' },
            { title: 'Quản lý sản phẩm', path: '/manage/product' },
            { title: 'Quản lý đơn hàng', path: '/manage/order' },
            { title: 'Quản lý bài viết', path: '/manage/blogs' },
            { title: 'Thống kê', path: '/manage/statistic' },
            { title: 'Cài đặt', path: '/manage/setting' },
            { title: 'Đăng xuất', path: '/logout' },
        ],
        [],
    );
    useEffect(() => {
        const index = navItems.findIndex(
            (item) => item.path === window.location.pathname,
        );
        setActiveIndex(index !== -1 ? index : 0);
    }, [navItems]);
    const handleIndex = (index) => {
        setActiveIndex(index);
    };
    return (
        <nav className={cx('manage')}>
            <div className={cx('manage__container')}>
                <div className={cx('image')}>
                    <img src={logo} alt="logo" />
                </div>
                <h2 className={cx('title')}>QUẢN LÝ</h2>
                <div className={cx('manage__nav')}>
                    <ul className={cx('nav__list')}>
                        {navItems.map((item, index) => (
                            <li key={index}>
                                <Link
                                    to={item.path}
                                    className={cx('nav__item', {
                                        active: activeIndex === index,
                                    })}
                                    onClick={() => handleIndex(index)}
                                >
                                    {item.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className={cx('manage__right')}>
                <div className={cx('manage__user')}>
                    <h3>Hello {useName} 👋🏼,</h3>
                    <Link to="/">
                        <h3 className={cx('active')}>Về trang chủ</h3>
                    </Link>
                </div>
                <div className={cx('manage__children')}>{children}</div>
            </div>
        </nav>
    );
}
export default Manage;
