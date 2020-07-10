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
  // 增加订单商品评价
  addOrderGoodsEva: {
    url: '/app/customer/addOrderGoodsEva',
    method: 'post'
  },
  // 订单状态修改
  updateOrder: {
    url: '/app/customer/updateOrder',
    method: 'post'
  },
  // 订单下的商品查询
  queryOrderDetail: {
    url: '/app/customer/queryOrderDetail',
    method: 'post'
  },
  // 根据商品单号去获取图片
  queryDetail: {
    url: '/pc/goods/queryDetail',
    method: 'post'
  }

}

const request = function (funcName, requestParam) {
  return req(config[funcName].url, config[funcName].method, requestParam, {}, config[funcName].fileConfig)
}
export default request
