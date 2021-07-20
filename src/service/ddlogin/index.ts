import { GATEWAY_URL, LOGIN_URL } from '@/config';
import { request } from 'ice';

/**
 * 获取浏览器指纹，初始化时调用
 */
function getFingerprints() {
  return new Promise((resolve, reject) => {
    const excludes = {
      userAgent: true,
      audio: true,
      enumerateDevices: true,
      fonts: true,
      fontsFlash: true,
      webgl: true,
      canvas: true,
    };
    const options = { excludes };
    window.Fingerprint2.get(options, (components) => {
      // 参数
      const values = components.map((component) => {
        return component.value;
      });
      // 指纹
      const murmur = Fingerprint2.x64hash128(values.join(''), 31);
      resolve(murmur);
    });
  });
}

async function dingtalkLogin() {
  const successUrl = `${window.location.origin}/ddLoginLoding`; // 前端登录地址
  const url = `${LOGIN_URL}/v1/dingtalk/qrcode?service=${`${GATEWAY_URL}/cas`}&successUrl=${successUrl}&type=1`;
  const fingerprints = await getFingerprints();
  const result = await request.get(url);
  const index = result.indexOf('&redirect_uri');
  const s1 = result.substring(0, index);
  const s2 = result.substring(index, result.length);
  const goUrl = `${s1}?${fingerprints}${s2}`;
  const style = 'border:none;background-color:#FFFFFF;margin:0;';
  // 二维码地址
  const iframeSrc = `https://login.dingtalk.com/login/qrcode.htm?goto=${encodeURIComponent(
    goUrl,
  )}&style=${encodeURIComponent(style)}`;

  // 监听扫码
  const hanndleMessage = function (event) {
    const { origin } = event;
    if (origin === 'https://login.dingtalk.com') {
      // 判断是否来自ddLogin扫码事件。
      const loginTmpCode = event.data; // 拿到loginTmpCode后就可以在这里构造跳转链接进行跳转了
      window.location.href = `${result}&loginTmpCode=${loginTmpCode}`;
    }
  };
  if (typeof window.addEventListener !== 'undefined') {
    window.addEventListener('message', hanndleMessage, false);
  } else if (typeof window.attachEvent !== 'undefined') {
    window.attachEvent('onmessage', hanndleMessage);
  }
  return iframeSrc;
}

export { dingtalkLogin };
