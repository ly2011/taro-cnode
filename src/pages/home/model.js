import getTopicByTabName from '@/api'

export default {
  namespace: 'home',
  state: {
    tab: 'all',
    data: {
      all: {
        list: [],
        page: 1
      },
      share: {
        list: [],
        page: 1
      },
      job: {
        list: [],
        page: 1
      },
      good: {
        list: [],
        page: 1
      },
      ask: {
        list: [],
        page: 1
      }
    }
  },
  reducers: {
    selectTab(state, { payload: { tab, activeKey } }) {
      return {
        ...state,
        tab,
        activeKey
      }
    },
    tabData(state, { payload: { tab, data, page } }) {
      // if (state.page < page) {
      //   let topics = state.data
      //   data = topics.concat(data)
      // }
      if (state.data[tab].page < page) {
        let topics = state.data[tab].list
        data = topics.concat(data)
      }
      // console.log('store - tabData: ', state.data)
      return {
        ...state,
        data: { ...state.data, ...{ [tab]: { list: data, page } } }
      }
    }
  },
  effects: {
    *fetchTopics({ payload: { tab, page = 1, limit = 10 }, callback }, { call, put }) {
      const data = yield call(getTopicByTabName, { tab, page, limit })
      yield put({
        type: 'tabData',
        payload: {
          tab,
          data: data.data,
          page: +page
        }
      })
      callback && callback(!data.success, data.data)
    }
  }
}
