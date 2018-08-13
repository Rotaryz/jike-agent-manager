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
const MoneyWallet = () => import('pages/money-wallet/money-wallet')
const DepositDetail = () => import('pages/deposit-detail/deposit-detail')
const MyTeam = () => import('pages/my-team/my-team')
const ExplainTeam = () => import('pages/explain-team/explain-team')
const ManageAgent = () => import('pages/manage-agent/manage-agent')
const AgentAward = () => import('pages/agent-award/agent-award')
const AgentEntering = () => import('pages/agent-entering/agent-entering')
const AiTrade = () => import('pages/ai-trade/ai-trade')
const AiExplain = () => import('pages/ai-explain/ai-explain')

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
        title: '账号信息'
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
    },
    {
      path: '/my-team',
      component: MyTeam,
      meta: {
        title: '我的团队'
      }
    },
    {
      path: '/explain-team',
      component: ExplainTeam,
      meta: {
        title: '我的团队说明'
      }
    },
    {
      path: '/manage-agent',
      component: ManageAgent,
      meta: {
        title: '我要推荐代理商'
      }
    },
    {
      path: '/agent-award',
      component: AgentAward,
      meta: {
        title: '推荐加盟'
      }
    },
    {
      path: '/agent-entering',
      component: AgentEntering,
      meta: {
        title: '推荐信息录入'
      }
    },
    {
      path: '/ai-trade',
      component: AiTrade,
      meta: {
        title: '生意概览'
      }
    },
    {
      path: '/ai-explain',
      component: AiExplain,
      meta: {
        title: '数据统计说明页'
      }
    }
  ]
})

// const DEFAULT_TITLE = '登录'
// // const DEFAULT_ROUTE = '/login'
// // const HOME_ROUTE = '/home'
//
// route.beforeEach((to, from, next) => {
//   document.title = to.meta.title ? to.meta.title : DEFAULT_TITLE
//   // if (to.path === HOME_ROUTE) {
//   //   const token = storage.has('token')
//   //   if (!token) {
//   //     next({path: DEFAULT_ROUTE, replace: true})
//   //   }
//   // }
//   next()
// })

export default route
