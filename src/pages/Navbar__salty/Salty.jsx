import classNames from 'classnames/bind';
import style from './Salty.module.scss';
import { useEffect, useState } from 'react';
import authApi from '~/Api/authApi';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import CradProduct from '~/Components/Card/Product/CardProduct';

const cx = classNames.bind(style);
function Salty() {
    const [allProducts, setAllProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20;

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await authApi.product();
                const saltyProduct = response.data.products.filter(
                    (p) => p.classify === 'BanhMi&BanhMan',
                );
                setAllProducts(saltyProduct);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchProducts();
    }, []);

    const indexOfLast = currentPage * itemsPerPage;
    const indexOfFirst = indexOfLast - itemsPerPage;
    const currentProducts = allProducts.slice(indexOfFirst, indexOfLast);

    const totalPages = Math.ceil(allProducts.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        if (pageNumber < 1 || pageNumber > totalPages) return;
        setCurrentPage(pageNumber);
    };
    return (
        <div className={cx('wapper')}>
            <div className={cx('title')}>
                <p className={cx('title__name')}>Bánh mì & Bánh mặn</p>
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
export default Salty;
