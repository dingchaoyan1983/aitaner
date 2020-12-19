import React from 'react';
import { connect } from 'react-redux';
// import { add, minus, asyncAdd } from '../../actions/counter';
import { login } from '../../entities/actions/session';
import { publish } from '../../entities/actions/fairs';
import { View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import MessageForm from '../../components/message-form';
import AuthComponent from '../../auth-component';
import { AtButton } from 'taro-ui';


@connect(({ counter }) => ({
  counter
}), {
  login,
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

  publish = () => {
    const { publish } = this.props;
    publish();
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
        />
        <AtButton type='primary' onClick={this.publish}>发布</AtButton>
      </View>
    )
  }
}

export default Index

