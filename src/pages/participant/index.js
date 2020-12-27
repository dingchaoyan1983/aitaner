import React from 'react';
import { connect } from 'react-redux';
import Taro, { getCurrentInstance } from '@tarojs/taro';
import { AtButton, AtMessage } from 'taro-ui';
import { publish } from '../../entities/actions/fairs';
import { View } from '@tarojs/components';
import MessageDetail from '../../components/message-detail';
import AuthComponent from '../../auth-component';
import style from './index.less';
import message from '../../components/message';

@connect(undefined, {
  publish,
})
class Index extends AuthComponent {
  constructor(...args) {
    super(...args);    
    this.state = {};
  }

  onLoad() {
    const { pid } = getCurrentInstance().router.params;
    Taro.eventCenter.once(`send:message:${pid}`, (message = {}) => {
      this.setState({
        ...message,
      })
    });
    Taro.eventCenter.trigger(`openingPage:ready:${pid}`)
  }

  apply = () => {
    
  }

  render () {
    return (
      <View className={style.Root}>
        <MessageDetail {...this.state}/>
        <View className={style.PublishButton}>
          <AtButton type='primary' onClick={this.apply}>报名</AtButton>
        </View>
      </View>
    )
  }
}

export default Index

