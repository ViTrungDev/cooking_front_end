import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import style from './CardBlog.module.scss';
import authApi from '~/Api/authApi';
import BASE_URL from '~/Api/config';
import axios from 'axios';
import mammoth from 'mammoth'; // dùng để đọc file .docx

const cx = classNames.bind(style);

function CardBlog() {
    const [blogs, setBlogs] = useState([]);

    const getBlogContent = async (contentPath) => {
        try {
            const response = await axios.get(`${BASE_URL}${contentPath}`, {
                responseType: 'arraybuffer', // cần thiết cho mammoth
            });

            const arrayBuffer = response.data;
            const result = await mammoth.convertToHtml({ arrayBuffer }); // đọc nội dung file Word

            return result.value; // HTML dạng chuỗi
        } catch (error) {
            console.error('Lỗi khi tải nội dung:', error);
            return '<p>Không thể tải nội dung.</p>';
        }
    };

    useEffect(() => {
        const fetchingBlogs = async () => {
            try {
                const response = await authApi.blog();
                const blogsList = response.data;

                // Duyệt qua từng blog để lấy nội dung
                const blogsWithContent = await Promise.all(
                    blogsList.map(async (blog) => {
                        if (blog.contentPath) {
                            const contentHtml = await getBlogContent(
                                blog.contentPath,
                            );
                            return { ...blog, contentHtml }; // thêm trường contentHtml để render
                        }
                        return blog;
                    }),
                );

                setBlogs(blogsWithContent);
            } catch (error) {
                console.log('Error fetching blogs:', error);
            }
        };

        fetchingBlogs();
    }, []);

    return (
        <div className={cx('card_Blog')}>
            {blogs.map((blog) => (
                <div key={blog.id} className={cx('card_Blog__item')}>
                    <div className={cx('card_Blog__item--header')}>
                        <img src={`${BASE_URL}${blog.imagePath}`} alt="Blog" />
                        <div>
                            <h2>{blog.title}</h2>
                            <p>{blog.description}</p>
                        </div>
                    </div>
                    <div
                        className={cx('card_Blog__item--content')}
                        dangerouslySetInnerHTML={{
                            __html: blog.contentHtml || '',
                        }} // hiển thị nội dung dạng HTML
                    />
                </div>
            ))}
        </div>
    );
}

export default CardBlog;
