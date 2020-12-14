import React, { Component, createRef } from 'react';
import { View } from '@tarojs/components';
import { AtButton } from 'taro-ui';
import { getCurrentInstance } from '@tarojs/taro';
import Taro from '@tarojs/taro';
import Editor from '../../components/editor';
import style from './index.less';
import { navigateBack, isEmpty } from '../../utils';

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

  componentDidShow() {
    const { html } = getCurrentInstance().router.params;
    if (!isEmpty(html)) {
      this.setState({
        html: decodeURIComponent(html),
      });
    }
  }

  getHtml = () => {
    this.editorRef.current.getEditorContext().getContents({
      success: ({ html }) => {
        navigateBack({
          key: 'desc',
          value: html,
        });
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

