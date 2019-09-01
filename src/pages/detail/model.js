import { getTopicById } from '@/api'

export default {
  namespace: 'detail',
  state: {
    article: null
  },
  reducers: {
    save(state, { payload: { data } }) {
      return {
        ...state,
        article: data
      }
    }
  },
  effects: {
    *fetch({ payload: { id }, callback }, { call, put }) {
      try {
        const data = yield call(getTopicById, id)
        if (data.success) {
          yield put({
            type: 'save',
            payload: {
              data: data.data
            }
          })
        }
        callback && callback(!data.success, data.data)
      } catch (error) {
        console.log('fetch data error: ', error)
        callback && callback(error, null)
      }
    }
  }
}
