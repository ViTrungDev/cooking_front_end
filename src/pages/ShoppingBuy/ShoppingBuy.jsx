import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './ShoppingBuy.module.scss';
import authApi from '~/Api/authApi';
import BASE_URL from '~/Api/config';

const cx = classNames.bind(styles);

function ShoppingBuy({ className }) {
    const [orders, setOrders] = useState([]);

    const getStatusInVietnamese = (status) => {
        switch (status) {
            case 'pending':
                return 'Đơn hàng mới';
            case 'processing':
                return 'Đang xử lý';
            case 'shipped':
                return 'Đã giao hàng';
            case 'delivered':
                return 'Đã giao';
            case 'cancelled':
                return 'Đã hủy';
            default:
                return 'Không xác định';
        }
    };
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const currentUser = JSON.parse(
                    localStorage.getItem('currentUser'),
                );
                const userId = currentUser?.id;

                if (!userId) return;

                const response = await authApi.shoppingbuy(userId, {});
                const sortedOrders = response.data.sort(
                    (a, b) => new Date(b.order_date) - new Date(a.order_date),
                );
                setOrders(sortedOrders);
            } catch (error) {
                console.error('Lỗi khi lấy đơn hàng:', error);
            }
        };

        fetchOrders();
    }, []);

    const formatCurrency = (num) =>
        Number(num).toLocaleString('vi-VN', {
            style: 'currency',
            currency: 'VND',
        });

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleString('vi-VN');
    };

    return (
        <div className={cx('container', className)}>
            <h2 className={cx('title')}>Lịch sử đơn hàng của bạn</h2>
            {orders.length === 0 ? (
                <p className={cx('empty')}>Bạn chưa có đơn hàng nào.</p>
            ) : (
                orders.map((order) => (
                    <div key={order.id} className={cx('order-card')}>
                        <div className={cx('order-header')}>
                            <div>
                                <strong>Đơn hàng #{order.id}</strong>
                            </div>
                            <div className={cx('order-status')}>
                                Trạng thái:{' '}
                                <span>
                                    {getStatusInVietnamese(order.status)}
                                </span>
                            </div>
                        </div>
                        <div className={cx('order-info')}>
                            <p>
                                <strong>Người nhận:</strong>{' '}
                                {order.customer_name}
                            </p>
                            <p>
                                <strong>SĐT:</strong> {order.phone}
                            </p>
                            <p>
                                <strong>Địa chỉ:</strong> {order.address}
                            </p>
                            <p>
                                <strong>Ngày đặt:</strong>{' '}
                                {formatDate(order.order_date)}
                            </p>
                        </div>
                        <div className={cx('product-list')}>
                            {order.products.map((product, index) => (
                                <div key={index} className={cx('product-item')}>
                                    <img
                                        src={`${BASE_URL}${product.image}`}
                                        alt={product.product_name}
                                        className={cx('product-img')}
                                    />
                                    <div className={cx('product-info')}>
                                        <p className={cx('product-name')}>
                                            {product.product_name}
                                        </p>
                                        <p>Số lượng: {product.quantity}</p>
                                        <p>
                                            Giá: {formatCurrency(product.price)}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className={cx('order-total')}>
                            Tổng tiền:{' '}
                            <strong>
                                {formatCurrency(order.total_amount)}
                            </strong>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}

export default ShoppingBuy;
