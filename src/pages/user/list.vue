<template>
	<view class="user-list-container">
		<input
			class="user-input"
			type="text"
			placeholder="请输入用户名称"
			:value="data.userName"
			@input="handleUserNameChange"
		/>
		<button @tap="handleAddUser">新增用户</button>
		<view class="user-list-box">
			<view class="mt-20 user-list-header"> 用户列表 </view>
			<view class="user-list">
				<view
					class="user-item"
					v-for="item in user.userList.filter(item => item.name)"
					:key="item.id"
				>
					<view class="user-item name">
						{{ item.name }}
					</view>
					<view
						class="user-item-delete"
						@tap="deleteUser(item)"
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
import { useUserStore } from '@/stores/users'
import './list.less'

const user = useUserStore()

const data = reactive({
	userName: '',
})

const handleUserNameChange = event => {
	console.log('handleUserNameChange', event)
	data.userName = event.detail.value
}

const handleAddUser = () => {
	console.log('data.userName', data.userName)
	if (!data.userName) {
		Taro.showToast({
			title: '用户名不能为空～',
			icon: 'none',
		})
		return
	}
	const isExisted = user.userList.find(item => item.name === data.userName)
	if (isExisted) {
		Taro.showToast({
			title: '该用户已存在了哦～',
			icon: 'none',
		})
		return
	}
	user.addUser({ name: data.userName })
	Taro.showToast({
		title: '添加用户成功',
		icon: 'success',
	})
  data.userName = ''
}

const deleteUser = (item) => {
	user.deleteUser(item.name)
	Taro.showToast({
		title: '删除用户成功',
		icon: 'success',
	})
}
</script>
