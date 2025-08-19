import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import style from './Order.module.scss';
import iconSearch from '~/assets/icon/search 1.png';
import authApi from '~/Api/authApi';
import { useToast } from '~/contexts/ToastContext';
import ConfirmModal from '~/Components/ComfirmModel/ComfirmModel';

const cx = classNames.bind(style);

function ManageOrder() {
    const [orders, setOrders] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOption, setSortOption] = useState('default');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(7);

    const [showConfirm, setShowConfirm] = useState(false);
    const [orderToDelete, setOrderToDelete] = useState(null);

    const { showToast } = useToast();

    // Fetch orders từ API
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await authApi.getOrders();
                if (response && response.data.orders) {
                    setOrders(response.data.orders);
                }
            } catch (error) {
                console.error('fetch orders error', error);
            }
        };
        fetchOrders();
    }, []);

    const openConfirmDelete = (order) => {
        setShowConfirm(true);
        setOrderToDelete(order);
    };

    const handleConfirmDelete = async () => {
        try {
            if (!orderToDelete) return;
            await authApi.deleteOrder(orderToDelete.id);
            setOrders((prev) => prev.filter((o) => o.id !== orderToDelete.id));
            showToast(`✅ Xóa đơn hàng ${orderToDelete.id} thành công!`);
        } catch (error) {
            console.error('Xóa đơn hàng thất bại!', error);
            showToast('⚠️ Xóa đơn hàng không thành công!');
        } finally {
            setShowConfirm(false);
            setOrderToDelete(null);
        }
    };

    const handleCancelDelete = () => {
        setShowConfirm(false);
        setOrderToDelete(null);
    };

    // Search
    const handleSearch = (e) => {
        setSearchTerm(e.target.value.toLowerCase());
        setCurrentPage(1);
    };

    // Sort
    const handleSortChange = (e) => {
        setSortOption(e.target.value);
    };

    const filteredAndSortedOrders = orders
        .filter(
            (order) =>
                order.customerName?.toLowerCase().includes(searchTerm) ||
                order.id?.toString().includes(searchTerm),
        )
        .sort((a, b) => {
            if (sortOption === 'customer') {
                return a.customerName.localeCompare(b.customerName);
            }
            if (sortOption === 'total') {
                return a.total - b.total;
            }
            return 0;
        });

    // Pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredAndSortedOrders.slice(
        indexOfFirstItem,
        indexOfLastItem,
    );
    const totalPages = Math.ceil(filteredAndSortedOrders.length / itemsPerPage);

    return (
        <div className={cx('ManageOrder')}>
            <div className={cx('container')}>
                <div className={cx('container_top')}>
                    <div className={cx('order__left')}>
                        <h1 className={cx('title')}>Quản lý đơn hàng</h1>
                        <p className={cx('desc')}>
                            Danh sách đơn hàng chi tiết
                        </p>
                    </div>
                    <div className={cx('order__right')}>
                        <div className={cx('search')}>
                            <input
                                type="search"
                                placeholder="Tìm kiếm đơn hàng"
                                className={cx('input-search')}
                                onChange={handleSearch}
                            />
                            <img src={iconSearch} alt="search" />
                        </div>
                        <div className={cx('sort')}>
                            <p>Sắp xếp:</p>
                            <select
                                className={cx('select-sort')}
                                onChange={handleSortChange}
                            >
                                <option value="default">Mặc định</option>
                                <option value="customer">
                                    Theo khách hàng
                                </option>
                                <option value="total">Theo tổng tiền</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className={cx('container_content')}>
                    <div className={cx('header')}>
                        <p>ID</p>
                        <p>Khách hàng</p>
                        <p>Tổng tiền</p>
                        <p>Trạng thái</p>
                        <p>Ngày tạo</p>
                        <p>Hành động</p>
                    </div>
                    <div className={cx('content')}>
                        {currentItems.length > 0 ? (
                            currentItems.map((order) => (
                                <ul key={order.id} className={cx('list_item')}>
                                    <li>{order.id}</li>
                                    <li>{order.customerName}</li>
                                    <li>
                                        {order.total.toLocaleString()} VND
                                    </li>
                                    <li>{order.status}</li>
                                    <li>
                                        {new Date(
                                            order.createdAt,
                                        ).toLocaleDateString()}
                                    </li>
                                    <li className={cx('btn_action')}>
                                        <button
                                            className={cx(
                                                'btn',
                                                'btn_delete',
                                            )}
                                            onClick={() =>
                                                openConfirmDelete(order)
                                            }
                                        >
                                            Xóa
                                        </button>
                                    </li>
                                </ul>
                            ))
                        ) : (
                            <p className={cx('no_result')}>
                                Không tìm thấy đơn hàng phù hợp
                            </p>
                        )}
                    </div>
                </div>

                <div className={cx('pagination')}>
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index + 1}
                            onClick={() => setCurrentPage(index + 1)}
                            className={cx({
                                active: currentPage === index + 1,
                            })}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>

                {showConfirm && (
                    <ConfirmModal
                        message={
                            <span>
                                Bạn có chắc muốn xóa đơn hàng{' '}
                                <strong>{orderToDelete?.id}</strong> không?
                            </span>
                        }
                        onConfirm={handleConfirmDelete}
                        onCancel={handleCancelDelete}
                    />
                )}
            </div>
        </div>
    );
}

export default ManageOrder;
