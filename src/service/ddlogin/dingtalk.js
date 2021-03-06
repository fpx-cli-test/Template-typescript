import $i18n from 'panda-i18n';
!(function (a) {
  'use strict';
  function b(a, b, c) {
    for (var d in b) c ? (a[d] = b[d]) : (a[d] = void 0 !== a[d] ? a[d] : b[d]);
  }
  function c(a, c) {
    if ('undefined' == typeof WebViewJavascriptBridge)
      return console.log('WebViewJavascriptBridge未定义，请在钉钉app打开该页面');
    var d = c || {},
      e = function (b) {
        console.log('默认成功回调', a, b);
      },
      f = function (b) {
        console.log('默认失败回调', a, b);
      },
      g = function () {};
    d.onSuccess && ((e = d.onSuccess), delete d.onSuccess),
      d.onFail && ((f = d.onFail), delete d.onFail),
      d.onCancel && ((g = d.onCancel), delete d.onCancel);
    var h = function (a) {
        var b = a || {},
          c = b.errorCode,
          d = b.result;
        '0' === c ? e && e.call(null, d) : '-1' === c ? g && g.call(null, d) : f && f.call(null, d, c);
      },
      i = !1;
    switch (a) {
      case 'device.notification.alert':
        b(d, { title: '', buttonName: $i18n.get({ id: 'Determine.four_px', dm: '确定' }) });
        break;
      case 'device.notification.confirm':
      case 'device.notification.prompt':
        b(d, {
          title: '',
          buttonLabels: [
            $i18n.get({ id: 'Determine.four_px', dm: '确定' }),
            $i18n.get({ id: 'Cancel.four_px', dm: '取消' }),
          ],
        });
        break;
      case 'device.notification.vibrate':
        b(d, { duration: 300 });
        break;
      case 'device.accelerometer.watchShake':
        o.ios && ((i = !0), (d.sensitivity = 3.2));
        break;
      case 'biz.util.openLink':
        b(d, { credible: !0, showMenuBar: !0 });
        break;
      case 'biz.contact.choose':
        b(d, { multiple: !0, startWithDepartmentId: 0, users: [], corpId: (k && k.corpId) || '' });
        break;
      case 'biz.contact.complexChoose':
        b(d, { startWithDepartmentId: 0, selectedUsers: [], selectedDepartments: [], corpId: (k && k.corpId) || '' });
        break;
      case 'biz.navigation.setLeft':
      case 'biz.navigation.setRight':
        o.ios && (i = !0), b(d, { show: !0, control: !1, showIcon: !0, text: '' });
        break;
      case 'ui.pullToRefresh.enable':
        o.ios && (i = !0);
        break;
      case 'device.notification.toast':
        b(d, { text: 'toast', duration: o.android ? (o.duration - 3 > 0) + 0 : 3, delay: 0 });
        break;
      case 'device.notification.showPreloader':
        b(d, { text: '加载中...', showIcon: !0 });
        break;
      case 'biz.util.uploadImage':
        b(d, { multiple: !1 });
        break;
      case 'biz.util.scan':
        b(d, { type: 'qrCode' });
        break;
      case 'biz.map.search':
        b(d, { scope: 500 });
        break;
      case 'biz.util.ut':
        var j = d.value,
          l = [];
        if (j && 'Object' == o.type(j) && window.JSON) {
          if (o.ios) j = JSON.stringify(j);
          else if (o.android) {
            for (var m in j) l.push(m + '=' + j[m]);
            j = l.join(',');
          }
        } else window.JSON || (j = '');
        b(d, { value: j }, !0);
        break;
      case 'internal.util.encryData':
        var n = d.data,
          l = [];
        if ('Object' == o.type(n)) {
          for (var m in n) l.push(m + '=' + n[m]);
          n = l.join('&');
        }
        b(d, { data: n }, !0);
        break;
      case 'internal.request.lwp':
        var n = d.body;
        (n = JSON.stringify(n)), b(d, { body: n }, !0);
        break;
      case 'biz.util.warn':
        var p = d.logName || 'h5_common_error',
          q = 'url=' + location.href,
          r = [],
          s = d.obj || {};
        for (var m in s) r.push(m + '=' + s[m]);
        var t = { msg: p + ' ' + q + ' ' + r.join(' ') };
        b(d, { message: t }, !0);
        break;
      case 'biz.navigation.setIcon':
        o.ios && (i = !0), b(d, { showIcon: !0, iconIndex: '1' });
        break;
      case 'biz.customContact.multipleChoose':
      case 'biz.customContact.choose':
        b(d, { isShowCompanyName: !1 });
        break;
      case 'biz.navigation.setMenu':
        o.ios && (i = !0);
    }

    if (o.android) {
      var u = a.split('.'),
        v = u.pop(),
        w = u.join('.'),
        x = d || {};
      (x.onSuccess = e), (x.onFail = f);
      try {
        window.nuva.require(w)[v](x);
      } catch (y) {
        console.log(y);
      }
    } else
      o.ios &&
        (i
          ? (WebViewJavascriptBridge.registerHandler(a, function (a, b) {
              h({ errorCode: '0', errorMessage: '成功', result: a }), b && b({ errorCode: '0', errorMessage: '成功' });
            }),
            WebViewJavascriptBridge.callHandler(a, d))
          : WebViewJavascriptBridge.callHandler(a, d, h));
  }
  var d = ['backbutton', 'online', 'offline', 'pause', 'resume', 'hostTaskEvent', 'swipeRefresh'],
    e = [
      'device.notification.alert',
      'device.notification.confirm',
      'device.notification.prompt',
      'device.notification.vibrate',
      'device.accelerometer.watchShake',
      'device.accelerometer.clearShake',
      'biz.util.open',
      'biz.util.openLink',
      'biz.util.share',
      'biz.util.ut',
      'biz.util.datepicker',
      'biz.util.timepicker',
      'biz.user.get',
      'biz.navigation.setLeft',
      'biz.navigation.setRight',
      'biz.navigation.setTitle',
      'biz.navigation.back',
      'device.notification.toast',
      'device.notification.showPreloader',
      'device.notification.hidePreloader',
      'device.geolocation.get',
      'biz.util.uploadImage',
      'biz.util.previewImage',
      'ui.input.plain',
      'device.notification.actionSheet',
      'biz.util.qrcode',
      'device.connection.getNetworkType',
      'runtime.info',
      'biz.ding.post',
      'biz.telephone.call',
      'biz.chat.chooseConversation',
      'biz.contact.createGroup',
      'biz.util.datetimepicker',
      'biz.util.chosen',
      'device.base.getUUID',
      'device.base.getInterface',
      'device.launcher.checkInstalledApps',
      'device.launcher.launchApp',
      'ui.progressBar.setColors',
      'runtime.permission.requestAuthCode',
      'runtime.permission.requestJsApis',
      'ui.pullToRefresh.enable',
      'ui.pullToRefresh.stop',
      'ui.pullToRefresh.disable',
      'ui.webViewBounce.enable',
      'ui.webViewBounce.disable',
      'biz.chat.getConversationInfo',
      'biz.map.search',
      'biz.map.locate',
      'biz.util.scan',
      'biz.contact.choose',
      'biz.contact.complexChoose',
      'util.localStorage.getItem',
      'util.localStorage.setItem',
      'util.localStorage.removeItem',
      'biz.navigation.createEditor',
      'biz.navigation.finishEditor',
      'biz.chat.pickConversation',
      'device.notification.modal',
      'biz.navigation.setIcon',
      'biz.navigation.close',
      'biz.util.uploadImageFromCamera',
      'internal.lwp.call',
      'device.geolocation.openGps',
      'biz.util.test',
      'internal.microapp.checkInstalled',
      'internal.user.getRole',
      'device.notification.extendModal',
      'internal.request.lwp',
      'biz.user.secretID',
      'internal.util.encryData',
      'biz.customContact.choose',
      'biz.customContact.multipleChoose',
      'biz.util.pageClick',
      'biz.chat.chooseConversationByCorpId',
      'biz.chat.toConversation',
      'biz.chat.open',
      'device.base.getSettings',
      'internal.log.upload',
      'biz.navigation.goBack',
      'ui.nav.preload',
      'ui.nav.go',
      'ui.nav.recycle',
      'ui.nav.close',
      'ui.nav.getCurrentId',
      'runtime.message.post',
      'runtime.message.fetch',
      'biz.navigation.setMenu',
      'ui.drawer.init',
      'ui.drawer.config',
      'ui.drawer.enable',
      'ui.drawer.disable',
      'ui.drawer.open',
      'ui.drawer.close',
      'biz.util.uploadAttachment',
      'biz.cspace.preview',
      'biz.cspace.saveFile',
      'internal.hpm.get',
      'internal.hpm.update',
      'preRelease.appLink.open',
      'internal.request.getSecurityToken',
      'biz.clipboardData.setData',
      'biz.util.warn',
      'internal.phoneContact.add',
      'device.base.getSettings',
      'ui.tab.init',
      'ui.tab.start',
      'ui.tab.config',
      'ui.tab.select',
      'ui.tab.add',
      'ui.tab.remove',
      'biz.intent.fetchData',
      'biz.chat.locationChatMessage',
      'biz.navigation.popGesture',
      'biz.util.warn',
      'biz.util.multiSelect',
      'biz.contact.getMobileContact',
      'biz.telephone.showCallMenu',
      'internal.notify.send',
      'biz.util.presentWindow',
      'biz.notify.send',
      'internal.util.getCorpIdByOrgId',
      'internal.util.getOrgIdByCorpId',
      'biz.contact.changeCustomerFollower',
      'device.audio.download',
      'device.audio.play',
      'device.audio.onPlayEnd',
      'device.audio.resume',
      'device.audio.pause',
      'device.audio.stop',
      'device.audio.startRecord',
      'device.audio.stopRecord',
      'device.audio.onRecordEnd',
      'device.audio.upload',
      'device.base.getScanWifiList',
      'biz.alipay.pay',
      'biz.alipay.auth',
      'biz.map.view',
      'biz.util.fetchImageData',
      'internal.contact.chooseMobileContact',
      'biz.util.scanCard',
      'biz.util.addDesktopShortcuts',
      'internal.util.isSimulator',
      'internal.util.getWua',
      'internal.beacon.detectBeacons',
      'biz.util.timestamp',
      'util.domainStorage.getItem',
      'util.domainStorage.setItem',
      'util.domainStorage.removeItem',
      'util.domainStorage.clearItems',
      'internal.host.lwp',
      'internal.host.query',
      'internal.host.cancel',
      'device.nfc.nfcRead',
      'device.nfc.nfcWrite',
    ],
    f = '1.0.0',
    g = a.navigator.userAgent,
    h = g.match(/AliApp\(\w+\/([a-zA-Z0-9.-]+)\)/);
  null === h && (h = g.match(/DingTalk\/([a-zA-Z0-9.-]+)/));
  var i = h && h[1],
    j = !1,
    k = null,
    l = 'runtime.permission.requestJsApis',
    m = null,
    n = !1,
    o = {
      ios: /iPhone|iPad|iPod/i.test(g),
      android: /Android/i.test(g),
      version: i,
      support: '1.2.2' === i || '1.3.2' === i,
      ability: '',
      isReady: !1,
      on: document.addEventListener,
      config: function (a) {
        a &&
          ((k = {
            corpId: a.corpId,
            appId: a.appId || -1,
            timeStamp: a.timeStamp,
            nonceStr: a.nonceStr,
            signature: a.signature,
            jsApiList: a.jsApiList,
          }),
          a.agentId && (k.agentId = a.agentId));
      },
      error: function (a) {
        m = a;
      },
      ready: function (b) {
        var c = function (a) {
          if (!a) return console.log('bridge初始化失败');
          if (((o.isReady = !0), null !== k && k.signature)) {
            if (o.ios)
              a.callHandler(l, k, function (c) {
                var d = c || {},
                  e = d.errorCode,
                  f = d.errorMessage || '';
                d.result;
                '0' === e
                  ? b(a)
                  : setTimeout(function () {
                      m && m({ message: '权限校验失败 ' + f, errorCode: 3 });
                    });
              });
            else if (o.android) {
              var c = l.split('.'),
                e = c.pop(),
                g = c.join('.');
              a(
                function () {
                  b(a);
                },
                function (a) {
                  setTimeout(function () {
                    var b = (a && a.errorMessage) || '';
                    m && m({ message: '权限校验失败 ' + b, errorCode: 3 });
                  });
                },
                g,
                e,
                k,
              );
            }
          } else b(a);
          if (
            j === !1 &&
            ((j = !0),
            d.forEach(function (b) {
              o.ios &&
                a.registerHandler(b, function (a, c) {
                  var d = document.createEvent('HTMLEvents');
                  (d.data = a),
                    (d.detail = a),
                    d.initEvent(b),
                    document.dispatchEvent(d),
                    c && c({ errorCode: '0', errorMessage: '成功' });
                });
            }),
            null === k)
          ) {
            var h = { url: encodeURIComponent(window.location.href), js: f, cid: (k && k.corpId) || '' };
            o.biz.util.ut({ key: 'dd_open_js_monitor', value: JSON.stringify(h), onSuccess: function (a) {} });
          }
        };
        if (o.ios && a.WebViewJavascriptBridge) {
          try {
            WebViewJavascriptBridge.init(function (a, b) {});
          } catch (e) {
            console.log(e.message);
          }
          return c(WebViewJavascriptBridge);
        }
        if (o.android && a.WebViewJavascriptBridgeAndroid) return c(WebViewJavascriptBridgeAndroid);
        if (o.ios)
          document.addEventListener(
            'WebViewJavascriptBridgeReady',
            function () {
              if ('undefined' == typeof WebViewJavascriptBridge) return console.log('WebViewJavascriptBridge 未定义');
              try {
                WebViewJavascriptBridge.init(function (a, b) {});
              } catch (a) {
                console.log(a.message);
              }
              (n = !0), c(WebViewJavascriptBridge);
            },
            !1,
          );
        else {
          if (!o.android) return console.log('很抱歉，尚未支持您所持设备');
          var g = function () {
            try {
              (a.WebViewJavascriptBridgeAndroid = a.nuva.require()), (n = !0), c(WebViewJavascriptBridgeAndroid);
            } catch (b) {
              console.log('window.nuva.require出错', b.message), c(null);
            }
          };
          a.nuva && (void 0 === a.nuva.isReady || a.nuva.isReady)
            ? g()
            : document.addEventListener(
                'runtimeready',
                function () {
                  g();
                },
                !1,
              );
        }
      },
      type: function (a) {
        return Object.prototype.toString.call(a).match(/^\[object\s(.*)\]$/)[1];
      },
      compareVersion: function (a, b, c) {
        if ('string' != typeof a || 'string' != typeof b) return !1;
        for (var d, e, f = a.split('.'), g = b.split('.'); d === e && g.length > 0; ) (d = f.shift()), (e = g.shift());
        return c ? (0 | e) >= (0 | d) : (0 | e) > (0 | d);
      },
    },
    p = function (a, b) {
      for (var c = a.split('.'), d = o, e = 0, f = c.length; f > e; e++)
        e === f - 1 && (d[c[e]] = b), 'undefined' == typeof d[c[e]] && (d[c[e]] = {}), (d = d[c[e]]);
    };
  e.forEach(function (a) {
    p(a, function (b) {
      c(a, b);
    });
  }),
    (o.__ns = p),
    (o.biz.util.pageClick = function (a) {
      var b = 'open_micro_log_record_client',
        c = +new Date(),
        d = a.corpId,
        e = a.agentId;
      d || (d = (k && k.corpId) || ''), e || (e = (k && k.agentId) || '');
      var f = {
        visitTime: c,
        clickType: 2,
        clickButton: a.clickButton || '',
        url: location.href,
        corpId: d,
        agentId: e,
      };

      o.biz.util.ut({ key: b, value: f });
    }),
    (a.dd = o),
    'object' == typeof module && module && 'object' == typeof module.exports
      ? (module.exports = o)
      : 'function' == typeof define &&
        (define.amd || define.cmd) &&
        define(function () {
          return o;
        });
})(this);
