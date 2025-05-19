import classNames from 'classnames/bind';
import style from './Promotion.module.scss'; // Tạo file CSS riêng để thêm style
import { FaRegSmileBeam } from 'react-icons/fa'; // Thêm một biểu tượng dễ thương

const cx = classNames.bind(style);

function Promotion() {
    return (
        <div className={cx('promotion-container')}>
            <div className={cx('promotion-content')}>
                <FaRegSmileBeam className={cx('icon')} />
                <h2 className={cx('promotion-title')}>Chưa có khuyến mãi</h2>
                <p className={cx('promotion-description')}>
                    Hiện tại không có chương trình khuyến mãi cho các sản phẩm
                    mousse. Hãy quay lại sau để không bỏ lỡ những ưu đãi hấp
                    dẫn!
                </p>
            </div>
        </div>
    );
}

export default Promotion;
