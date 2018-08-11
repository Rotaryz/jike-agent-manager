import Vue from 'vue'
import Router from 'vue-router'

// const HelloWorld = () => import('pages/hello-world/hello-world')
// const WeChart = () => import('pages/vue-echarts/vue-echarts')
const Login = () => import('pages/login/login')
const Home = () => import('pages/home/home')
const Account = () => import('pages/account/account')
const ChangeProject = () => import('pages/change-project/change-project')
const ManageCustom = () => import('pages/manage-custom/manage-custom')
const CustomDetail = () => import('pages/custom-detail/custom-detail')
const CustomCreate = () => import('pages/custom-create/custom-create')

Vue.use(Router)

const route = new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
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
      path: '/manage-custom',
      component: ManageCustom,
      meta: {
        title: '客户列表'
      }
    }, {
      path: '/custom-detail',
      component: CustomDetail,
      meta: {
        title: '客户详情'
      }
    }, {
      path: '/custom-create',
      component: CustomCreate,
      meta: {
        title: '客户资料'
      }
    }
  ]
})

export default route
