import login from './login'
import project from './project'

const global = {
  doc_addr: '文档地址',
  code_addr: '仓库地址',
  form_account: '请输入账号或邮箱',
  form_password: '请输入密码',
  // 头部
  doc: '说明文档',
  help: '帮助中心',
  contact: '联系我们',
  logout: '退出登录',
  logout_success: '退出成功！',
  logout_failure: '退出失败！',
  // 系统设置
  sys_set: '系统设置',
  lang_set: '语言设置',
  // 功能键
  r_edit: '编辑',
  r_preview: '预览',
  r_copy: '克隆',
  r_rename: '重命名',
  r_publish: '发布',
  r_unpublish: '取消发布',
  r_download: '下载',
  r_delete: '删除',
  r_more: '更多',
}

const http = {
  error_message: '接口异常，请检查！',
  token_overdue_message: '登录过期，请重新登录！'
}

export default {
  global,
  http,
  login,
  project
}
