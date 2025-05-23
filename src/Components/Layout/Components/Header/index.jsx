import { useEffect, useMemo, useState } from 'react';
import Cookies from 'js-cookie';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import logo from '~/assets/image/logo_pk.png';
import corf from '~/assets/icon/corf.png';
import { Link, useLocation } from 'react-router-dom';
import Home from '~/pages/Home';
import { useCart } from '~/contexts/CartContext';

const cx = classNames.bind(styles);

function Header() {
    const { cartCount } = useCart();
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const [saveName, setSaveName] = useState('');
    const [show, setShow] = useState(false);
    const location = useLocation();

    const [hovering, setHovering] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('cartItems');
        localStorage.removeItem('isAdmin');
        sessionStorage.removeItem('accessToken');
        sessionStorage.removeItem('email');
        Cookies.remove('refreshToken');

        window.location.href = '/login';
    };

    const handleMouseEnter = () => {
        setHovering(true);
    };

    const handleMouseLeave = () => {
        setHovering(false);
    };

    const handleShow = () => {
        if (show === true) {
            setShow(false);
        } else {
            setShow(true);
        }
    };
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('currentUser'));
        if (user) {
            setSaveName(user);
        }
    }, []);
    const username = saveName?.userName;
    const menuItems = useMemo(
        () => [
            { label: 'Trang chủ', path: '/' },
            { label: 'Bánh sinh nhật', path: '/banh-sinh-nhat' },
            { label: 'Bánh mỳ & bánh mặn', path: '/banh-man' },
            { label: 'Cookies & minicake', path: '/cookies-minicake' },
            { label: 'Khuyến mại', path: '/khuyen-mai' },
        ],
        [],
    );
    const menuUser = [
        { label: 'Trang cá nhân', path: '/profile' },
        { label: 'Đơn mua', path: '/shopping-buy' },
        { label: 'Đăng xuất', path: '/logout' },
    ];

    const handleToggleMenu = () => {
        setMobileMenuOpen(!isMobileMenuOpen);
    };

    const handleCloseMenu = () => {
        setMobileMenuOpen(false);
    };
    useEffect(() => {
        const index = menuItems.findIndex(
            (item) => item.path === location.pathname,
        );
        setActiveIndex(index !== -1 ? index : 0);
    }, [location.pathname, menuItems]);
    const handleSelectItem = (index) => {
        setActiveIndex(index);
        setMobileMenuOpen(false);
    };

    return (
        <header className={cx('wrapper')}>
            <nav className={cx('navbar')}>
                <div className={cx('navbar__image')}>
                    <Link to="/">
                        <img src={logo} alt="Logo" />
                    </Link>
                </div>
                <div
                    className={cx('mobile-menu-toggle')}
                    onClick={handleToggleMenu}
                >
                    ☰
                </div>
                {/* Menu chính */}
                <div>
                    <ul className={cx('nav__item')}>
                        {menuItems.map((item, index) => (
                            <li
                                key={index}
                                className={cx({
                                    action: activeIndex === index,
                                })}
                                onClick={() => handleSelectItem(index)}
                            >
                                <Link
                                    to={item.path}
                                    className={cx('nav__link')}
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className={cx('nav__right')}>
                    <div className={cx('nav__list--corf')}>
                        <Link to="/shopping-cart">
                            <div className={cx('nav__list--corf--icon')}>
                                <img src={corf} alt="Giỏ hàng" />
                                <p className={cx('nav__list--corf--number')}>
                                    {cartCount}
                                </p>
                            </div>
                        </Link>

                        {saveName ? (
                            <div className={cx('user')}>
                                <div
                                    className={cx('user_Name')}
                                    onClick={handleShow}
                                    onMouseEnter={handleMouseEnter}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    Xin chào {username}
                                </div>
                                {(show || hovering) && (
                                    <div className={cx('userName_active')}>
                                        <div className={cx('use_ac')}></div>
                                        <ul className={cx('user_list')}>
                                            {menuUser.map((items, index) => (
                                                <li
                                                    key={index}
                                                    className={cx('list__item')}
                                                >
                                                    {items.label ===
                                                    'Đăng xuất' ? (
                                                        <span
                                                            onClick={
                                                                handleLogout
                                                            }
                                                            className={cx(
                                                                'logout-btn',
                                                            )}
                                                        >
                                                            {items.label}
                                                        </span>
                                                    ) : (
                                                        <Link to={items.path}>
                                                            {items.label}
                                                        </Link>
                                                    )}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <p className={cx('user')}>
                                <Link to="/login">Đăng nhập</Link>
                            </p>
                        )}
                    </div>
                </div>

                {/* Nav dọc trên mobile */}
                {isMobileMenuOpen && (
                    <div className={cx('mobile-nav')}>
                        <div
                            className={cx('close-btn')}
                            onClick={handleCloseMenu}
                        >
                            ❌
                        </div>
                        <ul>
                            <Link to={Home}>Trang chủ</Link>
                            <li>Bánh sinh nhật</li>
                            <li>Bánh mỳ & bánh mặn</li>
                            <li>Cookies & minicake</li>
                            <li>Khuyến mại</li>
                        </ul>
                    </div>
                )}
            </nav>
        </header>
    );
}

export default Header;
