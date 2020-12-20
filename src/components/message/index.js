import React from 'react';
import { View, Text } from '@tarojs/components';
import { AtAvatar, AtIcon } from 'taro-ui'
import style from  './index.less';
import defaultAvatar from '../../assets/200.png';

export default ({
  avatarUrl = defaultAvatar,
  name = '',
  ownerId ='',
  location = '',
  startTime = '',
  applicantsCount = 0,
}) => {
  return (
    <View className={style.Root}>
      <AtAvatar size="large" image={avatarUrl} className={style.Image}/>
      <View className={style.Right}>
        <View className={style.Title}>{name}</View>
        <View>
          <View className={style.Publisher}>发布者: {ownerId}</View>
          <View className={style.Footer}>
            <View>
              <AtIcon value="map-pin" size="small"></AtIcon>: {location}
            </View>
            <View>
              <AtIcon value="clock" size="small"></AtIcon>: {startTime}
            </View>
            <View>
              <Text className={style.RegNum}>{applicantsCount}</Text>报名
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

