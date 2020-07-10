<template>
  <div class="container">
    <ul class="book-list">
      <li class="book-list-item" v-for="(item, index) in list" :key="index">

        <!-- 选择按钮 -->
        <div class="select-btn-box">
          <div>
            <input type="checkbox" @change="inputChange(item)">
            <div class="action" :style="{display: item.checked ? 'block' : 'none'}"></div>
          </div>
        </div>
        <!-- 书本信息 -->
        <div class="book-count-info">
          <img src="../../assets/book1.jpg" alt="" v-show="!item.goodImageUrl">
          <img :src="item.goodImageUrl" alt="" v-show="item.goodImageUrl">
          <div>
            <div>{{item.goodName}}</div>
            <div>{{item.goodAd | ellipsis}}</div>
            <div>
              <span>￥{{item.goodSale}}</span>
              <div class="change-count-box">
                <div @click="countDelete(item)">-</div>
                <div>{{item.goodNum}}</div>
                <div @click="countAdd(item)">+</div>
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>
    <div class="close-count">
      <div>
        <div>
          <input type="checkbox" @change="allInputChange">
          <div class="action" :style="{display: allChecked ? 'block' : 'none'}"></div>
        </div>
        <span>全选</span>
      </div>

      <div>
        <div>
          <b>合计:</b>
          <span>{{this.totalPrice}}</span>
        </div>

        <button @click="account">结算</button>
        <button @click="shopDelete">删除</button>
      </div>
    </div>
  </div>
</template>

