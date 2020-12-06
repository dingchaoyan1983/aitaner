
import React, { useCallback, useRef } from 'react';
import { useDidShow, getCurrentInstance } from '@tarojs/taro';
import { connect } from 'react-redux';
import Taro from '@tarojs/api';
import dayjs from 'dayjs';
import { View, Image, Swiper, SwiperItem, Picker} from '@tarojs/components';
import { AtList, AtListItem, AtInput, AtIcon } from "taro-ui";
import ImagePicker from '../image-picker';
import { identity } from '../../utils';

const activityCategories = [{ id: 'fairs', name: '摊位招租' }, { id: 'recruitments', name: '兼职招聘' }, { id: 'stalls', name: '摊位转租' }];

export default ({
  titleKey='name',
  images=[],
  onChooseImages=identity,
  selectedCategory = {},
  onSelectActivityCategory=identity,
  startTime,
  endTime,
  onSelectStartTime=identity,
  onSelectEndTime=identity,
}) => {
  const 
  const currentInstance = useRef();
  useDidShow(() => {
    currentInstance.current = getCurrentInstance();
  });
  selectStartTime = useCallback(() => {
    Taro.navigateTo({
      url: `/pages/time-picker/index?time=${startTime}&callback=${currentInstance.current.router.path}`
    })
  }, [onSelectStartTime]);
  selectEndTime = useCallback(() => {
    Taro.navigateTo({
      url: `/pages/time-picker/index?time=${endTime}&callback=${currentInstance.current.router.path}`
    })
  }, [onSelectEndTime]);
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
        <Picker rangeKey={titleKey} mode="selector" range={activityCategories} onChange={onSelectActivityCategory}>
          <AtListItem
            iconInfo={{ size: 25, color: '#78A4FA', value: 'list' }}
            title={selectedCategory[rangeKey] || '请选择活动类型...'}
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
            placeholder='活动主题(不超过35个字)'
          />
        </View>
        
        <AtListItem
          onClick={this.navToTimePicker}
          iconInfo={{ size: 25, color: '#78A4FA', value: 'clock', }}
          title={startTime}
          arrow="right"
        />
        <AtListItem
          iconInfo={{ size: 25, color: '#78A4FA', value: 'clock', }}
          title={endTime || "活动结束时间(选填)"}
          arrow="right"
        />
        <AtListItem
          iconInfo={{ size: 25, color: '#78A4FA', value: 'map-pin', }}
          title="活动地点"
          arrow="right"
        />
      </AtList>
    </View>
  );
}