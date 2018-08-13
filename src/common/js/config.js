const env = process.env

const LOCAL_URL = {
  api: `https://agent-api.jkweixin.com`
}

const DEV_URL = {
  api: `https://agent-api.jerryf.cn`
}

const TEST_URL = {
  api: `https://agent-api.jkweixin.net`
}

const PROD_URL = {
  api: `https://agent-api.jkweixin.com`
}

export const BASE_URL = env.NODE_ENV === 'production' ? PROD_URL : env.NODE_ENV === 'test' ? TEST_URL : env.NODE_ENV === 'dev' ? DEV_URL : LOCAL_URL

export const ERR_OK = 0
