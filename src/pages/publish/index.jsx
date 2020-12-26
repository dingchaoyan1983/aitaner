import React from 'react';
import { connect } from 'react-redux';
import Taro from '@tarojs/taro';
import { AtButton, AtMessage } from 'taro-ui';
import { publish } from '../../entities/actions/fairs';
import { View } from '@tarojs/components';
import MessageForm from '../../components/message-form';
import AuthComponent from '../../auth-component';
import { isEmpty } from '../../utils';
import style from './index.less';

@connect(undefined, {
  publish,
})
class Index extends AuthComponent {
  constructor(...args) {
    super(...args);    
    this.state = {
      startTime: (new Date()).getTime(),
      images: [],
      selectedCategory: {},
      description: '',
    };
  }

  onChooseImages = (images) => {
    this.setState({
      images: [...this.state.images, ...images],
    });
  }

  onRemoveImage = (index) => {
    const images = this.state.images;
    images.splice(index, 1);
    this.setState({
      images: [...images]
    });
  }

  onSelectActivityCategory = (selectedCategory) => {
    this.setState({
      selectedCategory,
    });
  }

  onChangeName = (name) => {
    this.setState({
      name,
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
      description: html,
    });
  }

  onChangeApplicantsLimit = (applicantsLimit) => {
    this.setState({
      applicantsLimit,
    });
  }

  onChangeCharge = (charge) => {
    this.setState({
      charge,
    });
  }


  onChangeTel = (tel) => {
    this.setState({
      tel,
    });
  }

  validate = () => {
    const {
      selectedCategory,
      name,
      tel,
      location,
      charge,
    } = this.state;
    if (Object.keys(selectedCategory).length === 0) {
      Taro.atMessage({
        message: '请选择发布类型',
        type: 'error',
      });
      return;
    }

    if (isEmpty(name)) {
      Taro.atMessage({
        message: '请填写标题',
        type: 'error',
      });
      return;
    }

    if (isEmpty(location)) {
      Taro.atMessage({
        message: '请填写地点',
        type: 'error',
      });
      return;
    }

    if (isEmpty(charge)) {
      Taro.atMessage({
        message: '请填写摊位费用',
        type: 'error',
      });
      return;
    }

    if (isEmpty(tel)) {
      Taro.atMessage({
        message: '请填写手机号码',
        type: 'error',
      });
      return;
    }

    return true;
  }

  reset = () => {
    this.setState({
      startTime: (new Date()).getTime(),
      images: [],
      selectedCategory: {},
      description: '',
      tel: undefined,
      charge: undefined,
      location: undefined,
      name: '',
      applicantsLimit: undefined,
      latitude: undefined,
      longitude: undefined,
      endTime: undefined,
    })
  }

  publish = async () => {
    const { publish } = this.props;
    const {
      images,
      name = '',
      applicantsLimit = -1,
      description,
      latitude,
      location,
      longitude,
      startTime,
      endTime = -1,
      charge,
      tel,
    } = this.state;
    try {
      if (this.validate()) {
        await publish({
          showUrls: images,
          name,
          applicantsLimit,
          description,
          latitude,
          location,
          longitude,
          startTime,
          endTime,
          charge,
          tel,
        });
        Taro.showToast({
          title: '发布成功',
          icon: 'success',
          duration: 5000,
        });
        this.reset();
      }
    } catch (e) {
      Taro.showToast({
        title: '发布失败',
        icon: 'none',
        duration: 5000,
      });
    }
  }

  render () {
    const {
      name,
      images,
      selectedCategory,
      startTime,
      endTime,
      latitude,
      longitude,
      location,
      description,
      applicantsLimit,
      charge,
      tel,
    } = this.state;

    return (
      <View className={style.Root}>
        <AtMessage />
        <MessageForm
          name={name}
          onChangeName={this.onChangeName}
          images={images}
          onChooseImages={this.onChooseImages}
          onRemoveImage={this.onRemoveImage}
          selectedCategory={selectedCategory}
          onSelectActivityCategory={this.onSelectActivityCategory}
          startTime={startTime}
          onSelectStartTime={this.onSelectStartTime}
          endTime={endTime}
          onSelectEndTime={this.onSelectEndTime}
          latitude={latitude}
          longitude={longitude}
          location={location}
          onChooseLocation={this.onChooseLocation}
          description={description}
          onEditDesc={this.onEditDesc}
          applicantsLimit={applicantsLimit}
          onChangeApplicantsLimit={this.onChangeApplicantsLimit}
          charge={charge}
          onChangeCharge={this.onChangeCharge}
          tel={tel}
          onChangeTel={this.onChangeTel}
        />
        <View className={style.PublishButton}>
          <AtButton type='primary' onClick={this.publish}>发布</AtButton>
        </View>
      </View>
    )
  }
}

export default Index

