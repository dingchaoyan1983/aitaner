import React, { Component } from 'react';
import { View } from '@tarojs/components';
import { getCurrentInstance } from '@tarojs/taro';
import dayjs from 'dayjs';
import { Picker} from '@tarojs/components';
import { AtList, AtListItem, AtButton } from "taro-ui";
import style from './index.less';
import { navigateBack } from '../../utils';

class Index extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      dateSel: '',
      timeSel: '',
    };
  }

  componentDidShow(...args) {
    const {time, key} = getCurrentInstance().router.params;
    this.key = key;
    const date = dayjs(Number(time));
    const dateSel = date.format('YYYY-MM-DD');
    const timeSel = date.format('HH:mm');
    this.setState({
      dateSel,
      timeSel,
    })
  }

  onDateChange = e => {
    this.setState({
      dateSel: e.detail.value
    })
  }

  onTimeChange = e => {
    this.setState({
      timeSel: e.detail.value
    })
  }

  onConfirm = () => {
    const time = dayjs(`${this.state.dateSel} ${this.state.timeSel}`, 'YYYY-MM-DD HH:ss').toDate().getTime();
    navigateBack({
      key: this.key,
      value: time,
    });
  }

  render () {
    return (
      <View className={style.Root}>
            <AtList>
              <Picker mode='date' value={this.state.dateSel} onChange={this.onDateChange}>
                <AtListItem title='请选择日期' extraText={this.state.dateSel} />
              </Picker>
              <Picker mode='time' value={this.state.timeSel}  onChange={this.onTimeChange}>
                <AtListItem title='请选择时间' extraText={this.state.timeSel} />
              </Picker>
            </AtList>
            <AtButton type='primary' onClick={this.onConfirm}>确定</AtButton>
      </View>
    )
  }
}

export default Index

