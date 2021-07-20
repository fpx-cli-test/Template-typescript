import UserLayout from '@/layouts/UserLayout';
import Login from '@/pages/Login';
import DdLoginLoding from '@/pages/Login/components/LoginBlock/DdLoginLoading';
import Home from '@/pages/home';

const routerConfig = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/user',
    component: UserLayout,
    children: [
      {
        path: '/login',
        component: Login,
      },
      {
        path: '/',
        redirect: '/user/login',
      },
    ],
  },
  
  // 钉钉登录loading页
  {
    path: '/ddLoginLoding',
    component: DdLoginLoding,
  },
];
export default routerConfig;