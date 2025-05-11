import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import style from './ProductDetail.module.scss';
import banner__header from '~/assets/image/Banner__header.png';
import { useLocation, useParams } from 'react-router-dom';
import authApi from '~/Api/authApi';
import slugify from 'slugify';
import BASE_URL from '~/Api/config';
import { useLoading } from '~/contexts/LoadingContext';
import Loader from '~/Components/Loader/ProgressBar';
import Card from '~/Components/Card/Product/CardProduct';
import BtnAction from '~/Components/Card/CartActions/ButtonAction';

const cx = classNames.bind(style);

function ProductDetail() {
    const location = useLocation();
    const productFromState = location.state?.product || null;
    const [product, setProduct] = useState(productFromState || null);
    const { slug } = useParams();
    const { loading, setLoading } = useLoading();
    const [count, setCount] = useState(1);
    const productRef = useRef(null);

    const handleMinus = () => {
        if (count > 1) {
            setCount((prev) => prev - 1);
        }
    };

    const handlePlus = () => {
        if (count < 20) {
            setCount((prev) => prev + 1);
        }
    };

    useEffect(() => {
        setProduct(null);
        if (!productFromState) {
            fetchProduct(slug);
        }
    }, [slug]);
    useEffect(() => {
        if (product) {
            productRef.current?.scrollIntoView({
                behavior: 'smooth',
            });
        }
    }, [product]);
    const fetchProduct = async (slug) => {
        try {
            setLoading(true);
            const res = await authApi.product();
            const allProducts = res.data.products;

            // Tìm sản phẩm phù hợp với slug
            const matchedProduct = allProducts.find(
                (p) =>
                    slugify(p.name, {
                        lower: true,
                        strict: true,
                    }) === slug,
            );

            if (matchedProduct) {
                setProduct(matchedProduct);
            } else {
                console.warn('Không tìm thấy sản phẩm với slug:', slug);
            }
        } catch (error) {
            console.error('Error fetching product:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={cx('product__detail')}>
            <div className={cx('product__header')}>
                <img src={banner__header} alt="banner__header" />
            </div>
            <div className={cx('product__container')}>
                {loading ? (
                    <Loader />
                ) : product ? (
                    <div className={cx('product')} ref={productRef}>
                        <div className={cx('product__left')}>
                            <img
                                src={`${BASE_URL}${product.image}`}
                                alt={product.name}
                            />
                        </div>
                        <div className={cx('product__right')}>
                            <h2 className={cx('product__right--title')}>
                                {product.name}
                            </h2>
                            <p className={cx('desc')}>
                                Giá: {product.price.toLocaleString('vi-VN')} VND
                            </p>
                            <p className={cx('desc')}>Kích thước:</p>
                            <div className={cx('handleSelectSize')}>
                                <div className={cx('size-options')}>
                                    <input
                                        type="radio"
                                        id="size-small"
                                        name="size"
                                        value="small"
                                        hidden
                                    />
                                    <label
                                        htmlFor="size-small"
                                        className={cx('size-button')}
                                    >
                                        19cm
                                    </label>

                                    <input
                                        type="radio"
                                        id="size-medium"
                                        name="size"
                                        value="medium"
                                        hidden
                                    />
                                    <label
                                        htmlFor="size-medium"
                                        className={cx('size-button')}
                                    >
                                        21cm
                                    </label>

                                    <input
                                        type="radio"
                                        id="size-large"
                                        name="size"
                                        value="large"
                                        hidden
                                    />
                                    <label
                                        htmlFor="size-large"
                                        className={cx('size-button')}
                                    >
                                        25cm
                                    </label>
                                </div>
                            </div>
                            <div className={cx('value_count')}>
                                <p className={cx('desc')}>Số lượng:</p>
                                <div className={cx('count__action')}>
                                    <button
                                        className={cx('btn__minus')}
                                        onClick={handleMinus}
                                    >
                                        -
                                    </button>
                                    <input
                                        type="number"
                                        className={cx('count')}
                                        readOnly
                                        value={count}
                                    />
                                    <button
                                        className={cx('btn__plus')}
                                        onClick={handlePlus}
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                            <div className={cx('btn__action')}>
                                <BtnAction variant="black" product={product} />
                            </div>
                        </div>
                    </div>
                ) : (
                    <p className={cx('desc')}>Chưa có sản phầm nào</p>
                )}
            </div>
            <div className={cx('product__detail--review')}>
                <h3 className={cx('review')}>BÌNH LUẬN</h3>
                <div className={cx('Comment')}>
                    <h4>Comments</h4>
                    <div className={cx('view__coments')}></div>
                </div>
            </div>
            <div className={cx('other_product')}>
                <h3 className={cx('title_product')}>Bạn có thể thích</h3>
                <div className={cx('product')}>
                    <Card />
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;
