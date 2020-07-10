<template>
  <div>
    <div class="logo">
      <img src="../assets/logo.png" alt="">
    </div>

    <el-form :model="formData" inline label-width="55px" :rules="rules2">
      <el-form-item label="用户名">
        <el-input v-model="formData.username" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="formData.password" placeholder="请输入密码"></el-input>
      </el-form-item>
    </el-form>
    <div class="register-btn">
      <router-link to="/register">我要注册</router-link>
    </div>

    <el-button @click="login" class="login-btn" type="primary">登&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;录</el-button>
  </div>
</template>

<script>
import axios from 'axios'
import req from '@/api/login.js'
const qs = require('qs')

export default {
  name: 'login',
  data () {
    return {
      formData: {
        username: '',
        password: ''
      },
      rules2: {
        username: [{required: true, message: '请输入你的账号', trigger: 'blur'}],
        password: [{required: true, message: '请输入你的密码', trigger: 'blur'}]
      }
    }
  },
  mounted () {
    console.log(this.$store.state.userAcct)
    console.log(this.$store.state.userPass)
    // 注册成功后返回登录页的记录功能
    if (this.$store.state.userAcct && this.$store.state.userPass) {
      this.formData.username = this.$store.state.userAcct
      this.formData.password = this.$store.state.userPass
      console.log('成功')
    }
    // 每次到达登录页面之前都进行一次清楚sessionStorage
    sessionStorage.clear('userInfo')
    sessionStorage.clear('storeCode')
    sessionStorage.clear('key')
    sessionStorage.clear('userCode')
  },
  methods: {
    // 登录
    login () {
      console.log(this.formData.username)
      console.log(this.formData.password)
      axios({
        method: 'post',
        url: 'http://springboottest.51vip.biz/uaa/auth/form',
        data: qs.stringify(this.formData),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(data => {
        // console.log(data)
        if (data.data.code === 0) {
          console.log('登入成功')
          console.log(data)
          sessionStorage.setItem('userInfo', JSON.stringify(data.data.data))
          console.log(sessionStorage.getItem('userInfo'))
          req('getuserdata')
            .then(data => {
              console.log('获取角色信息', data)
              if (data.data.userRole === 0) {
                this.$message({
                  type: 'error',
                  message: '管理员账户无法登录'
                })
              } else {
                this.$message({
                  type: 'success',
                  message: '登录成功'
                })
                if (data.data.userRole === 1) {
                  this.$store.commit('modifyTips', 'shop')
                  // this.$store.state.userType = 'shop'
                  sessionStorage.setItem('storeCode', data.data.storeCode)
                  setTimeout(() => {
                    this.$router.push({path: '/shop-order'})
                  })
                } else if (data.data.userRole === 2) {
                  this.$store.commit('modifyTips', 'driver')
                  // this.$store.state.userType = 'driver'
                  setTimeout(() => {
                    this.$router.push({path: '/driver-index'})
                  })
                } else if (data.data.userRole === 3) {
                  this.$store.commit('modifyTips', 'user')
                  // this.$store.state.userType = 'user'
                  setTimeout(() => {
                    this.$router.push({path: '/home'})
                  })
                }
                sessionStorage.setItem('key', data.data.userRole)
                sessionStorage.setItem('userCode', data.data.userCode)
              }
            })
        } else {
          this.$message({
            type: 'error',
            message: data.data.msg
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.logo {
  width: 80%;
  margin: 50px auto;
  img {
    width: 100%;
  }
}

.el-form {
  margin-top: 100px;

  .el-form-item {
    width: 100%;
    text-align: center;
    margin: 0 auto;
  }
}

.register-btn {
  font-size: 14px;
  text-align: right;
  margin-right: 50px;
}

.login-btn {
  display: block;
  margin: 0 auto;
  width: 100px;
  height: 40px;
}
/deep/ .el-form .el-form-item .el-form-item__content .el-input .el-input__inner {
  background-color: #fff!important;
  border: none;
  outline: none;
  margin-left: 20px;
}

 /deep/ .el-form-item__label {
  text-align: left;
}
.register-btn {
   margin-top: 10px;
}
.el-button{
  margin-top: 40px;
  width: 180px;
  border-radius: 8px;
}
</style>
