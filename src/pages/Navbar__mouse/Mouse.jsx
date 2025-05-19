import { useState, useEffect } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import classNames from 'classnames/bind';
import CradProduct from '~/Components/Card/Product/CardProduct';
import authApi from '~/Api/authApi';
import style from './Mouse.module.scss';

const cx = classNames.bind(style);

function Mouse() {
    const [allProducts, setAllProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20;

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await authApi.product();
                const mousseProducts = response.data.products.filter(
                    (p) => p.classify === 'Mousse',
                );
                setAllProducts(mousseProducts);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchProducts();
    }, []);

    // Tính chỉ số slice dựa vào currentPage và itemsPerPage
    const indexOfLast = currentPage * itemsPerPage;
    const indexOfFirst = indexOfLast - itemsPerPage;
    const currentProducts = allProducts.slice(indexOfFirst, indexOfLast);

    // Tính tổng số trang dựa trên tổng sản phẩm và số sản phẩm 1 trang
    const totalPages = Math.ceil(allProducts.length / itemsPerPage);

    // Chuyển trang
    const handlePageChange = (pageNumber) => {
        if (pageNumber < 1 || pageNumber > totalPages) return;
        setCurrentPage(pageNumber);
    };

    return (
        <div className={cx('wapper')}>
            <div className={cx('title')}>
                <p className={cx('title__name')}>Bánh sinh nhật</p>
            </div>
            <div className={cx('wapper__right')}>
                <CradProduct
                    products={currentProducts}
                    className={style.gridBirthday}
                />
            </div>

            <div className={cx('pagination')}>
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={cx('btn')}
                >
                    <FiChevronLeft />
                </button>
                {[...Array(totalPages)].map((_, i) => (
                    <button
                        key={i}
                        className={cx(
                            { active: currentPage === i + 1 },
                            'output',
                        )}
                        onClick={() => handlePageChange(i + 1)}
                    >
                        {i + 1}
                    </button>
                ))}
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={cx('btn')}
                >
                    <FiChevronRight />
                </button>
            </div>
        </div>
    );
}

export default Mouse;
