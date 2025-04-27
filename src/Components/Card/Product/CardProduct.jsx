import { useState, useEffect } from 'react';
import className from 'classnames/bind';
import style from './CradProduct.module.scss';
import authApi from '~/Api/authApi';
import BASE_URL from '~/Api/config';
import logo from '~/assets/image/logo_pk.png';

const cx = className.bind(style);

function CradProduct() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await authApi.product();
                setProducts(response.data.products);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchProducts();
    }, []);

    return (
        <div className={cx('card-product')}>
            {products.map((product) => (
                <div key={product.id} className={cx('card-product__item')}>
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
                    <div className={cx('card-product__info')}>
                        <h3 className={cx('card-product__name')}>
                            {product.name}
                        </h3>
                        <p className={cx('card-product__price')}>
                            {product.price} VND
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default CradProduct;
