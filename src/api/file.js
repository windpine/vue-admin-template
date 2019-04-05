import request from '@/utils/request'

export function getDataFileListAll(query) {
  return request({
    url: 'http://localhost:8080/file/all',
    method: 'get',
    params: query
  })
}

export function getDataFileById(query) {
  return request({
    url: 'http://localhost:8080/file/datafile',
    method: 'get',
    params: query
  })
}

export function getAllVersionFile(query) {
  return request({
    baseURL: '',
    url: 'http://localhost:8080/file/versionfiles',
    method: 'get',
    params: query
  })
}

export function uploadFile(formData) {
  return request({
    baseURL: '',
    url: 'http://localhost:8080/file/upload',
    method: 'post',
    data: formData
  })
}

export function uploadMultiFiles(formData) {
  return request({
    baseURL: '',
    url: 'http://localhost:8080/file/multiupload',
    method: 'post',
    data: formData
  })
}

export function uploadVersionFile(formData) {
  return request({
    baseURL: '',
    url: 'http://localhost:8080/file/version',
    method: 'post',
    data: formData
  })
}

export function downloadFile(query) {
  return request({
    baseURL: '',
    url: 'http://localhost:8080/file/download',
    method: 'get',
    params: query
  })
}

export function testPost(data) {
  return request({
    baseURL: '',
    url: 'http://localhost:8080/posttest',
    method: 'post',
    data: data
  })
}

export function zipFiles(data) {
  return request({
    baseURL: '',
    url: 'http://localhost:8080/file/zip',
    method: 'post',
    data: data
  })
}
