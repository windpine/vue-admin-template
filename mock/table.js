import Mock from 'mockjs'

export const exampleAPI = {
  list: () => {
    const items = Mock.mock({
      'items|30': [{
        id: '@id',
        title: '@sentence(10, 20)',
        'status|1': ['published', 'draft', 'deleted'],
        author: 'name',
        display_time: '@datetime',
        pageviews: '@integer(300, 5000)'
      }]
    })
    return {
      errorCode: {
        value: 20000,
        desc: '成功'
      },
      data: items
    }
  }
}

