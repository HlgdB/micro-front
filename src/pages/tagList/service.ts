import request from '@/utils/request';
// import Cookies from 'js-cookie';

export const getTag = async () => {
  return request(`/label`, {
    method: 'get',
  });
};

export const searchTag = async (body: any) => {
  return request(`/label/${body}`, {
    method: 'get',
  });
};

export const modifyTag = async (body: any) => {
  return request(`/label`, {
    method: 'PUT',
    data: body,
  });
};

export const addTag = async (body: any) => {
  console.log(body);
  return request(`/label`, {
    method: 'POST',
    data: body,
  });
};
