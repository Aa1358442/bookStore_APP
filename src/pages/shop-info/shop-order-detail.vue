<template>
  <div style="position: relative;">
    <div class="content">
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
    <div class="con-phone">
    <div class="order-item" >
        <div class="sell-name"><img src="../../assets/u1157.png">
        <span>{{userName}}</span></div>
        <div class="sell-phone"><img src="../../assets/u1151.png">
        <span>{{userPhone}}</span></div>
    </div>

    </div>
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
                    <img :src="item.goodImage">
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
  </div>
</template>

<script>
import req from '@/api/shop.js'

export default {
  name: 'shop-order-detail',
  data () {
    return {
      orderCode: this.$route.query.orderCode,
      topList: [
        {
          id: '001',
          img: require('../../assets/u919.png'),
          width: '18px',
          text: '取货门店：',
          address: ''
        }, {
          id: '002',
          img: require('../../assets/u295.png'),
          width: '13px',
          text: '取货地址:',
          address: ''
        }
      ],
      orderList: [],
      msgList: [],
      userName: '',
      userPhone: ''
    }
  },
  mounted () {
    this.getOrderMessage()
  },
  filters: {
    ellipsis (value) {
      if (!value) return ''
      if (value.length > 20) {
        return value.slice(0, 20) + '...'
      }
      return value
    },
    ellipsi (value) {
      if (!value) return ''
      if (value.length > 6) {
        return value.slice(0, 6) + '...'
      }
      return value
    }
  },
  methods: {
    // 获取订单列表详细信息
    getOrderMessage () {
      req('orderDetail', {
        orderCode: this.orderCode
      }).then(data => {
        console.log(this.orderCode)
        console.log(data)
        this.topList[0].address = data.data.deliveryStore
        this.topList[1].address = data.data.deliveryAddress
        this.msgList[0] = data.data.orderCode
        this.msgList[1] = data.data.orderCreateTime
        this.msgList[2] = data.data.orderState
        this.orderList = data.data.orderGoodsList
        this.userName = data.data.userName
        this.userPhone = data.data.userPhone
        this.orderList.number = 0
        this.orderList.totalPrice = 0
        this.orderList.forEach((item, index) => {
          this.orderList.number = parseFloat(item.goodNum) + parseFloat(this.orderList.number)
          this.orderList.totalPrice = parseFloat(parseFloat(item.goodNum) * parseFloat(item.goodSale)) + this.orderList.totalPrice
        })
        console.log(this.orderList)
        if (this.msgList[2] === '1') {
          this.msgList[2] = '已付款'
        } else if (this.msgList[2] === '4') {
          this.msgList[2] = '已取货'
        } else if (this.msgList[2] === '6') {
          this.msgList[2] = '已完成'
        } else if (this.msgList[2] === '0') {
          this.msgList[2] = '已取消'
        } else if (this.msgList[2] === '3') {
          this.msgList[2] = '未收货'
        } else if (this.msgList[2] === '2') {
          this.msgList[2] = '已发货'
        } else if (this.msgList[2] === '5') {
          this.msgList[2] = '未评价'
        }
      })
    },
    // 修改订单状态
    updateState () {
      req('updateShopOwnerOrderState', {
        orderCode: this.orderCode,
        orderState: '4'
      }).then(data => {
        console.log('更新状态', data)
        if (data.code === 0) {
          this.$message({
            type: 'success',
            message: data.msg,
            duration: 1000
          })
        } else {
          this.$message({
            type: 'warning',
            message: data.msg,
            duration: 1000
          })
        }
      })
    }
  }
}

</script>

<style lang="scss" scoped>
   .content {
      width: 100%;
      margin: 12px auto 12px;
      background-color: rgb(246,246,246);
      border-radius: 8px;
      padding: 13px 13px 0;
      box-sizing: border-box;
      .sell-name {
          img {
            padding-left: 3px;
          }
          span {
              padding-left: 5px;
          }
      }
      .con-top {
          width: 100%;
          padding-bottom: 15px;
          background: #fff;
          .top-item {
              display: flex;
              padding-left: 15px;
              padding-top: 20px;
              img {
                  height: 18px;
                  width: 18px;
              }
              .top-img-con {
                  width: 30px;
                  text-align: center;
              }
              span:nth-child(2) {
                  width: 80px;
              }
              span:nth-child(3){
                  font-size: 15px;
                  width: 190px;
              }
          }
      }
      .con-phone {
          width: 100%;
          height: 80px;
          padding-top: 15px;
          padding-bottom: 5px;
          border-bottom: 1px solid #ccc;
          span {
              margin-left: 15px;
          }
      }
      .line {
          width: 100%;
          height: 1px;
          background-color: rgb(204,204,204);
          margin: 5px 0;

      }
     .order-item {
          width: 100%;
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
  .footer {
      width: 100%;
      height: 40px;
      background: #eee;
      position: fixed;
      box-sizing: border-box;
      bottom: 0%;
    .el-button {
        border-radius: 15px;
        margin-top: 5px;
        position: absolute;
        right: 10%;
        background: red;
        outline: none;
    }
  }
  .order-msg {
      width: 100%;
      background-color: #fff;
      padding-bottom: 8px;
      border: 1px solid #dddddd;
      box-sizing: border-box;
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
              color: red;
          }
      }
  }
  .totalList {
      width: 90%;
      margin: 10px auto;
      text-align: right;
      span:nth-child(1) {
          font-size: 16px;
      }
      span:nth-child(2) {
          font-size: 20px;
          font-weight: bolder;
          margin-right: 10px;
      }
  }
</style>
