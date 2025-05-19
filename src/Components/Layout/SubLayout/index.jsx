import classNames from 'classnames/bind';
import style from './Sub.module.scss';
import Footer from '../Components/Footer';
import logo from '~/assets/image/logo_pk.png';
import { Link } from 'react-router-dom';

const cx = classNames.bind(style);
function SubLayout({ children }) {
    return (
        <div className="wapper">
            <div className={cx('header')}>
                <div className={cx('header__container')}>
                    <Link to="/">
                        <img alt="logo" src={logo} />
                    </Link>
                    <h2>Thanh Toán</h2>
                </div>
            </div>
            <div className={cx('container')}>{children}</div>
            <Footer />
        </div>
    );
}
export default SubLayout;
