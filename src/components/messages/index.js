import React, {
  useMemo,
  useEffect,
  useState,
  useCallback,
  useRef,
} from 'react';
import { ScrollView } from '@tarojs/components';
import Message from '../message';
import { identity } from '../../utils';

export default ({
  count,
  height = 300,
  fetchMessages = identity,
  messages = [],
}) => {
  const countRef = useRef();
  const heightStyle = useMemo(() => ({ height }),[height]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [keyword, setKeyword] = useState('');
  useEffect(() => {
    countRef.current = count;
  });
  useEffect(() => {
    const count = countRef.current;
    if (!count || count > page * limit) {
      setLoading(true);
      fetchMessages({
        page,
        limit,
        keyword,
      }).then(() => {
        setLoading(false);
      }, () => {
        setLoading(false);
      });
    }
  }, [page, limit, keyword, countRef, setLoading]);
  const onScrollToLower = useCallback(() => {
    const count = countRef.current;
    if (!loading && count / limit > page) {
      setPage(page + 1);
    }
  }, [setPage, limit, countRef, page, loading]);
  return (
    <ScrollView scrollY style={heightStyle} onScrollToLower={onScrollToLower}>
      {
         messages.map((message) => (<Message {...message} />))
      }
    </ScrollView>
  );
}