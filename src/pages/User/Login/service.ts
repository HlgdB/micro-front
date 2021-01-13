import request from '@/utils/request';

// 登录获取token和用户信息
export async function Login(body: any) {
  console.log(body);
  return request('/token', {
    method: 'POST',
    data: body,
  });
}
