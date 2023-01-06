import React, { useState } from "react";
import "./development.less";
import {
  DesignConfiguration,
  Main
} from "../index.js";
import {
  Carousel
} from "antd";
import Options from "./options.js";
import {
  mockCustomConfig,
  mockChangeCustomConfig,
  sysVariables,
  appVariables,
  intlGetKey,
  themeInfo,
  history
} from "./mockData.js";
import { cloneDeep } from "lodash";
import Utils from "../../utils";
import { mainInit } from "../../App.js";

const renderMap = [Main, DesignConfiguration];

const Development = () => {
  const [customConfig, setCustomConfig] = useState(mockCustomConfig);
  const changeCustomConfig = () => {
    setCustomConfig(cloneDeep(customConfig));
    mockChangeCustomConfig(customConfig);
  };
  return (
    <div id="development">
      <Carousel>
        {
          renderMap.map((item, index) => {
            let props;
            if (item == DesignConfiguration) {
              props = {
                customConfig,
                changeCustomConfig
              };
            } else {
              props = {
                sysVariables,
                appVariables,
                intlGetKey,
                themeInfo,
                history,
                customConfig,
                mainInit
              };
            }
            let Comp = item;
            return (
              <div key={index} className="carousel-item">
                {(item == DesignConfiguration) ?
                 (<>
                   <Options
                     options={customConfig}
                     changeOptions={changeCustomConfig}
                   />
                   <Comp {...props} />
                 </>) :
                 (<Comp {...props} key={Utils.generateUUID()} />)}
              </div>);
          })
        }
      </Carousel>
    </div>
  );
};


Development.propTypes = {};

export default Development;
