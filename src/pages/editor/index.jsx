import React, { Component } from 'react';
import { View, Editor } from '@tarojs/components';
import Taro from '@tarojs/api';
import { getCurrentInstance } from '@tarojs/taro';
import dayjs from 'dayjs';
import { Picker} from '@tarojs/components';
import { AtList, AtListItem, AtButton } from "taro-ui";
import style from './index.less';
import { navigateBack, isEmpty } from '../../utils';

class Index extends Component {
  editorReady = e => {
    Taro.createSelectorQuery().select('#editor').context((res) => {
      this.editorCtx = res.context
    }).exec()
  }

  render () {
    return (
      <Editor
        id='editor'
        className='editor'
        showImgToolbar
        showImgSize
        showImgResize
        placeholder="请输入"
        onReady={this.editorReady}
      />
    )
  }
}

export default Index

