import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import style from './Statistic.module.scss';
import {
    BarChart,
    Bar,
    PieChart,
    Pie,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    Cell,
} from 'recharts';
import authApi from '~/Api/authApi';

const cx = classNames.bind(style);
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF6384', '#36A2EB'];

function Statistic() {
    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState([]);
    const [orderDetails, setOrderDetails] = useState([]);
    const [loading, setLoading] = useState(true);   // ✅ thêm state loading
    const [activeTab, setActiveTab] = useState('revenue'); // ✅ thêm state tab

    useEffect(() => {
        const fetchData = async () => {
            try {
                const ordersRes = await authApi.getAllOrder();
                const productsRes = await authApi.getAllProduct();  
                const orderDetailsRes = await authApi.getAllOrderDetail();

                setOrders(ordersRes.data || []);
                setProducts(productsRes.data || []);
                setOrderDetails(orderDetailsRes.data || []);
            } catch (error) {
                console.error('Lỗi tải dữ liệu:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return <p>Đang tải dữ liệu...</p>;

    // ✅ Tổng doanh thu
    const totalRevenue = orders.reduce(
        (sum, order) => sum + (parseFloat(order.total_amount) || 0),
        0,
    );

    // ✅ Doanh thu theo sản phẩm
    const revenueByProduct = products.map((product) => {
        const quantitySold = orderDetails
            .filter((od) => od.product_id === product.id)
            .reduce((sum, od) => sum + (od.quantity || 0), 0);
        return {
            name: product.name,
            value: quantitySold * (product.price || 0),
        };
    });

    // ✅ Tổng sản phẩm bán ra
    const totalSales = orderDetails.reduce(
        (sum, od) => sum + (od.quantity || 0),
        0,
    );

    // ✅ Lợi nhuận (30% giá bán)
    const profitByProduct = revenueByProduct.map((item) => ({
        name: item.name,
        profit: item.value * 0.3,
    }));
    const totalProfit = profitByProduct.reduce((sum, item) => sum + item.profit, 0);

    const costs = [
        { name: 'Nguyên liệu', value: totalRevenue * 0.4 },
        { name: 'Nhân công', value: totalRevenue * 0.2 },
        { name: 'Khác', value: totalRevenue * 0.1 },
    ];

    return (
        <div className={cx('Statistics')}>
            <div className={cx('container')}>
                {/* Tabs */}
                <div className={cx('tabs')}>
                    {['revenue', 'sales', 'profit'].map((tab) => (
                        <button
                            key={tab}
                            className={cx('tab-btn', { active: activeTab === tab })}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab === 'revenue'
                                ? 'Doanh thu'
                                : tab === 'sales'
                                ? 'Bán hàng'
                                : 'Lợi nhuận'}
                        </button>
                    ))}
                </div>

                <div className={cx('content')}>
                    {activeTab === 'revenue' && (
                        <>
                            <div className={cx('summary-card')}>
                                <h3>Tổng doanh thu</h3>
                                <p>{totalRevenue.toLocaleString()} VND</p>
                            </div>
                            <div className={cx('chart-container')}>
                                <h4>Doanh thu theo sản phẩm</h4>
                                <ResponsiveContainer width="100%" height={300}>
                                    <PieChart>
                                        <Pie
                                            data={revenueByProduct}
                                            dataKey="value"
                                            cx="50%"
                                            cy="50%"
                                            outerRadius={80}
                                            label={({ name, percent }) =>
                                                `${name} ${(percent * 100).toFixed(0)}%`
                                            }
                                        >
                                            {revenueByProduct.map((entry, index) => (
                                                <Cell
                                                    key={`cell-${index}`}
                                                    fill={COLORS[index % COLORS.length]}
                                                />
                                            ))}
                                        </Pie>
                                        <Tooltip
                                            formatter={(value) =>
                                                `${value.toLocaleString()} VND`
                                            }
                                        />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </>
                    )}

                    {activeTab === 'sales' && (
                        <>
                            <div className={cx('summary-card')}>
                                <h3>Tổng sản phẩm đã bán</h3>
                                <p>{totalSales}</p>
                            </div>
                            <div className={cx('chart-container')}>
                                <h4>Sản phẩm bán chạy</h4>
                                <ResponsiveContainer width="100%" height={400}>
                                    <BarChart data={profitByProduct}>
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip
                                            formatter={(value) =>
                                                `${value.toLocaleString()} VND`
                                            }
                                        />
                                        <Bar dataKey="profit" fill="#82ca9d" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </>
                    )}

                    {activeTab === 'profit' && (
                        <>
                            <div className={cx('summary-card')}>
                                <h3>Tổng lợi nhuận</h3>
                                <p>{totalProfit.toLocaleString()} VND</p>
                            </div>
                            <div className={cx('chart-container')}>
                                <h4>Phân bổ chi phí</h4>
                                <ResponsiveContainer width="100%" height={300}>
                                    <PieChart>
                                        <Pie
                                            data={costs}
                                            dataKey="value"
                                            cx="50%"
                                            cy="50%"
                                            outerRadius={80}
                                            label={({ name, percent }) =>
                                                `${name} ${(percent * 100).toFixed(0)}%`
                                            }
                                        >
                                            {costs.map((entry, index) => (
                                                <Cell
                                                    key={`cell-${index}`}
                                                    fill={COLORS[index % COLORS.length]}
                                                />
                                            ))}
                                        </Pie>
                                        <Tooltip
                                            formatter={(value) =>
                                                `${value.toLocaleString()} VND`
                                            }
                                        />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Statistic;
