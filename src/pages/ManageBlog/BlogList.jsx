import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import style from './BlogList.module.scss';
import authApi from '~/Api/authApi';
import Loader from '~/Components/Loader/ProgressBar';
import { useLoading } from '~/contexts/LoadingContext';

const cx = classNames.bind(style);

function BlogList() {
    const [blogs, setBlogs] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [sort, setSort] = useState('default');
    const { loading, setLoading } = useLoading();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                setLoading(true);
                const res = await authApi.getAllBlogs();
                setBlogs(res.data.blogs || []);
            } catch (error) {
                console.error('Lỗi lấy danh sách bài viết:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchBlogs();
    }, [setLoading]);

    const handleDelete = async (id) => {
        if (!window.confirm('Bạn có chắc chắn muốn xoá bài viết này?')) return;
        try {
            await authApi.deleteBlog(id);
            setBlogs((prev) => prev.filter((blog) => blog.id !== id));
        } catch (error) {
            console.error('Lỗi xoá bài viết:', error);
        }
    };

    const handlePublish = async (id) => {
        try {
            await authApi.updateBlogStatus(id, { status: 'published' });
            setBlogs((prev) =>
                prev.map((blog) =>
                    blog.id === id ? { ...blog, status: 'published' } : blog
                )
            );
        } catch (error) {
            console.error('Lỗi xuất bản bài viết:', error);
        }
    };

    const handleUnpublish = async (id) => {
        try {
            await authApi.updateBlogStatus(id, { status: 'draft' });
            setBlogs((prev) =>
                prev.map((blog) =>
                    blog.id === id ? { ...blog, status: 'draft' } : blog
                )
            );
        } catch (error) {
            console.error('Lỗi hạ bài viết:', error);
        }
    };

    // 🔍 Lọc danh sách theo tiêu đề
    const filteredBlogs = blogs
        .filter((blog) =>
            blog.title.toLowerCase().includes(searchText.toLowerCase())
        )
        .sort((a, b) => {
            if (sort === 'title') return a.title.localeCompare(b.title);
            if (sort === 'status') return a.status.localeCompare(b.status);
            return 0; // mặc định
        });

    return (
        <div className={cx('blog__list')}>
            <h2 className={cx('title')}>Quản lý bài viết</h2>
            <p className={cx('subtitle')}>Danh sách các bài viết chi tiết</p>

            {/* Thanh tìm kiếm + sắp xếp + thêm */}
            <div className={cx('toolbar')}>
                <input
                    type="text"
                    placeholder="Tìm kiếm bài viết..."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                />

                <select value={sort} onChange={(e) => setSort(e.target.value)}>
                    <option value="default">Sắp xếp: Mặc định</option>
                    <option value="title">Theo tiêu đề</option>
                    <option value="status">Theo trạng thái</option>
                </select>

                <button
                    className={cx('btn__create')}
                    onClick={() => navigate('/manage/blog/create')}
                >
                    + Thêm bài viết
                </button>
            </div>

            {loading ? (
                <Loader />
            ) : filteredBlogs.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Tiêu đề</th>
                            <th>Tác giả</th>
                            <th>Trạng thái</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredBlogs.map((blog) => (
                            <tr key={blog.id}>
                                <td>{blog.id}</td>
                                <td>{blog.title}</td>
                                <td>{blog.authorName}</td>
                                <td>{blog.status}</td>
                                <td>
                                    <button
                                        className={cx('btn__detail')}
                                        onClick={() => navigate(`/blogs/${blog.id}`)}
                                    >
                                        Chi tiết
                                    </button>

                                    {blog.status === 'draft' && (
                                        <button
                                            className={cx('btn__publish')}
                                            onClick={() => handlePublish(blog.id)}
                                        >
                                            Xuất bản
                                        </button>
                                    )}

                                    {blog.status === 'published' && (
                                        <button
                                            className={cx('btn__unpublish')}
                                            onClick={() => handleUnpublish(blog.id)}
                                        >
                                            Hạ bài
                                        </button>
                                    )}

                                    <button
                                        className={cx('btn__delete')}
                                        onClick={() => handleDelete(blog.id)}
                                    >
                                        Xoá
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className={cx('no-data')}>Không tìm thấy bài viết nào</p>
            )}
        </div>
    );
}

export default BlogList;
