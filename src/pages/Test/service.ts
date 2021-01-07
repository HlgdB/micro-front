import { request } from 'umi';
import Request from 'axios';

export const getRemoveList = async () => {
    return Request('http://127.0.0.1:5000/', {
        method: 'get',
      })
        .then(function(response) {
          return response;
        })
}