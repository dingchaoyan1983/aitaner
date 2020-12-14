import React, { useCallback } from 'react';
import { View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { AtIcon } from 'taro-ui';
import style from './index.less';
import { identity } from '../../utils';

export default ({
  onChooseImages  = identity,
}) => {
  const chooseImages = useCallback(() => {
    Taro.chooseImage().then((res) => {
      onChooseImages(res.tempFilePaths)
    }); 
  }, [onChooseImages]);

  return (
    <View className={style.Root} onClick={chooseImages}>
      <AtIcon value='camera' size='30'></AtIcon>
    </View>
  );
}