import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { add, minus, asyncAdd } from '../../actions/counter';
import { login } from '../../entities/actions/session';
import { View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import MessageForm from '../../components/message-form';
import { AtButton } from 'taro-ui';

@connect(({ counter }) => ({
  counter
}), {
  login,
})
class Index extends Component {
  constructor(...args) {
    super(...args);    
    this.state = {
      startTime: (new Date()).getTime(),
      images: [],
      selectedCategory: {},
      desc: '',
    };
  }

  onChooseImages = (images) => {
    this.setState({
      images,
    });
  }

  onSelectActivityCategory = (selectedCategory) => {
    this.setState({
      selectedCategory,
    });
  }

  onChangeTitle = (title) => {
    this.setState({
      title,
    });
  }

  onSelectStartTime = (startTime) => {
    this.setState({
      startTime
    });
  }

  onSelectEndTime = (endTime) => {
    this.setState({
      endTime
    });
  }

  onChooseLocation = (location) => {
    this.setState({
      ...location,
    });
  }

  onEditDesc = (html) => {
    this.setState({
      desc: html,
    });
  }

  onChangeApplicantsLimit = (applicantsLimit) => {
    this.setState({
      applicantsLimit,
    });
  }

  publish = ({ detail: userInfo }) => {
    const { login } = this.props;
    Taro.login({
      success: function (res) {
        if (res.code) {
          console.log(res.code);
          //发起网络请求
          login({ code: res.code });
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  }

  render () {
    const {
      title,
      images,
      selectedCategory,
      startTime,
      endTime,
      latitude,
      longitude,
      address,
      desc,
      applicantsLimit,
    } = this.state;

    return (
      <View>
        <MessageForm
          title={title}
          onChangeTitle={this.onChangeTitle}
          images={images}
          onChooseImages={this.onChooseImages}
          selectedCategory={selectedCategory}
          onSelectActivityCategory={this.onSelectActivityCategory}
          startTime={startTime}
          onSelectStartTime={this.onSelectStartTime}
          endTime={endTime}
          onSelectEndTime={this.onSelectEndTime}
          latitude={latitude}
          longitude={longitude}
          address={address}
          onChooseLocation={this.onChooseLocation}
          desc={desc}
          onEditDesc={this.onEditDesc}
          applicantsLimit={applicantsLimit}
          onChangeApplicantsLimit={this.onChangeApplicantsLimit}
        />
        <AtButton type='primary' openType="getUserInfo" onGetUserInfo={this.publish}>发布</AtButton>
      </View>
    )
  }
}

export default Index

