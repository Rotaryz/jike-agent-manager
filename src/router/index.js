import Vue from 'vue'
import Router from 'vue-router'
// import storage from 'storage-controller'

const Login = () => import('pages/login/login')
const Home = () => import('pages/home/home')
const Account = () => import('pages/account/account')
const ChangeProject = () => import('pages/change-project/change-project')
const TradeView = () => import('pages/trade-view/trade-view')
const ExplainTrade = () => import('pages/explain-trabe/explain-trabe')
const ManageCustom = () => import('pages/manage-custom/manage-custom')
const CustomDetail = () => import('pages/custom-detail/custom-detail')
const CustomCreate = () => import('pages/custom-create/custom-create')
const MoneyWallet = () => import('pages/money-wallet/money-wallet')
const DepositDetail = () => import('pages/deposit-detail/deposit-detail')
const MyTeam = () => import('pages/my-team/my-team')
const ExplainTeam = () => import('pages/explain-team/explain-team')
const ManageAgent = () => import('pages/manage-agent/manage-agent')
const AgentAward = () => import('pages/agent-award/agent-award')
const AgentEntering = () => import('pages/agent-entering/agent-entering')
const AiTrade = () => import('pages/ai-trade/ai-trade')
const AiExplain = () => import('pages/ai-explain/ai-explain')
const SellBelling = () => import('pages/sell-belling/sell-belling')
const SellRecord = () => import('pages/sell-record/sell-record')
const SellDetail = () => import('pages/sell-detail/sell-detail')
const ChooseCustom = () => import('pages/choose-custom/choose-custom')
const MoneyIncomeZt = () => import('pages/money-income-zt/money-income-zt')
const MoneyIncomeWs = () => import('pages/money-income-ws/money-income-ws')

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
      path: '/explain-trade',
      component: ExplainTrade,
      meta: {
        title: '数据统计说明页'
      }
    },
    {
      path: '/manage-custom',
      component: ManageCustom,
      meta: {
        title: '客户列表'
      }
    },
    {
      path: '/custom-detail',
      component: CustomDetail,
      meta: {
        title: '客户详情'
      }
    },
    {
      path: '/custom-create',
      component: CustomCreate,
      meta: {
        title: '客户资料'
      }
    },
    {
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
    },
    {
      path: '/sell-belling',
      component: SellBelling,
      meta: {
        title: '开单销售'
      }
    },
    {
      path: '/sell-record',
      component: SellRecord,
      meta: {
        title: '销售记录'
      }
    },
    {
      path: '/sell-detail',
      component: SellDetail,
      meta: {
        title: '销售详情'
      }
    },
    {
      path: '/choose-custom',
      component: ChooseCustom,
      meta: {
        title: '选择客户'
      }
    },
    {
      path: '/money-income-zt',
      component: MoneyIncomeZt,
      meta: {
        title: '收益明细'
      }
    },
    {
      path: '/money-income-ws',
      component: MoneyIncomeWs,
      meta: {
        title: '收益明细'
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
