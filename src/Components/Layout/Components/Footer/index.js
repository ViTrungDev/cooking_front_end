import classNames from 'classnames/bind';
import style from './Footer.module.scss';
import icon_Facebook from '~/assets/icon/icon_facebook.png';
import icon_Ins from '~/assets/icon/icon_ins.png';
import icon_Zalo from '~/assets/icon/icon_zalo.png';
const cx = classNames.bind(style);
function Footer() {
    return (
        <footer className={cx('footer')}>
            <ul className={cx('footer__title')}>
                <li>THÔNG TIN VỀ CHÚNG TÔI</li>
                <li>LIÊN HỆ TƯ VẤN</li>
                <li>HỖ TRỢ KHÁCH HÀNG </li>
            </ul>
            <div className={cx('footer__list')}>
                <ul className={cx('footer__item')}>
                    <li>Tin tức</li>
                    <li>Tuyển dụng</li>
                    <li>
                        <img src={icon_Facebook} alt="Facebook" />
                        <img src={icon_Ins} alt="Ins" />
                        <img src={icon_Zalo} alt="Zalo" />
                    </li>
                </ul>
                <ul className={cx('footer__item')}>
                    <li>Hotline: 0352733897 - 0345385483</li>
                    <li>Khiếu nại và hỗ trợ: 03527333879</li>
                    <li>Email: threefairiesbakery@gmail.com</li>
                    <li>Giờ làm việc : 10h00 - 20h00</li>
                </ul>
                <ul className={cx('footer__item')}>
                    <li>Hướng dẫn đặt bánh online</li>
                    <li>Chính sách đổi trả</li>
                    <li>Liên hệ và góp ý </li>
                    <li>Phương thức thanh toán</li>
                </ul>
            </div>
        </footer>
    );
}

export default Footer;
