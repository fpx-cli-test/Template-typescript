import React, { useState } from 'react';
import { Input, Message, Form, Checkbox, Icon } from '@alifd/next';

import { useInterval } from './utils';
import styles from './index.module.scss';
import { useHistory } from 'react-router-dom';
import { APP_MODE } from 'ice';
import QrCode from './Qrcode';
import { fpxLogin } from '@/service/login';

const { Item } = Form;

export interface IDataSource {
  name: string;
  password: string;
  autoLogin: boolean;
  phone: string;
  code: string;
}

const DEFAULT_DATA: IDataSource = {
  name: '',
  // eslint-disable-next-line @iceworks/best-practices/no-secret-info
  password: '',
  autoLogin: true,
  phone: '',
  code: '',
};

interface LoginProps {
  dataSource?: IDataSource;
}

const LoginBlock: React.FunctionComponent<LoginProps> = (props = { dataSource: DEFAULT_DATA }): JSX.Element => {
  const { dataSource = DEFAULT_DATA } = props;

  const [postData, setValue] = useState(dataSource);

  const [isRunning, checkRunning] = useState(false);
  const [isPhone, checkPhone] = useState(false);
  const [second, setSecond] = useState(59);
  const history = useHistory();

  const [loginWay, setLoginWay] = useState('computer');

  const forgetUrl =
    APP_MODE === 'test'
      ? 'http://usc.test.i4px.com/user/forgetpassword?redirectUrl=http://wms-fulfillment.test.i4px.com/cas'
      : 'http://ucs.i4px.com/user/forgetpassword?redirectUrl=http://wms-fulfillment.i4px.com/cas';

  useInterval(
    () => {
      setSecond(second - 1);
      if (second <= 0) {
        checkRunning(false);
        setSecond(59);
      }
    },
    isRunning ? 1000 : 0,
  );

  const formChange = (values: IDataSource) => {
    setValue(values);
  };

  const sendCode = (values: IDataSource, errors: []) => {
    if (errors) {
      return;
    }
    checkRunning(true);
  };

  const handleSubmit = async (values: IDataSource, errors: []) => {
    if (errors) {
      console.log('errors', errors);
      return;
    }
    await fpxLogin({ username: values.name, password: values.password });
    Message.success('????????????');
    history.push('/');
  };

  const phoneForm = (
    <>
      <Item
        format="tel"
        required
        requiredMessage={'??????'}
        asterisk={false}
      >
        <Input
          name="phone"
          innerBefore={
            <span className={styles.innerBeforeInput}>
              +86
              <span className={styles.line} />
            </span>
          }
          maxLength={20}
          placeholder={'?????????'}
        />
      </Item>
      <Item required requiredMessage={'??????'} style={{ marginBottom: 0 }}>
        <Input
          name="code"
          innerAfter={
            <span className={styles.innerAfterInput}>
              <span className={styles.line} />
              <Form.Submit
                text
                type="primary"
                style={{ width: 64 }}
                disabled={!!isRunning}
                validate={['phone']}
                onClick={sendCode}
                className={styles.sendCode}
              >
                {isRunning
                  ? `${second}????????????`
                  : '???????????????'}
              </Form.Submit>
            </span>
          }
          maxLength={20}
          placeholder={'?????????'}
        />
      </Item>
    </>
  );

  const accountForm = (
    <>
      <Item
        required
        requiredMessage={'??????'}
        style={{ marginBottom: 24 }}
      >
        <Input name="name" maxLength={20} placeholder={'?????????'} />
      </Item>
      <Item
        required
        requiredMessage={'??????'}
        style={{ marginBottom: 30 }}
      >
        <Input.Password
          name="password"
          htmlType="password"
          placeholder={'??????'}
        />
      </Item>
    </>
  );

  const byAccount = () => {
    checkPhone(false);
  };

  const byForm = () => {
    checkPhone(true);
  };

  return (
    <div className={styles.loginContent}>
      <div className={styles.LoginBlock}>
        <div className={styles.loginWay}>
          {loginWay === 'computer' ? (
            <Icon
              type="wms-saoma"
              size="xl"
              className={styles.icon}
              onClick={() => {
                setLoginWay('code');
              }}
            />
          ) : (
            <Icon
              type="wms-denglu"
              size="xl"
              className={styles.icon}
              onClick={() => {
                setLoginWay('computer');
              }}
            />
          )}
        </div>
        {loginWay === 'computer' ? (
          <div className={styles.innerBlock}>
            <div className={styles.desc}>
              <span onClick={byAccount} className={isPhone ? undefined : styles.active}>
                {'???????????? ???????????????'}
              </span>
              {/* <Divider direction="ver" />
               <span onClick={byForm} className={isPhone ? styles.active : undefined}>
                 ???????????????
               </span> */}
            </div>

            <Form value={postData} onChange={formChange} size="large">
              {isPhone ? phoneForm : accountForm}

              <div className={styles.infoLine}>
                <Item style={{ marginBottom: 0 }}>
                  <Checkbox name="autoLogin" className={styles.infoLeft}>
                    {'????????????'}
                  </Checkbox>
                </Item>
                <div>
                  <a href={forgetUrl} className={styles.link}>
                    {'????????????'}
                  </a>
                </div>
              </div>

              <Item style={{ marginBottom: 10 }}>
                <Form.Submit type="primary" onClick={handleSubmit} className={styles.submitBtn} validate>
                  {'??????'}
                </Form.Submit>
              </Item>
            </Form>
          </div>
        ) : (
          <QrCode />
        )}
      </div>
    </div>
  );
};

export default LoginBlock;
