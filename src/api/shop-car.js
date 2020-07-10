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
  // 购物车列表查询
  queryShoppingCartList: {
    url: '/app/customer/queryShoppingCartList',
    method: 'post'
  },
  // 删除购物车
  deleteShoppingCartGoods: {
    url: '/app/customer/deleteShoppingCartGoods',
    method: 'post'
  },
  // 订单新增
  addUserOrder: {
    url: '/app/customer/addUserOrder',
    method: 'post'
  }
}

const request = function (funcName, requestParam) {
  return req(config[funcName].url, config[funcName].method, requestParam, {}, config[funcName].fileConfig)
}
export default request
