import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    // 登录
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ '@/pages/login.vue')
    },
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/home',
      name: 'home',
      redirect: '/comm-home',
      component: () => import(/* webpackChunkName: "home" */ '@/pages/home.vue'),
      children: [
        // 首页
        {
          path: '/comm-home',
          name: 'comm-home',
          component: () => import(/* webpackChunkName: "comm-home" */ '@/pages/comm-home/index.vue'),
          meta: {
            title: [
              {
                titleName: '首页',
                toPath: '/comm-detail',
                active: true
              }],
            headerHide: false,
            footerShow: true
          }
        },
        // 注册
        {
          path: '/register',
          name: 'register',
          component: () => import(/* webpackChunkName: "register" */ '@/pages/register.vue'),
          meta: {
            title: [{
              titleName: '注册',
              toPath: '/register'
            }],
            goBack: '/login',
            goBackShow: true,
            headerHide: false,
            footerShow: false
          }
        },
        // 商品详情
        {
          path: '/comm-detail',
          name: 'comm-detail',
          component: () => import(/* webpackChunkName: "comm-detail" */ '@/pages/comm-detail/index.vue'),
          meta: {
            title: [
              {
                titleName: '商品',
                toPath: '/comm-detail',
                active: true
              },
              {
                titleName: '评价',
                toPath: '/comm-evaluate'
              }
            ],
            goBack: '/comm-home',
            goBackShow: true,
            headerHide: false,
            footerShow: false
          }
        },
        // 商品评价
        {
          path: '/comm-evaluate',
          name: 'comm-evaluate',
          component: () => import(/* webpackChunkName: "comm-evaluate" */ '@/pages/comm-evaluate/index.vue'),
          meta: {
            title: [
              {
                titleName: '商品评价',
                toPath: '/comm-evaluate'
              }
            ],
            goBack: '/comm-detail',
            goBackShow: true,
            headerHide: false,
            footerShow: false
          }
        },
        // 商品分类
        {
          path: '/comm-classify',
          name: 'comm-classify',
          component: () => import(/* webpackChunkName: "comm-classify" */ '@/pages/comm-classify/index.vue'),
          meta: {
            title: [
              {
                titleName: '商品分类',
                toPath: '/comm-classify'
              }
            ],
            goBack: '/comm-home',
            goBackShow: false,
            headerHide: false,
            footerShow: true
          }
        },
        // 购物车
        {
          path: '/shop-car',
          name: 'shop-car',
          component: () => import(/* webpackChunkName: "shop-car" */ '@/pages/shop-car/index.vue'),
          meta: {
            title: [
              {
                titleName: '购物车',
                toPath: '/shop-car'
              }
            ],
            goBack: '/comm-home',
            goBackShow: true,
            headerHide: false,
            footerShow: true
          }
        },
        // 我的
        {
          path: '/mine',
          name: 'mine',
          component: () => import(/* webpackChunkName: "mine" */ '@/pages/mine/index.vue'),
          meta: {
            title: [
              {
                titleName: '我的主页',
                toPath: '/mine'
              }
            ],
            goBack: '/comm-home',
            goBackShow: false,
            headerHide: false,
            footerShow: true
          }
        },
        {
          path: '/myself',
          name: 'myself',
          component: () => import(/* webpackChunkName: "mine" */ '@/pages/myself/index.vue'),
          meta: {
            title: [
              {
                titleName: '个人中心',
                toPath: '/myself'
              }
            ],
            goBack: '/mine',
            goBackShow: true,
            headerHide: false,
            footerShow: false
          }
        },
        // 订单列表
        {
          path: '/order-list',
          name: 'order-list',
          component: () => import(/* webpackChunkName: "order-list" */ '@/pages/order-list/index.vue'),
          meta: {
            title: [
              {
                titleName: '我的订单',
                toPath: '/order-list'
              }
            ],
            goBack: '/mine',
            goBackShow: true,
            headerHide: false,
            footerShow: false
          }
        },
        // 修改密码
        {
          path: '/change-password',
          name: 'change-password',
          component: () => import(/* webpackChunkName: "change-password" */ '@/pages/change-password/index.vue'),
          meta: {
            title: [
              {
                titleName: '修改密码',
                toPath: '/change-password'
              }
            ],
            goBack: '/mine',
            goBackShow: true,
            headerHide: false,
            footerShow: false
          }
        },
        // 修改店铺邀请码
        {
          path: '/change-store-code',
          name: 'change-store-code',
          component: () => import(/* webpackChunkName: "change-store-code" */ '@/pages/change-store-code/index.vue'),
          meta: {
            title: [
              {
                titleName: '修改绑定店铺',
                toPath: '/change-store-code'
              }
            ],
            goBack: '/mine',
            goBackShow: true,
            headerHide: false,
            footerShow: false
          }
        },
        // 订单详情
        {
          path: '/order-detail',
          name: 'order-detail',
          component: () => import(/* webpackChunkName: "order-detail" */ '@/pages/order-detail/index.vue'),
          meta: {
            title: [
              {
                titleName: '订单详情',
                toPath: '/order-detail'
              }
            ],
            goBack: '/order-list',
            goBackShow: true,
            headerHide: false,
            footerShow: false
          }
        },
        // 订单评价
        {
          path: '/order-evaluate',
          name: 'order-evaluate',
          component: () => import(/* webpackChunkName: "order-evaluate" */ '@/pages/order-evaluate/index.vue'),
          meta: {
            title: [
              {
                titleName: '订单评价',
                toPath: '/order-evaluate'
              }
            ],
            goBack: '/order-list',
            goBackShow: true,
            headerHide: false,
            footerShow: false
          }
        },
        {
          path: '/driver',
          name: 'driver',
          component: () => import(/* webpackChunkName: "driver" */ '@/pages/driver-info/index.vue'),
          meta: {
            title: [
              {
                titleName: '司机信息',
                toPath: '/driver-info'
              }
            ],
            goBack: '/',
            goBackShow: false,
            headerHide: false,
            footerShow: true
          }
        },
        {
          path: '/shop-order',
          name: 'shop-order',
          component: () => import(/* webpackChunkName: "driver" */ '@/pages/shop-info/shop-order.vue'),
          meta: {
            title: [
              {
                titleName: '我的订单',
                toPath: '/shop-info'
              }
            ],
            goBack: '/',
            goBackShow: false,
            headerHide: false,
            footerShow: true
          }},
        {
          path: '/shop-order-detail',
          name: 'shop-order-detail',
          component: () => import(/* webpackChunkName: "driver" */ '@/pages/shop-info/shop-order-detail.vue'),
          meta: {
            title: [
              {
                titleName: '订单详情',
                toPath: '/shop-info'
              }
            ],
            goBack: '/shop-order',
            goBackShow: true,
            headerHide: false,
            footerShow: false
          }
        },
        {
          path: '/shop-info',
          name: 'shop-info',
          component: () => import(/* webpackChunkName: "driver" */ '@/pages/shop-info/shop-info.vue'),
          meta: {
            title: [
              {
                titleName: '店长信息',
                toPath: '/shop-info'
              }
            ],
            goBack: '/',
            goBackShow: false,
            headerHide: true,
            footerShow: true
          }
        },

        {
          path: '/driver-index',
          name: 'driver-index',
          component: () => import(/* webpackChunkName: "driver" */ '@/pages/driver-info/driver-index.vue'),
          meta: {
            title: [
              {
                titleName: '负责门店信息',
                toPath: '/shop-info'
              }
            ],
            goBack: '/',
            goBackShow: false,
            headerHide: false,
            footerShow: true
          }},
        {
          path: '/driver-message',
          name: 'driver-message',
          component: () => import(/* webpackChunkName: "driver" */ '@/pages/driver-info/driver-message.vue'),
          meta: {
            title: [
              {
                titleName: '店长信息',
                toPath: '/shop-info'
              }
            ],
            goBack: '/',
            goBackShow: false,
            headerHide: true,
            footerShow: true
          }
        }
      ]
    }
  ]
})
