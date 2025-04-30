import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import style from './CardProduct.module.scss';
import authApi from '~/Api/authApi';

const cx = classNames.bind(style);
function CardBlog() {
    const [blogs, setBlogs] = useState([]);
    useEffect(() => {
        const fetchingBlogs = async () => {
            try {
                const response = await authApi.blog();
                const blogsList = response.data.blogs;
                console.log(response.data.blogs);
                setBlogs(blogsList);
            } catch (error) {
                console.log('Error fecthing blogs:', error);
            }
        };
        fetchingBlogs();
    }, []);
    return <div></div>;
}
export default CardBlog;
