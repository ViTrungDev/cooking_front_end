import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import style from './OrderDetail.module.scss';
import authApi from '~/Api/authApi';
import Loader from '~/Components/Loader/ProgressBar';
import { useLoading } from '~/contexts/LoadingContext';

const cx = classNames.bind(style);

function OrderDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [order, setOrder] = useState(null);
    const { loading, setLoading } = useLoading();

    useEffect(() => {
        const fetchOrderDetail = async () => {
            try {
                setLoading(true);
                const res = await authApi.getOrderById(id);
                setOrder(res.data.order);
            } catch (error) {
                console.error('Lỗi lấy chi tiết đơn hàng:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrderDetail();
    }, [id, setLoading]);

    const handleStatusChange = async (status) => {
        try {
            await authApi.updateOrderStatus(id, { status });
            setOrder((prev) => ({ ...prev, status }));
        } catch (error) {
            console.error('Lỗi cập nhật trạng thái:', error);
        }
    };

    const handleDelete = async () => {
        if (!window.confirm('Bạn có chắc chắn muốn xoá đơn hàng này?')) return;
        try {
            await authApi.deleteOrder(id);
            navigate('/orders');
        } catch (error) {
            console.error('Lỗi xoá đơn hàng:', error);
        }
    };

    const handleApprove = async () => {
        try {
            await authApi.updateOrderStatus(id, { status: 'processing' });
            setOrder((prev) => ({ ...prev, status: 'processing' }));
        } catch (error) {
            console.error('Lỗi duyệt đơn:', error);
        }
    };

    const handleDeliver = async () => {
        try {
            await authApi.updateOrderStatus(id, { status: 'completed' });
            setOrder((prev) => ({ ...prev, status: 'completed' }));
        } catch (error) {
            console.error('Lỗi giao đơn:', error);
        }
    };

    return (
        <div className={cx('order__detail')}>
            {loading ? (
                <Loader />
            ) : order ? (
                <div className={cx('detail__container')}>
                    <h2 className={cx('title')}>Chi tiết đơn hàng #{order.id}</h2>
                    <div className={cx('info')}>
                        <p><strong>Khách hàng:</strong> {order.customerName}</p>
                        <p><strong>Email:</strong> {order.customerEmail}</p>
                        <p><strong>Số điện thoại:</strong> {order.customerPhone}</p>
                        <p><strong>Địa chỉ:</strong> {order.customerAddress}</p>
                        <p><strong>Sản phẩm:</strong> {order.productName}</p>
                        <p><strong>Số lượng:</strong> {order.quantity}</p>
                        <p><strong>Tổng tiền:</strong> {order.totalPrice.toLocaleString('vi-VN')} VND</p>
                        <p><strong>Ngày đặt:</strong> {new Date(order.createdAt).toLocaleString('vi-VN')}</p>
                        <p>
                            <strong>Trạng thái:</strong>{' '}
                            <select
                                value={order.status}
                                onChange={(e) => handleStatusChange(e.target.value)}
                            >
                                <option value="pending">Chờ xử lý</option>
                                <option value="processing">Đang xử lý</option>
                                <option value="completed">Hoàn thành</option>
                                <option value="cancelled">Đã huỷ</option>
                            </select>
                        </p>
                    </div>
                    <div className={cx('actions')}>
                        <button
                            className={cx('btn__back')}
                            onClick={() => navigate('/orders')}
                        >
                            Quay lại
                        </button>

                        {order.status === 'pending' && (
                            <button className={cx('btn__approve')} onClick={handleApprove}>
                                Duyệt đơn
                            </button>
                        )}

                        {order.status === 'processing' && (
                            <button className={cx('btn__deliver')} onClick={handleDeliver}>
                                Giao đơn
                            </button>
                        )}

                        <button
                            className={cx('btn__delete')}
                            onClick={handleDelete}
                        >
                            Xoá đơn hàng
                        </button>
                    </div>
                </div>
            ) : (
                <p className={cx('no-data')}>Không tìm thấy đơn hàng</p>
            )}
        </div>
    );
}

export default OrderDetail;
