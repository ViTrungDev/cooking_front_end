import register from '~/pages/Register/index';
import login from '~/pages/Login/index';
import Home from '~/pages/Home/index';
import ProductDetail from '~/pages/Product/ProductDetail';
import ShoppingCard from '~/pages/Shop/ShoppingCard';
import Checkout from '~/pages/CheckOut/Checkout';
import SubLayout from '~/Components/Layout/SubLayout';

const publicRoutes = [
    { path: '/', component: Home },
    { path: '/register', component: register },
    { path: '/login', component: login },
    { path: '/product/:slug', component: ProductDetail },
    { path: '/shopping-cart', component: ShoppingCard },
    { path: '/checkout', component: Checkout, layout: SubLayout },
];
const privateRoutes = [];

export { privateRoutes, publicRoutes };
