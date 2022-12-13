<template>
	<view>
		<view id="app">
			{{ schnappiMusic }}
			<audio
				src="@/assets/audios/schnappi.m4a"
				:autoplay="true"
				id="bg_audio"
        style="width: 0;height:0"
			/>

			<view class="head-box">
				<image
					src="@/assets/images/timg.gif"
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
							@click="tabClick"
							:data-type="item.type"
						>
							{{ item.text }}吃啥
						</view>
					</view>
					<view class="display-item">
						{{ data.currentType === 'breakfast' ? data.currentBuyer : '' }}
						{{ data.currentType === 'breakfast' ? '买' : '' }} {{ data.message }}
					</view>
					<view
						class="btn-start"
						v-bind:class="{ active: data.isActive }"
						v-on:click="btnClick"
					>
						{{ data.btnText }}
					</view>
				</view>
			</view>
			<image
				src="@/assets/images/labixiaoxin.jpg"
				class="bottom-img"
			/>
		</view>
	</view>
</template>

<script setup>
import { reactive } from 'vue'

/**
 * 食物列表
 */
const foodList = {
	// 早餐列表
	breakfast: [
		{
			name: '酱香饼',
			weight: 100,
		},
		{
			name: '鸡蛋饼',
			weight: 100,
		},
		{
			name: '热狗卷',
			weight: 100,
		},
		{
			name: '粥+茶叶蛋',
			weight: 100,
		},
		{
			name: '酸菜包*2',
			weight: 100,
		},
	],

	// 中午
	lunch: [
		{
			name: '蒸菜',
			weight: 100,
		},
		{
			name: '厚锅掌勺',
			weight: 100,
		},
		{
			name: '粉',
			weight: 100,
		},
	],

	// 晚上
	dinner: [
		{
			name: '粉',
			weight: 100,
		},
		{
			name: '饭',
			weight: 100,
		},
		{
			name: '凉面',
			weight: 100,
		},
	],
}

const data = reactive({
	btnText: '点击开始',
	isActive: false,
	message: '',
	randomId: '',
	currentDuration: '早上',
	currentBuyer: '张小乐',
	foodList: foodList,
	currentList: foodList.breakfast,
	buyerList: ['张小乐', '黄小敏'],
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
})

/**
 * 根据长度随机生成id
 * @param {*} num 长度
 */
const randomRangeId = (num) => {
	var returnStr = '',
		charStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
	for (var i = 0; i < num; i++) {
		var index = Math.round(Math.random() * (charStr.length - 1))
		returnStr += charStr.substring(index, index + 1)
	}
	return returnStr
}

const currentList = foodList.breakfast

const tabClick = e => {
	var currentNode = e
	var tabElementList = document.getElementsByClassName('tab-item')
	data.currentType = e.target.dataset.type
	data.currentList = data.foodList[data.currentType]
	for (var i = 0; i < tabElementList.length; i++) {
		if (tabElementList[i].dataset.type == data.currentType) {
			tabElementList[i].classList.add('active')
		} else {
			tabElementList[i].classList.remove('active')
		}
	}
}

const btnClick = () => {
	if (data.isActive) {
		stopRandom()
	} else {
		startRandom()
	}
}

const startRandom = () => {
	data.isActive = true
	data.btnText = '停'
	var list = currentList
	data.randomId = setInterval(() => {
		data.message = list[Math.floor(Math.random() * list.length)].name
		if (data.currentType === 'breakfast') {
			data.currentBuyer = data.buyerList[Math.floor(Math.random() * 2)]
		} else {
			data.currentBuyer = ''
		}
	}, 100)
}

const stopRandom = () => {
	data.isActive = false
	data.btnText = '点击开始'

	// 通过算法计算最终结果
	var arr = currentList.reduce(function (a, b) {
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
