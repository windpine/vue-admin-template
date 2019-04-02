import request from '@/utils/request'

export function getList(query) {
  return request({
    url: '/table/list',
    method: 'get',
    params: query
  })
}

