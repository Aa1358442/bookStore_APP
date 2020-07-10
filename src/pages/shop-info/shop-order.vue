<template>
  <div >
    <div class="leader">
        <ul>
            <li class="active" @click="getOrderList">全部订单</li>
        </ul>
    </div>
    <div class="order-item" v-for="(item,index) of list" :key="index" @click="toPage(item)">
        <div class="item-top">
            <img src="../../assets/我的订单.png" alt="">
            <span>{{item.orderCode}}</span>
            <span>{{item.orderState}}</span>
        </div>
     <div v-for="(childItem, childIndex) in item.orderGoodList" :key="childIndex">
         <div class="item-center" >
            <div class="img-con">
                <img :src="childItem.goodImage" alt="">
            </div>
            <div class="text">
                <div class="props-con">
                    {{childItem.goodPrec | ellipsis}}
                </div>
                <div class="price-con">
                    <span>{{'《'+childItem.goodName+'》' | ellipsi}}</span>
                    <span>￥</span>
                    <span>{{childItem.goodSale}} &nbsp;</span>
                    <span>x{{childItem.goodNum}}</span>
                </div>
            </div>
        </div>
        </div>
                <div class="item-phone">
        <img src="../../assets/u1056.png">
        <span class="seller-name">{{item.userName}}</span>
         <img src="../../assets/u1060.png">
         <span class="seller-name">{{item.userPhone}}</span>
        </div>
        <div class="item-bottom">
            <span>共{{item.number}}件商品，合计￥</span>
            <span>{{item.totalPrice}}</span>
        </div>
       <div class="item-button" v-show="item.orderState === '已发货'">
           <div class="btn" @click.stop="cancel(item,'3')">
            <span>已到货</span>
        </div>
        </div>
           <div class="item-button" v-show="item.orderState === '未取货'">
            <div class="btn" @click.stop="cancel(item,'2')">
              <span>取消已到货</span>
            </div>
           <div class="btn" @click.stop="cancel(item,'4')">
            <span>已取货</span>
           </div>
        </div>
          <div class="item-button" v-show="item.orderState === '待确认取货'">
           <div class="btn" @click.stop="cancel(item,'3')">
            <span>取消已取货</span>
        </div>
        </div>
    </div>
  </div>
</template>

<script>
import req from '@/api/shop.js'

export default {
  name: 'shop-order',
  data () {
    return {
      inputContent: '',
      list: []
    }
  },
  mounted () {
    this.getOrderList()
  },
  filters: {
    ellipsis (value) {
      if (!value) return ''
      if (value.length > 40) {
        return value.slice(0, 40) + '...'
      }
      return value
    },
    ellipsi (value) {
      if (!value) return ''
      if (value.length > 7) {
        return value.slice(0, 7) + '..'
      }
      return value
    }
  },
  methods: {
	    toPage (data) {
      // console.log(data)
      this.$router.push({path: '/shop-order-detail', query: {orderCode: data.orderCode}})
    },
    // 获取订单列表
    getOrderList () {
      req('queryshopOwnerOrderList', {
      }).then(data => {
        this.list = data.data
        this.list.forEach((item, index) => {
          item.number = 0
          item.totalPrice = 0
          if (item.orderState === 1) {
            item.orderState = '已付款'
          } else if (item.orderState === 4) {
            item.orderState = '待确认取货'
          } else if (item.orderState === 6) {
            item.orderState = '已确认取货'
          } else if (item.orderState === 0) {
            item.orderState = '已取消'
          } else if (item.orderState === 2) {
            item.orderState = '已发货'
          } else if (item.orderState === 3) {
            item.orderState = '未取货'
          } else if (item.orderState === 5) {
            item.orderState = '已确认取货'
          }
          item.orderGoodList.forEach((childItem, childIndex) => {
            item.number = parseFloat(childItem.goodNum) + item.number
            item.totalPrice = parseFloat(childItem.goodNum) * parseFloat(childItem.goodSale) + item.totalPrice
          })
        })
        console.log(this.list)
      })
    },
    // 状态修改
    cancel (data, number) {
      console.log(data, number)
      req('updateOrder', {
        orderState: number,
        orderCode: data.orderCode
      }).then(data => {
        console.log(data)
        if (data.code === 0) {
          this.$message({
            type: 'success',
            duration: 1000,
            message: data.msg
          })
          this.getOrderList()
        } else {
          this.$message({
            type: 'warning',
            duration: 1000,
            message: data.msg
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
    height: 40px;
    width: 100%;
    margin-top: 20px;
    background-color: #f5f7fa;
    position: relative;
 .el-input {
        width: 75%;
        height: 100%;
        position: absolute;
        left: 16%;
    }
   /deep/ .el-input__inner {
         background-color: #f5f7fa;
         border: none;
    }
    img {
        position: absolute;
        top: 10%;
        left: 8%;
    }
}
.item-phone {
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    height: 40px;
    width: 100%;
    padding-left: 8px;
    padding-top: 8px;
    box-sizing: border-box;
}
  .leader {
      height: 64px;
      width: 100%;
      ul {
          height: 100%;
          padding: 0 0 0 2.5%;
          margin: 0;
          display: flex;
          li {
              line-height: 64px;
              padding: 0;
              margin: 0;
              list-style: none;
              padding: 0 13px;
              font-size: 15px;
          }
          .active {
              font-size: 17px;
              color: rgb(195,152,98);
          }
      }
  }
  .order-item {
      width: 95%;
      margin: 0 auto 12px;
      margin-bottom: 70px;
      background-color: white;
      border-radius: 8px;
      padding: 10px 15px;
      box-sizing: border-box;
      .item-top {
          width: 100%;
          display: flex;
          align-items: center;
          position: relative;
          img {
              width: 13px;
              height: 16px;
          }
          span:nth-child(2) {
              font-size: 16px;
              flex: 1;
              line-height: 38px;
              position: relative;
              left: 8px;
          }
          span:nth-child(3) {
              position: absolute;
              right: 0;
              font-size: 13px;
              color: rgb(195,152,98);
          }
      }
      .item-center {
          width: 100%;
          display: flex;
          box-sizing: border-box;
          padding-top: 5px;
          .img-con {
              flex: 1;
              text-align: center;
              height: 84px;
              width: 84px;
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
      .item-more {
          width: 100%;
          display: flex;
          .btn {
              width: 92px;
              height: 28px;
              border-radius: 20px;
              position: relative;
              border: 1.5px solid rgb(195,152,98);
              margin-left: auto;
              margin-top: 10px;
              margin-bottom: 6px;
              span {
                  font-size: 14px;
                  position: absolute;
                  width: 70px;
                  top: 50%;
                  left: 50%;
                  transform: translate(-50%,-50%);
                  color: rgb(195,152,98);
              }
          }
      }
  }
     .item-button {
          width: 100%;
          display: flex;
          .btn {
              width: 103px;
              height: 28px;
              border-radius: 20px;
              position: relative;
              border: 1.5px solid rgb(195,152,98);
              margin-left: auto;
              margin-top: 10px;
              margin-bottom: 6px;
              text-align: center;
              span {
                    font-size: 14px;
                  position: absolute;
                  width: 70px;
                  top: 50%;
                  left: 50%;
                  transform: translate(-50%,-50%);
                  color: rgb(195,152,98);
              }
          }
      }
</style>
