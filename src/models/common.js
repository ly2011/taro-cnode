import Taro from '@tarojs/taro'

export default {
  namespace: 'common',
  state: {
    access_token: Taro.getStorageInfoSync('access_token')
  },
  effects: {},
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload }
    }
  }
}
