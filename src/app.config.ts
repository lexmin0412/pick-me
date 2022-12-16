export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/setting/index',
    'pages/user/list',
    'pages/foods/foods',
  ],
  window: {
    navigationBarBackgroundColor: '#fff',
    navigationBarTextStyle: 'black',
    navigationStyle: 'custom',
  },
  tabBar: {
    selectedColor: '#ff4a4a',
    list: [
      {
        iconPath: './assets/images/icons/icon_home.png',
        selectedIconPath: './assets/images/icons/icon_home_red.png',
        text: '选我 选我～',
        pagePath: 'pages/index/index'
      },
      {
        iconPath: './assets/images/icons/icon_setting.png',
        selectedIconPath: './assets/images/icons/icon_setting_red.png',
        text: '设置',
        pagePath: 'pages/setting/index'
      },
    ]
  }
})
