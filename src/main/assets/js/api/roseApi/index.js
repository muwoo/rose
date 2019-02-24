import instance from './instance';

/** 获取以保存页面详情 */
function rose_page_detail_get(opts = {}) {
  return instance({
    method: 'get',
    url:  '/api/v1/page/detail',
    opts: opts
  });
}

/** 获取已保存的模板列表 */
function rose_page_list_get(opts = {}) {
  return instance({
    method: 'get',
    url:  '/api/v1/page/list',
    opts: opts
  });
}

/** 根据component name获取component详情 */
function rose_component_detail_get(opts = {}) {
  return instance({
    method: 'get',
    url:  '/api/v1/component/detail',
    opts: opts
  });
}

/** 编辑操作 */
function rose_page_operate_post(opts = {}) {
  return instance({
    method: 'post',
    url:  '/api/v1/page/operate',
    opts: opts
  });
}

/** 根据templateId获取模板信息 */
function rose_tpl_detail_get(opts = {}) {
  return instance({
    method: 'get',
    url:  '/api/v1/tpl/detail',
    opts: opts
  });
}

/** 根据start limit获取模版信息列表 */
function rose_tpl_list_get(opts = {}) {
  return instance({
    method: 'get',
    url:  '/api/v1/tpl/list',
    opts: opts
  });
}

/** 登录 */
function api_v1_login_post(opts = {}) {
  return instance({
    method: 'post',
    url:  '/api/login',
    opts: opts
  });
}

function api_v1_logout_post(opts = {}) {
  return instance({
    method: 'get',
    url:  '/ssoagentlogin/logoutAndGetLoginUrl',
    opts: opts
  });
}

function api_v1_getUserInfo_get(opts = {}) {
  return instance({
    method: 'get',
    url:  '/api/getUserInfo',
    opts: opts
  });
}

/**
 * 图片上传
 * @param opts
 * @returns {*}
 */
function api_v1_image_upload_post(opts = {}) {
  return instance({
    method: 'post',
    url:  '/api/v1/image/upload',
    opts: opts
  });
}

function api_v1_page_release_result_get(opts = {}) {
  return instance({
    method: 'get',
    url:  '/api/v1/page/releaseResult',
    opts: opts
  });
}

function api_v1_page_delete_get(opts = {}) {
  return instance({
    method: 'get',
    url:  '/api/v1/page/delete',
    opts: opts
  });
}

function api_v1_page_clone_post(opts = {}) {
  return instance({
    method: 'post',
    url:  '/api/v1/page/clone',
    opts: opts
  });
}

function api_v1_page_forceSSR(opts = {}) {
  return instance({
    method: 'post',
    url:  '/api/v1/page/forceSSR',
    opts: opts
  });
}

function api_v1_page_update_post(opts = {}) {
  return instance({
    method: 'post',
    url:  '/api/v1/page/update',
    opts: opts
  });
}


function api_v1_channel_addRecord_post(opts = {}) {
  return instance({
    method: 'post',
    url:  '/api/v1/channel/addRecord',
    opts: opts
  });
}

function api_v1_channel_list_get(opts = {}) {
  return instance({
    method: 'get',
    url:  '/api/v1/channel/list',
    opts: opts
  });
}

function api_v1_channel_delete_post(opts = {}) {
  return instance({
    method: 'post',
    url:  '/api/v1/channel/delete',
    opts: opts
  });
}

function api_v2_view_list_get(opts = {}) {
  return instance({
    method: 'get',
    url:  '/api/v2/view/list',
    opts: opts
  });
}

function api_v2_view_detail_get(opts = {}) {
  return instance({
    method: 'get',
    url:  '/api/v2/view/detail',
    opts: opts
  });
}

function api_v1_page_allList_get(opts = {}) {
  return instance({
    method: 'get',
    url:  '/api/v1/page/allList',
    opts: opts
  });
}

function api_v1_admin_add_post(opts = {}) {
  return instance({
    method: 'post',
    url:  '/api/v1/admin/add',
    opts: opts
  });
}

function api_v1_admin_list_get(opts = {}) {
  return instance({
    method: 'get',
    url:  '/api/v1/admin/list',
    opts: opts
  });
}

