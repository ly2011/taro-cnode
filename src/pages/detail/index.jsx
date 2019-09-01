import Taro, { Component } from '@tarojs/taro'
import { connect } from '@tarojs/redux'
import { View, ScrollView } from '@tarojs/components'
import { AtActivityIndicator } from 'taro-ui'
import { getWindowHeight } from '@/utils/dom'
import WxParse from '@/components/wxParse/wxParse'
import styles from './detail.module.scss'
import './wxParse.scss'
import './markdown.scss'

@connect(({ detail, loading }) => ({
  ...detail,
  isLoad: loading.effects['detail/fetch']
}))
class Detail extends Component {
  state = {
    isMounted: false
  }
  loadData = async id => {
    const { dispatch } = this.props
    dispatch({
      type: 'detail/fetch',
      payload: {
        id
      },
      callback: (err, data) => {
        // 绑定数据
        const { content: article = '', title = '' } = data || {}
        WxParse.wxParse('article', 'html', article, this.$scope, 5)
        Taro.setNavigationBarTitle({ title })
        this.setState({ isMounted: true })
      }
    })
  }
  componentDidMount() {
    const { id } = this.$router.params
    this.loadData(id)
  }

  render() {
    const { isLoad } = this.props
    const { isMounted } = this.state
    console.log('isMounted: ', isMounted)
    if (isLoad) return <AtActivityIndicator content='数据加载中...' />
    // if (!article) return null
    if (!isMounted) return null
    return (
      <View className={styles.scrollview}>
        <ScrollView scrollY style={{ height: getWindowHeight() }} lowerThreshold={100} enableBackToTop>
          <import src='../../components/wxParse/wxParse.wxml' />
          {/* eslint-disable-next-line react/forbid-elements */}
          <template is='wxParse' data='{{wxParseData:article.nodes}}' />
        </ScrollView>
      </View>
    )
  }
}

export default Detail
