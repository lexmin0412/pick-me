<template>
  <view class="index">
    <WhatToEat />
  </view>
</template>

<script>
import './index.less'
import WhatToEat from './components/what-to-eat.vue'

export default {
  name: 'home-index',
  components: {
    WhatToEat
  }
}
</script>
