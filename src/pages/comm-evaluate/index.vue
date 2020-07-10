<template>
  <div class="container">
    <div class="evaluate-title">
      <ul v-for="(item,index) in lidata" :key="index">
        <li><span :class="{active:index==isActive}"  @click="changeClass(index),getEvaluateList(index)"> {{item.name}}
</span></li>
</ul>
    </div>
    <ul class="evaluate-list">
      <li v-for="(item, index) in list" :key="index">
        <div class="head-pic">
          <img src="../../assets/head_pic.png" alt="" v-show="!item.userImage">
          <img :src="item.userImage" alt="" v-show="item.userImage">
        </div>

        <div class="content">
          <div class="title">
            <div class="user-info">
              <div class="name">{{item.evaUserName}}</div>
              <div class="date">{{item.evaTime}}</div>
            </div>

            <div
              class="star"
              :style="{backgroundPosition: `${90 - item.evaRank*18}px 0`}">
            </div>
          </div>
          <div class="msg">{{item.evaContent | evaluate}}</div>
          <div class="photo"><img :src="item.conmentImage" v-show="item.conmentImage"></div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import req from '@/api/comm-evaluate.js'

export default {
  name: 'comm-evaluate',
  data () {
    return {
      list: [],
      lidata: [
        {index: 0, name: '全部评价'},
        {index: 1, name: '差评'},
        {index: 2, name: '中评'},
        {index: 3, name: '好评'}
      ],
      isActive: 0
    }
  },
  mounted () {
    console.log(this.$route.query.id)
    this.getEvaluateList()
  },
  methods: {
    // 评价界面
    changeClass (index) {
      this.isActive = index
    },
    // 获取所有评价和评价查询
    getEvaluateList (data) {
      console.log('data', data)
      req('goodComEvaList', {
        goodCode: this.$route.query.id,
        evaRank: data,
        pageSize: '1000',
        pageNum: '1'
      }).then(data => {
        if (data.msg === '查询为空') {
          this.$message({
            type: 'success',
            message: '该评论为空',
            duration: 1000
          })
          this.list = []
        } else {
          console.log('商品全部评价', data)
          this.list = data.data.list
          console.log('测试', this.list)
          this.list.forEach((item, index) => {
            if (item.evaRank === '0') {
              item.evaRank = 1
            } else {}
          })
        }
      })
    }
  },
  // 评价太长过滤
  filters: {
    evaluate (value) {
      if (!value) return '该评论为空'
      if (value.length > 100) {
        return value.slice(0, 40) + '...'
      }
      return value
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  background: #ddd;

  .evaluate-title {
    width: 100%;
    height: 50px;
    line-height: 50px;
    padding: 0 10px;
    box-sizing: border-box;

    span {
      padding: 0 10px;
    }

    .active {
      color: #C39862;
      font-size: 20px;
    }

  }

  .evaluate-list {
    width: 95%;
    margin: 0 auto;
    border-radius: 10px;
    background: #ccc;

    li {
      display: flex;
      margin: 10px auto;
      background: #fff;
      border-radius: 10px;

      .head-pic {
        width: 50px;
        height: 50px;
        padding: 10px;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .content {
        flex: 1;
        padding: 10px;

        .title {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          height: 60px;

          .user-info {
            .date {
              color: #ddd;
              font-size: 14px;
            }
            .name {
              font-size: 16px;
              font-weight: bolder;
            }
          }

          .star {
            width: 90px;
            height: 18px;
            background-image: url('../../assets/stars.png');
            background-position: 0 0;
            background-repeat: no-repeat;
          }
        }
        .photo img {
            width: 120px;
        }
      }
    }
  }
}
.evaluate-title {
      display: flex;
    }

</style>
