import React, {
  useMemo,
  useEffect,
  useState,
  useCallback,
  useRef,
} from 'react';
import { AtSearchBar } from 'taro-ui';
import { ScrollView } from '@tarojs/components';
import Message from '../message';
import { identity } from '../../utils';
import style from './index.less';

export default ({
  count,
  height = 300,
  fetchMessages = identity,
  messages = [],
  onClearMessage = identity,
}) => {
  const countRef = useRef();
  const keywordRef = useRef('');
  const heightStyle = useMemo(() => ({ height: height - 30 }),[height]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [keyword, setKeyword] = useState('');
  const [requestTrigger, setRequestTrigger] = useState(1);
  useEffect(() => {
    countRef.current = count;
    keywordRef.current = keyword;
  });
  useEffect(() => {
    const count = countRef.current;
    if (!count || Math.ceil(count / limit) >= page) {
      setLoading(true);
      fetchMessages({
        page,
        limit,
        keyword: keywordRef.current,
      }).then(() => {
        setLoading(false);
      }, () => {
        setLoading(false);
      });
    }
  }, [page, limit, keywordRef, countRef, setLoading, requestTrigger]);
  const onScrollToLower = useCallback(() => {
    const count = countRef.current;
    if (!loading && Math.ceil(count / limit) >= page) {
      setPage(page + 1);
    }
  }, [page, setPage, limit, countRef, page, loading, keyword]);

  const onSearch = useCallback(() => {
    onClearMessage();
    if (page > 1) {
      setPage(1);
    } else {
      setRequestTrigger((trigger) => trigger + 1);
    }
  }, [page, setPage, onClearMessage, setRequestTrigger]);

  const onClear = useCallback(() => {
    onClearMessage();
    setKeyword('')
    if (page > 1) {
      setPage(1);
    } else {
      setRequestTrigger((trigger) => trigger + 1);
    }
  }, [page, setPage, onClearMessage, setRequestTrigger, setKeyword]);
  const onChangeKeyword = useCallback((keyword) => {
    setKeyword(keyword);
  }, [setKeyword]);
  return (
    <>
      <AtSearchBar
        value={keyword}
        placeholder="请输入关键字查询信息..."
        onChange={onChangeKeyword}
        onActionClick={onSearch}
        onClear={onClear}
      /> 
      <ScrollView className={style.ScrollView} scrollY style={heightStyle} onScrollToLower={onScrollToLower}>
        {
          messages.map((message) => (<Message message={message} />))
        }
      </ScrollView>
    </>
  );
}