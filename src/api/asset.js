import request from "./request";

/**
 * 查询资产
 * @param id 资产ID
 *
 */
export const queryTableList = (pageNum,pageSize,params) =>
  request.post(`/ext/form/eventlist/data?pageNum=${pageNum}&pageSize=${pageSize}`, params);

//查询区域选项
export const queryAreaList = () =>
  request.get(`/ext/form/eventlist/area`);


//查任务类别选项
export const queryClassificationList = () =>
request.get(`/ext/form/eventlist/classification`);

/**
 * 查询所有部门用户
 */
export const queryOfficeUserV2 = params =>
  request.post(`/system/office/queryOfficeUserV2`, params);
