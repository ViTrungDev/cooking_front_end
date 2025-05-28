import React from 'react';
import classNames from 'classnames/bind';
import styles from './ComfirmModel.module.scss';

const cx = classNames.bind(styles);

function ConfirmModal({ message, onConfirm, onCancel }) {
    return (
        <div className={cx('overlay')}>
            <div className={cx('modal')}>
                <p className={cx('message')}>{message}</p>
                <div className={cx('actions')}>
                    <button
                        className={cx('btn', 'confirm')}
                        onClick={onConfirm}
                    >
                        Xác nhận
                    </button>
                    <button className={cx('btn', 'cancel')} onClick={onCancel}>
                        Huỷ
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ConfirmModal;
