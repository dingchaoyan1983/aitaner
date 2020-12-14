import React, { useCallback, useState, useRef, forwardRef, useImperativeHandle } from 'react';
import classnames from 'classnames';
import Taro from '@tarojs/taro';
import { View, Editor } from '@tarojs/components';
import styles from './index.less';

const useFormat = (editorCtx, styleName, styleValue) => {
  return useCallback(() => {
    if (editorCtx.current) {
      editorCtx.current.format(styleName, styleValue);
    }
  }, [editorCtx.current, styleName, styleValue])
}

export default forwardRef(({
  readOnly = false,
  html,
  className,
  style,
}, ref) => {
  const editorCtx = useRef();
  const [formats, setFormats] = useState({});
  const onStatusChange = useCallback((event) => {
    const formats = event.detail;
    setFormats(formats);
  }, [setFormats]);
  const removeFormat = useCallback(() => {
    if (editorCtx.current) {
      editorCtx.current.removeFormat();
    }
  }, [editorCtx.current]);
  const insertDate = useCallback(() => {
    if (editorCtx.current) {
      const date = new Date()
			const formatDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
      editorCtx.current.insertText({
        text: formatDate
      });
    }
  }, [editorCtx.current]);
  const undo = useCallback(() => {
    if (editorCtx.current) {
      editorCtx.current.undo();
    }
  }, [editorCtx.current]);
  const redo = useCallback(() => {
    if (editorCtx.current) {
      editorCtx.current.redo();
    }
  }, [editorCtx.current]);
  const insertDivider = useCallback(() => {
    if (editorCtx.current) {
      editorCtx.current.insertDivider();
    }
  }, [editorCtx.current]);
  const clear = useCallback(() => {
    if (editorCtx.current) {
      editorCtx.current.clear();
    }
  }, [editorCtx.current]);
  const insertImage = useCallback(() => {
    Taro.chooseImage({
      count: 1,
      success: (res) => {
        if (editorCtx.current){
          editorCtx.current.insertImage({
            extClass: 'editorImage',
            src: res.tempFilePaths[0],
            alt: '图像',
            success: function() {
              console.log('insert image success')
              if (editorCtx.current){
                editorCtx.current.insertText('<br/>');
              }
            }
          })
        }
      }
    })
  }, [editorCtx.current]);
  const onEditorReady = useCallback(() => {
    Taro.createSelectorQuery().select('#editor').context((res) => {
      editorCtx.current = res.context;
      editorCtx.current.setContents({
        html,
      })
    }).exec();
  });

  useImperativeHandle(ref, () => {
    return {
      getEditorContext: () => {
        return editorCtx.current;
      }
    };
  }, [editorCtx.current]);
  return (
			<View className={className} style={style}>
				<View className={styles.Toolbar} onClick="format">
					<View className={classnames('iconfont', 'icon-zitijiacu', {[styles.QlActive]: formats.bold})} onClick={useFormat(editorCtx, 'bold')}></View>
					<View className={classnames('iconfont', 'icon-zitixieti', { [styles.QlActive]: formats.italic })} onClick={useFormat(editorCtx, 'italic')}></View>
					<View className={classnames('iconfont', 'icon-zitixiahuaxian', {[styles.QlActive]: formats.underline})} onClick={useFormat(editorCtx, 'underline')}></View>
					<View className={classnames('iconfont', 'icon-zitishanchuxian', { [styles.QlActive]: formats.strike}) } onClick={useFormat(editorCtx, 'strike')}></View>
					<View className={classnames('iconfont', 'icon-zuoduiqi', { [styles.QlActive]: formats.align ==='left' })} onClick={useFormat(editorCtx, 'align', 'left')}></View>
					<View className={classnames('iconfont', 'icon-juzhongduiqi', {[styles.QlActive]: formats.align === 'center'})} onClick={useFormat(editorCtx, 'align', 'center')}></View>
					<View className={classnames('iconfont', 'icon-youduiqi', { [styles.QlActive]: formats.align === 'right' })} onClick={useFormat(editorCtx, 'align', 'right')}></View>
					<View className={classnames('iconfont', 'icon-zuoyouduiqi', { [styles.QlActive]: formats.align === 'justify' })} onClick={useFormat(editorCtx, 'align', 'justify')}></View>
					<View className={classnames('iconfont', 'icon-Character-Spacing', { [styles.QlActive]: formats.letterSpacing })} onClick={useFormat(editorCtx, 'letterSpacing', '2em')}></View>
					<View className={classnames('iconfont', 'icon-clearedformat')} onClick={removeFormat}></View>
					<View className={classnames('iconfont', 'icon-fontsize', { [styles.QlActive]: formats.fontSize === '24px' })} onClick={useFormat(editorCtx, 'fontSize', '24px')}></View>
					<View className={classnames('iconfont', 'icon-text_color', { [styles.QlActive]: formats.color === '#0000ff' })} onClick={useFormat(editorCtx, 'color', '#0000ff')}></View>
					<View className={classnames('iconfont', 'icon-fontbgcolor', { [styles.QlActive]: formats.backgroundColor === '#0000ff' })}  onClick={useFormat(editorCtx, 'backgroundColor', '#0000ff')}></View>
					<View className={classnames('iconfont', 'icon-date')} onClick={insertDate}></View>
					<View className={classnames('iconfont', 'icon--checklist', { [styles.QlActive]: formats.list === 'unchecked' })} onClick={useFormat(editorCtx, 'list', 'unchecked')}></View>
					<View className={classnames('iconfont', 'icon-youxupailie', { [styles.QlActive]: formats.list === 'ordered' })} onClick={useFormat(editorCtx, 'list', 'ordered')}></View>
					<View className={classnames('iconfont', 'icon-wuxupailie', { [styles.QlActive]: formats.list === 'bullet' })} onClick={useFormat(editorCtx, 'list', 'bullet')}></View>
					<View className="iconfont icon-undo" onClick={undo}></View>
					<View className="iconfont icon-redo" onClick={redo}></View>
					<View className="iconfont icon-fengexian" onClick={insertDivider}></View>
					<View className="iconfont icon-charutupian" onClick={insertImage}></View>
					<View className={classnames('iconfont', 'icon-format-header-1', { [styles.QlActive]: formats.header === 1 })} onClick={useFormat(editorCtx, 'header', '1')}></View>
					<View className={classnames('iconfont', 'icon-zitixiabiao', { [styles.QlActive]: formats.script === 'sub' })} onClick={useFormat(editorCtx, 'script', 'sub')}></View>
					<View className={classnames('iconfont', 'icon-zitishangbiao', { [styles.QlActive]: formats.script === 'super' })} onClick={useFormat(editorCtx, 'script', 'super')}></View>
					<View className="iconfont icon-shanchu" onClick={clear}></View>
				</View>

				<Editor
          id="editor"
          className={styles.QlContainer}
          placeholder="开始输入..."
          showImgSize
          showImgToolbar
          showImgResize
          onStatuschange={onStatusChange}
          readOnly={readOnly}
          onReady={onEditorReady}>
				</Editor>
			</View>
  );
})