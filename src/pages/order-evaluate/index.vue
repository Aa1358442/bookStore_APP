<template>
  <div class="container">
    <div class="comm">
      <img :src="this.goodImage" alt="">

      <div class="star">
        <Rate @onRate="onrate" animate= '0' :value="value"/>
      </div>
    </div>

    <div class="title">分享你的使用体验吧</div>

    <el-input style="display: block;width:95%;margin: 0 auto;" type="textarea" :rows="8" v-model="evaContent"></el-input>
    <el-upload
  action="http://springboottest.51vip.biz/pc/imageUpLoad/upLoadImage"
  name="imageFile"

  list-type="picture-card"
  :data="imgToken"
  :limit="1"
  ref="upload"
  :on-preview="handlePictureCardPreview"
  :on-success="handleAvatarSuccess"
  :on-remove="handleRemove">
  <i class="el-icon-plus"></i>
</el-upload>
<el-dialog :visible.sync="dialogVisible">
  <img width="20%" :src="dialogImageUrl" alt="">
</el-dialog>
    <el-button class="submit-btn" type="primary" @click="submit">提交</el-button>
  </div>
</template>

<script>
import Rate from 'vue-tiny-rate'
import axios from 'axios'
import req from '@/api/order-evaluate.js'
const qs = require('qs')

export default {
  components: {
    Rate
  },
  name: 'order-evaluate',
  data () {
    return {
      evaContent: '',
      dialogImageUrl: '',
      goodCodeList: [],
      dialogVisible: false,
      num: 0,
      value: '5',
      goodImage: '',
      submitList: {
        evaList: []
      },
      goodCode: [],
      orderCode: this.$route.query.orderCode,
      evaList: [],
      list: {},
      imgToken: {access_token: JSON.parse(sessionStorage.getItem('userInfo')).access_token}
    }
  },
  mounted () {
    this.getGoods()
  },
  methods: {
    // 获取评价商品的信息和图片
    getGoods () {
      req('queryOrderDetail', {
        orderCode: this.orderCode
      }).then(data => {
        console.log('获取goodCode', data)
        this.goodCodeList = data.data.orderGoodsList
        this.goodImage = this.goodCodeList[this.num].goodImageUrl,
        console.log('1', this.goodCodeList)
      })
    },
    // 星级评分
    onrate (num) {
      console.log(num)
      this.value = num
    },
    // 图片移除
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    // 图片预览
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    // 图片上传成功操作
    handleAvatarSuccess (res) {
      console.log(res)
      this.dialogImageUrl = res.data.imageUrl
      console.log(this.dialogImageUrl)
    },
    // 评价完毕后提交操作
    submit () {
      this.submitList = {
      },
      this.list.goodCode = this.goodCodeList[this.num].goodCode
      this.list.goodRank = this.value
      this.list.evaContent = this.evaContent
      this.list.imageUrlList = this.dialogImageUrl
      this.submitList.orderCode = this.$route.query.orderCode
      this.submitList.evaList = this.list
      this.submitList = JSON.stringify(this.submitList)
      req('addOrderGoodsEva', {
        evaJson: this.submitList
      }).then(data => {
        console.log(data)
        if (data.code === 0) {
          this.$message({
            type: 'success',
            message: '评论成功',
            duration: 1000
          })
          if (this.num === this.goodCodeList.length - 1) {
            req('updateOrder', {
              orderState: 6,
              orderCode: this.orderCode
            }).then(data => {
              console.log('修改状态', data)
            })
            this.$router.push({path: '/order-list'})
          } else {
            this.num = this.num + 1
            this.goodImage = this.goodCodeList[this.num].goodImageUrl,
            this.evaContent = '',
            this.dialogImageUrl = ''
            this.$refs.upload.clearFiles()
            console.log('二次操作')
          }
        } else {
          this.$message({
            type: 'success',
            message: '评论失败',
            duration: 1000
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  background: #fff;

  .comm {
    width: 100%;
    height: 200px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    box-sizing: border-box;
    background: #fff;

    img {
      width: 120px;
    }

    .star {
      width: 180px;
      height: 36px;
      font-size: 40px;
    }
  }

  .title {
    padding-left: 10px;
    line-height: 40px;
  }

  .submit-btn {
    display: block;
    width: 95%;
    margin: 10px auto 0;
    height: 40px;
    line-height: 40px;
  }
}
/deep/ div .el-upload el-upload--picture-card {
  width: 100px!important;
  height: 100px!important;
}
</style>
