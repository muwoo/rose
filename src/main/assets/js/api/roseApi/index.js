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
    url:  '/tpl/component',
    opts: opts
  });
}

/** 渲染 */
function rose_page_operate_post(opts = {}) {
  return instance({
    method: 'post',
    url:  '/tpl/renderTpl',
    opts: opts
  });
}

/** 根据templateId获取模板信息 */
function rose_tpl_detail_get(opts = {}) {
  return instance({
    method: 'get',
    url:  '/tpl/detail',
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
export {
  rose_page_detail_get,
  rose_page_list_get,
  rose_component_detail_get,
  rose_page_operate_post,
  rose_tpl_detail_get,
  rose_tpl_list_get,
};
