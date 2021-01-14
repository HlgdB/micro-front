import request from '@/utils/request';
import Cookies from 'js-cookie';

export const getPrivateTag = async () => {
  return request(`/label/private`, {
    method: 'get',
  });
};

export const searchPrivateTag = async (body: any) => {
  return request(`/label/private/${body}`, {
    method: 'get',
  });
};

export const getPublicTag = async () => {
  return request(`/label/common`, {
    method: 'get',
  });
};

export const searchPublicTag = async (body: any) => {
  return request(`/label/common/${body}`, {
    method: 'get',
  });
};

export const modifyTag = async (body: any) => {
  return request(`/label/private`, {
    method: 'PUT',
    data: body,
  });
};

export const addTag = async (body: any) => {
  console.log(body);
  return request(`/label/private`, {
    method: 'POST',
    data: body,
  });
};
