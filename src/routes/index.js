import register from '~/pages/Register/index';
import login from '~/pages/Login/index';
import Home from '~/pages/Home/index';
import ProductDetail from '~/pages/Product/ProductDetail';

const publicRoutes = [
    { path: '/', component: Home },
    { path: '/register', component: register },
    { path: '/login', component: login },
    { path: '/product/:slug', component: ProductDetail },
];
const privateRoutes = [];

export { privateRoutes, publicRoutes };
