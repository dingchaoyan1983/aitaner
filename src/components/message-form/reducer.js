import { handleActions } from 'redux-actions';
import {
  SET_STATE,
  ADD_IMAGES,
  REMOVE_IMAGE,
  RESET,
} from './actions';

export const initState = {
  startTime: (new Date()).getTime(),
  images: [],
  selectedCategory: {},
  description: '',
};


export default handleActions({
  [SET_STATE]: (state, { payload: { field, value } }) => ({
    ...state,
    [field]: value,
  }),
  [ADD_IMAGES]: (state, { payload }) => ({
    ...state,
    images: [...state?.images, ...payload]
  }),
  [REMOVE_IMAGE]: (state, { payload }) => {
    const images = state?.images;
    if(images) {
      images.splice(payload, 1);
      return {
        ...state,
        images: [...images]
      }
    }

    return state;
  },
  [RESET]: (state) => ({
    startTime: (new Date()).getTime(),
    images: [],
    selectedCategory: {},
    description: '',
    tel: undefined,
    charge: undefined,
    location: undefined,
    name: '',
    applicantsLimit: undefined,
    latitude: undefined,
    longitude: undefined,
    endTime: undefined,
  }),
}, {});