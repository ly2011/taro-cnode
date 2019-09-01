import Taro, { Component, createRef } from '@tarojs/taro'
import { connect } from '@tarojs/redux'
import { View } from '@tarojs/components'
import { AtTabs, AtTabsPane } from 'taro-ui'
import Topics from './components/topics'
import styles from './index.module.scss'

const tabList = [{ title: '全部' }, { title: '精华' }, { title: '分享' }, { title: '问答' }, { title: '招聘' }]
const tabs = [
  { index: 0, tab: 'all' },
  { index: 1, tab: 'good' },
  { index: 2, tab: 'share' },
  { index: 3, tab: 'ask' },
  { index: 4, tab: 'job' }
]

@connect(({ home, loading }) => ({
  ...home,
  ...loading
}))
export default class Home extends Component {
  config = {
    navigationBarTitleText: 'CNode 社区'
  }

  constructor() {
    super(...arguments)
    this.state = {
      current: 0
    }
    tabs.forEach(item => {
      this[`${item.tab}Ref`] = createRef()
    })
  }

  handleClick = value => {
    const { dispatch } = this.props
    const tab = tabs.find(item => item.index === value).tab
    dispatch({
      type: 'home/selectTab',
      payload: {
        tab,
        activeKey: value
      }
    })
    this.setState({ current: value })
    const currRef = this[`${tab}Ref`]
    currRef.initData && currRef.initData()
  }

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    const { current } = this.state

    const renderTabPane = () =>
      tabs.map((item, index) => {
        return (
          <AtTabsPane key={`${index}-${item.tab}`} current={current} index={item.index} className={styles.panel}>
            {/* 使用createRef创建的ref在1.3.9版本下获取的current都是null */}
            <Topics tab={item.tab} ref={refDom => (this[`${item.tab}Ref`] = refDom)} />
          </AtTabsPane>
        )
      })
    return (
      <View className={styles.home}>
        <AtTabs current={current} tabList={tabList} onClick={this.handleClick}>
          {renderTabPane}
        </AtTabs>
      </View>
    )
  }
}
