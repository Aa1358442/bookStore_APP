<template>
  <div>
    <div class="leader">
        <ul v-for="(item,index) in lidata" :key="index">
            <li><span :class="{active:index==isActive}" @click="changeClass(index),getOrderList(item.index)"> {{item.name}}</span></li>
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
                <img :src="childItem.imageUrl" alt="">
            </div>
            <div class="text">
                <div class="text-con">
                    <!-- {{childItem.goodName}} -->
                    {{childItem.goodAd}}
                </div>
                <div class="props-con">
                    {{childItem.goodPre | ellipsis}}

                </div>
                <div class="price-con">
                    <span>{{'《'+childItem.goodName+'》' | ellipsi }}</span>
                    <span>￥</span>
                    <span>{{childItem.goodSale}} &nbsp;</span>
                    <span>x{{childItem.goodNum}}</span>
                </div>
            </div>
        </div>
        </div>
         <div class="item-bottom">
            <span>共{{item.number}}件商品，合计￥</span>
            <span>{{item.totalPrice}}</span>
        </div>
          <div class="item-more" v-show="item.orderState === '未评价'">
            <div class="btn" @click.stop="evaluate(item)">
                <span>评价</span>
            </div>
        </div>
        <div class="button-list">
               <div class="item-button" v-show="item.orderState === '待确认取货'">
           <div class="btn" @click.stop="cancel(item,'5')">
            <span>确定已取货</span>
        </div>
        </div>
        <div class="item-button" v-show="item.orderState === '已付款' || item.orderState === '已发货'
         || item.orderState === '已到货' || item.orderState === '待确认取货'">
           <div class="btn" @click.stop="cancel(item,'0')">
            <span>订单取消</span>
        </div>
        </div>

        </div>
    </div>
  </div>
</template>

<script>
import req from '@/api/order-list.js'

export default {
  name: 'order-list',
  data () {
    return {
      isActive: '0',
      list: [],
      lidata: [
        {index: '', name: '全部订单'},
        {index: 1, name: '已付款'},
        {index: 3, name: '待取货'},
        {index: 6, name: '已完成'}
      ]
    }
  },
  mounted () {
    this.getOrderList()
  },
  filters: {
    ellipsis (value) {
      if (!value) return ''
      if (value.length > 40) {
        return value.slice(0, 30) + '...'
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
    // class颜色变化
    changeClass (index) {
      this.isActive = index
    },
    // 获取所有订单信息
    getOrderList (value) {
      console.log(value)
      req('queryUserOrderList', {
        orderName: '',
        orderState: value,
        pageNum: '1',
        pageSize: '1000'
      }).then(data => {
        console.log(data)
        if (data.code === 3) {
          this.$message({
            type: 'warning',
            message: '查询为空',
            duration: 1000
          })
          this.list = []
        } else {
          this.list = data.data.list
          this.list.forEach((item, index) => {
            item.number = 0
            item.totalPrice = 0
            if (item.orderState === '1') {
              item.orderState = '已付款'
            } else if (item.orderState === '4') {
              item.orderState = '待确认取货'
            } else if (item.orderState === '6') {
              item.orderState = '已完成'
            } else if (item.orderState === '0') {
              item.orderState = '已取消'
            } else if (item.orderState === '2') {
              item.orderState = '已发货'
            } else if (item.orderState === '3') {
              item.orderState = '已到货'
            } else if (item.orderState === '5') {
              item.orderState = '未评价'
            }
            item.orderGoodList.forEach((childItem, childIndex) => {
              item.number = parseFloat(childItem.goodNum) + item.number
              item.totalPrice = parseFloat(childItem.goodNum) * parseFloat(childItem.goodSale) + item.totalPrice
            })
          })
        }
        console.log('商品列表查询', data),
        console.log(this.list)
      })
    },
    // 订单详情
	    toPage (data) {
      // console.log(data)
      this.$router.push({path: '/order-detail', query: {orderCode: data.orderCode}})
    },
    // 检测到是否未评价如果未评价则显示一个评价按钮进行评价页面的跳转
    evaluate (data) {
      console.log(data)
      this.$router.push({path: '/order-evaluate', query: {orderCode: data.orderCode}})
    },
    // 订单状态的回溯修改
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
  .leader {
      height: 64px;
      width: 100%;
      display: flex;
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
      .item-more {
          width: 100%;
          display: flex;
          .btn {
              width: 92px;
              height: 32px;
              border-radius: 20px;
              position: relative;
              border: 1.5px solid rgb(195,152,98);
              margin-left: auto;
              margin-top: 10px;
              margin-bottom: 6px;
              span {
                  font-size: 15px;
                  position: absolute;
                  width: 84px;
                  top: 50%;
                  left: 50%;
                  margin-top: -10.4px;
                  margin-left: -19px;
                  color: rgb(195,152,98);
              }
          }
      }
      .button-list {
          display: flex;
          flex-direction: row-reverse;

      .item-button {
          width: 37%;
          display: flex;
          .btn {
              width: 96px;
              height: 32px;
              border-radius: 20px;
              position: relative;
              border: 1.5px solid rgb(195,152,98);
              margin-left: auto;
              margin-top: 10px;
              margin-bottom: 6px;
              text-align: center;
              span {
                  font-size: 15px;
                  position: absolute;
                  width: 84px;
                  top: 50%;
                  left: 50%;
                  transform: translate(-50%,-50%);
                  color: rgb(195,152,98);
              }
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
</style>