function api_v1_admin_delete_get(opts = {}) {
  return instance({
    method: 'get',
    url:  '/api/v1/admin/delete',
    opts: opts
  });
}

function api_v1_analysis_list_get(opts = {}) {
  return instance({
    method: 'get',
    url:  '/api/v1/analysis/list',
    opts: opts
  });
}

/**
 * 创建分组
 * @param opts
 * @returns {*}
 */
function api_v1_group_add_post(opts = {}) {
  return instance({
    method: 'post',
    url:  '/api/v1/group/add',
    opts: opts
  });
}

function api_v1_group_list_get(opts = {}) {
  return instance({
    method: 'get',
    url:  '/api/v1/group/list',
    opts: opts
  });
}

function api_v1_group_update_post(opts = {}) {
  return instance({
    method: 'post',
    url:  '/api/v1/group/update',
    opts: opts
  });
}

function api_v1_group_groupPages_get(opts = {}) {
  return instance({
    method: 'get',
    url:  '/api/v1/group/groupPages',
    opts: opts
  });
}

function api_v1_group_delete_post(opts = {}) {
  return instance({
    method: 'post',
    url:  '/api/v1/group/delete',
    opts: opts
  });
}

/**
 * es
 * @param opts
 * @returns {*}
 */
function api_v1_es_list_get(opts = {}) {
  return instance({
    method: 'get',
    url:  '/api/v1/es/list',
    opts: opts
  });
}

function api_v1_es_log_get(opts = {}) {
  return instance({
    method: 'get',
    url:  '/api/v1/es/log',
    opts: opts
  });
}

function api_v2_compadmin_complist(opts = {}) {
  return instance({
    method: 'get',
    url:  '/api/v2/compadmin/complist',
    opts: opts
  });
}

function api_v2_compadmin_adddependence(opts = {}) {
  return instance({
    method: 'post',
    url:  '/api/v2/compadmin/adddependence',
    opts: opts
  });
}

function api_v2_compadmin_getdependence(opts = {}) {
  return instance({
    method: 'get',
    url: '/api/v2/compadmin/getdependence',
    opts: opts
  })
}

function api_v2_compadmin_updatecompdependence(opts = {}) {
  return instance({
    method: 'post',
    url:  '/api/v2/compadmin/updatecompdependence',
    opts: opts
  });
}

function api_v2_compadmin_templatelist(opts = {}) {
  return instance({
    method: 'get',
    url: '/api/v2/compadmin/templatelist',
    opts: opts
  })
}

function api_v2_compadmin_updatetemplatecomp(opts = {}) {
  return instance({
    method: 'post',
    url:  '/api/v2/compadmin/updatetemplatecomp',
    opts: opts
  });
}

export {
  api_v1_page_clone_post,
  rose_page_detail_get,
  rose_page_list_get,
  rose_component_detail_get,
  rose_page_operate_post,
  rose_tpl_detail_get,
  rose_tpl_list_get,
  api_v1_login_post,
  api_v1_image_upload_post,
  api_v1_page_release_result_get,
  api_v1_page_delete_get,
  api_v1_channel_addRecord_post,
  api_v1_channel_list_get,
  api_v1_channel_delete_post,
  api_v2_view_list_get,
  api_v2_view_detail_get,
  api_v1_page_allList_get,
  api_v1_admin_add_post,
  api_v1_admin_list_get,
  api_v1_admin_delete_get,
  api_v1_analysis_list_get,
  api_v1_group_add_post,
  api_v1_group_list_get,
  api_v1_es_list_get,
  api_v1_es_log_get,
  api_v1_group_update_post,
  api_v1_group_groupPages_get,
  api_v1_group_delete_post,
  api_v1_page_update_post,
  api_v1_getUserInfo_get,
  api_v1_logout_post,
  api_v2_compadmin_complist,
  api_v2_compadmin_adddependence,
  api_v2_compadmin_getdependence,
  api_v2_compadmin_updatecompdependence,
  api_v2_compadmin_templatelist,
  api_v2_compadmin_updatetemplatecomp,
  api_v1_page_forceSSR
};
