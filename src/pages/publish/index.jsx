import React, { Component } from 'react';
import { connect } from 'react-redux';
import Taro from '@tarojs/api';
import dayjs from 'dayjs';
import { View, Image, Swiper, SwiperItem, Picker} from '@tarojs/components';
import { AtList, AtListItem, AtInput, AtIcon } from "taro-ui"
import { add, minus, asyncAdd } from '../../actions/counter'
import ImagePicker from '../../components/image-picker';
import { getCallbackParams } from '../../utils';
import style from  './index.less'

@connect(({ counter }) => ({
  counter
}), (dispatch) => ({
  add () {
    dispatch(add())
  },
  dec () {
    dispatch(minus())
  },
  asyncAdd () {
    dispatch(asyncAdd())
  }
}))
class Index extends Component {
  constructor(...args) {
    super(...args);
    this.rangeKey = 'name';
    
    this.state = {
      startTime: (new Date()).getTime(),
      images: [],
      categories: [{ id: 'fairs', name: '摊位招租' }, { id: 'recruitments', name: '兼职招聘' }, { id: 'stalls', name: '摊位转租' }],
      selectedCategory: {},
    };
  }
  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount () { }

  componentDidShow() {
    getCallbackParams((params) => {
      this.setState({
        [params.key]: params.value,
      })
    });
  }

  componentDidHide () { }

  onChooseImages = (images) => {
    this.setState({
      images,
    });
  }

  onChange = e => {
    this.setState({
      selectedCategory: this.state.categories[e.detail.value]
    })
  }

  navToTimePicker = (key) => () => {
    Taro.navigateTo({
      url: `/pages/time-picker/index?key=${key}&&time=${this.state.startTime}`
    })
  }

  render () {
    return (
      <View className={style.Root}>
        <View className={style.Header}>
          <Swiper
            circular
            indicatorDots
            autoplay
          >
              {
                this.state.images.map((imagePath) => (
                  <SwiperItem>
                    <Image mode="aspectFill" className={style.Image} src={imagePath}></Image>
                  </SwiperItem>
                ))
              }
          </Swiper>
          <View className={style.PickerWrapper}>
            <ImagePicker onChooseImages={this.onChooseImages}></ImagePicker>
          </View>
        </View>
        <AtList>
          <Picker rangeKey={this.rangeKey} mode="selector" range={this.state.categories} onChange={this.onChange}>
            <AtListItem
              iconInfo={{ size: 25, color: '#78A4FA', value: 'list' }}
              title={this.state.selectedCategory[this.rangeKey] || '请选择活动类型...'}
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
            onClick={this.navToTimePicker('startTime')}
            iconInfo={{ size: 25, color: '#78A4FA', value: 'clock', }}
            title={dayjs(this.state.startTime).format('YYYY-MM-DD HH:mm')}
            arrow="right"
          />
          <AtListItem
            onClick={this.navToTimePicker('endTime')}
            iconInfo={{ size: 25, color: '#78A4FA', value: 'clock', }}
            title="活动结束时间(选填)"
            arrow="right"
          />
          <AtListItem
            iconInfo={{ size: 25, color: '#78A4FA', value: 'map-pin', }}
            title="活动地点"
            arrow="right"
          />
        </AtList>
      </View>
    )
  }
}

export default Index

