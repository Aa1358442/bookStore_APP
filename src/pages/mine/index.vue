<template>
  <div>
    <div class="user">
        <div class="img-con">
            <img :src="this.userImageUrl" v-show="this.userImageUrl">
            <img src="../../assets/u18.jpg" v-show="!this.userImageUrl">
        </div>
        <div class="text-con">{{this.userName}}</div>
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
import req from '@/api/login.js'

export default {
  name: 'mine',
  data () {
    return {
      conList: [
        {
          img1: require('../../assets/mine.png'),
          label: '个人中心',
          img2: require('../../assets/右.png'),
          toPath: '/myself'
        },
        {
          img1: require('../../assets/订单.png'),
          label: '我的订单',
          img2: require('../../assets/右.png'),
          toPath: '/order-list'
        }, {
          img1: require('../../assets/修改密码.png'),
          label: '修改密码',
          img2: require('../../assets/右.png'),
          toPath: '/change-password'
        }, {
          img1: require('../../assets/邀请码.png'),
          label: '修改店铺邀请码',
          img2: require('../../assets/右.png'),
          toPath: '/change-store-code'
        }, {
          img1: require('../../assets/退出.png'),
          label: '退出登录',
          img2: require('../../assets/右.png'),
          toPath: '/login'
        }
      ],
      imgToken: {access_token: JSON.parse(sessionStorage.getItem('userInfo')).access_token},
      userImageUrl: '',
      userName: ''
    }
  },
  mounted () {
    // 获取用户头像
    req('getuserdata')
      .then(data => {
        console.log('获取照片', data)
        this.userImageUrl = data.data.userImageUrl
        this.userName = data.data.userName
        console.log(this.userImageUrl)
      })
  },
  methods: {
    // 点击后成功跳转
    toPage (data) {
      this.$router.push({path: data.toPath})
    }
  }
}
</script>

<style lang="scss" scoped>
  .user {
      width: 100%;
      display: flex;
      .img-con {
          flex: 1;
          display: flex;
          align-items: center;
          img {
              width: 65px;
              height: 65px;
              border-radius: 50%;
              position: relative;
              left: 38%;
          }
      }
      .text-con {
          flex: 2;
          line-height: 105px;
          font-size: 22px;
      }
  }
  .content {
      width: 95%;
      height: 206px;
      padding: 18px 16px;
      margin: 0 auto;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      background-color: white;
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
              line-height: 34px;
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
