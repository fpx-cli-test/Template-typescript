import * as React from 'react';
import { runApp, IAppConfig, APP_MODE } from 'ice';
import * as Sentry from '@sentry/react';
import packageJson from '../package.json';


const appConfig: IAppConfig = {
  router: {
    type: 'browser',
  },

  app: {
    rootId: 'ice-container',
    addProvider: ({ children }) => (
      <Sentry.ErrorBoundary>
        {children}
      </Sentry.ErrorBoundary>
    ),
  },
};

// 本地开发环境 不上报
if (['stage', 'prod'].includes(APP_MODE)) {
  Sentry.init({
    dsn: '', // 默认dsn参数
    tracesSampleRate: 1.0,
    release: `ProgramName-${APP_MODE}-${packageJson.version}`, // 项目名称 - 版本号
    environment: APP_MODE, // 环境参数
    beforeSend(event) {
      return event;
    },
  });
}

runApp(appConfig);
