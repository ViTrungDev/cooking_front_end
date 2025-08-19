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
import ManageUser from '~/pages/manageUser/ManageUser';
import ManageProduct from '~/pages/ManageProduct/ManageProduct';

// ✅ Giữ lại 1 import duy nhất
import ManageOrder from '~/pages/ManageOrder/OrderList';

import Statistic from '../pages/manageStatistic/Statistic';
import Setting from '../pages/ManageSetting/index';
import OrderDetail from '~/pages/Order/OrderDetail';
import ManageBlog from '~/pages/ManageBlog/BlogList';
import BlogDetail from '~/pages/Blog/BlogDetail';


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
    { path: '/order/:id', component: OrderDetail },
    { path: '/blog/:id', component: BlogDetail },
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
    {
        path: '/manage/user',
        element: (
            <RouterPrivate requiredRole="admin">
                <ManageUser />
            </RouterPrivate>
        ),
        layout: Manage,
    },
    {
        path: '/manage/product',
        element: (
            <RouterPrivate requiredRole="admin">
                <ManageProduct />
            </RouterPrivate>
        ),
        layout: Manage,
    },
    // ✅ Chỉ giữ 1 route ManageOrder
    {
        path: '/manage/order',
        element: (
            <RouterPrivate requiredRole="admin">
                <ManageOrder />
            </RouterPrivate>
        ),
        layout: Manage,
    },
    {
        path: '/manage/statistic',
        element: (
            <RouterPrivate requiredRole="admin">
                <Statistic />
            </RouterPrivate>
        ),
        layout: Manage,
    },
    {
        path: '/manage/setting',
        element: (
            <RouterPrivate requiredRole="admin">
                <Setting />
            </RouterPrivate>
        ),
        layout: Manage,
    },
    {
        path: '/manage/blogs',
        element: (
            <RouterPrivate requiredRole="admin">
                <ManageBlog />
            </RouterPrivate>
        ),
        layout: Manage,
    },
];

export { privateRoutes, publicRoutes };
