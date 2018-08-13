import Vue from 'vue'
import Router from 'vue-router'

// const HelloWorld = () => import('pages/hello-world/hello-world')
// const WeChart = () => import('pages/vue-echarts/vue-echarts')
const Login = () => import('pages/login/login')
const Home = () => import('pages/home/home')
const Account = () => import('pages/account/account')
const ChangeProject = () => import('pages/change-project/change-project')
const TradeView = () => import('pages/trade-view/trade-view')
const TradeExplain = () => import('pages/explain-trabe/explain-trabe')

Vue.use(Router)

const route = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Login,
      meta: {
        title: '登录'
      }
    },
    {
      path: '/home',
      component: Home,
      meta: {
        title: '首页'
      }
    },
    {
      path: '/account',
      component: Account,
      meta: {
        title: '账号信息',
        keepAlive: true
      }
    }, {
      path: '/change-project',
      component: ChangeProject,
      meta: {
        title: '切换项目'
      }
    }, {
      path: '/trade-view',
      component: TradeView,
      meta: {
        title: '生意概览'
      }
    }, {
      path: '/trade-explain',
      component: TradeExplain,
      meta: {
        title: '数据统计说明页'
      }
    }
  ]
})

export default route
