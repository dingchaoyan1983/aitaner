import React, { useCallback } from 'react';
import { View } from '@tarojs/components';
import { AtIcon } from 'taro-ui';
import style from './index.less';
import { identity } from '../../utils';

export default ({
  onRemoveImage  = identity,
  index,
}) => {
  const removeImage = useCallback(() => {
    onRemoveImage(index);
  }, [index, onRemoveImage]);

  return (
    <View className={style.Root} onClick={removeImage}>
      <AtIcon value='trash' size='30'></AtIcon>
    </View>
  );
}