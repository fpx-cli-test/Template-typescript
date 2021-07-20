import React from 'react';
import styles from './index.module.scss';

export default function UserLayout({ children }: { children: React.ReactNode }) {
  const setLang = (val) => {
    window.sessionStorage.removeItem('wareMenu');
  };
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.header}>
          <div className={styles.logo} />
          <div className={styles.intl}>
            <span onClick={() => setLang('zh-CN')}>
              {'中文简体'}
            </span>
            <span>|</span>
            <span onClick={() => setLang('en-US')} style={{ opacity: 0.7 }}>
              English
            </span>
          </div>
        </div>
        {children}
        <div className={styles.footer}>
          <span className={styles.copyright}>
            Copyright © 2004-2021 Shenzhen 4PX Information Technology Co. Ltd.{' '}
            <span onClick={() => window.open('https://beian.miit.gov.cn/')}>ICP-12019163-7</span>
          </span>
        </div>
      </div>
    </div>
  );
}
