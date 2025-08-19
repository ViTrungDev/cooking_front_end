import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import style from './BlogDetail.module.scss';
import authApi from '~/Api/authApi';
import Loader from '~/Components/Loader/ProgressBar';
import { useLoading } from '~/contexts/LoadingContext';

const cx = classNames.bind(style);

function BlogDetail() {
    const { id } = useParams(); // id blog từ route /blogs/:id
    const navigate = useNavigate();
    const [blog, setBlog] = useState(null);
    const { loading, setLoading } = useLoading();

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                setLoading(true);
                // Gọi API lấy chi tiết blog
                const res = await authApi.getBlogById(id);
                // Tùy backend: nếu res.data.blog hoặc res.data
                setBlog(res.data.blog || res.data);
            } catch (error) {
                console.error('Lỗi lấy chi tiết bài viết:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchBlog();
    }, [id, setLoading]);

    const handleStatusChange = async (status) => {
        try {
            await authApi.updateBlogStatus(id, { status });
            setBlog((prev) => ({ ...prev, status }));
        } catch (error) {
            console.error('Lỗi cập nhật trạng thái:', error);
        }
    };

    const handleDelete = async () => {
        if (!window.confirm('Bạn có chắc chắn muốn xoá bài viết này?')) return;
        try {
            await authApi.deleteBlog(id);
            navigate('/manage/blog'); // trở về trang quản lý blog
        } catch (error) {
            console.error('Lỗi xoá bài viết:', error);
        }
    };

    return (
        <div className={cx('blog__detail')}>
            {loading ? (
                <Loader />
            ) : blog ? (
                <div className={cx('detail__container')}>
                    <h2 className={cx('title')}>{blog.title}</h2>
                    <p><strong>Tác giả:</strong> {blog.authorName || blog.author}</p>
                    <p><strong>Ngày tạo:</strong> {new Date(blog.createdAt).toLocaleString('vi-VN')}</p>
                    <p><strong>Nội dung:</strong></p>
                    <div className={cx('content')}>{blog.content}</div>

                    <p>
                        <strong>Trạng thái:</strong>{' '}
                        <select
                            value={blog.status}
                            onChange={(e) => handleStatusChange(e.target.value)}
                        >
                            <option value="draft">Nháp</option>
                            <option value="published">Đã xuất bản</option>
                        </select>
                    </p>

                    <div className={cx('actions')}>
                        <button className={cx('btn__back')} onClick={() => navigate(-1)}>
                            Quay lại
                        </button>
                        <button className={cx('btn__delete')} onClick={handleDelete}>
                            Xoá bài viết
                        </button>
                    </div>
                </div>
            ) : (
                <p className={cx('no-data')}>Không tìm thấy bài viết</p>
            )}
        </div>
    );
}

export default BlogDetail;
