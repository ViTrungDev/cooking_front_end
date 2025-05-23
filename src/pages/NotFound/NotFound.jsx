import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NotFound.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function NotFound() {
    return (
        <div className={cx('not-found')}>
            <div className={cx('content')}>
                <h1>404</h1>
                <h2>Ôi không! Trang không tồn tại 😢</h2>
                <p>
                    Rất tiếc, trang bạn đang tìm kiếm không tồn tại hoặc đã bị
                    xóa.
                </p>
                <Link to="/" className={cx('home-button')}>
                    Quay về trang chủ
                </Link>
            </div>
        </div>
    );
}

export default NotFound;
