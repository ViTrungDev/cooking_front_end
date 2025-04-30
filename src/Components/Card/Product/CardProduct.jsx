import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import style from './CradProduct.module.scss';
import authApi from '~/Api/authApi';
import BASE_URL from '~/Api/config';
import logo from '~/assets/image/logo_pk.png';
import { useLoading } from '~/contexts/LoadingContext';
import Loader from '~/Components/Loader/ProgressBar';

const cx = classNames.bind(style);

function CradProduct() {
    const [products, setProducts] = useState([]);
    const { loading, setLoading } = useLoading();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const response = await authApi.product();
                const productsList = response.data.products;
                setProducts(response.data.products);
                // Áp dụng thuật toán Fisher-Yates Shuffle
                const shuffledProducts = shuffleArray(productsList);

                // Hiển thị tối đa 16 sản phẩm
                setProducts(shuffledProducts.slice(0, 16));
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, [setLoading]);
    // Thuật toán Fisher-Yates Shuffle
    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1)); // Chọn ngẫu nhiên phần tử từ 0 đến i
            [array[i], array[j]] = [array[j], array[i]]; // Đổi chỗ phần tử i và j
        }
        return array;
    };
    if (loading) {
        return (
            <div className={cx('card-product')}>
                <Loader className="small-loader" />
            </div>
        );
    }

    return (
        <div className={cx('card-product')}>
            {products.map((product) => (
                <div key={product.id} className={cx('card-product__item')}>
                    <div className={cx('card')}>
                        <div className={cx('card__product--header')}>
                            <img src={logo} alt="logoSmall" />
                            <div>
                                <h2>THREE FAIRIES BAKERY</h2>
                                <p>www.threefairiesbakery.vn</p>
                            </div>
                        </div>
                        <img
                            src={`${BASE_URL}${product.image}`}
                            alt={product.name}
                            className={cx('card-product__image')}
                        />
                    </div>
                    <div className={cx('card__footer')}>
                        <div className={cx('card-product__info')}>
                            <h3 className={cx('card-product__name')}>
                                {product.name}
                            </h3>
                            <p className={cx('card-product__price')}>
                                {product.price} VND
                            </p>
                        </div>
                        <div className={cx('btn__card--action')}>
                            <button
                                className={cx('btn', 'btn__card--action__add')}
                            >
                                Thêm vào giỏ hàng
                            </button>
                            <button
                                className={cx('btn', 'btn__card--action__buy')}
                            >
                                Mua ngay
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default CradProduct;
