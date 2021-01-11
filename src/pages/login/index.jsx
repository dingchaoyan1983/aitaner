import React, { Component } from 'react';
import Taro from '@tarojs/taro';
import { connect } from 'react-redux'
import { View, Button, Text } from '@tarojs/components';
import { AtButton } from 'taro-ui';
import { login } from '../../entities/actions/session';
import style from './index.less';

@connect(undefined, {
  login,
})
class Index extends Component {
  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  login = ({ detail: { userInfo } }) => {
    if (userInfo) {
      Taro.login({
        success: async ({ code }) => {
          if (code) {
            await this.props.login({
              code,
              ...userInfo,
            });
            Taro.showToast({
              title: '登录成功',
              icon: 'success',
              success: () => {
                Taro.navigateBack();
              }
            })
          } else {
            console.log('登录失败！' + res.errMsg)
          }
        }
      })
    }
  }

  render () {
    return (
      <View className={style.Index}>
        <AtButton className={style.Button} type="primary" openType="getUserInfo" onGetUserInfo={this.login}>登录</AtButton>
        <AtButton className={style.Button}>取消</AtButton>
      </View>
    )
  }
}

export default Index

