import Taro, { Component } from '@tarojs/taro'
import { connect } from '@tarojs/redux'
import { ScrollView } from '@tarojs/components'
import { AtCard, AtLoadMore } from 'taro-ui'
import dayjs from 'dayjs'
import { getWindowHeight } from '@/utils/dom'
import styles from '../index.module.scss'

@connect(({ home, loading }) => ({
  ...home,
  ...loading
}))
class Topics extends Component {
  constructor(props) {
    super(props)
    this.state = {
      status: 'loading'
    }
  }
  loadData = async (page = 1, tab = '') => {
    const { dispatch } = this.props
    dispatch({
      type: 'home/fetchTopics',
      payload: {
        tab,
        page
      },
      callback: (err, data) => {
        if (err) {
          page !== 1 && this.setState({ page: page - 1 })
          return
        } else {
          page !== 1 && this.setState({ page: page })
        }

        if (data && !data.length) {
          this.setState({
            status: 'noMore'
          })
        }
      }
    })
  }
  handleClick = () => {
    this.setState({
      status: 'loading'
    })
    this.loadMore()
  }
  onEndReached = () => {
    this.loadMore()
  }
  onItemPressed = (title, content) => {
    console.log('我被点击了')
  }
  // 加载更多
  loadMore = () => {
    const { data, ownTab: tab } = this.props
    const { page } = data[tab]
    this.loadData(page + 1, tab)
  }
  // 初始化数据
  initData = async () => {
    const { data, ownTab: tab } = this.props
    const { page } = data[tab]
    this.loadData(page, tab)
  }
  componentDidMount() {
    this.initData()
  }
  render() {
    const { data, ownTab: tab, effects } = this.props
    if (!tab) return null
    const topics = data[tab].list || []
    const { status } = this.state

    const renderItem = topics.map((item, index) => (
      <AtCard
        key={`${index}-${tab}`}
        note={dayjs(item.last_reply_at).format('YYYY-MM-DD HH:mm')}
        extra={`${item.reply_count}/${item.visit_count}`}
        title={item.author.loginname}
        thumb={item.author.avatar_url}
        className={styles.card}
        onClick={() => {
          this.onItemPressed(item.title, item.content)
        }}
      >
        {item.title}
      </AtCard>
    ))
    return (
      <ScrollView
        scrollY
        style={{ height: getWindowHeight() }}
        lowerThreshold={100}
        enableBackToTop
        onScrollToLower={this.onEndReached}
      >
        {renderItem}
        {<AtLoadMore onClick={this.handleClick} status={status} />}
      </ScrollView>
    )
  }
}

export default Topics
