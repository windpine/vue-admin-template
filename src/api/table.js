import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/table/list',
    method: 'get',
    params
  })
}

export function getDataFileListAll() {
  return request({
    url: '/datafile/all',
    method: 'get'
  })
}
