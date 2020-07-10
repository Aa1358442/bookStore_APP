<template>
  <div class="container">
    <div class="book-banner">
      <img :src="this.commDetailData.goodImageList" alt="" v-show="this.commDetailData.goodImageList">
      <img src="../../assets/book1.jpg" alt="" v-show="!this.commDetailData.goodImageList">
    </div>

    <div class="book-detail">
      <div class="book-recommend">
      <div class="book-price">￥{{this.commDetailData.goodSale}} <span>￥{{this.commDetailData.goodPrice}}</span></div>
        <div
              class="star"
              :style="{backgroundPosition: `${90 - this.commDetailData.goodRank*18}px 0`}"
              v-if="this.commDetailData.goodRank !== 0">
            </div>
            <span :class="{starColor:this.commDetailData.goodRank === 0, bookRetank:this.commDetailData.goodRank !== 0}"><span v-show="this.commDetailData.goodRank !== 0">{{this.commDetailData.goodRank}}</span><span v-show="this.commDetailData.goodRank === 0">{{'暂无评分'}}</span></span>
      </div>

      <div class="book-name"><span>{{this.commDetailData.goodName}}</span> </div>
      <div class="book-number"><span>{{'销售数量：'+this.commDetailData.goodSaleNum+'件'}}</span><span>{{'库存:'+this.commDetailData.goodNum}}</span><span>{{'访问量:'+this.commDetailData.goodThrought+'次'}}</span></div>
      <div class="book-Describe">{{this.commDetailData.goodPric | ellipsis}}</div>
      <div class="count-box">
        <span>数量</span>

        <div class="handler-box">
          <div @click="countDelete">-</div>
          <div>{{bookCount}}</div>
          <div @click="countAdd">+</div>
        </div>
      </div>
      <div class="address">
        <span>送至</span>
        <span class="iconfont iconhtmal5icon14"></span>
        <span>{{address}}({{specificAddress |ellipsi}})</span>
      </div>
    </div>
    <div class="footer">
      <div>
      <img src="../../assets/shop_car2.png" alt="">
      <span @click="skipCar">购物车</span>
    </div>
    <div @click="shopCar">加入购物车</div>
    <div @click="orderList">立即购买</div>
    </div>
  </div>
</template>

<script>
import req from '@/api/comm-detail.js'

