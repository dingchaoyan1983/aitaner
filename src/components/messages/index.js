import React, {
  useMemo,
  useEffect,
  useState,
} from 'react';
import { ScrollView } from '@tarojs/components';
import Message from '../message';
import { identity } from '../../utils';

export default ({
  height = 300,
  fetchMessages = identity,
  messages = [],
}) => {
  const heightStyle = useMemo(() => ({ height }),[height]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [keyword, setKeyword] = useState('');
  useEffect(() => {
    fetchMessages({
      page,
      limit,
      keyword,
    });;
  }, [page, limit, keyword]);
  return (
    <ScrollView scrollY style={heightStyle}>
      {
         messages.map((message) => (<Message {...message} />))
      }
    </ScrollView>
  );
}