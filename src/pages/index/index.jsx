import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View } from '@tarojs/components'
import { AtSearchBar } from 'taro-ui'
import { Swiper, SwiperItem } from '@tarojs/components'
import { AtTabs, AtTabsPane } from 'taro-ui'
import './index.less'


@connect(({ counter }) => ({
  counter
}), (dispatch) => ({
  add () {
    dispatch(add())
  },
  dec () {
    dispatch(minus())
  },
  asyncAdd () {
    dispatch(asyncAdd())
  }
}))
class Index extends Component {
  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    const tabList = [{ title: '摊主互租' }, { title: '兼职招聘' }, { title: '摊位招租' }]
    return (
      <View className='index'>
        <AtSearchBar
          placeholder="请输入关键字查询信息..."
        />
        <Swiper
          className='test-h'
          indicatorColor='#999'
          indicatorActiveColor='#333'
          circular
          indicatorDots
          autoplay>
          <SwiperItem>
            <View className='demoText'>1</View>
          </SwiperItem>
          <SwiperItem>
            <View className='demoText'>2</View>
          </SwiperItem>
          <SwiperItem>
            <View className='demoText'>3</View>
          </SwiperItem>
        </Swiper>
        <AtTabs tabList={tabList}>
          <AtTabsPane index={0} >
            <View style='padding: 100px 50px;background-color: #FAFBFC;text-align: center;' >标签页一的内容</View>
          </AtTabsPane>
          <AtTabsPane index={1}>
            <View style='padding: 100px 50px;background-color: #FAFBFC;text-align: center;'>标签页二的内容</View>
          </AtTabsPane>
          <AtTabsPane index={2}>
            <View style='padding: 100px 50px;background-color: #FAFBFC;text-align: center;'>标签页三的内容</View>
          </AtTabsPane>
        </AtTabs>

      </View>
    )
  }
}

export default Index

