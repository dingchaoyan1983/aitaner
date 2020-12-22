import React from 'react';
import { connect } from 'react-redux';
import Taro from '@tarojs/taro';
import { publish } from '../../entities/actions/fairs';
import { View } from '@tarojs/components';
import MessageForm from '../../components/message-form';
import AuthComponent from '../../auth-component';
import { AtButton } from 'taro-ui';

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
      images,
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
      await publish({
        images,
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
    } catch (e) {
      Taro.showToast({
        title: '发布失败',
        icon: 'none',
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
      <View>
        <MessageForm
          name={name}
          onChangeName={this.onChangeName}
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
        <View>
          <AtButton type='primary' onClick={this.publish}>发布</AtButton>
        </View>
      </View>
    )
  }
}

export default Index

