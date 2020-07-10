<template>
  <div>
    <!-- <div class="header">
      <span class="iconfont iconzuojiantou" @click="$router.push({path: '/login'})"></span>
      <span>注册</span>
    </div> -->

    <div class="logo">
      <img src="../assets/logo.png" alt="">
    </div>

    <el-form :model="formData" inline label-width="70px" ref="form" :rules="formRules">
      <el-form-item label="用户名" prop="userAcct">
        <el-input v-model="formData.userAcct" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="userPassword">
        <el-input type="password" v-model="formData.userPassword" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="confirmUserPassword">
        <el-input type="password" v-model="formData.confirmUserPassword" placeholder="请确认密码"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="formData.phone" placeholder="请输入手机号"></el-input>
      </el-form-item>
      <el-form-item label="姓名" prop="userName">
        <el-input v-model="formData.userName" placeholder="请输入姓名"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-radio-group v-model="formData.sex">
          <el-radio label="1">男</el-radio>
          <el-radio label="0">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="身份证" prop="idCard">
        <el-input v-model="formData.idCard" placeholder="请输入身份证号"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="mail">
        <el-input v-model="formData.mail" placeholder="请输入邮箱"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="register-btn" type="primary" @click="register">注&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {validateIdNo, validatePhone, validateEMail, validatePsdReg, validateCode, validateRealName, validateNumber} from '@/api/validate.js'
import req from '@/api/register.js'
import axios from 'axios'
const qs = require('qs')

export default {
  name: 'myself',
  data () {
    return {
      formData: {
        userAcc: '',
        userPass: '',
        userPhone: '',
        userName: '',
        userSex: '',
        userIdCard: '',
        userEmail: ''
      },
      formRules: {
        userAcct: [
          {required: true, message: '请输入账号', trugger: 'change'}
        ],
        userPassword: [
          {required: true, message: '请输入密码', trugger: 'change'}
        ],
        confirmUserPassword: [
          {required: true, message: '请再次输入密码', trugger: 'change'}
        ],
        phone: [
          {required: true, message: '请输入手机号码', trugger: 'change'},
          {validator: validatePhone, trigger: 'blur'}
        ],
        userName: [
          {required: true, message: '请输入用户名', trugger: 'change'},
          {validator: validateRealName, trigger: 'blur'}
        ],
        sex: [
          {required: true, message: '请输入性别', trugger: 'change'}
        ],
        idCard: [
          {required: true, message: '请输入身份证', trugger: 'change'},
          {validator: validateIdNo, trigger: 'blur'}
        ],
        mail: [
          {required: true, message: '请输入邮箱', trugger: 'change'},
          {validator: validateEMail, trigger: 'blur'}
        ],
        inviteCode: []
      }
    }
  },
  methods: {
    // 注册 
    register () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.formData.userPassword === this.formData.confirmUserPassword) {
            axios({
              method: 'post',
              url: 'http://springboottest.51vip.biz/app/customer/register',
              data: qs.stringify({
                userAcc: this.formData.userAcct,
                userPass: this.formData.userPassword,
                userPhone: this.formData.phone,
                userName: this.formData.userName,
                userSex: this.formData.sex,
                userIdCard: this.formData.idCard,
                userEmail: this.formData.mail
              }),
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              }
            }).then(data => {
              console.log(data)
              if (data.data.code === 0) {
                this.$message({
                  type: 'success',
                  message: '注册账号成功,2秒后自动跳转到登录页面!'
                })
                this.$store.commit('modifyAcct', this.formData.userAcct)
                this.$store.commit('modifyPass', this.formData.userPassword)
                setTimeout(() => {
                  this.$router.push({path: 'login'})
                }, 2000)
              } else {
                this.$message({
                  type: 'error',
                  message: '注册失败!手机号码或者账号已存在,请检查信息重新输入'
                })
              }
            })
          } else {
            this.$message({
              type: 'warning',
              message: '两次密码不一致，请重新输入'
            })
          }
        } else {
          this.$message({
            type: 'warning',
            message: '数据填写缺失，请重新输入'
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/ .el-container {
  background: #fff!important;
}
 .header {
  position: relative;
  width: 100%;
  height: 50px;
  background: #ddd;
  line-height: 50px;
  text-align: center;

  span.iconzuojiantou {
    position: absolute;
    top: 50%;
    left: 20px;
    transform: translate(0, -50%);
    color: #409EFF;
  }
}

.logo {
  width: 100%;
  margin: 0 auto;
  background: #fff;

  img {
    width: 80%;;
    position: relative;
    left: 10%;
  }
}

.el-form {
  margin-top: 10px;
  .el-form-item {
    width: 100%;
    text-align: center;
    margin: 0 auto;
    height: 43px;
    margin-top: 15px;
  }
}

.register-btn {
  width: 150px;
  height: 40px;
  margin-bottom: 20px;
}
.el-button {
  border-radius: 8px;
}
/deep/ .el-input__inner {
  border: none;
  outline: none;
}
/deep/ .el-form-item__label {
  width: 80px!important;
}
.el-form-item:nth-child(10) {
  border-bottom: none;
}
/deep/ .el-radio-group {
  width: 200px;
  box-sizing: border-box;
  padding-right: 60px;
}
/deep/ .el-form-item__error {
  margin-left: 8%!important;
}
</style>
