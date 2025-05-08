import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import logo from '~/assets/image/logo_pk.png';
import corf from '~/assets/icon/corf.png';
import { Link } from 'react-router-dom';
import Home from '~/pages/Home';

const cx = classNames.bind(styles);

function Header() {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const [saveName, setSaveName] = useState('');

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            setSaveName(user);
        }
    }, []);

    const menuItems = [
        'Trang chủ',
        'Bánh sinh nhật',
        'Bánh mỳ & bánh mặn',
        'Cookies & minicake',
        'Khuyến mại',
    ];

    const handleToggleMenu = () => {
        setMobileMenuOpen(!isMobileMenuOpen);
    };

    const handleCloseMenu = () => {
        setMobileMenuOpen(false);
    };
    const handleSelectItem = (index) => {
        setActiveIndex(index);
        setMobileMenuOpen(false); // Đóng menu khi chọn một mục
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
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className={cx('nav__right')}>
                    <div className={cx('nav__list--corf')}>
                        <img src={corf} alt="Giỏ hàng" />
                        {saveName ? (
                            <p className={cx('user')}>
                                <Link to="/login" className={cx('user_Name')}>
                                    Xin chào {saveName}
                                </Link>
                            </p>
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
