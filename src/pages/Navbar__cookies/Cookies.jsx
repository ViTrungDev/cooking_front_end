import { useState, useEffect } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import classNames from 'classnames/bind';
import CradProduct from '~/Components/Card/Product/CardProduct';
import authApi from '~/Api/authApi';
import style from './Cookies.module.scss';

const cx = classNames.bind(style);

function Cookies() {
    const [allProducts, setAllProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20;

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await authApi.product();
                const cookiesProducts = response.data.products.filter(
                    (p) => p.classify === 'Cookies&minicake',
                );
                setAllProducts(cookiesProducts);
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
                <p className={cx('title__name')}>Cookies & Minicake</p>
            </div>
            <div className={cx('wapper__right')}>
                {currentProducts.length === 0 ? (
                    <div className={cx('no-products-container')}>
                        <div className={cx('no-products-icon')}>🍪</div>
                        <h3 className={cx('no-products-title')}>
                            Chưa có sản phẩm
                        </h3>
                        <p className={cx('no-products-message')}>
                            Hiện tại không có sản phẩm cookies hoặc minicake.
                            Hãy quay lại sau để khám phá những sản phẩm mới!
                        </p>
                    </div>
                ) : (
                    <CradProduct
                        products={currentProducts}
                        className={style.gridBirthday}
                    />
                )}
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

export default Cookies;
