/**
 * @author: yanhoup
 * @description: 全局数据
 */
import { request } from 'ice';

interface IState {
  name: string;
  department: string;
  avatar: string;
  userid: number | null;
  warehouse: string;
  menu: string;
}

export default {
  state: {
    name: 'default',
    department: '',
    avatar: '',
    userid: null,
    menu: 'index',
    warehouse: '',
  },

  effects: (dispatch) => ({
    async fetchUserProfile() {
      const res = await request('/api/profile');
      if (res.status === 'SUCCESS') {
        dispatch.user.update(res.data);
      }
    },
  }),

  reducers: {
    update(prevState: IState, payload: IState) {
      return { ...prevState, ...payload };
    },
    updateMenu(prevState: IState, payload: object) {
      return { ...prevState, ...payload };
    },
  },
};
