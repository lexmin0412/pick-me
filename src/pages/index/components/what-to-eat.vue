<template>
	<view class="container" :style="{height: data.containerHeight}">
		<audio
			src="https://lexmin.oss-cn-hangzhou.aliyuncs.com/statics/pick-me/audio/schnappi.m4a"
			:autoplay="true"
			id="bg_audio"
			style="width: 0; height: 0"
		/>

		<view class="head-box">
			<image
				src="https://lexmin.oss-cn-hangzhou.aliyuncs.com/statics/pick-me/images/timg.gif"
				alt=""
			/>
			<view class="head-title">
				<view class="head-title-item">今</view>
				<view class="head-title-item">天</view>
				<view class="head-title-item">吃</view>
				<view class="head-title-item">什</view>
				<view class="head-title-item">么</view>
				<view class="head-title-item">呢</view>
				<view class="head-title-item">?</view>
			</view>
		</view>

		<view class="main-box">
			<view class="main-mask"></view>
			<view class="main-content">
				<view class="tab-list">
					<view
						v-for="item in data.tabList"
						:key="item.type"
						class="tab-item"
						:class="{ active: item.type === data.currentType }"
						@tap="tabClick(item)"
						:data-type="item.type"
					>
						{{ item.text }}吃啥
					</view>
				</view>
				<view class="display-item">
					{{ data.currentBuyer }}
					{{ data.currentBuyer ? '买' : '' }}
          {{ data.message }}
				</view>
				<button
					color="#45AB7F"
					@tap="btnClick"
					class="btn-start"
					:class="{ active: data.isActive }"
					>{{ data.btnText }}</button
				>
			</view>
			<!-- <view class="settings">
				<image
					class="setting-icon"
					src="./../../../assets/images/icons/icon_setting.png"
				/>
			</view> -->
		</view>
		<image
			src="https://lexmin.oss-cn-hangzhou.aliyuncs.com/statics/pick-me/images/labixiaoxin.jpg"
			class="bottom-img"
		/>
	</view>
</template>

<script setup>
import Taro from '@tarojs/taro'
import { reactive } from 'vue'
import { useUserStore } from '@/stores/users'
import { useFoodsStore } from '@/stores/foods'

const user = useUserStore()
const foods = useFoodsStore()

console.log('user', user)

/**
 * 食物列表
 */
const foodList = {
	// 早餐列表
	breakfast: foods.foodList,

	// 中午
	lunch: foods.foodList,

	// 晚上
	dinner: foods.foodList,
}

console.log('process.env.TARO_ENV', process.env.TARO_ENV)

const data = reactive({
  containerHeight: process.env.TARO_ENV === 'h5' ? 'calc(100vh - 50px)' : '100vh',
	btnText: '点击开始',
	isActive: false,
	message: foods.foodList[0].name,
	randomId: '',
	currentDuration: '早上',
	currentBuyer: user.userList[0].name,
	foodList: foodList,
	currentList: foodList.breakfast,
	// 当前type
	currentType: 'breakfast',
	// tab列表
	tabList: [
		{
			type: 'breakfast',
			text: '早上',
		},
		{
			type: 'lunch',
			text: '中午',
		},
		{
			type: 'dinner',
			text: '晚上',
		},
	],
	navList: [
		{
			id: 1,
			text: '首页',
			icon: 'https://img11.360buyimg.com/imagetools/jfs/t1/117646/2/11112/1297/5ef83e95E81d77f05/daf8e3b1c81e3c98.png',
		},
		{
			id: 2,
			text: '分类',
			icon: 'https://img12.360buyimg.com/imagetools/jfs/t1/119490/8/9568/1798/5ef83e95E968c69a6/dd029326f7d5042e.png',
		},
		{
			id: 3,
			text: '购物车',
			num: 2,
			icon: 'https://img14.360buyimg.com/imagetools/jfs/t1/130725/4/3157/1704/5ef83e95Eb976644f/b36c6cfc1cc1a99d.png',
		},
		{
			id: 4,
			text: '我的',
			icon: 'https://img12.360buyimg.com/imagetools/jfs/t1/147573/29/1603/1721/5ef83e94E1393a678/5ddf1695ec989373.png',
		},
	],
	navVisible: false,
})

const tabClick = item => {
	data.currentType = item.type
	data.currentList = foods.foodList
}

const btnClick = () => {
  console.log('btnClick')
	if (data.isActive) {
		stopRandom()
	} else {
		startRandom()
	}
}

const startRandom = () => {
	data.isActive = true
	data.btnText = '停'
	var list = data.currentList
	data.randomId = setInterval(() => {
		data.message = list[Math.floor(Math.random() * list.length)].name
		// if (data.currentType === 'breakfast') {
			data.currentBuyer = user.userList[Math.floor(Math.random() * user.userList.length)].name
		// } else {
		// 	data.currentBuyer = ''
		// }
	}, 100)
}

const stopRandom = () => {
	data.isActive = false
	data.btnText = '点击开始'

	// 通过算法计算最终结果
	var arr = data.currentList.reduce(function (a, b) {
		return a.weight + b.weight
	})

	clearInterval(data.randomId)
}
</script>

<style>
.title {
	font-size: 32px;
}
.button {
	border: 1px solid lightgray;
	padding: 5px 10px;
}
</style>
