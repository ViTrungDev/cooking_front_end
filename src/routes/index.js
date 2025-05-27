import register from '~/pages/Register/index';
import login from '~/pages/Login/index';
import Home from '~/pages/Home/index';
import ProductDetail from '~/pages/Product/ProductDetail';
import ShoppingCard from '~/pages/Shop/ShoppingCard';
import Checkout from '~/pages/CheckOut/Checkout';
import SubLayout from '~/Components/Layout/SubLayout';
import Mouse from '~/pages/Navbar__mouse/Mouse';
import Salty from '~/pages/Navbar__salty/Salty';
import Cookies from '~/pages/Navbar__cookies/Cookies';
import Promotion from '~/pages/Navbar__promotion/Promotion';
import ShoppingBuy from '~/pages/ShoppingBuy/ShoppingBuy';
import Profile from '~/pages/Profile/Profile';
import NotFound from '~/pages/NotFound/NotFound';
import RouterPrivate from '~/Components/RoutesPrivate/RouterPrivate';
import Admin from '~/pages/Admin/Admin';
import Manage from '~/Components/Layout/LayoutManage/Manage';

const publicRoutes = [
    { path: '/', component: Home },
    { path: '/register', component: register },
    { path: '/login', component: login },
    { path: '/product/:slug', component: ProductDetail },
    { path: '/shopping-cart', component: ShoppingCard },
    { path: '/checkout', component: Checkout, layout: SubLayout },
    { path: '/banh-sinh-nhat', component: Mouse },
    { path: '/shopping-buy', component: ShoppingBuy },
    { path: '/banh-man', component: Salty },
    { path: '/cookies-minicake', component: Cookies },
    { path: '/khuyen-mai', component: Promotion },
    { path: '/profile', component: Profile },
    { path: '/404', component: NotFound },
];
const privateRoutes = [
    {
        path: '/admin',
        element: (
            <RouterPrivate requiredRole="admin">
                <Admin />
            </RouterPrivate>
        ),
        layout: Manage,
    },
];

export { privateRoutes, publicRoutes };
