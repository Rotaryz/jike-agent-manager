import Vue from 'vue'
import Router from 'vue-router'
import storage from 'storage-controller'

const Login = () => import('pages/login/login')
const Home = () => import('pages/home/home')
const Account = () => import('pages/account/account')
const ChangeProject = () => import('pages/change-project/change-project')

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
