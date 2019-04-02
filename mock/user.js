import { param2Obj } from './utils'

const tokens = {
  admin: {
    token: 'admin-token'
  },
  editor: {
    token: 'editor-token'
  }
}

const users = {
  'admin-token': {
    roles: ['ADMIN'],
    introduction: 'I am a super administrator',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    username: '薛定谔的狗',
    uid:1
  },
  'editor-token': {
    roles: ['GUEST'],
    introduction: 'I am an editor',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    username: '没有权限的狗',
    uid:2
  }
}

export default {
  login: res => {
    const { username } = JSON.parse(res.body)
    const data = tokens[username]

    if (data) {
      return {
        errorCode: {
          value: 20000,
          desc: '成功'
        },
        data
      }
    }
    return {
      errorCode: {
        value: 60204,
        desc: 'Account and password are incorrect.'
      }
    }
  },
  getInfo: res => {
    const { token } = param2Obj(res.url)
    const info = users[token]

    if (info) {
      return {
        errorCode: {
          value: 20000,
          desc: '成功'
        },
        data: info
      }
    }
    return {
      errorCode: {
        value: 50008,
        desc: 'Login failed, unable to get user details.'
      }
    }
  },
  logout: () => {
    return {
      errorCode: {
        value: 20000,
        desc: '成功'
      },
      data: 'success'
    }
  }
}
