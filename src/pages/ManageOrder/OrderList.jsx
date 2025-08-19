import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import style from './OrderList.module.scss';
import authApi from '~/Api/authApi';
import Loader from '~/Components/Loader/ProgressBar';
import { useLoading } from '~/contexts/LoadingContext';

const cx = classNames.bind(style);

function OrderList() {
    const [orders, setOrders] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const { loading, setLoading } = useLoading();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                setLoading(true);
                const res = await authApi.getAllOrder();
                setOrders(res.data.orders || []);
            } catch (error) {
                console.error('Lỗi lấy danh sách đơn hàng:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, [setLoading]);

    const handleDelete = async (id) => {
        if (!window.confirm('Bạn có chắc chắn muốn xoá đơn hàng này?')) return;
        try {
            await authApi.deleteOrder(id);
            setOrders((prev) => prev.filter((order) => order.id !== id));
        } catch (error) {
            console.error('Lỗi xoá đơn hàng:', error);
        }
    };

    const handleApprove = async (id) => {
        try {
            await authApi.updateOrderStatus(id, { status: 'processing' });
            setOrders((prev) =>
                prev.map((order) =>
                    order.id === id ? { ...order, status: 'processing' } : order
                )
            );
        } catch (error) {
            console.error('Lỗi duyệt đơn:', error);
        }
    };

    const handleDeliver = async (id) => {
        try {
            await authApi.updateOrderStatus(id, { status: 'completed' });
            setOrders((prev) =>
                prev.map((order) =>
                    order.id === id ? { ...order, status: 'completed' } : order
                )
            );
        } catch (error) {
            console.error('Lỗi giao đơn:', error);
        }
    };

    // Lọc đơn hàng theo từ khóa
    const filteredOrders = orders.filter(
        (order) =>
            order.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.id.toString().includes(searchTerm)
    );

    return (
        <div className={cx('order__list')}>
            <h2 className={cx('title')}>Quản lý đơn hàng</h2>

            {/* Ô tìm kiếm */}
            <div className={cx('searchBox')}>
                <input
                    type="text"
                    placeholder="🔍 Tìm kiếm theo tên hoặc ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {loading ? (
                <Loader />
            ) : filteredOrders.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Khách hàng</th>
                            <th>Tổng tiền</th>
                            <th>Trạng thái</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredOrders.map((order) => (
                            <tr key={order.id}>
                                <td>{order.id}</td>
                                <td>{order.customerName}</td>
                                <td>{order.totalPrice.toLocaleString('vi-VN')} VND</td>
                                <td>{order.status}</td>
                                <td>
                                    <button
                                        className={cx('btn__detail')}
                                        onClick={() => navigate(`/orders/${order.id}`)}
                                    >
                                        Chi tiết
                                    </button>

                                    {order.status === 'pending' && (
                                        <button
                                            className={cx('btn__approve')}
                                            onClick={() => handleApprove(order.id)}
                                        >
                                            Duyệt đơn
                                        </button>
                                    )}

                                    {order.status === 'processing' && (
                                        <button
                                            className={cx('btn__deliver')}
                                            onClick={() => handleDeliver(order.id)}
                                        >
                                            Giao đơn
                                        </button>
                                    )}

                                    <button
                                        className={cx('btn__delete')}
                                        onClick={() => handleDelete(order.id)}
                                    >
                                        Xoá
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className={cx('no-data')}>Không có đơn hàng nào</p>
            )}
        </div>
    );
}

export default OrderList;
