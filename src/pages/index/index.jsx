import React, { Component } from 'react';
import Taro from '@tarojs/taro';
import { View, Image, Swiper, SwiperItem } from '@tarojs/components';
import { AtTabs, AtTabsPane, AtSearchBar } from 'taro-ui';
import style from  './index.less';
import { activityCategories } from '../../constants';

const indexCategories = [{ id: 'hotspot', name: '热点', component: null }, ...activityCategories];
const FIXED_HEIGHT = 240;

class Index extends Component {
  constructor(...args) {
    super(...args);
    this.sysInfo = Taro.getSystemInfoSync();
    this.tabList = indexCategories.map((item) => ({
      title: item.name,
    }));
    this.components = indexCategories.map((item) => item.component)
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

  componentDidMount () {
  }

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
        </Swiper>
        <AtTabs
          tabList={this.tabList}
          current={this.state.current}
          onClick={this.handleClick}
        >
          {
            this.components.map((component, index) => (
              <AtTabsPane current={this.state.current} index={index}>
                {
                  component ? React.createElement(component) : null
                }
              </AtTabsPane>
            ))
          }
        </AtTabs>
      </View>
    )
  }
}

export default Index

