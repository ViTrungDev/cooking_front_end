import classNames from 'classnames/bind';
import style from './Admin.module.scss';
import icon from '~/assets/icon/fluent_wallet-credit-card-16-filled.png';
import icon2 from '~/assets/icon/simple-icons_cashapp.png';
import iconUser from '~/assets/icon/profile-2user.png';
import { useEffect, useState } from 'react';
import authApi from '~/Api/authApi';
import RevenueChart from '~/Components/RevenueChart/RevenueChart';

const cx = classNames.bind(style);

function Admin() {
    const [business, setBusiness] = useState(0);
    const [user, setUsers] = useState(0);
    const [orders, setOrders] = useState(0);
    const [showOrder, setShowOrder] = useState([]);

    // Phân trang
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 7;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentOrders = showOrder.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(showOrder.length / itemsPerPage);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const getStatusInfo = (status) => {
        switch (status) {
            case 'pending':
                return { label: 'Đơn hàng mới', color: 'blue' };
            case 'processing':
                return { label: 'Đang xử lý', color: 'orange' };
            case 'shipped':
            case 'delivered':
                return { label: 'Đã giao', color: 'green' };
            case 'cancelled':
                return { label: 'Đã hủy', color: 'red' };
            default:
                return { label: status, color: 'gray' };
        }
    };

    useEffect(() => {
        const fecthData = async () => {
            try {
                const response = await authApi.getAllOrder();
                if (response && response.data) {
                    const totalOrders = response.data.reduce(
                        (total, order) => total + (order.total_amount || 0),
                        0,
                    );
                    setOrders(response.data.length);
                    setBusiness(totalOrders);
                    setShowOrder(response.data);
                } else {
                    console.error('No data found');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fecthData();
    }, []);

    useEffect(() => {
        const fetchingDataUser = async () => {
            try {
                const response = await authApi.getAllUser();
                if (response && response.data) {
                    setUsers(response.data.length);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
        fetchingDataUser();
    }, []);

    return (
        <div className={cx('dashboard')}>
            <div className={cx('report__dashboard')}>
                <div className={cx('total__revenues', 'card')}>
                    <img src={icon2} alt="icon" />
                    <p>Tổng doanh thu</p>
                    <p className={cx('total')}>
                        {business.toLocaleString()} VND
                    </p>
                </div>
                <div className={cx('total__customers', 'card')}>
                    <img src={icon} alt="icon" />
                    <p>Số lượng đơn hàng</p>
                    <p className={cx('total')}>{orders.toLocaleString()}</p>
                </div>
                <div className={cx('total__orders', 'card')}>
                    <img src={iconUser} alt="icon" />
                    <p>Số lượng khách hàng</p>
                    <p className={cx('total')}>{user.toLocaleString()}</p>
                </div>
            </div>

            <RevenueChart />

            <div className={cx('list__order')}>
                <h3 className={cx('list__order--title')}>Danh sách đơn hàng</h3>
                <div className={cx('list__title')}>
                    <p className={cx('order__id')}>Mã đơn hàng</p>
                    <p className={cx('order__user')}>Khách hàng</p>
                    <p className={cx('oeder__phone')}>Số điện thoại</p>
                    <p className={cx('order__address')}>Địa chỉ</p>
                    <p className={cx('order__date')}>Ngày đặt hàng</p>
                    <p className={cx('order__amount')}>Tổng tiền</p>
                    <p className={cx('order__status')}>Trạng thái</p>
                </div>
                {currentOrders.length > 0 ? (
                    currentOrders.map((item, index) => {
                        const statusInfo = getStatusInfo(item.status);
                        return (
                            <div key={index} className={cx('order__item')}>
                                <div className={cx('order__header')}>
                                    <p>{item.id}</p>
                                </div>
                                <div className={cx('order__header')}>
                                    <p>{item.customer_name}</p>
                                </div>
                                <div className={cx('order__header')}>
                                    <p>{item.phone}</p>
                                </div>
                                <div className={cx('order__header')}>
                                    <p className={cx('order__address')}>
                                        {item.address.length > 20
                                            ? `${item.address.slice(0, 20)}...`
                                            : item.address}
                                    </p>
                                </div>
                                <div className={cx('order__header')}>
                                    <p>
                                        {new Date(
                                            item.order_date,
                                        ).toLocaleDateString()}
                                    </p>
                                </div>
                                <div className={cx('order__header')}>
                                    <p>
                                        {item.total_amount.toLocaleString()} VND
                                    </p>
                                </div>
                                <div
                                    className={cx('order__header')}
                                    style={{
                                        color: statusInfo.color,
                                        fontWeight: 'bold',
                                    }}
                                >
                                    <p>{statusInfo.label}</p>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <p>Không có đơn hàng nào</p>
                )}

                {/* Phân trang */}
                {totalPages > 1 && (
                    <div className={cx('pagination')}>
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            &lt;
                        </button>
                        {[...Array(totalPages)].map((_, i) => (
                            <button
                                key={i}
                                onClick={() => handlePageChange(i + 1)}
                                className={cx({
                                    active: currentPage === i + 1,
                                })}
                            >
                                {i + 1}
                            </button>
                        ))}
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                        >
                            &gt;
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Admin;
