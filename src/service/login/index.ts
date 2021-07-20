/**
 *@description fpx 登陆系统接入
 * @see  http://wiki-tech.i4px.com/pages/viewpage.action?pageId=13500599
 * @author yanhoup
 */

import { getKey, encrypt } from './crypto';
import { request } from 'ice';
import { LOGIN_URL, GATEWAY_URL } from '@/config';
import { stringify } from 'query-string';

interface FpxLoginClass {
  username?: string;
  password?: string;
  getTGT: Function;
  getTicket: Function;
  serviceValidate: Function;
  fpxLogin: Function;
}

class FpxLogin implements FpxLoginClass {
  username: '';
  password: '';
  constructor() {
    this.getTGT = this.getTGT.bind(this);
    this.getTicket = this.getTicket.bind(this);
    this.serviceValidate = this.serviceValidate.bind(this);
    this.fpxLogin = this.fpxLogin.bind(this);
  }
  async getTGT() {
    const key = getKey(16);
    const { username, password } = this;
    const enPassword = encrypt(key, password);
    const data = {
      username: encodeURI(username),
      password: encodeURI(enPassword),
      key: encodeURI(key),
      format: encodeURI('json'),
      additionalParam1: encodeURI('paramvalue'),
    };
    return await request({
      url: `${LOGIN_URL}/v1/tickets`,
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
      data: stringify(data),
    });
  }
  async getTicket(TGT) {
    return await request({
      url: `${LOGIN_URL}/v1/tickets/${TGT}`,
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
      data: stringify({
        service: `${GATEWAY_URL}/cas`,
      }),
    });
  }
  async serviceValidate(ticket) {
    return await request({
      url: `${GATEWAY_URL}/cas?ticket=${ticket}`,
      method: 'GET',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
      },
    });
  }
  /**
   * @description 登录入口方法
   * @param { username, password } user
   */
  async fpxLogin(user) {
    const { password, username } = user;
    this.password = password;
    this.username = username;
    const { tgtId } = await this.getTGT();
    const ticket = await this.getTicket(tgtId);
    const res = await this.serviceValidate(ticket);
    return res;
  }
}

const { fpxLogin, getTicket, serviceValidate } = new FpxLogin();
export { fpxLogin, getTicket, serviceValidate };
