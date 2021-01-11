import { createAction } from 'redux-actions';
import { actionTypeCreator } from '../../utils';

const actionType = actionTypeCreator('src/components/message-form/index.jsx');

export const SET_STATE = actionType('SET_STATE');
export const ADD_IMAGES = actionType('ADD_IMAGE');
export const REMOVE_IMAGE = actionType('REMOVE_IMAGE');
export const RESET = actionType('RESET');

export const setState = createAction(SET_STATE);
export const addImages = createAction(ADD_IMAGES);
export const removeImage = createAction(REMOVE_IMAGE);
export const reset = createAction(RESET);
