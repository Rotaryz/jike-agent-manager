import storage from 'storage-controller'
const env = process.env

const project = storage.get('project') || 'wx'

const LOCAL_URL = {
  api: `https://agent-api.jkweixin.com/${project}`
}

const DEV_URL = {
  api: `https://agent-api.jerryf.cn/${project}`
}

const TEST_URL = {
  api: `https://agent-api.jkweixin.net/${project}`
}

const PROD_URL = {
  api: `https://agent-api.jkweixin.com/${project}`
}

export const BASE_URL = env.NODE_ENV === 'production' ? PROD_URL : env.NODE_ENV === 'test' ? TEST_URL : env.NODE_ENV === 'dev' ? DEV_URL : LOCAL_URL

export const ERR_OK = 0
