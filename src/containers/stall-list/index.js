import React from 'react';
import {
  useSelector,
} from 'react-redux';
import { useActions } from '../../react-redux';
import Messages from '../../components/messages';
import {
  fetchStalls as fetchMessagesAction,
  clearStalls as clearMessageAction,
} from '../../entities/actions/stalls';

export default ({
  height,
}) => {
  const entity = useSelector((state) => state.entities.stalls);
  const fetchMessages = useActions(fetchMessagesAction);
  const clearMessage = useActions(clearMessageAction);
  const messages = entity.data;
  const count = entity.count;

  return (
    <Messages
      onClearMessage={clearMessage}
      messages={messages}
      fetchMessages={fetchMessages}
      height={height}
      count={count}
    />);
  }