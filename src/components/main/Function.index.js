import React, {
  useEffect,
  useState
} from "react";

const Main = (props) => {
  const [id, setId] = useState("");
  const [number, setNumber] = useState(1);
  const initComData = () => {
    const customConfig = props?.customConfig;


    customConfig.number && setNumber(customConfig.number);
  };
  const actionDefinitions = {
    // do_EventCenter_
  };
  const triggerEvent = (eventName, payload) => {
    const componentId = props.componentId || props?.customConfig.componentId;
    componentId && window.eventCenter?.triggerEvent(
      componentId,
      eventName,
      //payload需为一个object
      payload
    );
  };
  const handleClick = () => {
    triggerEvent("click", { value: "123" });
  };
  useEffect(() => {
    props.mainInit && props.mainInit(props, setId, { ...actionDefinitions });
    initComData();
  }, []);

  return (
    <>
      <div id={id} className="app-secondary">
        {/*以下为样例，正式开发请去除相关代码*/}
        {number}
        <button onClick={handleClick}>测试逻辑控制</button>
      </div>
    </>
  );
};

export default Main;
