import request from '@/utils/request';
import Cookies from 'js-cookie';

export const getAllVideo = async () => {
  console.log('token', Cookies.get('token'));
  return request(`/video`, {
    method: 'get',
  });
};

export const getSelfVideo = async () => {
  return request(`/video/myself`, {
    method: 'get',
  });
};

export const getOthersVideo = async () => {
  return request(`/video/others`, {
    method: 'get',
  });
};

export const getAllPic = async () => {
  return request(`/picture/all`, {
    method: 'get',
  });
};
