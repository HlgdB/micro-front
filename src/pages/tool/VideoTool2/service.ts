import request from '@/utils/request';

export const setVideoMark = async (body: any) => {
  // console.log(body);
  return request('/video/manual_mark', {
    method: 'POST',
    data: body,
  });
  // return false;
};
