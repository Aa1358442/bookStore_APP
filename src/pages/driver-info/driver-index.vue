<template>
  <div>
    <!-- <div class="order-item" v-for="item of list" :key="item.id" @click="toPage(item)">
    </div> -->
    <div class="shop-name">
    <div class="top-item" v-for="item in topList"
            :key="item.id">
            <div class="img">
        <img src="../../assets/u919.png" :width="item.width">
        <span>{{item.storeCode}}</span>
        </div>
         <div class="store">
             <span>{{'门店：'}}</span>
             <span>{{item.storeName}}</span>
         </div>
         <div class="address">
             <span>{{'地址:'}}</span>
             <span>{{item.storeAddress}}</span>
         </div>
         <div class="name">
             <span>{{'店长:'}}</span>
             <span>{{item.userName}}</span>
         </div>
         <div class="phone">
             <span>{{'电话:'}}</span>
             <span>{{item.userPhone}}</span>
         </div>
     </div>
    </div>
  </div>
</template>

<script>
import req from '@/api/driver.js'

export default {
  name: 'driver-index',
  data () {
    return {
      topList: []
    }
  },
  mounted () {
    this.getDriverList()
  },
  methods: {
      // 无用
	    toPage (data) {
      this.$router.push({path: '/shop-order-detail'})
    },
    // 无用
    evaluate (data) {
      console.log(data)
      this.$router.push({path: '/order-evaluate'})
    },
    // 获取负责门店信息
    getDriverList () {
      req('queryDriverResponsibleList', {
        driverCode: sessionStorage.getItem('userCode')
      }).then(data => {
        console.log(data)
        this.topList = data.data
        //  console.log(this.topList)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.img {
    margin-top: 10px;
    padding-left: 20px;
}
.store {
    width: 100%;
    height: 30px;
    margin-top: 10px;
    padding-left: 30px;
}
.address {
    width: 100%;
    margin-top: 10px;
    display: flex;
    padding-bottom: 6px;
    padding-left: 30px;
    span:nth-child(2) {
        width: 75%;
        padding-left: 5px;
    }
}
.name {
    width: 100%;
    height: 30px;
    margin-top: 10px;
    padding-left: 30px;
}
.phone {
    width: 100%;
    height: 30px;
    margin-top: 10px;
    padding-left: 30px;
}
.top-item {
    width: 95%;
    background: #fff;
    margin: 0 auto;
    border-radius: 8px;
}
.top-item img {
    width: 25px;
}
.top-item:last-child {
    margin-bottom: 70px;
}
.shop-name {
    width: 100%;
    height: 250px;
    margin-top: 10px;

}
.content {
    height: 40px;
    width: 100%;
    margin-top: 10px;
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
      background-color: white;
      border-radius: 8px;
      padding: 10px 15px;
      box-sizing: border-box;
      .item-top {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
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
              img {
                  width: 84px;
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
                  text-align: right;
                  line-height: 26px;
                  span:nth-child(1) {
                      font-size: 11px;
                      color: rgb(242,0,0);
                  }
                  span:nth-child(2) {
                      font-size: 16px;
                      color: rgb(242,0,0);
                  }
                  span:nth-child(3) {
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
          border-bottom: 1px solid #ccc;
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
                  font-size: 15px;
                  position: absolute;
                  top: 50%;
                  left: 50%;
                  margin-top: -10.4px;
                  margin-left: -16px;
                  color: rgb(195,152,98);
              }
          }
      }
  }
</style>
