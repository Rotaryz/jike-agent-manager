import Vue from 'vue'
import Router from 'vue-router'
// import storage from 'storage-controller'

const Login = () => import('pages/login/login')
const Home = () => import('pages/home/home')
const Account = () => import('pages/account/account')
const ChangeProject = () => import('pages/change-project/change-project')
const ManageCustom = () => import('pages/manage-custom/manage-custom')
const CustomDetail = () => import('pages/custom-detail/custom-detail')
const CustomCreate = () => import('pages/custom-create/custom-create')
const MoneyWallet = () => import('pages/money-wallet/money-wallet')
const DepositDetail = () => import('pages/deposit-detail/deposit-detail')

Vue.use(Router)

const route = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
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
        title: ''
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
    }, {
      path: '/money-wallet',
      component: MoneyWallet,
      meta: {
        title: '我的钱包'
      }
    },
    {
      path: '/deposit-detail',
      component: DepositDetail,
      meta: {
        title: '提现详情'
      }
    }
  ]
})

const DEFAULT_TITLE = '登录'
// const DEFAULT_ROUTE = '/login'
// const HOME_ROUTE = '/home'

route.beforeEach((to, from, next) => {
  document.title = to.meta.title ? to.meta.title : DEFAULT_TITLE
  // if (to.path === HOME_ROUTE) {
  //   const token = storage.has('token')
  //   if (!token) {
  //     next({path: DEFAULT_ROUTE, replace: true})
  //   }
  // }
  next()
})

export default route
