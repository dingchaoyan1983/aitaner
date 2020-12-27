import React, { Component } from 'react';
import Taro from '@tarojs/taro';
import { View, Image, Swiper, SwiperItem } from '@tarojs/components';
import { AtTabs, AtTabsPane, AtSearchBar } from 'taro-ui';
import style from  './index.less';
import { activityCategories } from '../../constants';

const indexCategories = [{ id: 'hotspot', name: '热点', component: null }, ...activityCategories];
const FIXED_HEIGHT = 60;

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

  onPullDownRefresh = () =>{
    console.log('refresh');
  }


  render () {
    return (
      <View className={style.Index}>
        <AtTabs
          tabList={this.tabList}
          current={this.state.current}
          onClick={this.handleClick}
        >
          {
            this.components.map((component, index) => (
              <AtTabsPane current={this.state.current} index={index}>
                {
                  component ? React.createElement(component, { height: this.scrollHeight  }) : null
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

