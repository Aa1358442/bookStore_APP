<template>
  <div>
    <el-form :model="formData" inline label-width="70px" ref="form" :rules="formRules">
      <el-form-item label="姓名" prop="userName">
        <el-input v-model="formData.userName" placeholder="请输入姓名"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="formData.phone" placeholder="请输入手机号"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-radio-group v-model="formData.sex">
          <el-radio :label= 1>男</el-radio>
          <el-radio :label= 0>女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="身份证" prop="idCard">
        <el-input v-model="formData.idCard" placeholder="请输入身份证号"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="mail">
        <el-input v-model="formData.mail" placeholder="请输入邮箱"></el-input>
      </el-form-item>
      <el-form-item label="头像上传">
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
                 <img class="imgPosition" width="40%" :src="dialogImageUrl" alt="" v-show="this.userImage">
              </el-upload>
              <el-dialog :visible.sync="dialogVisible">
                <img width="20%" :src="dialogImageUrl" alt="">
              </el-dialog>
      </el-form-item>
      <el-form-item>
        <el-button class="register-btn" type="primary" @click="update">修&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {validateIdNo, validatePhone, validateEMail, validatePsdReg, validateCode, validateRealName, validateNumber} from '@/api/validate.js'
import req from '@/api/myself.js'
import axios from 'axios'
const qs = require('qs')

export default {
  name: 'myself',
  data () {
    return {
      imgToken: {access_token: JSON.parse(sessionStorage.getItem('userInfo')).access_token},
      dialogVisible: false,
      dialogImageUrl: '',
      userImage: 'true',
      formData: {
        phone: '',
        userName: '',
        sex: '',
        idCard: '',
        mail: ''
      },
      formRules: {
        phone: [
          {required: true, message: '请输入手机号码', trugger: 'change'},
          {validator: validatePhone, trigger: 'blur'}
        ],
        userName: [
          {required: true, message: '请输入用户名', trugger: 'change'},
          {validator: validateRealName, trigger: 'blur'}
        ],
        sex: [
          {required: true, message: '请输入性别', trugger: 'change', type: 'number'}
        ],
        idCard: [
          {required: true, message: '请输入身份证', trugger: 'change'},
          {validator: validateIdNo, trigger: 'blur'}
        ],
        mail: [
          {required: true, message: '请输入邮箱', trugger: 'change'},
          {validator: validateEMail, trigger: 'blur'}
        ]
      }
    }
  },
  mounted () {
    this.getMessageList()
  },
  methods: {
    // 个人原信息获取
    getMessageList () {
      req('getuserdata', {
      }).then(data => {
        console.log(data)
        this.formData.phone = data.data.userPhone
        this.formData.userName = data.data.userName
        this.formData.sex = data.data.userSex
        this.formData.idCard = data.data.idCard
        this.formData.mail = data.data.email
        this.dialogImageUrl = data.data.userImageUrl
      })
    },
    // 个人信息修改
    update () {
      req('udateUserData', {
        userPhone: this.formData.phone,
        userName: this.formData.userName,
        userSex: this.formData.sex,
        userIdCard: this.formData.idCard,
        email: this.formData.mail,
        userImageUrl: this.dialogImageUrl
      }).then(data => {
        console.log('修改状态', data)
        if (data.code === 0) {
          this.$message({
            type: 'success',
            message: '修改信息成功,2秒后自动跳转到我的主页!'
          })
          setTimeout(() => {
            this.$router.push({path: '/mine'})
          }, 2000)
        } else {
          this.$message({
            type: 'error',
            duration: 1000,
            message: data.msg
          })
        }
      })
    },
    // 头像预览
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    // 头像上传成功操作
    handleAvatarSuccess (res) {
      console.log(res)
      this.dialogImageUrl = res.data.imageUrl
      this.userImage = false
      console.log(this.dialogImageUrl)
    },
    // 头像移除
    handleRemove (file, fileList) {
      console.log(file, fileList)
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

.imgPosition {
  position:absolute;
  width: 40px;
  height: 40px;
  left: 5%;
  top: 20%;
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
  .el-form-item:nth-child(6){
    width: 100%;
    text-align: center;
    margin: 0 auto;
    height: 100px;
    margin-top: 15px;
  }
}
/deep/ .el-upload-list--picture-card .el-upload-list__item {
  width: 90px;
  height: 90px;
}
  /deep/ .el-upload-list--picture-card .el-upload-list__item-thumbnail{
    width: 90px;
    height: 90px;
  }
  /deep/ .el-upload--picture-card {
    width: 90px;
    height: 90px;
    line-height: 88px;
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
/deep/ .el-form-item__content {
  width: 200px;
  position: relative;
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
