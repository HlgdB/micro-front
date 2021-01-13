/*
 * @Descripttion:
 * @Author: linkenzone
 * @Date: 2021-01-07 14:23:42
 */
import request from '@/utils/request';
import Cookies from 'js-cookie';

export const getRemoveList = async () => {
  console.log(Cookies.get('token'));
  return request(`/video`, {
    method: 'get',
  });
};

export const getSelfList = async () => {
  return request(`/video/myself`, {
    method: 'get',
  });
};
