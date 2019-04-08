import { login, logout, getInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    username: window.localStorage.getItem('username'),
    avatar: '',
    uid: '',
    roles: [],
    hasRouted: false
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, username) => {
      state.username = username
      window.localStorage.setItem('username', username)
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_UID: (state, uid) => {
      state.uid = uid
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_HAS_ROUTED: (state, hasRouted) => {
      state.hasRouted = hasRouted
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim()
      const formData = new FormData()
      formData.append('username', username)
      formData.append('password', userInfo.password)
      return new Promise((resolve, reject) => {
        login(formData).then(response => {
          const data = response.data
          setToken(data.token)
          commit('SET_TOKEN', data.token)
          commit('SET_NAME', data.user.username)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo(state.username).then(response => {
          const data = response.data
          if (data.userRoles && data.userRoles.length > 0) { // 验证返回的roles是否是一个非空数组
            commit('SET_ROLES', data.userRoles)
          } else {
            reject('getInfo: roles must be a non-null array !')
          }
          commit('SET_AVATAR', 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif')
          commit('SET_UID', data.userInfo.uid)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          commit('SET_HAS_ROUTED', false)
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
