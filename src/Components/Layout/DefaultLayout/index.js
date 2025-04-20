import classNames from 'classnames/bind';

import Header from '~/Components/Layout/Components/Header';
import Style from './DefaultLayout.model.scss';
import Footer from '~/Components/Layout/Components/Footer';

const cx = classNames.bind(Style);

function DefaultLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('container')}>{children}</div>
            <Footer />
        </div>
    );
}
export default DefaultLayout;
