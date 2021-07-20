/*
 * @Date: 2021-04-09 10:53:44
 * @author: yanhoup
 * @description: 登录时使用网关地址
 */
import { APP_MODE } from 'ice';

const GATEWAY_URLS = {
  dev: 'http://giws-gateway-test.i4px.com',
  test: 'http://giws-gateway-test.i4px.com',
  stage: 'http://giws-gateway-stage.i4px.com',
  prod: 'http://giws-gateway.i4px.com',
  us: 'http://giws-gateway.us.i4px.com',
  eu: 'http://giws-gateway.eu.i4px.com',
  asia: 'http://giws-gateway.asia.i4px.com',
  au: 'http://giws-gateway.au.i4px.com',
};

/**
 * @description 网关请求地址
 */
const GATEWAY_URL = GATEWAY_URLS[APP_MODE];

export { GATEWAY_URL };
