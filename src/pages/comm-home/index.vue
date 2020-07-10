<template>
  <div class="container">
    <div class="banner-pic-list">
      <el-carousel height="200px" indicator-position="none">
        <el-carousel-item v-for="(item, index) in picList" :key="index">
          <img :src="item.rotateChartImageUrl" alt="" @click="toDetailPage(item.goodCode)">
        </el-carousel-item>
      </el-carousel>
    </div>

    <div class="module-title">热门商品</div>

    <ul class="comm-list">
      <li
        v-for="(item, index) in commList"
        :key="index"
        @click="toDetailPage(item.goodCode)">
        <img :src="item.hotGoodUrl" alt="" v-show="item.hotGoodUrl">
         <img src="../../assets/book1.jpg" alt="" v-show="!item.hotGoodUrl">
        <div class="book-info">{{item.hotGoodName}}</div>
        <div class="price">￥{{item.hotGoodPric}}</div>
        <span class="sell">￥{{item.hotGoodSale}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import req from '@/api/comm-home.js'

export default {
  name: 'comm-home',
  data () {
    return {
      picList: [],
      commList: [],
      id: ''
    }
  },
  mounted () {
    this.getPicLitst()
    this.getCommList()
  },
  methods: {
    // 热门商品列表
    getCommList () {
      req('queryHotGoodsList')
        .then(data => {
          console.log('获取商品列表', data)
          this.commList = data.data
          console.log(this.commList)
        })
    },
    // 轮播图获取
    getPicLitst () {
      req('queryRotateChartsList')
        .then(data => {
          console.log('获取照片', data)
          this.picList = data.data
          console.log(this.picList)
        })
    },
    // 点击后跳转到对应商品的详情
    toDetailPage (data) {
      console.log(data)
      this.id = data
      this.$router.push({path: '/comm-detail', query: {id: this.id}})
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  background: rgb(246,246,246);
}

.el-carousel {
  .el-carousel__container {
    .el-carousel__item {
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}

.module-title {
  width: 100%;
  height: 40px;
  text-align: center;
  line-height: 40px;
  color: #fff;
  background: #9e848a;
}

.comm-list {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 95%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 10px;
  margin-bottom: 60px;
  li {
   position: relative;
  width: 48%;
  margin-bottom: 10px;
  background: #fff;
  padding: 5px;
  border-radius: 10px;
  box-sizing: border-box;

    img {
      width: 160px;
      height: 160px;
    }

    .price {
    position: relative;
    left: 57%;
    font-size: 12px;
    margin-top: 5px;
    text-decoration: line-through;
    color: #ddd;
    }
    .sell {
    position: absolute;
    left: 20%;
    bottom: 8px;
    color: red;
    font-size: 16px;
    }
    .book-info {
      text-align: center;
    font-size: 14px;
    padding: 0 10px;
    margin-top: 10px;
    }
  }
}
</style>