<script>
import req from '@/api/shop-car.js'
export default {
  name: 'shop-car',
  data () {
    return {
      allChecked: false,
      totalPrice: '0',
      list: [],
      number: 1,
      cartCode: []
    }
  },
  filters: {
    ellipsis (value) {
      if (!value) return ''
      if (value.length > 20) {
        return value.slice(0, 20) + '...'
      }
      return value
    }
  },
  mounted () {
    this.getCarList()
  },
  methods: {
    // 获取购物车列表
    getCarList () {
      req('queryShoppingCartList', {
        userCode: sessionStorage.getItem('userCode'),
        pageNum: '1',
        pageSize: '1000'
      }).then(data => {
        if (data.code === 0) {
          this.list = data.data.list
          console.log('this.list', this.list)
          this.list.forEach((item, index) => {
            item.checked = false
          })
          console.log('this.list', this.list)
        } else {
          this.$message({
            type: 'success',
            message: '你的购物车目前空无一物,快去选购吧!',
            duration: 1500
          })
          this.list = []
          this.allChecked = false
        }
        // console.log(data)
        // console.log(this.list)
      })
    },
    // 全选事件
    allInputChange () {
      this.allChecked = !this.allChecked
      this.list.forEach(item => {
        item.checked = this.allChecked
      })
      this.totalPrice = this.getTotal()
    },
    // 单个按钮点击事件
    inputChange (item) {
      item.checked = !item.checked

      for (let i = 0; i < this.list.length; i++) {
        if (this.list[i].checked === false) {
          this.allChecked = false
          break
        } else {
          console.log('成功')
          this.allChecked = true
        }
      }
      this.totalPrice = this.getTotal()
    },
    // 数量减少
    countDelete (data) {
      if (data.goodNum > 1) {
        data.goodNum = parseFloat(data.goodNum) - 1
      }
      this.totalPrice = this.getTotal()
    },
    // 数量增加
    countAdd (data) {
      console.log(data)
      data.goodNum = parseFloat(data.goodNum) + 1
      this.totalPrice = this.getTotal()
    },
    // 获取总价
    getTotal () {
      let total = 0
      this.list.forEach(item => {
        if (item.checked) {
          total = total + parseFloat(item.goodNum * item.goodSale)
        }
      })
      return parseFloat(total.toFixed(2))
    },
    // 商品删除
    shopDelete () {
      this.list.forEach((item) => {
        if (item.checked) {
          if (this.cartCode.length === 0) {
            this.cartCode[0] = item.cartCode
          } else {
            this.cartCode[this.number] = item.cartCode
            this.number++
            console.log('多组数据')
          }
        }
      })
      console.log('执行前', this.cartCode)
      req('deleteShoppingCartGoods', {
        cartCode: this.cartCode.join(',')
      }).then(data => {
        console.log('删除结果', data)
        this.$message({
          duration: 1000,
          type: 'success',
          message: '删除成功'
        })
        this.totalPrice = '0'
        this.getCarList()
      })
      this.number = 1
      this.cartCode = []
      console.log('执行后', this.cartCode)
    },
    // 下单成功
    account () {
      this.list.forEach((item) => {
        if (item.checked) {
          if (this.cartCode.length === 0) {
            this.cartCode[0] = item.cartCode
          } else {
            this.cartCode[this.number] = item.cartCode
            this.number++
            console.log('多组数据')
          }
        }
      })
      req('addUserOrder', {
        cartCode: this.cartCode.join(',')
      }).then(data => {
        console.log('订单添加结果', data)
        if (data.code === 0) {
          this.$message({
            type: 'success',
            message: data.msg,
            duration: 1000
          })
          setTimeout(() => {
            this.$router.push({path: '/order-list'})
          }, 1000)
        } else {
          this.$message({
            type: 'warning',
            message: data.msg,
            duration: 1000
          })
        }
        this.totalPrice = '0'
        this.getCarList()
      })
      this.number = 1
      this.cartCode = []
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  padding-bottom: 110px;
}
  .book-list {
    width: 100%;
    // position: absolute;
    // left: 50%;
    // bottom: 55px;
    overflow: auto;
    // transform: translate(-50%, 0);

    li {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      width: 100%;
      height: 150px;
      background: #fff;
      border-radius: 10px;
      padding: 10px 10px;
      box-sizing: border-box;
      margin-bottom: 10px;

      .select-btn-box {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 40px;
        height: 100%;

        >div {
          position: relative;
          width: 20px;
          height: 20px;
          border: 2px solid #ddd;
          border-radius: 50%;

          input {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            padding: 0;
            margin: 0;
            width: 15px;
            height: 15px;
            z-index: 1;
            opacity: 0;
          }

          .action {
            display: none;
            position: absolute;
            width: 15px;
            height: 15px;
            border-radius: 50%;
            background: rgb(197, 156, 104);
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 0;
          }
        }
      }

      .book-count-info {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex: 1;
        height: 100%;

        >img {
          height: 80%;
          width: 104px;
          vertical-align: middle;
          align-self: center;
        }

        >div {
          > div:first-child {
            font-size: 16px;
            width: 100%;
            font-weight: bold;
            height: 40px;
            padding-left: 10px;
            box-sizing: border-box;
          }

          > div:nth-child(2) {
            font-size: 14px;
            width: 100%;
            height: 30px;
            padding-left: 10px;
            box-sizing: border-box;
            color: #ddd;
            margin-bottom: 12px;
          }

          > div:nth-child(3) {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 14px;
            width: 100%;
            height: 30px;
            padding-left: 10px;
            box-sizing: border-box;

            span {
              color: red;
            }

            .change-count-box {
              display: flex;
              height: 20px;

              div:first-child {
                width: 30px;
                height: 20px;
                text-align: center;
                line-height: 20px;
                border: 1px solid #ddd;
              }

              div:nth-child(2) {
                width: 50px;
                height: 20px;
                text-align: center;
                line-height: 20px;
                border: 1px solid #ddd;
                border-left: none;
                border-right: none;
              }

              div:nth-child(3) {
                width: 30px;
                height: 20px;
                text-align: center;
                line-height: 20px;
                border: 1px solid #ddd;
              }
            }
          }
        }
      }
    }
  }

.close-count {
  position: fixed;
  bottom: 60px;
  width: 100%;
  height: 50px;
  background: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  box-sizing: border-box;

  div:first-child {
    display: flex;
    height: 50px;
    align-items: center;

    div {
      position: relative;
      width: 20px;
      height: 20px;
      border: 2px solid #ddd;
      border-radius: 50%;
      margin-right: 10px;

      input {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        padding: 0;
        margin: 0;
        width: 15px;
        height: 15px;
        z-index: 1;
        opacity: 0;
      }

      .action {
        display: none;
        position: absolute;
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background: rgb(197, 156, 104);
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 0;
      }
    }
  }

  div:nth-child(2) {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 50px;

    div:first-child {
      height: 50px;
      line-height: 50px;
      font-size: 14px;
      box-sizing: border-box;

      span {
        font-size: 18px;
        color: red;
      }
    }

    button {
      width: 75px;
      height: 40px;
      background: rgb(197, 156, 104);
      color: #fff;
      outline: none;
      line-height: 40px;
      text-align: center;
      border: none;
      border-radius: 10px;
      margin-left: 20px;
    }

    button:nth-child(3) {
      background: red;
    }
  }
}

</style>
