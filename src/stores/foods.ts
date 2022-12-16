import { ref } from 'vue'
import { defineStore } from 'pinia'
import Taro from '@tarojs/taro'

interface Food {
  name: string
}
const FOOD_LIST = 'foodList'

export const useFoodsStore = defineStore('foods', () => {
  const foodList = ref<Food[]>(Taro.getStorageSync(FOOD_LIST)||[
    {
      name: '煲仔饭'
    },
    {
      name: '盖浇饭'
    },
  ])

  const addFood = (food: Food) => {
    foodList.value.push(food)
    Taro.setStorageSync(FOOD_LIST, foodList.value)
  }

  const deleteFood = (foodName: string) => {
    const newList = foodList.value.filter((item) => item.name !== foodName)
    foodList.value = newList
    Taro.setStorageSync(FOOD_LIST, newList)
  }

  return {
    foodList,
    addFood,
    deleteFood
  }
})
