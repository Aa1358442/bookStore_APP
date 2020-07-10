<template>
<div>
<div class="container" v-for="(item, index) in list" :key="index">
    <div>
        <img src="../../assets/u1210.png" alt="">
        {{item.driverName}}
    </div>
    <div>
   <img src="../../assets/u1151.png" alt="">
   {{item.driverPhone}}
    </div>
</div>
</div>
</template>

<script>
import req from '@/api/shop.js'

export default {
  name: 'driver-info',
  data () {
    return {
      list: []
    }
  },
  mounted () {
    this.getDriverList()
  },
  methods: {
    // 获取本店的所有司机信息
    getDriverList () {
      req('queryDriverList', {
        storeCode: sessionStorage.getItem('storeCode')
      }).then(data => {
        console.log(data)
        this.list = data.data
        console.log(this.list)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
 .container {
    width: 90%;
    height: 16%;
    border-bottom: 1px solid #ddd;
    background: #fff;
    margin: 10px auto;
    border-radius: 10px;
    padding-left: 15px;
    > div {
        width: 100%;
        height: 50px;
        line-height: 50px;
        display: flex;
        align-items: center;
    }
}
</style>
