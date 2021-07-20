import React from 'react';
import { Avatar, Overlay, Menu, Icon, Box, Button } from '@fpxfd/next';
import styles from './index.module.scss';
import { useLocalStorageState } from 'ahooks';

const { Item } = Menu;
const { Popup } = Overlay;

export interface Props {
  name: string;
  avatar: string;
  mail: string;
}

interface User {
  empName: string;
  avatar: string;
  empCode: string;
}

const UserProfile = ({ empName, avatar, empCode }) => {
  return (
    <div className={styles.profile}>
      <div>
        <Icon type="wms-touxiang" className={styles.avatar} size="xl" />
      </div>
      <div className={styles.content}>
        <h4>{empName}</h4>
        <span>{empCode}</span>
      </div>
    </div>
  );
};

const HeaderAvatar = (props: Props) => {
  const { avatar } = props;
  const [userInfo] = useLocalStorageState('user');
  const user = userInfo || ({} as User);
  const newdata = { ...user, avatar };
  return (
    <Popup
      trigger={
        <Box direction="row" justify="center" align="center" className={styles.headerAvatar}>
          <Icon type="wms-touxiang" className={styles.avatar} size="large" />
          <span className={styles.Name}>{user.empName}</span>
          <Icon type="jiantou_liebiaozhankai_o" className={styles.Arrow} />
        </Box>
      }
      triggerType="hover"
    >
      <div className={styles.avatarPopup}>
        <UserProfile {...newdata} />
        <Button
          className={styles.logout}
          type="primary"
          onClick={() => {
            localStorage.removeItem('session');
            location.replace('/user/login');
          }}
          text
        >
          {'退出'}
        </Button>
      </div>
    </Popup>
  );
};

HeaderAvatar.defaultProps = {
  name: 'MyName',
  mail: 'name@gmail.com',
  avatar: 'https://img.alicdn.com/tfs/TB1.ZBecq67gK0jSZFHXXa9jVXa-904-826.png',
};

export default HeaderAvatar;
