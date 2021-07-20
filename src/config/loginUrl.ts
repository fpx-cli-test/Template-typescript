/*
 * @author: yanhoup
 * @description: OBKoro1
 */
import { APP_MODE } from 'ice';

const LOGIN_URLS = {
  dev: 'https://sso.test.i4px.com:8443',
  test: 'https://sso.test.i4px.com:8443',
  stage: 'https://sso.i4px.com',
  prod: 'https://sso.i4px.com',
  eu: 'https://sso.eu.i4px.com',
  us: 'https://sso.us.i4px.com',
  au: 'https://sso.au.i4px.com',
  asia: 'https://sso.asia.i4px.com',
};

/**
 * @description 登录cas地址
 */
const LOGIN_URL = LOGIN_URLS[APP_MODE];

export { LOGIN_URL };
