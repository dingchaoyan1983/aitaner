import React from 'react';
import { View, Text } from '@tarojs/components';
import { AtAvatar, AtIcon } from 'taro-ui'
import style from  './index.less';

export default ({
  avatar = 'https://jdc.jd.com/img/200',
  title = '这里是标题',
  publisher ='张三',
  location = '这里是地址',
  time = '2020-20-20',
  regNum = 200,
}) => (
  <View className={style.Root}>
    <AtAvatar size="large" image={avatar} className={style.Image}/>
    <View className={style.Right}>
      <View className={style.Title}>{title}</View>
      <View>
        <View className={style.Publisher}>发布者: {publisher}</View>
        <View className={style.Footer}>
          <View>
            <AtIcon value="map-pin" size="small"></AtIcon>: {location}
          </View>
          <View>
            <AtIcon value="clock" size="small"></AtIcon>: {time}
          </View>
          <View>
            <Text className={style.RegNum}>{regNum}</Text>报名
          </View>
        </View>
      </View>
    </View>
  </View>
);

