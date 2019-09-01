import '@tarojs/async-await'
import Taro, { Component } from '@tarojs/taro'
import { Provider } from '@tarojs/redux'
import dva from '@/utils/dva'
import models from '@/models'

import Home from './pages/home'

import './custom-variables.scss'
import './app.scss'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

const dvaApp = dva.createApp({
  initialState: {},
  models: models
})
const store = dvaApp.getStore()

class App extends Component {
  config = {
    pages: ['pages/home/index', 'pages/me/index'],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'CNode 社区',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      color: '#666',
      selectedColor: '#E93B3D',
      backgroundColor: '#fafafa',
      borderStyle: 'white',
      list: [
        {
          pagePath: 'pages/home/index',
          iconPath: './assets/img/tab-bar/home.png',
          selectedIconPath: './assets/img/tab-bar/home-active.png',
          text: '首页'
        },
        {
          pagePath: 'pages/me/index',
          iconPath: './assets/img/tab-bar/user.png',
          selectedIconPath: './assets/img/tab-bar/user-active.png',
          text: '我的'
        }
      ]
    }
  }

  componentDidMount() {}

  componentDidShow() {}

  componentDidHide() {}

  componentDidCatchError() {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <Provider store={store}>
        <Home />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
