import { serviceValidate } from '@/service/login';
import { Box, Loading, Message } from '@fpxfd/next';
import { useHistory, useSearchParams } from 'ice';
import React, { useEffect } from 'react';

const DdLoginLoding = () => {
  const { ticket } = useSearchParams();
  const history = useHistory();
  // 钉钉扫码登录
  useEffect(() => {
    if (ticket) {
      serviceValidate(ticket).then(() => {
        history.push('/');
        Message.success('登录成功');
      });
    }
  }, []);
  return (
    <Box direction="row" justify="center" align="center" style={{ height: '100vh' }}>
      <p style={{ marginRight: '20px' }}>登录中...</p>
      <Loading />
    </Box>
  );
};

export default DdLoginLoding;
