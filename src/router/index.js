// import Home from '@/page/home/Home';
import Factory from '@/page/factory/Factory';
import Finder from '@/page/finder/Finder';
import Cart from '@/page/cart/Cart';
import Mine from '@/page/mine/Mine';
import Details from '@/page/details/Details';
import Login from '@/page/login/Login';

export default [
    // { path: "/home", name: "Home", component: Home },
    { path: "/factory", name: "Factory", component: Factory },
    { path: "/details/:gid", name: "Details", component: Details },
    { path: "/finder", name: "Finder", component: Finder },
    { path: "/Cart", name: "Cart", component: Cart, auth: true },
    { path: "/mine", name: "Mine", component: Mine, auth: true },
    { path: "/login", name: "Login", component: Login },
]