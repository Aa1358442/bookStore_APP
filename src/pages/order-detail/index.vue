<template>
  <div>
    <div class="content">
        <div class="con-top">
            <div class="top-item" v-for="item in topList"
            :key="item.id">
                <div class="top-img-con">
                    <img :src="item.img" :width="item.width">
                </div>
                <span>{{item.text}}</span>
                <span>{{item.address}}</span>
            </div>
        </div>
        <div class="line"></div>
        <div class="order-item" >
            <div class="item-center" v-for="(item,index) of orderList" :key="index" @click="back(item)">
                <div class="img-con">
                    <img :src="item.goodImageUrl">
                </div>
                <div class="text">
                    <div class="props-con">{{item.goodPrec | ellipsis}}</div>
                    <div class="price-con">
                        <span>{{'《'+item.goodName  +'》' | ellipsi}}</span>
                        <span>￥</span>
                        <span>{{item.goodSale}} </span>
                        <span>x{{item.goodNum}}</span>
                    </div>
                </div>
            </div>
          <div class="item-bottom">
            <span>共{{orderList.number}}件商品，合计￥</span>
            <span>{{orderList.totalPrice}}</span>
         </div>
        </div>
    </div>
    <div class="order-msg">
        <ul>
            <li>订单信息</li>
            <li>订单编号：</li>
            <li>创建时间：</li>
            <li>订单状态：</li>
        </ul>
        <ul>
            <li></li>
            <li>{{msgList[0]}}</li>
            <li>{{msgList[1]}}</li>
            <li class="active">{{msgList[2]}}</li>
        </ul>
    </div>
  </div>
</template>

<script>
import req from '@/api/order-detail.js'

