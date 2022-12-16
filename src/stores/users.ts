import { ref } from 'vue'
import { defineStore } from 'pinia'
import Taro from '@tarojs/taro'

interface User {
  name: string
}
const USER_LIST = 'userList'

export const useUserStore = defineStore('users', () => {
  const userList = ref<User[]>(Taro.getStorageSync(USER_LIST)||[
    {
      name: '小明'
    },
    {
      name: '小红'
    },
  ])

  const addUser = (user: User) => {
    userList.value.push(user)
    Taro.setStorageSync(USER_LIST, userList.value)
  }

  const deleteUser = (userName: string) => {
    const newList = userList.value.filter((item) => item.name !== userName)
    userList.value = newList
    Taro.setStorageSync(USER_LIST, newList)
  }

  return {
    userList,
    addUser,
    deleteUser
  }
})
