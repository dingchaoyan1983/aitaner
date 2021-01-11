import React, { useCallback, useEffect, useMemo, useReducer, useRef } from 'react';
import { View, Image, Swiper, SwiperItem, Picker } from '@tarojs/components';
import { AtList, AtListItem, AtButton, AtMessage } from "taro-ui";
import Taro from '@tarojs/taro';
import ImagePicker from '../image-picker';
import ImageRemover from '../image-remover';
import { identity, isEmpty } from '../../utils';
import style from './index.less';
import { activityCategories } from '../../constants';
import reducer, { initState } from './reducer';
import {
  setState,
  addImages,
  removeImage,
  reset as resetAction,
} from './actions';

export default ({
  categoryKey='name',
  publish = identity,
}) => {
  const [state, dispatch] = useReducer(reducer, initState);
  const {
    images,
    selectedCategory,
    ...rest
  } = state;
  // common action
  const onChooseImages = useCallback((images) => {
    dispatch(addImages(images));
  }, [dispatch]);
  const onRemoveImage = useCallback((index) => {
    dispatch(removeImage(index));
  }, [dispatch]);
  const FormComponent = useMemo(() => selectedCategory?.publishForm, [selectedCategory]);
  const selectCategory = useCallback(e => {
    dispatch(setState({ field: 'selectedCategory', value: activityCategories[e.detail.value]}));
  }, [dispatch]);

  // specific actions
  const onChangeName = useCallback((name) => {
    dispatch(setState({ field: 'name', value: name }))
  }, [dispatch]);
  const onChangeStartTime = useCallback((startTime) => {
    dispatch(setState({ field: 'startTime', value: startTime }))
  }, [dispatch]); 
  const onChangeEndTime = useCallback((endTime) => {
    dispatch(setState({ field: 'endTime', value: endTime }));
  }, [dispatch]);

  const onChangeLocation = useCallback(({
    latitude,
    longitude,
    location,
  }) => {
    dispatch(setState({ field: 'latitude', value: latitude }));
    dispatch(setState({ field: 'longitude', value: longitude }))
    dispatch(setState({ field: 'location', value: location }))
  }, [dispatch]);

  const onChangeDescription = useCallback((description) => {
    dispatch(setState({ field: 'description', value: description }));
  }, [dispatch]);

  const onChangeApplicantsLimit = useCallback((applicantsLimit) => {
    dispatch(setState({ field: 'applicantsLimit', value: applicantsLimit }));
  }, [dispatch]);

  const onChangeTel = useCallback((tel) => {
    dispatch(setState({ field: 'tel', value: tel }));
  }, [dispatch]);

  const onChangeCharge = useCallback((charge) => {
    dispatch(setState({ field: 'charge', value: charge }));
  }, [dispatch]);

  const onChangeSalary = useCallback((salary) => {
    dispatch(setState({ field: 'salary', value: salary }));
  }, [dispatch]);


  const actions = {
    onChangeName,
    onChangeStartTime,
    onChangeEndTime,
    onChangeLocation,
    onChangeDescription,
    onChangeApplicantsLimit,
    onChangeTel,
    onChangeCharge,
    onChangeSalary,
  };

  const stateRef = useRef();
  useEffect(() => {
    stateRef.current = state;
  });

  const onValidate = useCallback(() => {
    const {
      selectedCategory,
      name,
      tel,
      location,
      charge,
    } = stateRef.current;
    if (Object.keys(selectedCategory).length === 0) {
      Taro.atMessage({
        message: '请选择发布类型',
        type: 'error',
      });
      return;
    }

    if (isEmpty(name)) {
      Taro.atMessage({
        message: '请填写标题',
        type: 'error',
      });
      return;
    }

    if (isEmpty(location)) {
      Taro.atMessage({
        message: '请填写地点',
        type: 'error',
      });
      return;
    }

    if (isEmpty(charge)) {
      Taro.atMessage({
        message: '请填写摊位费用',
        type: 'error',
      });
      return;
    }

    if (isEmpty(tel)) {
      Taro.atMessage({
        message: '请填写手机号码',
        type: 'error',
      });
      return;
    }

    return true;
  }, [stateRef]);

  const onReset = useCallback(() => {
    dispatch(resetAction());
  }, [dispatch]);

  const onPublish = useCallback(async () => {
    const {
      selectedCategory,
      images,
      name = '',
      applicantsLimit = -1,
      description,
      latitude,
      location,
      longitude,
      startTime,
      endTime = -1,
      charge,
      tel,
    } = stateRef.current;
    try {
      if (onValidate()) {
        await publish({
          action: selectedCategory.publishAction,
          showUrls: images,
          name,
          applicantsLimit: Number(applicantsLimit),
          description,
          latitude,
          location,
          longitude,
          startTime,
          endTime,
          charge: Number(charge),
          tel,
        });
        Taro.showToast({
          title: '发布成功',
          icon: 'success',
          duration: 5000,
        });
        onReset();
      }
    } catch (e) {
      Taro.showToast({
        title: '发布失败',
        icon: 'none',
        duration: 5000,
      });
    }

  }, [publish, stateRef, onValidate, onReset]);

  return (
    <>
      <AtMessage />
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
          {
          FormComponent
            ? React.createElement(FormComponent, {...({...rest, ...actions})})
            : (<View className={style.EmptyText}>请选择活动类型</View>)
          }
        </AtList>
      </View>
      {
        FormComponent
        ? (
          <View className={style.PublishButton}>
            <AtButton type='primary' onClick={onPublish}>发布</AtButton>
          </View>
          )
        : null
      }
    </>
  );
}