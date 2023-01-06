const CUSTOM_PLUGIN_ID = process.env.CUSTOM_PLUGIN_ID;
let customConfig = JSON.parse(localStorage.getItem(`app-secondary-${CUSTOM_PLUGIN_ID}`))?.customConfig || {};
export let mockCustomConfig = customConfig;


export const mockChangeCustomConfig = (customConfig) => {
  const mockData = JSON.parse(localStorage.getItem(`app-secondary-${CUSTOM_PLUGIN_ID}`)) || {};
  mockData.customConfig = customConfig;
  localStorage.setItem(`app-secondary-${CUSTOM_PLUGIN_ID}`, JSON.stringify(mockData));
};


export const sysVariables = [
  {
    "create_member": "7d65384f-b8df-b3dc-b730-31a15f520ef9",
    "create_time": 1585814470000,
    "data_type": 0,
    "default_value": "1234567890",
    "id": "10001",
    "last_modifier": "7d65384f-b8df-b3dc-b730-31a15f520ef9",
    "last_modify_time": 1585814470000,
    "name": "current_user_id",
    "object_id": "",
    "owner": 0,
    "type": 1,
    "use": true
  }, {
    "create_member": "7d65384f-b8df-b3dc-b730-31a15f520ef9",
    "create_time": 1585814470000,
    "data_type": 0,
    "default_value": "admin",
    "id": "10002",
    "last_modifier": "7d65384f-b8df-b3dc-b730-31a15f520ef9",
    "last_modify_time": 1585814470000,
    "name": "current_user_name",
    "owner": 0,
    "type": 1,
    "use": true
  }, {
    "create_member": "7d65384f-b8df-b3dc-b730-31a15f520ef9",
    "create_time": 1585814470000,
    "data_type": 0,
    "default_value": "123456789",
    "id": "10003",
    "last_modifier": "7d65384f-b8df-b3dc-b730-31a15f520ef9",
    "last_modify_time": 1585814470000,
    "name": "current_office_id",
    "owner": 0,
    "type": 1,
    "use": true
  }, {
    "create_member": "7d65384f-b8df-b3dc-b730-31a15f520ef9",
    "create_time": 1585814470000,
    "data_type": 0,
    "default_value": "SO.MINE_OFFICE",
    "id": "10004",
    "last_modifier": "7d65384f-b8df-b3dc-b730-31a15f520ef9",
    "last_modify_time": 1585814470000,
    "name": "current_office_name",
    "owner": 0,
    "type": 1,
    "use": true
  }, {
    "create_member": "7d65384f-b8df-b3dc-b730-31a15f520ef9",
    "create_time": 1585814470000,
    "data_type": 0,
    "default_value": "SO.MINE_OFFICE",
    "id": "10005",
    "last_modifier": "7d65384f-b8df-b3dc-b730-31a15f520ef9",
    "last_modify_time": 1585814470000,
    "name": "current_company_name",
    "owner": 0,
    "type": 1,
    "use": true
  }, {
    "create_member": "7d65384f-b8df-b3dc-b730-31a15f520ef9",
    "create_time": 1585814470000,
    "data_type": 6,
    "default_value": "1660539539969",
    "id": "10006",
    "last_modifier": "7d65384f-b8df-b3dc-b730-31a15f520ef9",
    "last_modify_time": 1585814470000,
    "name": "current_time",
    "owner": 0,
    "type": 1,
    "use": true
  }, {
    "create_member": "7d65384f-b8df-b3dc-b730-31a15f520ef9",
    "create_time": 1585814470000,
    "data_type": 0,
    "default_value": "14c9f167-84b7-4840-96bc-0fa2e1ae62a6,88cc8064-ab41-4ebc-b925-f51ccf1888a1,38d2e7e0-1362-43a9-abce-2eba34d5a849,3e854f79-79f7-4db3-a646-a591098335cb,123456789",
    "id": "10007",
    "last_modifier": "7d65384f-b8df-b3dc-b730-31a15f520ef9",
    "last_modify_time": 1585814470000,
    "name": "current_office_and_next",
    "object_id": "",
    "owner": 0,
    "type": 1,
    "use": true
  }, {
    "create_member": "7d65384f-b8df-b3dc-b730-31a15f520ef9",
    "create_time": 1585814470000,
    "data_type": 0,
    "default_value": "admin",
    "id": "10008",
    "last_modifier": "7d65384f-b8df-b3dc-b730-31a15f520ef9",
    "last_modify_time": 1585814470000,
    "name": "current_user_login_name",
    "owner": 0,
    "type": 1,
    "use": true
  }, {
    "create_member": "7d65384f-b8df-b3dc-b730-31a15f520ef9",
    "create_time": 1585814470000,
    "data_type": 0,
    "id": "10009",
    "last_modifier": "7d65384f-b8df-b3dc-b730-31a15f520ef9",
    "last_modify_time": 1585814470000,
    "name": "current_direct_sub_company_id",
    "owner": 0,
    "type": 1,
    "use": true
  }, {
    "create_member": "7d65384f-b8df-b3dc-b730-31a15f520ef9",
    "create_time": 1656921670000,
    "data_type": 6,
    "default_value": "1660492800000",
    "id": "10010",
    "last_modifier": "7d65384f-b8df-b3dc-b730-31a15f520ef9",
    "last_modify_time": 1656921670000,
    "name": "start_time_of_today",
    "owner": 0,
    "type": 1,
    "use": true
  }, {
    "create_member": "7d65384f-b8df-b3dc-b730-31a15f520ef9",
    "create_time": 1656921670000,
    "data_type": 6,
    "default_value": "1660579199000",
    "id": "10011",
    "last_modifier": "7d65384f-b8df-b3dc-b730-31a15f520ef9",
    "last_modify_time": 1656921670000,
    "name": "end_time_of_today",
    "owner": 0,
    "type": 1,
    "use": true
  }
];
export const themeInfo = {
  "theme_id": "52250e971ce3482491f75a7ae01af824", "theme_global_config": {
    "--theme-public-pinPai-color": "rgba(24,144,255,1)",
    "--theme-public-sub-color-1": "rgba(37, 55, 97,1)",
    "--theme-public-sub-color-2": "rgba(30, 41, 64,1)",
    "--theme-public-sub-color-3": "rgba(115, 141, 192,1)",
    "--theme-public-text-color-1": "rgba(12, 13, 14,1)",
    "--theme-public-text-color-2": "rgba(85, 85, 85,1)",
    "--theme-public-text-color-3": "rgba(204, 204, 204,1)",
    "--theme-public-text-color-4": "rgba(245, 245, 245,1)",
    "--theme-public-background-color-1": "rgba(245, 246, 250,1)",
    "--theme-public-background-color-2": "rgba(240, 242, 247,1)",
    "--theme-public-function-color-1": "rgba(255, 102, 102,1)",
    "--theme-public-function-color-2": "rgba(255, 148, 0,1)",
    "--theme-public-function-color-4": "rgba(61, 204, 180,1)",
    "--theme-public-function-color-5": "rgba(73, 129, 47,1)",
    "--theme-public-fontSize-1": "56px",
    "--theme-public-fontSize-2": "48px",
    "--theme-public-fontSize-3": "36px",
    "--theme-public-fontSize-4": "20px",
    "--theme-public-fontSize-5": "18px",
    "--theme-public-fontSize-6": "16px",
    "--theme-public-fontSize-7": "14px",
    "--theme-public-fontFamily-1": "Microsoft YaHei"
  }
};
export const appVariables = [
  {
    "id": "dda34335-82af-4a5e-a022-9ce2657f823d", "name": "sad", "data_type": 0, "default_value": "123"
  }
];
export const intlGetKey = (i18nKey) => {
  return `国际化方法-${i18nKey}`;
};
export const history = {
  //history本地不做mock数据，使用时请判断是否有history对象
};