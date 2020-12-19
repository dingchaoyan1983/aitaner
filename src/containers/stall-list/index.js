import React from 'react';
import {
  useSelector,
} from 'react-redux';
import { useActions } from '../../react-redux';
import Messages from '../../components/messages';
import { fetchStalls as fetchMessagesAction } from '../../entities/actions/stalls';

export default ({
  height,
}) => {
  const messages = useSelector((state) => state.entities.stalls.data);
  const fetchMessages = useActions(fetchMessagesAction);

  return <Messages messages={messages} fetchMessages={fetchMessages} height={height} />
}