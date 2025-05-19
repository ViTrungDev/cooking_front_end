import register from '~/pages/Register/index';
import login from '~/pages/Login/index';
import Home from '~/pages/Home/index';
import ProductDetail from '~/pages/Product/ProductDetail';
import ShoppingCard from '~/pages/Shop/ShoppingCard';
import Checkout from '~/pages/CheckOut/Checkout';
import SubLayout from '~/Components/Layout/SubLayout';
import Mouse from '~/pages/Navbar__mouse/Mouse';
import OrderDetail from '~/pages/OrderDetail/OrderDetail';
import Salty from '~/pages/Navbar__salty/Salty';
import Cookies from '~/pages/Navbar__cookies/Cookies';
import Promotion from '~/pages/Navbar__promotion/Promotion';

const publicRoutes = [
    { path: '/', component: Home },
    { path: '/register', component: register },
    { path: '/login', component: login },
    { path: '/product/:slug', component: ProductDetail },
    { path: '/shopping-cart', component: ShoppingCard },
    { path: '/checkout', component: Checkout, layout: SubLayout },
    { path: '/banh-sinh-nhat', component: Mouse },
    { path: '/shopping-buy', component: OrderDetail },
    { path: '/banh-man', component: Salty },
    { path: '/cookies-minicake', component: Cookies },
    { path: '/khuyen-mai', component: Promotion },
];
const privateRoutes = [];

export { privateRoutes, publicRoutes };
