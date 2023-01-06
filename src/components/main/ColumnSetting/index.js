import React from "react";
import PropTypes from "prop-types";
import { Checkbox, Dropdown, Menu } from "antd";
import { SettingOutlined, FilterOutlined } from "@ant-design/icons";
const ColumnSetting = ({ data = [], onUpdate, type = "1" }) => {
  const titleDom = type === "1" ? <SettingOutlined /> : <FilterOutlined />;
  const menu = (
    <Menu
      className="column_setting_menu"
      style={{ maxHeight: "90vh", overflowY: "auto" }}
    >
      <div className="droppable_content">
        {data
          .sort((a, b) => a["sort"] - b["sort"])
          .map((item) => (
            <div
              className="draggable_item"
              onClick={(e) => e.stopPropagation()}
              key={item.dataIndex}
            >
              <Checkbox
                className="menu_item_checkbox"
                onClick={(e) => e.stopPropagation()}
                checked={item.checked}
                onChange={(e) => onUpdate(e.target.checked, item)}
              >
                {item.title}
              </Checkbox>
            </div>
          ))}
      </div>
    </Menu>
  );

  return (
    <Dropdown
      overlay={menu}
      overlayClassName="search-filter-top"
      placement="bottomLeft"
    >
      <a className="column-setting-title">{titleDom}</a>
    </Dropdown>
  );
};

ColumnSetting.propTypes = {
  onUpdate: PropTypes.func,
  data: PropTypes.array,
};

export default ColumnSetting;
