import React, { useCallback } from 'react';
import Taro from '@tarojs/taro';
import dayjs from 'dayjs';
import { View, Image, Swiper, SwiperItem, Picker, RichText } from '@tarojs/components';
import { AtList, AtListItem, AtInput, AtIcon, AtButton } from "taro-ui";
import ImagePicker from '../image-picker';
import ImageRemover from '../image-remover';
import { identity, dayTimePattern, navigateTo } from '../../utils';
import style from './index.less';
import { activityCategories } from '../../constants';

export default ({
  categoryKey='name',
  images=[],
  onChooseImages=identity,
  onRemoveImage = identity,
  selectedCategory = {},
  onSelectActivityCategory=identity,
  startTime,
  endTime,
  onSelectStartTime=identity,
  onSelectEndTime=identity,
  name,
  onChangeName=identity,
  latitude,
  longitude,
  location,
  onChooseLocation,
  description,
  onEditDesc = identity,
  applicantsLimit,
  onChangeApplicantsLimit  = identity,
  charge,
  onChangeCharge = identity,
  tel,
  onChangeTel = identity,
}) => {
  const selectStartTime = useCallback(() => {
    navigateTo('/pages/time-picker/index', startTime, onSelectStartTime)
  }, [startTime, onSelectStartTime]);
  const selectEndTime = useCallback(() => {
    navigateTo('/pages/time-picker/index', endTime, onSelectEndTime);
  }, [endTime, onSelectEndTime]);
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
          location: address,
          latitude,
          longitude,
        });
      },
    })
  }, [onChooseLocation, longitude, latitude]);
  const editDesc = useCallback(() => {
    navigateTo('/pages/editor/index', description, onEditDesc);
  }, [description, onEditDesc]);
  return (
    <View className={style.Root}>
      <View className={style.Header}>
        <Swiper
          circular
          indicatorDots
          autoplay
        >
            {
              images.map((imagePath, index) => (
                <SwiperItem>
                  <View className={style.ImageWrapper}>
                    <Image mode="aspectFill" className={style.Image} src={imagePath}></Image>
                    <View className={style.RemoveImageBtn}>
                      <ImageRemover index={index} onRemoveImage={onRemoveImage}/>
                    </View>
                  </View>
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
            value={name}
            onChange={onChangeName}
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
          title={location || '活动地点' }
          arrow="right"
        />
        <View className={style.InputWrapper}>
          <View>
            <AtIcon value='shopping-cart' size='25' color='#78A4FA'></AtIcon>
          </View>
          <AtInput
            border={false}
            className={style.Input}
            name='charge'
            title=''
            type='number'
            value={charge}
            onChange={onChangeCharge}
            placeholder='摊位费用(元 / 天)'
          />
        </View>
        <View className={style.InputWrapper}>
          <View>
            <AtIcon value='phone' size='25' color='#78A4FA'></AtIcon>
          </View>
          <AtInput
            border={false}
            className={style.Input}
            name='tel'
            title=''
            type='number'
            value={tel}
            onChange={onChangeTel}
            placeholder='联系方式(非常主要)'
          />
        </View>
        <View className={style.InputWrapper}>
          <View>
            <AtIcon value='user' size='25' color='#78A4FA'></AtIcon>
          </View>
          <AtInput
            border={false}
            className={style.Input}
            name='applicantsLimit'
            title=''
            type='number'
            value={applicantsLimit}
            onChange={onChangeApplicantsLimit}
            placeholder='报名人数限制'
          />
        </View>
        <View className={style.RichText} onClick={editDesc}>
          <RichText nodes={description ? `<p class="richtext_wrapper">${description}</p>` : '输入活动介绍'} />
        </View>
      </AtList>
    </View>
  );
}