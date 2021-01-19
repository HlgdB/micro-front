import request from '@/utils/request';

export const setPicMark = async (body: any) => {
  // console.log(body);
  return request('/picture/manual_mark', {
    method: 'POST',
    data: body,
  });
  // return false;
};
