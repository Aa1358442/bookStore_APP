<template>
  <div class="container">
    <ul class="book-classify">
      <li @click="handleClick(item.classCode)" v-for="(item,index) in oneClassList" :key="index">
        <b :class="{bclass:index==isActive}"></b>
        <span :class="{active:index==isActive}" @click="changeClass(index)">{{item.className | evaluate}}</span>
      </li>
    </ul>

    <ul class="book-classify-conteiner">
      <li class="book-classify-item" v-for="(item, index) in commList" :key="index" >
        <div class="book-classify-item-title">{{item.className}}</div>
        <ul class="book-list">
          <li v-for="(childItem, childIndex) in item.goodsList" :key="childIndex" @click="getCommDetail(childItem),toPage(childItem.goodCode)">
            <img src="../../assets/book1.jpg" alt="" v-show="!childItem.goodImageUrl">
            <img :src="childItem.goodImageUrl" alt="" v-show="childItem.goodImageUrl">
            <div>{{childItem.goodName}}</div>
            <div>
              ￥{{childItem.goodSale}}
              <span>￥{{childItem.goodPrice}}</span>
            </div>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import req from '@/api/comm-classify.js'

export default {
  name: 'comm-classify',
  data () {
    return {
      oneClassList: [],
      SecondClassList: [],
      isActive: 0,
      commList: [
        {
          classifyId: '',
          classifyName: '',
          goodsList: []
        }
      ]
    }
  },
  mounted () {
    // 获得一级子目录
    this.getOneClass()
  },
  filters: {
    // 过滤长度为4
    evaluate (value) {
      if (!value) return '没有该商品'
      if (value.length > 4) {
        return value.slice(0, 4) + '...'
      }
      return value
    }
  },
  methods: {
    // 一级子目录颜色变化
    changeClass (index) {
      this.isActive = index
      console.log(this.ctive)
    },
    // 一级子目录搜索
    getOneClass () {
      req('queryOneClass').then(data => {
        console.log('一级分类搜索成功', data)
        this.oneClassList = data.data
        console.log(this.oneClassList)
        this.handleClick(this.oneClassList[0].classCode)
      })
    },
    getCommDetail (data) {
      console.log(data)
    },
    // 跳转
    toPage (data) {
      console.log(data)
      this.$router.push({path: '/comm-detail', query: {id: data}})
    },
    // 一级分类点击后查询二级分类
    handleClick (classCode) {
      console.log(classCode)
      req('queryTwoClass', {
        classCode: classCode
      }).then(data => {
        console.log('二级分类查询', data)
        // console.log('二级分类查询',data.data.classCode)
        this.commList = data.data
        console.log(this.commList)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  background: #eee;

  .book-classify {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 20%;
    background: #fff;

    li {
      position: relative;
      width: 100%;
      height: 40px;
      text-align: center;
      line-height: 40px;
      font-size: 14px;

      >span {
        display: inline-block;
        width: 100%;
        height: 100%;
      }

    }
     .active {
      color: rgb(197, 156, 104);
      background: #ddd;

    }
    .bclass {
        position: absolute;
        left: 0;
        top: 50%;
        width: 3px;
        height: 20px;
        background: rgb(197, 156, 104);
        margin-top: -10px;
      }
    .prevactive {
      border-bottom-right-radius: 10px;
    }
    .nextactive {
      border-top-right-radius: 10px;
    }
  }

  .book-classify-conteiner {
    position: absolute;
    top: 0;
    left: 22%;
    bottom: 0;
    overflow: auto;
    width: 78%;

    .book-classify-item {
      .book-classify-item-title {
        width: 100%;
        height: 40px;
        padding-left: 10px;
        box-sizing: border-box;
        line-height: 40px;
      }

      .book-list {
        width: 100%;
        background: #fff;
        display: flex;
        flex-wrap: wrap;
        border-radius: 8px;
        padding: 10px 0;
        margin-right: 3px;
        box-sizing: border-box;

        li {
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: center;
          width: 50%;
          margin-bottom: 10px;

          img {
            width: 102px;
            height: 102px;
          }

          div:nth-child(3) {
            font-size: 12px;

          }
          div:nth-child(4) {
            color: red;
            span {
              margin-left: 8px;
              color: #ddd;
              font-weight: normal;
              text-decoration: line-through;
              font-size: 12px;
            }
          }
        }
      }
    }
  }
}
.book-classify-item:last-child {
  margin-bottom: 80px;
}
</style>
