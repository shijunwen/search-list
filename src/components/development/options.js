import {
  Button,
  Input
} from "antd";

const Options = (props) => {
  console.log(process.env.CUSTOM_PLUGIN);
  const optionsRender = process.env.CUSTOM_PLUGIN.props.customconf || [];
  const { options, changeOptions } = props;
  const inputValueChange = (e, item) => {
    const value = e.target.value;
    options[item] = value;
  };
  return (
    <>
      <div className="options">
        {optionsRender.map((item, index) => {
          return (
            <div className="options-item" key={index}>
              <div style={{ display: "inline-block", width: "200px" }}>{item}</div>
              <Input
                defaultValue={options[item] || ""} onChange={(e) => {
                inputValueChange(e, item);
              }}
              />
            </div>);
        })}
      </div>
      <Button className="optionsSubmit" onClick={changeOptions}>执行</Button>
    </>
  );
};
export default Options;