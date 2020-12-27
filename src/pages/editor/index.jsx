import React, { Component, createRef } from 'react';
import { View } from '@tarojs/components';
import { AtButton } from 'taro-ui';
import Taro, { getCurrentInstance } from '@tarojs/taro';
import Editor from '../../components/editor';
import style from './index.less';
import { receiveMessageOnLoad, navigateBack, isEmpty } from '../../utils';

const FIXED_HEIGHT = 65;
class Index extends Component {
  constructor(...args) {
    super(...args);
    this.editorRef = createRef();
    this.sysInfo = Taro.getSystemInfoSync();
    this.editorHeight = this.sysInfo.windowHeight - FIXED_HEIGHT;
    this.state = {
      html: '',
    }
  }

  onLoad() {
    const { pid } = getCurrentInstance().router.params;
    Taro.eventCenter.once(`send:message:${pid}`, (...args) => {
      this.initHtml(...args);
    });
    Taro.eventCenter.trigger(`openingPage:ready:${pid}`)
  }

  initHtml(html) {
    if (!isEmpty(html)) {
      this.setState({
        html,
      });
    }
  }

  getHtml = () => {
    this.editorRef.current.getEditorContext().getContents({
      success: ({ html }) => {
        navigateBack(html);
      }
    })
  }
  render () {
    return (
      <View className={style.Root}>
        <Editor ref={this.editorRef} html={this.state.html} style={{height: this.editorHeight}} />
        <AtButton type='primary' onClick={this.getHtml}>确定</AtButton>
      </View>
    )
  }
}

export default Index