export default {
  name: 'comm-detail',
  data () {
    return {
      commDetailData: {},
      bookCount: 1,
      address: '',
      specificAddress: '',
      id: ''
    }
  },
  mounted () {
    this.getGoodId()
    this.getGoodMessage()
    this.getAddress()
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
      if (value.length > 6) {
        return value.slice(0, 6) + '...'
      }
      return value
    }
  },
  methods: {
    // 检查地址是否绑定，若未绑定则跳转到邀请码绑定界面
    getAddress () {
      console.log('userCode')
      req('queryUserBindStore', {
        userCode: sessionStorage.getItem('userCode')
      }).then(data => {
        if (data.code === 0) {
          this.address = data.data.storeName
          this.specificAddress = data.data.storeAddress
        } else if (data.code === 3) {
          this.$message({
            type: 'error',
            message: '此店铺尚未绑定邀请码,2秒后自动返回绑定页面'
          })
          setTimeout(() => {
            this.$router.push({path: '/change-store-code'})
          }, 2000)
        }
        console.log(data)
      })
    },
    // 获取商品具体的id以便查询详情
    getGoodId () {
      this.id = this.$route.query.id
      console.log(this.id)
    },
    // 获取商品详细信息
    getGoodMessage () {
      req('queryGoodDetail', {
        goodCode: this.id
      }).then(data => {
        this.commDetailData = data.data
        console.log('获取商品详细信息', data)
      })
    },
    // 数量删减
    countDelete () {
      if (this.bookCount > 1) {
        this.bookCount--
      }
    },
    // 数量增加
    countAdd () {
      this.bookCount++
    },
    // 添加购物车
    shopCar () {
      req('addShoppingCart', {
        goodCode: this.id,
        goodsNum: this.bookCount
      }).then(data => {
        console.log('添加购物车', data)
        if (data.code === 3) {
          this.$message({
            duration: 1500,
            type: 'warning',
            message: '商品已下架或库存不足无法购买'
          })
        } else {
          this.$message({
            duration: 1000,
            type: 'success',
            message: '加入购物车成功'
          })
          this.$router.push({path: '/shop-car'})
        }
      })
    },
    // 跳转购物车界面
    skipCar () {
      this.$router.push({path: '/shop-car'})
    },
    // 直接购买省去购物车界面
    orderList () {
      console.log(this.commDetailData)
      req('fastBuyGoods', {
        goodCode: this.id,
        goodNum: this.bookCount
      }).then(data => {
        if (data.code === 3) {
          this.$message({
            duration: 1500,
            type: 'warning',
            message: '商品已下架或库存不足无法购买'
          })
        } else {
          this.$message({
            duration: 1000,
            type: 'success',
            message: '商品购买成功'
          })
          this.$router.push({path: '/order-list'})
        }
        console.log('快速添加', data)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  background: #ddd;
}

.book-banner {
  width: 100%;
  height: 300px;
  padding: 10px;
  background: #fff;

  box-sizing: border-box;

  img {
    display: block;
    width: 80%;
    height: 100%;
    margin: 0 auto;
  }
}

.book-detail {
  padding: 10px;
  box-sizing: border-box;
  background: #fff;
  margin-top: 10px;
  width: 100%;
  margin: 5px auto 0;

  .book-recommend{
    display: flex;
    align-items: center;
  }
  .book-price {
    font-size: 22px;
    color: red;
    width: 60%;
    span {
      color: #333;
      font-size: 14px;
      font-weight: bold;
      text-decoration: line-through;
    }
  }
  .bookRetank {
    color: rgb(255,69,0);
    font-weight: bolder;
  }

  .book-name {
    font-size: 18px;
    line-height: 25px;
    display: flex;
    span:nth-child(1) {
      width: 100%;
      color: #333;
      text-align: left;
      font-weight: bolder;
    }
  }
  .book-number {
    font-size: 14px;
    line-height: 20px;
    display: flex;
    span:nth-child(1) {
      width: 40%;
      color: #ccc;
    }
    span:nth-child(2) {
      width: 30%;
      color: #ccc;
    }
    span:nth-child(3) {
      color: #ccc;
    }
  }

  .book-Describe {
    font-size: 14px;
    color: #333;
    font-weight: bold;
    border-bottom: 1px solid #ddd;
    padding: 10px 0;
  }

  .count-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 50px;

    .handler-box {
      display: flex;
      height: 30px;
      align-items: center;
      border: 1px solid #ddd;
      border-radius: 5px;
      margin-top: 3px;

      div:first-child {
        width: 30px;
        height: 30px;
        text-align: center;
        line-height: 30px;
      }

      div:nth-child(2) {
        width: 40px;
        height: 30px;
        text-align: center;
        line-height: 30px;
        border-left: 1px solid #ddd;
        border-right: 1px solid #ddd;
      }

      div:nth-child(3) {
        width: 30px;
        height: 30px;
        text-align: center;
        line-height: 30px;
      }
    }
  }
  .address {
    height: 35px;
    margin-top: 8 px;
    .iconhtmal5icon14 {
      color: #ddd;
    }
  }
}
.footer {
  width: 100%;
  height: 50px;
  position: fixed;
  bottom: 0;
  background: #fff;
  border-top: 1px solid #ddd;
  display: flex;
  justify-content: flex-end;
  box-sizing: border-box;
  align-items: center;
}

.footer div:first-child {
  width: 50px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 12px;
}

.footer div:first-child img {
  width: 25px;
  height: 25px;
}

.footer div:nth-child(2) {
  width: 100px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  border: 1px solid rgb(197, 156, 104);
  background: #fff;
  border-radius: 10px;
  margin-left: 10px;
}

.footer div:nth-child(3) {
  width: 100px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  background: rgb(197, 156, 104);
  color: #fff;
  border-radius: 10px;
  margin-left: 10px;
  margin-right: 10px;
}
  .star {
            width: 90px;
            height: 18px;
            background-image: url('../../assets/stars.png');
            background-position: 0 0;
            background-repeat: no-repeat;
            margin: 0,auto;
            margin-right: 10px;
          }
  .starColor {
    color: #ccc;
    font-weight: bolder;
  }
</style>
