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
  // 司机负责门店信息列表查询
  queryDriverResponsibleList: {
    url: '/app/customer/queryDriverResponsibleList',
    method: 'post'
  },
  // 司机详情信息查询
  queryDriverInformationDetail: {
    url: '/app/customer/queryDriverInformationDetail',
    method: 'post'
  }
}

const request = function (funcName, requestParam) {
  return req(config[funcName].url, config[funcName].method, requestParam, {}, config[funcName].fileConfig)
}
export default request
