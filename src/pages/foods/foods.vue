<template>
	<view class="user-list-container">
		<input
			class="user-input"
			type="text"
			placeholder="请输入食物名称"
			:value="data.foodName"
			@input="handleFoodNameChange"
		/>
		<button @tap="handleAddFood">新增食物</button>
		<view class="user-list-box">
			<view class="mt-20 user-list-header"> 食物列表 </view>
			<view class="user-list">
				<view
					class="user-item"
					v-for="item in foods.foodList.filter(item => item.name)"
					:key="item.id"
				>
					<view class="user-item name">
						{{ item.name }}
					</view>
					<view
						class="user-item-delete"
						@tap="deleteFood(item)"
					>
						删除
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
import Taro from '@tarojs/taro'
import { reactive } from 'vue'
import { useFoodsStore } from '@/stores/foods'
import './foods.less'

const foods = useFoodsStore()

const data = reactive({
	foodName: '',
})

const handleFoodNameChange = event => {
	data.foodName = event.detail.value
}

const handleAddFood = () => {
	if (!data.foodName) {
		Taro.showToast({
			title: '食物名不能为空～',
			icon: 'none',
		})
		return
	}
	const isExisted = foods.foodList.find(item => item.name === data.foodName)
	if (isExisted) {
		Taro.showToast({
			title: '该食物已存在了哦～',
			icon: 'none',
		})
		return
	}
	foods.addFood({ name: data.foodName })
	Taro.showToast({
		title: '添加食物成功',
		icon: 'success',
	})
  data.foodName = ''
}

const deleteFood = (item) => {
	foods.deleteFood(item.name)
	Taro.showToast({
		title: '删除食物成功',
		icon: 'success',
	})
}
</script>
