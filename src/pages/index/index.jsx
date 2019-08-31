import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.scss'

const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export default class Index extends Component {

  config = {
    navigationBarTitleText: '首页'
  }

  componentWillMount () { }

  async componentDidMount () {
    console.log('Hello')
    await sleep(2000)
    console.log('world!')
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='index'>
        <Text>Hello world!</Text>
        <Text>我是首页中的战斗机</Text>
      </View>
    )
  }
}
