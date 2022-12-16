<template>
  <view class="index">
    <WhatToEat />
  </view>
</template>

<script setup>
import { useShareAppMessage } from '@tarojs/taro'
import './index.less'
import WhatToEat from './components/what-to-eat.vue'

useShareAppMessage(res => {
  if (res.from === 'button') {
    // 来自页面内转发按钮
    console.log(res.target)
  }
  return {
    title: '治好你的选择困难症',
    path: '/pages/index/index'
  }
})

</script>
