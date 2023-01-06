// 组件可派发事件
export const events = [
  {
    key: "click",
    name: "点击",
    payload: [
      {
        name: "值",
        key: "value",
        dataType: "string"
      }
    ]
  }
];
// 组件可接收事件
export const actions = [
  // {
  //   key: "setValue",
  //   name: "设值",
  //   params: [
  //     {
  //       key: "value",
  //       name: "值",
  //       dataType: "string"
  //     }
  //   ],
  //   hasReturn: false,
  //   // hasReturn为false则不用写returns选项
  //   returns: [
  //     {
  //       key: "value",
  //       name: "值",
  //       dataType: "string"
  //     }
  //   ]
  // }
];

export default {
  actions,
  events
};
