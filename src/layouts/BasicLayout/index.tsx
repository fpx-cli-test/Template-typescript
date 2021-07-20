import React, { useState } from 'react';
import { Shell, ConfigProvider, Icon, Box } from '@fpxfd/next';
import PageNav from './components/PageNav';
import HeaderAvatar from './components/HeaderAvatar';
import Logo from './components/Logo';
import { useToggle } from 'ahooks';
import styles from './index.module.scss';
import { useLocation } from 'ice';

(function () {
  const throttle = function (type: string, name: string, obj: Window = window) {
    let running = false;

    const func = () => {
      if (running) {
        return;
      }

      running = true;
      requestAnimationFrame(() => {
        obj.dispatchEvent(new CustomEvent(name));
        running = false;
      });
    };

    obj.addEventListener(type, func);
  };

  if (typeof window !== 'undefined') {
    throttle('resize', 'optimizedResize');
  }
})();

interface IGetDevice {
  (width: number): 'phone' | 'tablet' | 'desktop';
}
export default function BasicLayout({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();
  const getDevice: IGetDevice = (width) => {
    const isPhone = typeof navigator !== 'undefined' && navigator && navigator.userAgent.match(/phone/gi);

    if (width < 680 || isPhone) {
      return 'phone';
    } else if (width < 1280 && width > 680) {
      return 'tablet';
    } else {
      return 'desktop';
    }
  };

  const [device, setDevice] = useState(getDevice(NaN));

  const [triggerStatus, { toggle }] = useToggle();


  if (typeof window !== 'undefined') {
    window.addEventListener('optimizedResize', (e) => {
      const deviceWidth = (e && e.target && (e.target as Window).innerWidth) || NaN;
      setDevice(getDevice(deviceWidth));
    });
  }

  const trigger = () => (
    <a>
      <Icon
        type={triggerStatus ? 'daohangzhankai' : 'daohangshouqi'}
        className={styles.Trigger}
        onClick={() => toggle()}
      />
    </a>
  );

  return (
    <ConfigProvider device={device}>
      <Shell
        style={{
          minHeight: '100vh',
        }}
      >
        <Shell.Branding style={{ height: '100%' }}>
          <Logo image="../../../public/logo.png" />
        </Shell.Branding>
        <Shell.Action style={{ flex: 1 }}>
          <Box direction="row" justify="space-between" flex={1}>
            <Box direction="row" align="center" justify="space-between">
              <HeaderAvatar />
            </Box>
          </Box>
        </Shell.Action>
        {pathname !== '/' && (
          <Shell.Navigation trigger={trigger()}>
            <PageNav />
          </Shell.Navigation>
        )}
        <Shell.Content>{children}</Shell.Content>
      </Shell>
    </ConfigProvider>
  );
}
