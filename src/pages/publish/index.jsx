import React from 'react';
import { connect } from 'react-redux';
import { View } from '@tarojs/components';
import MessageForm from '../../components/message-form';
import AuthComponent from '../../auth-component';
import style from './index.less';

const publish = ({ action, ...meta }) => (dispatch) => dispatch(action(meta));

@connect(undefined, {
  publish,
})
class Index extends AuthComponent {
  render () {
    return (
      <View className={style.Root}>
        <MessageForm
          publish={this.props.publish}
        />
      </View>
    )
  }
}

export default Index

