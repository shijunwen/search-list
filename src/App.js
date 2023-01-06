import React from "react";
import {
  DesignConfiguration,
  Main
} from "./components";
import MsgCompConfig from "./components/main/msgCompConfig.js";
import Utils from "./utils/index.js";

const renderHashMap = {
  main: Main,
  designConfiguration: DesignConfiguration
};
//封装平台方法
export const mainInit = (Main, setId, actionDefinitions) => {
  if (setId) {
    const { customConfig } = Main;
    const componentId = Main.componentId || customConfig.componentId;
    //内部使用，需求编号，不需要可去掉，用来将需求编号打到dom元素上，方便以后处理问题
    const requirementNum = process.env.CUSTOM_PLUGIN["requirement-number"] === "需求编号"
                           ? ""
                           : process.env.CUSTOM_PLUGIN["requirement-number"];
    const customConfigId = customConfig?.id
                           ? `app_secondary_${requirementNum}_${customConfig.id}`
                           : `app_secondary_${requirementNum}_${Utils.generateUUID()}`;
    setId(customConfigId);
    const Event_Center_getName = () => {
      return customConfigId;
    };
    window?.componentCenter?.register(componentId, "comp", { Event_Center_getName, ...actionDefinitions }, MsgCompConfig);
  } else {
    const { customConfig } = Main.props;
    const componentId = Main.props.componentId || customConfig.componentId;
    window?.componentCenter?.register(componentId, "comp", Main, MsgCompConfig);
    //内部使用，需求编号，不需要可去掉，用来将需求编号打到dom元素上，方便以后处理问题
    const requirementNum = process.env.CUSTOM_PLUGIN["requirement-number"] === "需求编号"
                           ? ""
                           : process.env.CUSTOM_PLUGIN["requirement-number"];
    const id = customConfig?.id
               ? `app_secondary_${requirementNum}_${customConfig.id}`
               : `app_secondary_${requirementNum}_${Utils.generateUUID()}`;
    Main.setState({ id });
  }
};
const App = ({ isConfig, ...props }) => {
  if (isConfig) {
    props.changeCustomConfig = props.onConfigChange;
    return <DesignConfiguration {...props} />;
  } else {
    props.mainInit = mainInit;
    return <Main {...props} />;
  }
};
App.propTypes = {};

export default App;
