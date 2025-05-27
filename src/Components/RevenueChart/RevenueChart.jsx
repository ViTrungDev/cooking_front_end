import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import authApi from '~/Api/authApi';
import styles from './RevenueChart.module.scss';

const RevenueChart = () => {
    const [monthlyRevenue, setMonthlyRevenue] = useState([]);
    const [availableYears, setAvailableYears] = useState([]);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await authApi.getAllOrder();
                if (response && response.data) {
                    // Lấy danh sách các năm duy nhất
                    const years = Array.from(
                        new Set(
                            response.data.map((order) =>
                                new Date(order.order_date).getFullYear(),
                            ),
                        ),
                    ).sort((a, b) => b - a); // sắp xếp giảm dần

                    setAvailableYears(years);

                    // Lọc và xử lý dữ liệu theo năm đã chọn
                    const filteredOrders = response.data.filter((order) => {
                        const orderYear = new Date(
                            order.order_date,
                        ).getFullYear();
                        return orderYear === Number(selectedYear);
                    });

                    const revenueByMonth = Array.from(
                        { length: 12 },
                        (_, index) => ({
                            month: `Tháng ${index + 1}`,
                            total: 0,
                        }),
                    );

                    filteredOrders.forEach((order) => {
                        if (order.order_date && order.total_amount) {
                            const date = new Date(order.order_date);
                            const monthIndex = date.getMonth();
                            revenueByMonth[monthIndex].total +=
                                order.total_amount;
                        }
                    });

                    setMonthlyRevenue(revenueByMonth);
                } else {
                    console.error('No data found');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [selectedYear]); // gọi lại mỗi khi selectedYear thay đổi

    const customTicks = [
        0, 1_000_000, 10_000_000, 20_000_000, 30_000_000, 40_000_000,
        50_000_000,
    ];

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2 className={styles.title}>Biểu đồ doanh thu theo tháng</h2>
                <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    className={styles.select}
                >
                    {availableYears.map((year) => (
                        <option key={year} value={year}>
                            Năm {year}
                        </option>
                    ))}
                </select>
            </div>

            <BarChart
                width={1140}
                height={540}
                data={monthlyRevenue}
                margin={{ top: 20, right: 20, left: 20, bottom: 30 }}
                barSize={40}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis
                    ticks={customTicks}
                    domain={[0, 50_000_000]}
                    tick={{ fontSize: 12 }}
                    tickFormatter={(value) =>
                        `${value.toLocaleString('vi-VN')}đ`
                    }
                />
                <Tooltip
                    formatter={(value) => `${value.toLocaleString('vi-VN')} đ`}
                />
                <Bar dataKey="total" fill="#8884d8" name="Doanh thu" />
            </BarChart>
        </div>
    );
};

export default RevenueChart;
