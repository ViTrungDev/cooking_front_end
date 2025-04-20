import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import logo from '~/assets/image/logo_pk.png';
import corf from '~/assets/icon/corf.png';

const cx = classNames.bind(styles);

function Header() {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleToggleMenu = () => {
        setMobileMenuOpen(!isMobileMenuOpen);
    };

    const handleCloseMenu = () => {
        setMobileMenuOpen(false);
    };

    return (
        <header className={cx('wrapper')}>
            <nav className={cx('navbar')}>
                <div className={cx('navbar__image')}>
                    <img src={logo} alt="Logo" />
                </div>
                {/* Icon ☰ hiển thị trên mobile */}
                <div className={cx('mobile-menu-toggle')} onClick={handleToggleMenu}>
                    ☰
                </div>
                {/* Menu chính */}
                <div>
                    <ul className={cx('nav__item')}>
                        <li className={cx('action')}>Trang chủ</li>
                        <li>Bánh sinh nhật</li>
                        <li>Bánh mỳ & bánh mặn</li>
                        <li>Cookies & minicake</li>
                        <li>Khuyến mại</li>
                    </ul>
                </div>

                <div className={cx('nav__right')}>
                    <div className={cx('nav__list--corf')}>
                        <img src={corf} alt="Giỏ hàng" />
                        <p className={cx('user')}>Đăng nhập</p>
                    </div>
                </div>

                {/* Nav dọc trên mobile */}
                {isMobileMenuOpen && (
                    <div className={cx('mobile-nav')}>
                        <div className={cx('close-btn')} onClick={handleCloseMenu}>
                            ❌
                        </div>
                        <ul>
                            <li>Trang chủ</li>
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
