import req from '../fetch/index.js'

const config = {
  // portExport: {
  //   url: '/api/media/stimulate/exportExcel',
  //   method: 'post',
  //   fileConfig: {
  //     type: 'file',
  //     fileName: '销售激励报表'
  //   }
  // },
  // 轮播图列表查询
  queryRotateChartsList: {
    url: '/app/customer/queryRotateChartsList',
    method: 'post'
  },
  // 热门商品列表查询
  queryHotGoodsList: {
    url: '/app/customer/queryHotGoodsList',
    method: 'post'
  }
}

const request = function (funcName, requestParam) {
  return req(config[funcName].url, config[funcName].method, requestParam, {}, config[funcName].fileConfig)
}
export default request
