import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './AddProductForm.module.scss';
import BASE_URL from '~/Api/config';

const cx = classNames.bind(styles);

function AddProductForm({ onSubmit, onClose, initialData = null }) {
    const [name, setName] = useState(initialData?.name || '');
    const [price, setPrice] = useState(initialData?.price || '');
    const [classify, setClassify] = useState(initialData?.classify || 'Mousse');

    const [image, setImage] = useState(null); // File mới
    const [previewUrl, setPreviewUrl] = useState(initialData?.image || ''); // Preview ảnh

    // Khi chọn ảnh mới
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!name || !price) {
            alert('Vui lòng nhập tên và giá sản phẩm!');
            return;
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', price);
        formData.append('classify', classify);

        // Chỉ gửi ảnh mới nếu người dùng chọn ảnh
        if (image) {
            formData.append('image', image);
        }

        onSubmit(formData);
    };

    return (
        <div className={cx('form_wrapper')}>
            <form className={cx('form')} onSubmit={handleSubmit}>
                <h2>{initialData ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm'}</h2>

                <div className={cx('form-group')}>
                    <label htmlFor="name">Tên sản phẩm</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Nhập tên sản phẩm"
                    />
                </div>

                <div className={cx('form-group')}>
                    <label htmlFor="price">Giá tiền</label>
                    <input
                        type="number"
                        id="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="Nhập giá"
                    />
                </div>

                <div className={cx('form-group')}>
                    <label htmlFor="classify">Phân loại</label>
                    <select
                        id="classify"
                        value={classify}
                        onChange={(e) => setClassify(e.target.value)}
                    >
                        <option value="Mousse">Mousse</option>
                        <option value="BanhMi&BanhMan">
                            Bánh mì & Bánh mặn
                        </option>
                        <option value="Cookies&minicake">
                            Cookies & Minicake
                        </option>
                    </select>
                </div>

                <div className={cx('form-group')}>
                    <label htmlFor="image">Ảnh sản phẩm</label>
                    <input
                        type="file"
                        id="image"
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                    {previewUrl && (
                        <img
                            src={`${BASE_URL}${previewUrl}`}
                            alt="preview"
                            className={cx('preview')}
                            style={{
                                width: 120,
                                height: 120,
                                objectFit: 'cover',
                                marginTop: 10,
                            }}
                        />
                    )}
                </div>

                <div className={cx('buttons')}>
                    <button type="submit" className={cx('submit-button')}>
                        {initialData ? 'Cập nhật' : 'Thêm sản phẩm'}
                    </button>
                    <button
                        type="button"
                        className={cx('cancel-button')}
                        onClick={onClose}
                    >
                        Hủy
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AddProductForm;
