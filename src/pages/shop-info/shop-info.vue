<template>
  <div>
    <div class="user">
            <!-- <img src="../../assets/u681.jpg" > -->
            <img :src="list.userImageUrl" alt="">
            <span>{{list.userName}}</span>
    </div>
    <div class="shop-info">
     <div class="top-item" v-for="item in topList"
            :key="item.id">
        <img :src="item.img" :width="item.width" :height="item.height">
        <span>{{item.text}}</span>
        <span>{{item.address}}</span>
     </div>
    </div>
    <div class="content">
        <div
          class="con-item"
          v-for="(item,index) in conList"
          :key="index"
          @click="toPage(item)">
            <div>
                <img :src="item.img1" alt="">
            </div>
            <div><span>{{item.label}}</span></div>
            <div>
                <img :src="item.img2" alt="">
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import req from '@/api/shop.js'
export default {
  name: 'shop-info',
  data () {
    return {
      list: [],
      topList: [
        {
          id: '001',
          img: require('../../assets/u919.png'),
          width: '18px',
          height: '18px',
          text: '取货门店：'
        },
        {
          id: '002',
          img: require('../../assets/u1157.png'),
          width: '12px',
          height: '14px',
          text: '邀请码: '
        }, {
          id: '003',
          img: require('../../assets/u295.png'),
          width: '18px',
          height: '18px',
          text: '地址:'
        }
      ],
      conList: [
        {
          img1: require('../../assets/修改密码.png'),
          label: '修改密码',
          img2: require('../../assets/右.png'),
          toPath: '/change-password'
        }, {
          img1: require('../../assets/退出.png'),
          label: '退出登录',
          img2: require('../../assets/右.png'),
          toPath: '/login'
        }
      ]
    }
  },
  mounted () {
    this.getShopInfo()
  },
  methods: {
    toPage (data) {
      this.$router.push({path: data.toPath})
    },
    // 获取店主详细信息
    getShopInfo () {
      req('queryStoreDetail', {
        storeCode: sessionStorage.getItem('storeCode')
      }).then(data => {
        this.list = data.data
        this.topList[0].address = data.data.storeName
        this.topList[1].address = data.data.storeInvitation
        this.topList[2].address = data.data.storeAddress
        console.log(this.list)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .user {
      width: 100%;
      height: 146.8px;
      background: red;
      position: relative;
      img {
          position: absolute;
          width: 90px;
          height: 90px;
          border-radius: 50%;
          overflow: hidden;
          top: 50%;
          left: 50%;
          transform: translate(-50%,-50%);
      }
      span {
        position: absolute;
        color: #fff;
        top: 90%;
        left: 50%;
        transform: translate(-50%,-50%);
      }
  }
  .shop-info {
      width: 100%;
      height: 130px;
      background: #fff;
      margin-top: 10px;
      span:nth-child(2) {
        width: 80px;
        margin-left: 5px;
      }
       span:nth-child(3) {
        width: 250px;
      }
  }

  .top-item {
      height: 42px;
      margin-left: 20px;
      display: flex;
      justify-content: cener;
      align-items: center;
  }
  .top-item:nth-child(2) {
    img {
      padding-left: 2px;
      margin-right: 2px;
    }
  }

  .content {
      width: 100%;
      height: 106px;
      padding: 18px 16px;
      margin: 10px auto;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      background-color: #fff;
      border-radius: 8px;
      .con-item {
          width: 100%;
          flex: 1;
          display: flex;
          div:nth-child(1) {
              display: flex;
              align-items: center;
              justify-content: center;
              img {
                  width: 14px;
                  height: 16px;
              }
          }
          div:nth-child(2) {
              flex: 1;
              line-height: 35px;
              font-size: 17px;
              span {
                  position: relative;
                  left: 10px;
              }
          }
          div:nth-child(3) {
              width: 10px;
              display: flex;
              align-items: center;
              img {
                  width: 100%;
                  height: 14px;
              }
          }
      }
  }
  .img-spc {
      width: 15px;
      height: 15px;
  }
</style>
