<template>
  <div>
    <el-container>
      <el-header height="50px" v-show="!meta.headerHide">
        <div class="user-info">
          <span class="iconfont iconzuojiantou" @click="back" v-show="meta.goBackShow"></span>
          <span
            v-for="(item, index) in titleList"
            :key="index"
            @click="toPage(item)"
            :class="{active: item.active }">
            {{item.titleName}}
          </span>
        </div>
      </el-header>

      <el-container>
        <el-main :class="{'main-class1' : meta.headerHide, 'main-class2' : !meta.headerHide}">
          <router-view></router-view>
        </el-main>
      </el-container>

      <el-footer v-show="meta.footerShow">
        <!-- 店长 -->
         <div @click="toFoot ('/shop-order')" v-show="userType === '1'">
          <img src="../assets/u1075.png" alt="">
          <div :style="{color: currentPath === '/shop-order' ? '#C39862' : '#333333'}">订单</div>
        </div>
          <div @click="toFoot ('/driver')" v-show="userType === '1'">
          <img src="../assets/u1080.png" alt="">
          <div :style="{color: currentPath === '/driver' ? '#C39862' : '#333333'}">司机</div>
        </div>
         <div @click="toFoot ('/shop-info')" v-show="userType === '1'">
          <img src="../assets/mine2.png" alt="">
          <div :style="{color: currentPath === '/shop-info' ? '#C39862' : '#333333'}">我的</div>
        </div>
       <!-- 司机 -->
          <div @click="toFoot ('/driver-index')" v-show="userType === '2'">
          <img src="../assets/u1080.png" alt="">
          <div :style="{color: currentPath === '/driver-index' ? '#C39862' : '#333333'}">门店</div>
        </div>
         <div @click="toFoot ('/driver-message')" v-show="userType === '2'">
          <img src="../assets/mine2.png" alt="">
          <div :style="{color: currentPath === '/driver-message' ? '#C39862' : '#333333'}">我的</div>
        </div>
       <!-- 用户 -->
        <div @click="toFoot ('/comm-home')" v-show="userType === '3'">
          <img v-show="currentPath !== '/comm-home'" src="../assets/home2.png" alt="">
          <img v-show="currentPath === '/comm-home'" src="../assets/home.png" alt="">
          <div :style="{color: currentPath === '/comm-home' ? '#C39862' : '#333333'}">首页</div>
        </div>
        <div @click="toFoot ('/comm-classify')" v-show="userType === '3'">
          <img v-show="currentPath !== '/comm-classify'" src="../assets/classify2.png" alt="">
          <img v-show="currentPath === '/comm-classify'" src="../assets/classify.png" alt="">
          <div :style="{color: currentPath === '/comm-classify' ? '#C39862' : '#333333'}">分类</div>
        </div>
        <div @click="toFoot ('/shop-car')" v-show="userType === '3'">
          <img v-show="currentPath !== '/shop-car'" src="../assets/shop_car2.png" alt="">
          <img v-show="currentPath === '/shop-car'" src="../assets/shop_car.png" alt="">
          <div :style="{color: currentPath === '/shop-car' ? '#C39862' : '#333333'}">购物车</div>
        </div>
        <div @click="toFoot ('/mine')" v-show="userType === '3'">
          <img v-show="currentPath !== '/mine'" src="../assets/mine2.png" alt="">
          <img v-show="currentPath === '/mine'" src="../assets/mine.png" alt="">
          <div :style="{color: currentPath === '/mine' ? '#C39862' : '#333333'}">我的</div>
        </div>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      mainStyle: {

      }
    }
  },
  mounted () {
    console.log('1', sessionStorage.getItem('key'))
  },
  computed: {
    titleList () {
      return this.$route.meta.title
    },
    goBackBtn () {
      return this.$route.meta.goBack
    },
    meta () {
      return this.$route.meta
    },
    currentPath () {
      return this.$route.path
    },
    userType () {
      return sessionStorage.getItem('key')
    }
  },
  methods: {
    back () {
      if (sessionStorage.getItem('key') === '1' || sessionStorage.getItem('key') === '2') {
        this.$router.go(-1)
      } else {
        this.$router.push({path: this.goBackBtn, query: {id: this.$route.query.id}})
      }
    },
    toPage (data) {
      if (data.toPath !== this.$route.path) {
        this.$router.push({path: data.toPath, query: {id: this.$route.query.id}})
      }
    },
    toFoot (data) {
      if (data !== this.$route.path) {
        this.$router.push({path: data})
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.main-class1 {
  position: absolute;
  top: 0;
  bottom: 60px;
}

.main-class2 {
  position: absolute;
  top: 50px;
  bottom: 0;
}

.el-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgb(242,242,242);

  .router-link-active {
    font-size: 25px;
    color: #409EFF;
    text-decoration: none;
  }

  .user-info {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
    font-size: 20px;
    width: 100%;

    .iconzuojiantou {
      position: absolute;
      top: 50%;
      left: 10px;
      transform: translate(0, -50%);
    }

    span {
      margin: 0 10px;
    }

    .active {
      color: #C39862;
    }
  }
}

.el-main {
  padding: 0;
  width: 100%;
  background: rgb(246,246,246);
}

.el-footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  padding: 0;
  display: flex;
  height: 60px;
  justify-content: space-between;
  align-items: center;
  background: #ffffff;
  border-top: 1px solid #ddd;

  >div {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    color: #333333;

    img {
      width: 30px;
      height: 30px;
    }

    div {
      position: relative;
      top: 3px;
    }
  }
}
</style>
