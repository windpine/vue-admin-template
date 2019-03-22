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
      code: 20000,
      data: items
    }
  }
}

export const dataFileAPI = {
  list: () => {
    const items = Mock.mock({
      'items|30': [{
        id: '@id',
        commit: '@guid',
        filename: '@sentence(10,30)',
        uploader: 'name',
        display_time: '@datetime',
        size: '@integer(1,10000)' + 'Kb'
      }]
    })
    return {
      code: 20000,
      data: items
    }
  }
}
