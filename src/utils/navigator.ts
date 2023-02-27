import Taro from '@tarojs/taro'

export const isMobile = () => {
  return /Mobi|Android|iPhone/i.test(navigator.userAgent)
}

export const checkMobile = () => {
  if (!isMobile()) {
    Taro.showModal({
      title: '为了更好的体验，请在移动端查看此页面',
      showCancel: false,
      success: res => {
        if (res.confirm) {
          checkMobile()
        }
      }
    })
  }
}
