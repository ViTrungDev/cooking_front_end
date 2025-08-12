import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import style from './ManageProduct.module.scss';
import iconSearch from '~/assets/icon/search 1.png';
import authApi from '~/Api/authApi';
import { IoMdAdd } from 'react-icons/io';
import { useToast } from '~/contexts/ToastContext';
import ConfirmModal from '~/Components/ComfirmModel/ComfirmModel';
import AddProductForm from '~/Components/AddProductForm/AddProductForm';

const cx = classNames.bind(style);

function ManageProduct() {
    const [products, setProducts] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [sortOption, setSortOption] = useState('default');
    const [showConfirm, setShowConfirm] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(7);
    const { showToast } = useToast();
    const [productToEdit, setProducttoEdit] = useState(null);

    const openConfirmDelete = (products) => {
        setShowConfirm(true);
        setProductToDelete(products);
    };
    const openEdit = (products) => {
        setShowAddForm(true);
        setProducttoEdit(products);
    };

    const handleConfirmDelete = async () => {
        try {
            if (!productToDelete) return;
            await authApi.deleteProduct(productToDelete.id);
            setProducts((prev) =>
                prev.filter((u) => u.id !== productToDelete.id),
            );
            showToast(
                `✅ Xóa sản phẩm có id là ${productToDelete.id} thành công!`,
            );
        } catch (error) {
            console.error('Xóa sản phẩm không thành công!', error);
            showToast('⚠️ Xóa người dùng khôn không thành công!');
        } finally {
            setShowConfirm(false);
            setProductToDelete(null);
        }
    };
    const handleCancelDelete = () => {
        setShowConfirm(false);
        setProductToDelete(null);
    };
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await authApi.product();
                if (response && response.data.products) {
                    setProducts(response.data.products);
                }
            } catch (error) {
                console.error('fetch product error', error);
            }
        };
        fetchProducts();
    }, []);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value.toLowerCase());
        setCurrentPage(1); // Reset trang khi tìm kiếm
    };

    const handleSortChange = (e) => {
        setSortOption(e.target.value);
    };

    const filteredAndSortedProducts = products
        .filter(
            (product) =>
                product.name?.toLowerCase().includes(searchTerm) ||
                product.id?.toString().includes(searchTerm),
        )
        .sort((a, b) => {
            if (sortOption === 'name') {
                return a.name.localeCompare(b.name);
            }
            if (sortOption === 'price') {
                return a.price - b.price;
            }
            return 0;
        });

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredAndSortedProducts.slice(
        indexOfFirstItem,
        indexOfLastItem,
    );
    const totalPages = Math.ceil(
        filteredAndSortedProducts.length / itemsPerPage,
    );

    const handleOpenForm = () => setShowAddForm(true);
    const handleCloseForm = () => setShowAddForm(false);

    const handleFormSubmit = async (productData) => {
        if (!productData) {
            handleCloseForm();
            return;
        }
        console.log('id:', productToEdit.id);
        const formData = new FormData();
        formData.append('name', productData.name);
        formData.append('price', productData.price);
        formData.append('classify', productData.classify);
        console.log('name:', productToEdit.name);
        console.log('price:', productToEdit.price);
        // Nếu có ảnh mới được chọn, dùng ảnh mới
        if (productData.image) {
            formData.append('image', productData.image);
        }

        try {
            if (productData.id) {
                // Nếu có _id thì là chế độ sửa → dùng PUT
                const response = await authApi.putProduct(
                    productData.id,
                    formData,
                );
                showToast(
                    response.data.message || '✅ Cập nhật sản phẩm thành công!',
                );
            } else {
                // Nếu không có _id thì là thêm mới → dùng POST
                const response = await authApi.createProduct(formData);
                showToast(
                    response.data.message || '✅ Thêm sản phẩm thành công!',
                );
            }

            handleCloseForm();

            // Cập nhật lại danh sách
            const newListResponse = await authApi.product();
            setProducts(newListResponse.data.products);
        } catch (error) {
            showToast('⚠️ Xử lý sản phẩm thất bại!');
            console.error(error);
        }
    };

    return (
        <div className={cx('ManageProduct')}>
            <div className={cx('container')}>
                <div className={cx('container_top')}>
                    <div className={cx('product__left')}>
                        <h1 className={cx('title')}>Quản lý sản phẩm</h1>
                        <p className={cx('desc')}>
                            Danh sách sản phẩm chi tiết
                        </p>
                    </div>
                    <div className={cx('product__right')}>
                        <div className={cx('search')}>
                            <input
                                type="search"
                                placeholder="Tìm kiếm sản phẩm"
                                className={cx('input-search')}
                                onChange={handleSearch}
                            />
                            <img src={iconSearch} alt="search" />
                        </div>
                        <div className={cx('sort')}>
                            <p>Sắp xếp:</p>
                            <select
                                className={cx('select-sort')}
                                onChange={handleSortChange}
                            >
                                <option value="default">Mặc định</option>
                                <option value="name">Theo tên</option>
                                <option value="price">Theo giá</option>
                            </select>
                        </div>
                        <div className={cx('active__btn--add')}>
                            <button
                                className={cx('btn_add')}
                                onClick={handleOpenForm}
                            >
                                <IoMdAdd className={cx('icon__class')} />
                                Thêm sản phẩm
                            </button>
                        </div>
                    </div>
                </div>

                <div className={cx('container_content')}>
                    <div className={cx('header')}>
                        <p>ID</p>
                        <p>Tên sản phẩm</p>
                        <p>Đường dẫn ảnh</p>
                        <p>Giá tiền</p>
                        <p>Phân loại</p>
                        <p>Hành động</p>
                    </div>
                    <div className={cx('content')}>
                        {currentItems.length > 0 ? (
                            currentItems.map((item) => (
                                <ul key={item.id} className={cx('list_item')}>
                                    <li>{item.id}</li>
                                    <li>
                                        {item.name?.length > 15
                                            ? item.name.slice(0, 15) + '...'
                                            : item.name}
                                    </li>
                                    <li>{item.image}</li>
                                    <li>{item.price.toLocaleString()} VND</li>
                                    <li>{item.classify}</li>
                                    <li className={cx('btn_action')}>
                                        <button
                                            className={cx('btn', 'btn_update')}
                                            onClick={() => openEdit(item)}
                                        >
                                            Chỉnh sửa
                                        </button>
                                        <button
                                            className={cx('btn', 'btn_delete')}
                                            onClick={() =>
                                                openConfirmDelete(item)
                                            }
                                        >
                                            Xóa
                                        </button>
                                    </li>
                                </ul>
                            ))
                        ) : (
                            <p className={cx('no_result')}>
                                Không tìm thấy sản phẩm phù hợp
                            </p>
                        )}
                    </div>
                </div>

                <div className={cx('pagination')}>
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index + 1}
                            onClick={() => setCurrentPage(index + 1)}
                            className={cx({
                                active: currentPage === index + 1,
                            })}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>

                {showAddForm && (
                    <AddProductForm
                        onSubmit={handleFormSubmit}
                        onClose={handleCloseForm}
                    />
                )}
                {showConfirm && (
                    <ConfirmModal
                        message={
                            <span>
                                Bạn có chắc muốn xóa sản phẩm{' '}
                                <strong>{productToDelete?.name}</strong> này
                                không?
                            </span>
                        }
                        onConfirm={handleConfirmDelete}
                        onCancel={handleCancelDelete}
                    />
                )}
                {showAddForm && (
                    <AddProductForm
                        onSubmit={handleFormSubmit}
                        onClose={() => {
                            setShowAddForm(false);
                            setProducttoEdit(null);
                        }}
                        initialData={productToEdit}
                    />
                )}
            </div>
        </div>
    );
}

export default ManageProduct;