export default {
  name: 'order-detail',
  data () {
    return {
      orderCode: this.$route.query.orderCode,
      topList: [
        {
          id: '001',
          img: require('../../assets/卡车.png'),
          width: '18px',
          text: '取货地址：',
          address: ''
        }, {
          id: '002',
          img: require('../../assets/position2.png'),
          width: '13px',
          text: '取货门店：',
          address: ''
        }
      ],
      orderList: [],
      msgList: []
    }
  },
  mounted () {
    this.getOrderMessage()
    console.log('hello')
  },
  filters: {
    ellipsi (value) {
      if (!value) return ''
      if (value.length > 6) {
        return value.slice(0, 6) + '...'
      }
      return value
    },
    ellipsis (value) {
      if (!value) return ''
      if (value.length > 40) {
        return value.slice(0, 40) + '...'
      }
      return value
    }
  },
  methods: {
    // 返回商品详情
    back (item) {
      this.$router.push({path: '/comm-detail', query: {id: item.goodCode}})
    },
    // 返回订单的详细信息
    getOrderMessage () {
      req('queryOrderDetail', {
        orderCode: this.orderCode
      }).then(data => {
        if (data.code === 0) {
          console.log('订单详情', data)
          this.topList[0].address = data.data.deliveryAddress
          this.topList[1].address = data.data.deliveryStore
          this.msgList[0] = data.data.orderCode
          this.msgList[1] = data.data.orderCreateTime
          this.msgList[2] = data.data.orderState
          this.orderList = data.data.orderGoodsList
          this.orderList.number = 0
          this.orderList.totalPrice = 0
          this.orderList.forEach((item, index) => {
            this.orderList.number = parseFloat(item.goodNum) + parseFloat(this.orderList.number)
            this.orderList.totalPrice = parseFloat(parseFloat(item.goodNum) * parseFloat(item.goodSale)) + this.orderList.totalPrice
          })
          if (this.msgList[2] === 1) {
            this.msgList[2] = '已付款'
          } else if (this.msgList[2] === 4) {
            this.msgList[2] = '已取货'
          } else if (this.msgList[2] === 6) {
            this.msgList[2] = '已完成'
          } else if (this.msgList[2] === 0) {
            this.msgList[2] = '已取消'
          } else if (this.msgList[2] === 3) {
            this.msgList[2] = '未收货'
          } else if (this.msgList[2] === 2) {
            this.msgList[2] = '已发货'
          } else if (this.msgList[2] === 5) {
            this.msgList[2] = '未评价'
          }
        } else {
          this.$message({
            type: 'error',
            message: '网页报错'
          })
        }
        console.log(this.orderList)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .content {
      width: 95%;
      margin: 12px auto 12px;
      background-color: white;
      border-radius: 8px;
      padding: 13px 13px 0;
      box-sizing: border-box;
      .con-top {
          width: 100%;
          .top-item {
              display: flex;
              padding: 5px 0 22px;
              .top-img-con {
                  width: 30px;
                  text-align: center;
              }
              span:nth-child(3){
                  font-size: 15px;
                  width: 210px;
              }
          }
      }
      .line {
          width: 100%;
          height: 1px;
          background-color: rgb(204,204,204);
          margin: 5px 0;
      }
      .order-item {
          width: 95%;
          margin: 0 auto;
          background-color: white;
          border-radius: 8px;
          padding: 10px 15px;
          box-sizing: border-box;
          .item-center {
              width: 100%;
              display: flex;
              box-sizing: border-box;
              padding-top: 5px;
              .img-con {
                  flex: 1;
                  text-align: center;
                  img {
                      width: 84px;
                      height: 84px;
                  }
              }
              .text {
                  flex: 2.2;
                  .text-con {
                      font-size: 15px;
                      line-height: 22px;
                      overflow : hidden;
                      text-overflow: ellipsis;
                      display: -webkit-box;
                      -webkit-line-clamp: 2;
                      -webkit-box-orient: vertical;
                  }
                  .props-con {
                      font-size: 13.5px;
                      line-height: 26px;
                      color: rgb(168,168,168);
                  }
               .price-con {
                  display: flex;
                  line-height: 26px;
                  span:nth-child(1) {
                      margin-right: 8%;
                      color: rgb(195,152,98);
                      width: 100%;
                      font-weight: bolder;
                  }
                  span:nth-child(2) {
                      font-size: 11px;
                      color: rgb(242,0,0);
                  }
                  span:nth-child(3) {
                      font-size: 16px;
                      color: rgb(242,0,0);
                  }
                  span:nth-child(4) {
                      font-size: 11px;
                      color: rgb(168,168,168);
                  }
              }
              }
          }
          .item-bottom {
              width: 100%;
              line-height: 40px;
              text-align: right;
              padding-top: 5px;
              span:nth-child(1) {
                  font-size: 15px;
              }
              span:nth-child(2) {
                  font-size: 20px;
              }
          }
      }
  }
  .order-msg {
      width: 95%;
      background-color: white;
      box-sizing: border-box;
      padding: 8px 0 12px;
      margin: 0 auto;
      display: flex;
      border-radius: 8px;
      ul:nth-child(1) {
          margin: 0;
          padding: 0;
          flex: 1;
          li:nth-child(1) {
              margin: 0;
              padding: 0 0 0 25%;
              box-sizing: border-box;
              list-style: none;
              font-size: 16.5px;
              font-weight: bold;
              line-height: 42px;
          }
          li:nth-child(2) {
              margin: 0;
              padding: 0 0 0 25%;
              box-sizing: border-box;
              list-style: none;
              font-size: 14.5px;
              line-height: 30px;
          }
          li:nth-child(3) {
              margin: 0;
              padding: 0 0 0 25%;
              box-sizing: border-box;
              list-style: none;
              font-size: 14.5px;
              line-height: 30px;
          }
          li:nth-child(4) {
              margin: 0;
              padding: 0 0 0 25%;
              box-sizing: border-box;
              list-style: none;
              font-size: 14.5px;
              line-height: 30px;
          }
      }
      ul:nth-child(2) {
          margin: 0;
          padding: 0;
          flex: 2;
          li:nth-child(1) {
              margin: 0;
              padding: 0;
              list-style: none;
              height: 42px;
          }
          li:nth-child(2) {
              margin: 0;
              padding: 0;
              list-style: none;
              font-size: 14.5px;
              line-height: 30px;
          }
          li:nth-child(3) {
              margin: 0;
              padding: 0;
              list-style: none;
              font-size: 14.5px;
              line-height: 30px;
          }
          li:nth-child(4) {
              margin: 0;
              padding: 0;
              list-style: none;
              font-size: 14.5px;
              line-height: 30px;
          }
          .active {
              color: rgb(195,152,98);
          }
      }
  }
</style>
