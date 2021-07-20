const packageJson = require('./package.json');
const sentryConfig = {
  organization: '',
  project: '',
  apiKey: '',
  include: /\.map$/,
  baseSentryURL: '',
  suppressConflictError: true,
  deleteAfterCompile: true,
};
module.exports = {
  plugins: [
    [
      'build-plugin-fusion',
      {
        themePackage: '@alifd/theme-18273',
      },
    ],
  ],
  proxy: {
    '/api': {
      enable: true,
      target: '',
      pathRewrite: {
        '^/api': '',
      },
    },
  },
  router: {
    lazy: true,
  },
  hash: 'contenthash', // 哈希
  terserOptions: {
    compress: {
      unused: true,
      // eslint-disable-next-line quote-props
      'drop_console': true,
    },
  },
  modeConfig: {
    dev: {
      dll: true,
    },
    test: {
      webpackPlugins: {
        'webpack-visualizer-plugin': {
          options: {
            filename: './statistics.html',
          },
        },
      },
      plugins: [
        ['build-plugin-splitchunk'],
      ],
    },
    stage: {
      sourceMap: true,
      webpackPlugins: {
        'webpack-sentry-plugin': {
          options: {
            ...sentryConfig,
            release: `ProgramName-${packageJson.version}`,
          },
        },
      },
      plugins: [
        ['build-plugin-splitchunk'],
      ],
    },
    prod: {
      sourceMap: true,
      webpackPlugins: {
        'webpack-sentry-plugin': {
          options: {
            ...sentryConfig,
            release: `ProgramName-${packageJson.version}`,
          },
        },
      },
      plugins: [
        ['build-plugin-splitchunk'],
      ],
    },
  },
}