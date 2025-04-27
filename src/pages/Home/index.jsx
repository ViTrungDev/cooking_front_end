import React from 'react';
import style from './Home.module.scss';
import classNames from 'classnames/bind';
import logoBig from '~/assets/image/logo_big.png';
import iconPhone from '~/assets/icon/icon_phone.png';
import iconWeb from '~/assets/icon/icon_web.png';
import banker from '~/assets/image/banker.png';
import Card from '~/Components/Card/Product/CardProduct';

const cx = classNames.bind(style);
function Home() {
    return (
        <main className={cx('home')}>
            <section className={cx('home__hero')}>
                <div className={cx('home__hero__logo')}>
                    <img src={logoBig} alt="Logo" />
                </div>
                <div className={cx('home__hero__content')}>
                    <h1>BÁNH NGON</h1>
                    <p>mỗi ngày</p>
                </div>
                <div className={cx('home__hero__contact')}>
                    <div className={cx('home__hero__contact__item')}>
                        <img src={iconPhone} alt="icon phone" />
                        <div className={cx('home__hero__contact__item__text')}>
                            <p>Đặt bánh ngay</p>
                            <span>0909 999 999</span>
                        </div>
                    </div>
                    <div className={cx('home__hero__contact__item')}>
                        <img src={iconWeb} alt="icon web" />
                        <div className={cx('home__hero__contact__item__text')}>
                            <span>Website www.banhngon.com</span>
                        </div>
                    </div>
                </div>
            </section>
            <section className={cx('home__content')}>
                <div className={cx('home__home__content--left')}>
                    <div className={cx('home__home__content--left__title')}>
                        <p>
                            Đến với Three fairies bakery là đến với hàng trăm
                            hương, vị bánh đa chủng loại Á – Âu: bánh ngọt, bánh
                            mì tươi, các dòng bánh kem sinh nhật, sự kiện, theo
                            mùa… Các loại bánh luôn được chú trọng sản xuất sao
                            cho đảm bảo hương vị thơm ngon tuyệt vời mà còn an
                            toàn, đảm bảo cho sức khoẻ. Mỗi chiếc bánh ra đời là
                            đam mê của một tập thể tâm huyết với nghề, mỗi sản
                            phẩm trao tay là tận tâm của đội ngũ nhân viên với
                            khách hàng.Tất cả những điều đó, bạn sẽ cảm nhận
                            được khi thưởng thức từng dòng bánh tuyệt hảo – ý
                            nghĩa – tiện lợi mà Three fairies bakery đặc biệt
                            tạo nên.
                        </p>
                    </div>
                </div>
                <div className={cx('home__home__content--right')}>
                    <img src={banker} alt="baner" />
                </div>
            </section>
            <main className={cx('home__main')}>
                <div className={cx('home__main--title')}>
                    <h2>GATEAUX KEM TƯƠI</h2>
                </div>
                <div className={cx('home__main--content')}>
                    <Card />
                </div>
            </main>
        </main>
    );
}
export default Home;
