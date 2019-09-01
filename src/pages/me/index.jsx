import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
export default class Index extends Component {

  config = {
    navigationBarTitleText: '我的'
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='me'>
        <Text>个人中心</Text>
      </View>
    )
  }
}
