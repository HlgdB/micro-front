import request from './request.js'

export const getRemoveList = async () => {
    return request('http://223.4.179.3:83/v1/file/card', {
        method: 'get'
      })
        .then(function(response:any) {
          console.log(response)
          return response;
        })
}


export const getDefaultList = async () => {
  return request('http://223.4.179.3:83/v1/file/default', {
      method: 'get'
    })
      .then(function(response:any) {
        console.log(response)
        return response;
      })
}