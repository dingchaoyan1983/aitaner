import React from 'react';
import {
  useSelector,
} from 'react-redux';
import { useActions } from '../../react-redux';
import Messages from '../../components/messages';
import { fetchHires as fetchMessagesAction } from '../../entities/actions/hires';

export default ({
  height,
}) => {
  const messages = useSelector((state) => state.entities.hires.data);
  const fetchMessages = useActions(fetchMessagesAction);

  return <Messages messages={messages} fetchMessages={fetchMessages} height={height} />

}