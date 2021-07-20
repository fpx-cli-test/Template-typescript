/**
 * 钉钉扫码
 */
import React, { useEffect, useState } from 'react';
import { dingtalkLogin } from '@/service/ddlogin';

import styles from './index.module.scss';

const QrCode = () => {
  const [src, setSrc] = useState('');
  // const [] =
  // get
  const getQrCode = () => {
    dingtalkLogin().then((res) => {
      setSrc(res);
    });
  };

  // mounted
  useEffect(() => {
    getQrCode();
  }, []);

  // 刷新二维码
  // const doRefresh = () => {
  //   getQrCode();
  // };

  return (
    <div className={styles.innerBlock}>
      <div className={styles.iframe}>
        <iframe src={src} frameBorder="0" width="310" height="296" />
      </div>
      {/* <div className={styles.bottom}>
        <p>
          <Icon type="saoyisao_o" />
          请使用钉钉扫码登陆
        </p>
        <p onClick={() => doRefresh()}>
          <Icon type="jiazai_shuaxin" className="" />
          刷新
        </p>
      </div> */}
    </div>
  );
};

export default QrCode;
