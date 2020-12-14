import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Button, Text } from '@tarojs/components';
import { AtButton } from 'taro-ui';

import { add, minus, asyncAdd } from '../../actions/counter'

import style from './index.less'

class Index extends Component {
  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  login = ({ detail: { userInfo } }) => {
    console.log(userInfo);
  }

  render () {
    return (
      <View className={style.Index}>
        <View>
          <AtButton openType="getUserInfo" onGetUserInfo={this.login}>登录</AtButton>
          <AtButton >取消</AtButton>
        </View>
      </View>
    )
  }
}

export default Index

