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
  // 热门商品详细查询
  queryGoodDetail: {
    url: '/app/customer/queryGoodDetail',
    method: 'post'
  },
  // 客户绑定店铺查询
  queryUserBindStore: {
    url: '/app/customer/queryUserBindStore',
    method: 'post'
  },
  // 购物车新增商品
  addShoppingCart: {
    url: '/app/customer/addShoppingCart',
    method: 'post'
  },
  // 快速购买接口
  fastBuyGoods: {
    url: '/app/customer/fastBuyGoods',
    method: 'post'
  }
}

const request = function (funcName, requestParam) {
  return req(config[funcName].url, config[funcName].method, requestParam, {}, config[funcName].fileConfig)
}
export default request
