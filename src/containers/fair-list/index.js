import React from 'react';
import {
  useSelector,
} from 'react-redux';
import { useActions } from '../../react-redux';
import Messages from '../../components/messages';
import { fetchFairs as fetchMessagesAction } from '../../entities/actions/fairs';

export default ({
  height,
}) => {
  const entity = useSelector((state) => state.entities.fairs);
  const fetchMessages = useActions(fetchMessagesAction);
  const messages = entity.data;
  const count = entity.count;

  return <Messages messages={messages} fetchMessages={fetchMessages} height={height} count={count} />
}