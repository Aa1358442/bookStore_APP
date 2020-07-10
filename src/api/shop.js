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
  // 店家订单详情
  queryshopOwnerOrderList: {
    url: '/app/store/queryshopOwnerOrderList',
    method: 'post'
  },
  //   司机订单信息
  queryDriverList: {
    url: '/app/customer/queryDriverList',
    method: 'post'
  },
  // 店长订单详情查询
  orderDetail: {
    url: '/app/store/queryshopOwnerOrderDetail',
    method: 'post'
  },
  // 修改订单信息
  updateShopOwnerOrderState: {
    url: '/app/store/updateShopOwnerOrderState',
    method: 'post'
  },
  // 店长信息详情查询
  queryStoreDetail: {
    url: 'app/customer/queryStoreDetail',
    method: 'post'
  },
  // 订单状态修改
  updateOrder: {
    url: '/app/customer/updateOrder',
    method: 'post'
  }
}

const request = function (funcName, requestParam) {
  return req(config[funcName].url, config[funcName].method, requestParam, {}, config[funcName].fileConfig)
}
export default request
