import React from 'react';
import dayjs from 'dayjs';
import { View, Image, Swiper, SwiperItem, Picker, RichText } from '@tarojs/components';
import { AtList, AtListItem, AtInput, AtIcon, AtButton } from "taro-ui";
import { dayTimePattern, navigateTo } from '../../utils';
import style from './index.less';

export default ({
  showUrls=[],
  startTime,
  endTime,
  name,
  latitude,
  longitude,
  location,
  description,
  applicantsLimit,
  charge,
  tel,
  applicantsCount = 0,
  owner={},
}) => {
  return (
    <View className={style.Root}>
      <View className={style.Header}>
        <Swiper
          circular
          indicatorDots
          autoplay
        >
            {
              showUrls.map((imagePath) => (
                <SwiperItem>
                  <View className={style.ImageWrapper}>
                    <Image mode="aspectFill" className={style.Image} src={imagePath}></Image>
                  </View>
                </SwiperItem>
              ))
            }
        </Swiper>
      </View>
      <View className={style.Content}>
        <View className={style.TitleWrapper}>
          <View className={style.Title}>{name}</View>
          <View className={style.SubTitle}>
            <View>已报名 {applicantsCount} / { applicantsLimit === -1 ? '人数不限' : applicantsLimit }</View>
            <View>{charge} 元 / 天</View>
          </View>
        </View>
        <AtList>
          <AtListItem
            iconInfo={{ size: 25, color: '#78A4FA', value: 'clock', }}
            title={`${dayjs(startTime).format(dayTimePattern)} ~ ${dayjs(endTime === -1 ? (new Date().getTime()) : endTime).format(dayTimePattern)}`}
          />
          <AtListItem
            iconInfo={{ size: 25, color: '#78A4FA', value: 'map-pin', }}
            title={location}
            arrow="right"
          />
          <AtListItem
            iconInfo={{ size: 25, color: '#78A4FA', value: 'phone', }}
            title={tel}
          />
          <View className={style.Sponsor}>
            主办方: {owner.name}
          </View>
          <View className={style.RichText}>
            <RichText nodes={description ? `<p class="richtext_wrapper">${description}</p>` : '输入活动介绍'} />
          </View>
        </AtList>
      </View>
    </View>
  );
}