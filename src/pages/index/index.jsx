import React, { Component } from 'react';
import { connect } from 'react-redux';
import Taro from '@tarojs/taro';
import { View, ScrollView, Image, Swiper, SwiperItem } from '@tarojs/components';
import { AtTabs, AtTabsPane, AtSearchBar } from 'taro-ui';
import style from  './index.less';
import Message from '../../components/message';

const FIXED_HEIGHT = 240;

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
  constructor(...args) {
    super(...args);
    this.sysInfo = Taro.getSystemInfoSync();
    this.tabList = [{ title: '热门' }, { title: '摊主互租' }, { title: '兼职招聘' }, { title: '摊位招租' }];
    this.scrollHeight = this.sysInfo.windowHeight - FIXED_HEIGHT;
    this.state = {
      current: 0,
      keywords: ''
    }
  }

  handleClick = (value) => {
    this.setState({
      current: value
    })
  }

  onChangeKeywords = (value) => {
    this.setState({
      keywords: value,
    });
  }

  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className={style.Index}>
        <AtSearchBar
          value={this.state.keywords}
          placeholder="请输入关键字查询信息..."
          onChange={this.onChangeKeywords}
        />
        <Swiper
          circular
          autoplay>
          <SwiperItem>
            <Image mode="aspectFill" className={style.Image} src="https://resources.betalpha.com/letter/research1.jpg"></Image>
          </SwiperItem>
          {/* <SwiperItem>
            <Image className={style.Image} src="https://resources.betalpha.com/letter/research2.jpg"></Image>
          </SwiperItem>
          <SwiperItem>
            <Image className={style.Image} src="https://resources.betalpha.com/letter/research3.jpg"></Image>
          </SwiperItem> */}
        </Swiper>
        <AtTabs
          tabList={this.tabList}
          current={this.state.current}
          onClick={this.handleClick}
        >
          <AtTabsPane current={this.state.current} index={0}>
            <ScrollView scrollY style={{height: this.scrollHeight}}>
              {
                [0,1,2,3,4,5,6,7,8,9].map(() => <Message title="[热门]xxxxxxx"/>)
              }
            </ScrollView>
          </AtTabsPane>
          <AtTabsPane current={this.state.current} index={1}>
            <ScrollView scrollY style={{height: this.scrollHeight}}>
              {
                [0,1,2,3,4,5,6,7,8,9].map(() => <Message title="[摊位转租]xxxxxxx"/>)
              }
            </ScrollView>
          </AtTabsPane>
          <AtTabsPane current={this.state.current} index={2}>
            <ScrollView scrollY style={{height: this.scrollHeight}}>
              {
                [0,1,2,3,4,5,6,7,8,9].map(() => <Message title="[兼职招聘]xxxxxxx"/>)
              }
            </ScrollView>
          </AtTabsPane>
          <AtTabsPane current={this.state.current} index={3}>
            <ScrollView scrollY style={{height: this.scrollHeight}}>
              {
                [0,1,2,3,4,5,6,7,8,9].map(() => <Message title="[摊位招租]xxxxxxx"/>)
              }
            </ScrollView>
          </AtTabsPane>
        </AtTabs>
      </View>
    )
  }
}

export default Index

