import React, { useCallback, useMemo } from 'react';
import { View, Text } from '@tarojs/components';
import dayjs from 'dayjs';
import { AtAvatar, AtIcon } from 'taro-ui'
import style from  './index.less';
import defaultAvatar from '../../assets/200.png';
import { navigateTo } from '../../utils';

export default ({
  messageType = 'fairs',
  message = {}
}) => {
  const {
    showUrls = [],
    name = '',
    owner = {},
    location = '',
    startTime = '',
    applicantsCount = 0,
  } = message;
  const avatarUrl = useMemo(() => {
    if (showUrls && showUrls.length > 0) {
      return showUrls[0];
    }

    return defaultAvatar;
  }, [showUrls]);

  const navigateToDetail = useCallback(() => {
    navigateTo('/pages/participant/index', message);
  }, [messageType, message]);
  return (
    <View className={style.Root} onClick={navigateToDetail}>
      <AtAvatar size="large" image={avatarUrl} className={style.Image}/>
      <View className={style.Right}>
        <View className={style.Title}>{name}</View>
        <View>
          <View className={style.Publisher}>发布者: {owner.name}</View>
          <View className={style.Footer}>
            <View>
              <AtIcon value="map-pin" size="small"></AtIcon>: {location}
            </View>
          </View>
          <View className={style.Footer}>
            <View>
              <AtIcon value="clock" size="small"></AtIcon>: {dayjs(startTime).format('YYYY-MM-DD HH:mm')}
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

