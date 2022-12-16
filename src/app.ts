import Taro from '@tarojs/taro'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { Button, Icon, Drag, CellGroup, Cell } from '@nutui/nutui-taro'
import "@nutui/nutui-taro/dist/style.css";

import './app.less'

const App = createApp({
  onShow(options) {
    console.log('options', options)
    Taro.showToast({
      icon: 'none',
      title: '欢迎回来～'
    })
  },
  // 入口组件不需要实现 render 方法，即使实现了也会被 taro 所覆盖
})

App.use(createPinia())
App.use(Button).use(Icon).use(Drag).use(CellGroup).use(Cell);


export default App
