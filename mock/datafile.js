import Mock from 'mockjs'
import { param2Obj } from '@/utils'

const List = []
const count = 1000

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    commit: '@guid',
    filename: '@sentence(10,30)',
    uploader: 'name',
    display_time: '@datetime',
    size: '@integer(1,10000)' + 'Kb',
    fileType: '@pick([".xls", ".doc", ".csv", ".txt", ".sql"])'
  }))
}

export default {
  getList: config => {
    const { page = 1, limit = 20 } = param2Obj(config.url)
    const pageList = List.filter((item, index) => index < limit * page && index >= limit * (page - 1))
    return {
      total: List.length,
      errorCode: {
        value: 20000,
        desc: '成功'
      },
      data: pageList
    }
  }
}
