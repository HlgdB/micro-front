/*
 * @Descripttion:
 * @Author: linkenzone
 * @Date: 2021-01-07 14:23:42
 */
import request, { server_url } from '@/pages/Main/request.js';

export const getRemoveList = async () => {
  return request(`${server_url}/file/card`, {
    method: 'get',
  }).then((response: any) => {
    console.log(response);
    return response;
  });
};

export const getDefaultList = async () => {
  return request(`${server_url}/file/default`, {
    method: 'get',
  }).then((response: any) => {
    console.log(response);
    return response;
  });
};
