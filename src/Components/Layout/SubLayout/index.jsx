import classNames from 'classnames/bind';
import style from './Sub.module.scss';
import Footer from '../Components/Footer';
import logo from '~/assets/image/logo_pk.png';

const cx = classNames.bind(style);
function SubLayout({ children }) {
    return (
        <div className="wapper">
            <div className={cx('header')}>
                <div className={cx('header__container')}>
                    <img alt="logo" src={logo} />
                    <h2>Thanh Toán</h2>
                </div>
            </div>
            <div className={cx('container')}>{children}</div>
            <Footer />
        </div>
    );
}
export default SubLayout;
