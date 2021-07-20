/* eslint-disable @typescript-eslint/no-unused-expressions */
!(function (window, document) {
  function dd(a) {
    // eslint-disable-next-line no-var
    var e;
    const c = document.createElement('iframe');
    let d = `https://login.dingtalk.com/login/qrcode.htm?goto=${a.goto}`;
    d += a.style ? `&style=${encodeURIComponent(a.style)}` : '';
    d += a.href ? `&href=${a.href}` : '';
    c.src = d;
    c.frameBorder = '0';
    c.allowTransparency = 'true';
    c.scrolling = 'no';
    c.width = a.width ? `${a.width}px` : '365px';
    c.height = a.height ? `${a.height}px` : '306px';
    e = document.getElementById(a.id);
    e.innerHTML = '';
    e.appendChild(c);
  }
  window.DDLogin = dd;
})(window, document);
