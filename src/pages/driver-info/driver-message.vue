<template>
  <div>
    <div class="user">
            <!-- <img src="../../assets/u681.jpg" > -->
             <img :src="list.driverImageUrl" alt="">
            <span>{{list.driverNickName}}</span>
    </div>
    <div class="shop-info">
     <div class="top-item" v-for="item in topList"
            :key="item.id">
        <img :src="item.img" :width="item.width">
        <span>{{item.text}}</span>
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
import req from '@/api/driver.js'

export default {
  name: 'driver-message',
  data () {
    return {
      list: [],
      topList: [
        {
          id: '001',
          img: require('../../assets/u1210.png'),
          width: '18px',
          text: ''
        },
        {
          id: '002',
          img: require('../../assets/u1151.png'),
          width: '13px',
          text: ''
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
    this.getDriverInfo()
  },
  methods: {
    toPage (data) {
      this.$router.push({path: data.toPath})
    },
    // 司机具体信息获取
    getDriverInfo () {
      req('queryDriverInformationDetail', {
        driverCode: sessionStorage.getItem('userCode')
      }).then(data => {
        console.log(data)
        this.list = data.data
        this.topList[0].text = data.data.driverName
        this.topList[1].text = data.data.driverPhone
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
          width: 100px;
          height: 100px;
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
      margin: 10px auto;
      width: 100%;
      height: 80px;
      background: #fff;
  }

  .top-item {
      height: 30px;
      margin-left: 20px;
      padding-top: 8px;
      img {
          width: 18px;
      }
  }
  .content {
      width: 100%;
      height: 106px;
      padding: 18px 16px;
      margin: 0 auto;
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
