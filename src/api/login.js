import request from '@/utils/request'

export function login(formData) {
  return request({
    baseURL: '',
    url: 'http://localhost:8080/auth/login',
    method: 'post',
    data: formData
  })
}

export function getInfo(username) {
  return request({
    baseURL: '',
    url: 'http://localhost:8080/user/info',
    method: 'get',
    params: { username: username }
  })
}

export function logout() {
  return request({
    url: '/auth/logout',
    method: 'post'
  })
}
