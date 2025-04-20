import React from 'react';
import style from './style.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(style);
const Loader = () => {
    return (
        <div className={cx('js-preloader')}>
            <div className={cx('preloader-inner')}>
                <span className={cx('dot')} />
                <div className={cx('dots')}>
                    <span />
                    <span />
                    <span />
                </div>
            </div>
        </div>
    );
};

export default Loader;
