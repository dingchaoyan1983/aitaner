import React, { useCallback } from 'react';
import Taro from '@tarojs/taro';
import dayjs from 'dayjs';
import { View, RichText } from '@tarojs/components';
import { AtListItem, AtInput, AtIcon } from "taro-ui";
import { identity, dayTimePattern, navigateTo } from '../../utils';
import style from './index.less';

export default ({
  startTime,
  endTime,
  onChangeStartTime=identity,
  onChangeEndTime=identity,
  name,
  onChangeName=identity,
  latitude,
  longitude,
  location,
  onChangeLocation,
  description,
  onChangeDescription = identity,
  applicantsLimit,
  onChangeApplicantsLimit  = identity,
  salary,
  onChangeSalary = identity,
  tel,
  onChangeTel = identity,
}) => {
  const selectStartTime = useCallback(() => {
    navigateTo('/pages/time-picker/index', startTime, onChangeStartTime)
  }, [startTime, onChangeStartTime]);
  const selectEndTime = useCallback(() => {
    navigateTo('/pages/time-picker/index', endTime, onChangeEndTime);
  }, [endTime, onChangeEndTime]);
  const openLocation = useCallback(() => {
    Taro.chooseLocation({
      latitude,
      longitude,
      success({
        address,
        latitude,
        longitude,
      }) {
        onChangeLocation({
          location: address,
          latitude,
          longitude,
        });
      },
    })
  }, [onChangeLocation, longitude, latitude]);
  const selectLocation = useCallback(() => {
    Taro.getSetting({
      success: function (res) {
        if (!res.authSetting['scope.userLocation']) {
          Taro.authorize({
            scope: 'scope.userLocation',
            success: function () {
              // 用户已经同意小程序使用录音功能，后续调用 Taro.startRecord 接口不会弹窗询问
              Taro.startRecord()
            },
            fail: function() {
              Taro.showModal({
                content: '检测到您没有打开地理位置授权信息，是否去设置打开？',
                confirmText: "确认",
                cancelText: "取消",
                success: function(res) {
                  console.log(res);
                  //点击“确认”时打开设置页面
                  if (res.confirm) {
                    Taro.openSetting({
                      success (res) {
                        console.log(res.authSetting);
                        openLocation();
                        // res.authSetting = {
                        //   "scope.userInfo": true,
                        //   "scope.userLocation": true
                        // }
                      }
                    })
                  } else {
                    console.log('用户点击取消')
                  }
                }
              });
            }
          })
        } else {
          openLocation()
        }
      },
    });
  }, [openLocation]);
  const editDesc = useCallback(() => {
    navigateTo('/pages/editor/index', description, onChangeDescription);
  }, [description, onChangeDescription]);
  return (
    <>
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
            name='salary'
            title=''
            type='number'
            value={salary}
            onChange={onChangeSalary}
            placeholder='工资 元/天'
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
            placeholder='报名人数限制(0或者不填代表不做限制)'
          />
        </View>
        <View className={style.RichText} onClick={editDesc}>
          <RichText nodes={description ? `<p class="richtext_wrapper">${description}</p>` : '输入活动介绍'} />
        </View>
      </>
  );
}