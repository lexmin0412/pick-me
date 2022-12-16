<template>
	<view class="setting-container">
		<button class="button-item" @tap="jumpToUserList">用户设置</button>
		<button class="button-item" @tap="jumpToFoodsList">食物设置</button>
	</view>
</template>

<script setup>
import Taro from '@tarojs/taro'
import './index.less'

const jumpToUserList = () => {
	console.log('jumpToUserList')
	Taro.navigateTo({
		url: '/pages/user/list',
	})
}
const jumpToFoodsList = () => {
	console.log('jumpToFoodsList')
	Taro.navigateTo({
		url: '/pages/foods/foods',
	})
}
</script>
