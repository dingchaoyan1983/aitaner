import React, { useCallback, useRef } from 'react';
import { useDidShow } from '@tarojs/taro';
import Taro from '@tarojs/taro';
import dayjs from 'dayjs';
import { View, Image, Swiper, SwiperItem, Picker, RichText } from '@tarojs/components';
import { AtList, AtListItem, AtInput, AtIcon } from "taro-ui";
import ImagePicker from '../image-picker';
import { identity, dayTimePattern, getCallbackParams } from '../../utils';
import style from './index.less';

const activityCategories = [{ id: 'fairs', name: '摊位招租' }, { id: 'recruitments', name: '兼职招聘' }, { id: 'stalls', name: '摊位转租' }];

export default ({
  categoryKey='name',
  images=[],
  onChooseImages=identity,
  selectedCategory = {},
  onSelectActivityCategory=identity,
  startTime,
  endTime,
  onSelectStartTime=identity,
  onSelectEndTime=identity,
  title,
  onChangeTitle=identity,
  latitude,
  longitude,
  address,
  onChooseLocation,
  desc,
  onEditDesc = identity,
  applicantsLimit,
  onChangeApplicantsLimit  = identity,
}) => {
  useDidShow(() => {
    getCallbackParams((params) => {
      if (params.key === 'startTime') {
        onSelectStartTime(params.value);
      }
      if (params.key === 'endTime') {
        onSelectEndTime(params.value);
      }

      if (params.key === 'desc') {
        onEditDesc(params.value);
      }
    });
  });
  const selectStartTime = useCallback(() => {
    Taro.navigateTo({
      url: `/pages/time-picker/index?key=startTime&time=${startTime}`
    })
  }, [startTime]);
  const selectEndTime = useCallback(() => {
    Taro.navigateTo({
      url: `/pages/time-picker/index?key=endTime&time=${endTime}`
    })
  }, [endTime]);
  const selectCategory = useCallback(e => {
    onSelectActivityCategory(activityCategories[e.detail.value]);
  }, [onSelectActivityCategory]);
  const selectLocation = useCallback(() => {
    Taro.chooseLocation({
      latitude,
      longitude,
      success({
        address,
        latitude,
        longitude,
      }) {
        onChooseLocation({
          address,
          latitude,
          longitude,
        });
      },
    })
  }, [onChooseLocation, longitude, latitude]);
  const editDesc = useCallback(() => {
    Taro.navigateTo({
      url: `/pages/editor/index?html=${encodeURIComponent(desc)}`
    })
  }, [desc]);
  return (
    <View className={style.Root}>
      <View className={style.Header}>
        <Swiper
          circular
          indicatorDots
          autoplay
        >
            {
              images.map((imagePath) => (
                <SwiperItem>
                  <Image mode="aspectFill" className={style.Image} src={imagePath}></Image>
                </SwiperItem>
              ))
            }
        </Swiper>
        <View className={style.PickerWrapper}>
          <ImagePicker onChooseImages={onChooseImages}></ImagePicker>
        </View>
      </View>
      <AtList>
        <Picker rangeKey={categoryKey} mode="selector" range={activityCategories} onChange={selectCategory}>
          <AtListItem
            iconInfo={{ size: 25, color: '#78A4FA', value: 'list' }}
            title={selectedCategory[categoryKey] || '请选择活动类型...'}
          />
        </Picker>
        <View className={style.InputWrapper}>
          <View>
            <AtIcon value='tag' size='25' color='#78A4FA'></AtIcon>
          </View>
          <AtInput
            border={false}
            className={style.Input}
            name='title'
            title=''
            type='text'
            value={title}
            onChange={onChangeTitle}
            placeholder='活动主题(不超过35个字)'
          />
        </View>
        
        <AtListItem
          onClick={selectStartTime}
          iconInfo={{ size: 25, color: '#78A4FA', value: 'clock', }}
          title={`${dayjs(startTime).format(dayTimePattern)} 开始`}
          arrow="right"
        />
        <AtListItem
          onClick={selectEndTime}
          iconInfo={{ size: 25, color: '#78A4FA', value: 'clock', }}
          title={endTime ? `${dayjs(endTime).format(dayTimePattern)} 结束` : "活动结束时间(选填)"}
          arrow="right"
        />
        <AtListItem
          onClick={selectLocation}
          iconInfo={{ size: 25, color: '#78A4FA', value: 'map-pin', }}
          title={address || '活动地点' }
          arrow="right"
        />
        <View className={style.InputWrapper}>
          <View>
            <AtIcon value='user' size='25' color='#78A4FA'></AtIcon>
          </View>
          <AtInput
            border={false}
            className={style.Input}
            name='applicantsLimit'
            title=''
            type='text'
            value={applicantsLimit}
            onChange={onChangeApplicantsLimit}
            placeholder='报名人数限制'
          />
        </View>
        <View className={style.RichText} onClick={editDesc}>
          <RichText nodes={desc ? `<p class="richtext_wrapper">${desc}</p>` : '输入活动介绍'} />
        </View>
      </AtList>
    </View>
  );
}