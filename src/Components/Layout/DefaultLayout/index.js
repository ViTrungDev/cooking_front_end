import classNames from 'classnames/bind';
import React from 'react';
import Header from '~/Components/Layout/Components/Header';
import Style from './DefaultLayout.model.scss';
import Footer from '~/Components/Layout/Components/Footer';
import Loader from '~/Components/Loader/ProgressBar'; // <-- dùng Loader
import { useLoading } from '~/contexts/LoadingContext';

const cx = classNames.bind(Style);

function DefaultLayout({ children }) {
    const { loading } = useLoading();

    return (
        <div className={cx('wrapper')}>
            {loading && <Loader />}
            <Header />
            <div className={cx('container')}>{children}</div>
            <Footer />
        </div>
    );
}

export default DefaultLayout;
