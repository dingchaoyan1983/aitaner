import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { add, minus, asyncAdd } from '../../actions/counter'
import MessageForm from '../../components/message-form';

// @connect(({ counter }) => ({
//   counter
// }), (dispatch) => ({
//   add () {
//     dispatch(add())
//   },
//   dec () {
//     dispatch(minus())
//   },
//   asyncAdd () {
//     dispatch(asyncAdd())
//   }
// }))
class Index extends Component {
  constructor(...args) {
    super(...args);    
    this.state = {
      startTime: (new Date()).getTime(),
      images: [],
      selectedCategory: {},
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

  render () {
    const {
      title,
      images,
      selectedCategory,
      startTime,
      endTime,
    } = this.state;

    return (
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
      />
    )
  }
}

export default Index

