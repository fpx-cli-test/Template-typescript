const headerMenuConfig: never[] = [];

interface MenuConfigItem {
  name: string;
  path?: string;
  icon?: string;
  children?: MenuConfigItem[];
}

interface MenuConfig {
  index?: MenuConfigItem[];
}


// 首页
const indexConifg: MenuConfigItem[] = [
  {
  name: '首页',
  icon: 'chart-pie',
  path: '/home',
  children: [
    {
      name: '列表',
      path: '/ome',
    },
  ],
  },
];



const asideMenuConfig: MenuConfig = {
  index: indexConifg,
};

export { headerMenuConfig, asideMenuConfig };
