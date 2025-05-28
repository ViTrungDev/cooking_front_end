import classNames from 'classnames/bind';
import style from './Manage.module.scss';
import iconSearch from '~/assets/icon/search 1.png';
import { useEffect, useState } from 'react';
import authApi from '~/Api/authApi';
import CustomConfirm from '~/Components/ComfirmModel/ComfirmModel';
import EditUserForm from '~/Components/EditForm/EditUserForm';
import { useToast } from '~/contexts/ToastContext';

const cx = classNames.bind(style);

function ManageUser() {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOption, setSortOption] = useState('default');
    const [showConfirm, setShowConfirm] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);
    const [userToEdit, setUserToEdit] = useState(null);
    const { showToast } = useToast();

    // Phân trang
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9;

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    useEffect(() => {
        const fetchDataUser = async () => {
            try {
                const response = await authApi.getAllUser();
                if (response?.data) {
                    setUsers(response.data);
                }
            } catch (error) {
                console.error('fetch data error:', error);
            }
        };
        fetchDataUser();
    }, []);

    const shortenId = (id) =>
        id?.length > 12 ? `${id.slice(0, 6)}***${id.slice(-6)}` : id;
    const shortPhone = (phone) =>
        phone?.length > 9 ? `${phone.slice(0, 3)}***${phone.slice(-4)}` : phone;
    const sortEmail = (text) =>
        text?.length > 14 ? `${text.slice(0, 5)}***${text.slice(-9)}` : text;

    const handleSearch = (e) => {
        setSearchTerm(e.target.value.toLowerCase());
        setCurrentPage(1); // Reset về trang đầu khi tìm kiếm
    };

    const handleSortChange = (e) => {
        setSortOption(e.target.value);
        setCurrentPage(1); // Reset về trang đầu khi sắp xếp
    };

    const filteredUsers = users
        .filter((user) => user.userName?.toLowerCase().includes(searchTerm))
        .sort((a, b) => {
            if (sortOption === 'name')
                return a.userName?.localeCompare(b.userName);
            if (sortOption === 'email') return a.email?.localeCompare(b.email);
            return 0;
        });

    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const paginatedUsers = filteredUsers.slice(
        indexOfFirstItem,
        indexOfLastItem,
    );

    const handleEditUser = (user) => setUserToEdit(user);

    const handleSaveEdit = async (updatedUser) => {
        try {
            await authApi.updateProfile(updatedUser.userId, updatedUser);
            setUsers((prev) =>
                prev.map((u) =>
                    u.userId === updatedUser.userId ? updatedUser : u,
                ),
            );
            setUserToEdit(null);
            showToast('Cập nhật thành công!');
        } catch (error) {
            console.error('Update user error:', error);
            showToast('Cập nhật không thành công!');
        }
    };

    const handleCancelEdit = () => setUserToEdit(null);

    const openConfirmDelete = (user) => {
        setUserToDelete(user);
        setShowConfirm(true);
    };

    const handleConfirmDelete = async () => {
        try {
            if (!userToDelete) return;
            await authApi.deleteUser(userToDelete.userId);
            setUsers((prev) =>
                prev.filter((u) => u.userId !== userToDelete.userId),
            );
            showToast('Xoá người dùng thành công!');
        } catch (error) {
            console.error('Delete user error:', error);
            showToast('Xoá người dùng không thành công!');
        } finally {
            setShowConfirm(false);
            setUserToDelete(null);
        }
    };

    const handleCancelDelete = () => {
        setShowConfirm(false);
        setUserToDelete(null);
    };

    return (
        <div className={cx('manage-user')}>
            <div className={cx('container')}>
                <div className={cx('header')}>
                    <h1 className={cx('title')}>Danh sách người dùng</h1>
                    <p className={cx('description')}>
                        Danh sách chi tiết người dùng
                    </p>
                </div>
                <div className={cx('search_sort')}>
                    <div className={cx('search')}>
                        <input
                            type="search"
                            placeholder="Tìm kiếm người dùng"
                            className={cx('input-search')}
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                        <img src={iconSearch} alt="search" />
                    </div>
                    <div className={cx('sort')}>
                        <p>Sắp xếp:</p>
                        <select
                            className={cx('select-sort')}
                            value={sortOption}
                            onChange={handleSortChange}
                        >
                            <option value="default">Mặc định</option>
                            <option value="name">Theo tên</option>
                            <option value="email">Theo email</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className={cx('content')}>
                <div className={cx('table')}>
                    <p>Id</p>
                    <p>Tên người dùng</p>
                    <p>Số điện thoại</p>
                    <p>Email</p>
                    <p>Địa chỉ</p>
                    <p>Hành động</p>
                </div>
                <div className={cx('list__user')}>
                    {paginatedUsers.map((item, index) => (
                        <ul className={cx('item_user')} key={index}>
                            <li>{shortenId(item.userId)}</li>
                            <li>
                                {item.userName?.length > 15
                                    ? item.userName.slice(0, 15) + '...'
                                    : item.userName}
                            </li>
                            <li>{shortPhone(item.phone)}</li>
                            <li>{sortEmail(item.email)}</li>
                            <li>
                                {item.address?.length > 30
                                    ? item.address.slice(0, 30) + '...'
                                    : item.address}
                            </li>
                            <li className={cx('action')}>
                                <button
                                    className={cx('btn-edit', 'btn')}
                                    onClick={() => handleEditUser(item)}
                                >
                                    Chỉnh sửa
                                </button>
                                <button
                                    className={cx('btn-delete', 'btn')}
                                    onClick={() => openConfirmDelete(item)}
                                >
                                    Xoá
                                </button>
                            </li>
                        </ul>
                    ))}
                </div>
            </div>

            {showConfirm && (
                <CustomConfirm
                    message={
                        <span>
                            Bạn có chắc muốn xóa người dùng{' '}
                            <strong>{userToDelete?.userName}</strong> này không?
                        </span>
                    }
                    onConfirm={handleConfirmDelete}
                    onCancel={handleCancelDelete}
                />
            )}

            {userToEdit && (
                <EditUserForm
                    user={userToEdit}
                    onSave={handleSaveEdit}
                    onCancel={handleCancelEdit}
                />
            )}

            {/* Phân trang */}
            {totalPages > 1 && (
                <div className={cx('pagination')}>
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        &lt;
                    </button>
                    {[...Array(totalPages)].map((_, i) => (
                        <button
                            key={i}
                            onClick={() => handlePageChange(i + 1)}
                            className={cx({ active: currentPage === i + 1 })}
                        >
                            {i + 1}
                        </button>
                    ))}
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        &gt;
                    </button>
                </div>
            )}
        </div>
    );
}

export default ManageUser;
