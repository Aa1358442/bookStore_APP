<template>
  <div>
    <div class="content">
        <div class="con-left">新邀请码</div>
        <input type="text" placeholder="请输入邀请码" v-model="storeCode" required="true">
    </div>
    <div class="btn" @click="commit">
        <img src="../../assets/按钮.png" >
        <span>确认</span>
    </div>
  </div>
</template>

<script>
import req from '@/api/change-store-code.js'
export default {
  name: 'change-store-code',
  data () {
    return {
      storeCode: ''
    }
  },
  methods: {
    // 邀请码填写提交
    commit () {
      if (this.storeCode === undefined) {
        this.$message({
          type: 'warning',
          message: '新邀请码为空,请输入后再提交'
        })
      } else {
        req('changeStoreCode', {
          invitationCode: this.storeCode
        }).then(data => {
          console.log(data)
          if (data.code === 0) {
            this.$message({
              type: 'success',
              message: '邀请码修改成功，请等待两秒后自动跳转回页面'
            })
            setTimeout(() => {
              this.$router.push({path: '/home'})
            }, 2000)
          } else {
            this.$message({
              type: 'error',
              message: '邀请码不存在或操作异常，请重新尝试!'
            })
          }
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .content {
      width: 95%;
      margin: 12px auto;
      background-color: white;
      display: flex;
      border-radius: 8px;
      font-size: 17px;
      .con-left {
          flex: 1;
          line-height: 90px;
          text-align: center;
      }
      input {
          flex: 2;
          line-height: 90px;
          border: none;
          outline: none;
          padding-left: 20px;
          box-sizing: border-box;
          font-size: 17px;
          color: rgb(168,168,168);
          &::placeholder {
              color: rgb(168,168,168)
          }
      }
  }
  .btn {
      width: 300px;
      height: 65px;
      position: absolute;
      left: 50%;
      margin-left: -150px;
      bottom: 80px;
      img {
          width: 100%;
      }
      span {
          font-size: 22px;
          color: white;
          position: absolute;
          top: 50%;
          left: 50%;
          margin-top: -14.4px;
          margin-left: -22px;
      }
  }
</style>
