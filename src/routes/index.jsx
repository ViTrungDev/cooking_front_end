import register from '~/pages/Register/index';
import Home from '~/pages/Home/index';

const publicRoutes = [
    { path: '/', component: Home },
    { path: '/register', component: register },
];
const privateRoutes = [];

export { privateRoutes, publicRoutes };
