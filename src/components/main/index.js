import React, { Component } from "react";
import classNames from "classnames";
import * as applicationsService from "../../api/asset";
import { Button, Select, Divider, Table, TreeSelect } from "antd";
import CollapsedAction from "./CollapsedAction";
import ColumnSetting from "./ColumnSetting";
import "./index.less";

const { Option } = Select;

const loopOffice = (data, list, flag) => {
  data.map((item) => {
    item.title =
      item.office_name === "SO.MINE_OFFICE" ? "我的组织" : item.office_name;
    item.value = item.id;
    if (item.office_children) {
      // item.disabled = !block.has_multiple_asset;
      item.disabled = flag ? false : true;
      item.children = loopOffice(item.office_children, list, flag);
    }
    if (item.users && item.users.length && !flag) {
      item.users.map((ele) => {
        list.push(ele);
        if (item.children) {
          let title = ele.name;
          if (ele.userName) {
            title = `${ele.name}(${ele.userName})`;
          }
          item.children.push({
            title: title,
            value: ele.id,
          });
        }
      });
    }
  });
  return data;
};

export default class Main extends Component {
  state = {
    id: "",
    responsible_department_lists: [],
    suoshuquyu_lists: [],
    charge_person_lists: [],
    xiaoleimingcheng_lists: [],
    responsible_department: [],
    suoshuquyu: "",
    charge_person: [],
    xiaoleimingcheng: "",
    pageNum: 1,
    pageSize: 10,
    columns: [
      {
        title: "序号",
        dataIndex: "index",
        width: 80,
        fixed: true,
        checked: true,
        onHeaderCell: () => {
          return {
            style: {
              whiteSpace: "nowrap",
            },
          };
        },
        render: (_, __, index) => <span>{index + 1}</span>,
      },
      {
        title: "责任部门",
        dataIndex: "responsible_department",
        key: "responsible_department",
        width: 120,
        ellipsis: true,
        checked: true,
        render: (text, record, index) => {
          return <span>{text === "SO.MINE_OFFICE" ? "我的组织" : text}</span>;
        },
      },
      {
        title: "辖区（区域）",
        dataIndex: "suoshuquyu",
        key: "suoshuquyu",
        width: 120,
        ellipsis: true,
        checked: true,
      },
      {
        title: "责任人",
        dataIndex: "charge_person",
        key: "charge_person",
        width: 120,
        ellipsis: true,
        checked: true,
      },
      {
        title: "任务类别",
        dataIndex: "xiaoleimingcheng",
        key: "xiaoleimingcheng",
        ellipsis: true,
        width: 120,
        checked: true,
      },
      {
        title: "任务总数",
        dataIndex: "total_count",
        key: "total_count",
        width: 120,
        ellipsis: true,
        checked: true,
      },
      {
        title: "办理中总数",
        dataIndex: "handling_count",
        key: "handling_count",
        width: 120,
        ellipsis: true,
        checked: true,
      },
      {
        title: "已办结总数",
        dataIndex: "finished_count",
        key: "finished_count",
        width: 120,
        ellipsis: true,
        checked: true,
      },
      {
        title: "未按时办结总数",
        dataIndex: "finished_count_out_time",
        key: "finished_count_out_time",
        width: 140,
        ellipsis: true,
        checked: true,
      },
      {
        title: "按时办结总数",
        dataIndex: "finished_count_in_time",
        key: "finished_count_in_time",
        width: 130,
        ellipsis: true,
        checked: true,
      },
      {
        title: "按时办结率",
        dataIndex: "finished_in_time_rate",
        key: "finished_in_time_rate",
        width: 120,
        ellipsis: true,
        checked: true,
      },
      {
        title: "任务总时长",
        dataIndex: "task_total_time",
        key: "task_total_time",
        width: 120,
        ellipsis: true,
        checked: true,
      },
      {
        title: "办理中任务时长",
        dataIndex: "handling_task_total_time",
        key: "handling_task_total_time",
        width: 140,
        ellipsis: true,
        checked: true,
      },
      {
        title: "已办结任务时长",
        dataIndex: "finished_task_total_time",
        key: "finished_task_total_time",
        width: 140,
        ellipsis: true,
        checked: true,
      },
    ],
    dataSource: [],
    collapsed: true,
    total: 0,
    searchFields: [
      { dataIndex: "department", title: "责任部门", checked: true },
      { dataIndex: "jurisdiction", title: "辖区（区域）", checked: true },
      { dataIndex: "person", title: "责任人", checked: true },
      { dataIndex: "taskType", title: "任务类别", checked: true },
    ],
  };

  componentDidMount() {
    //封装平台方法
    //同时封装外层dom id为需求编号，初始化事件注册，重要勿删
    this.props.mainInit && this.props.mainInit(this);
    this.initComData();
    this.getQueryLists();
    this.setLocalColumns();
    this.setLocalColumnsSearchFields();
  }

  // componentDidUpdate() {
  //   const { id } = this.props;
  //   if (id !== this.state.id) {

  //   }
  // }

  setLocalColumns = () => {
    const { id } = this.props;

    const { columns = [] } = this.state;
    const localStorageColumns = localStorage.getItem(`${id}__columns`) || "[]";
    try {
      const localStorageColumnsArr = JSON.parse(localStorageColumns);
      if (localStorageColumnsArr.length) {
        this.setState({
          columns: [...columns].map((item) => {
            return {
              ...item,
              checked: localStorageColumnsArr.includes(item.dataIndex),
            };
          }),
        });
      }
    } catch (error) {}
  };

  setLocalColumnsSearchFields = () => {
    const { id } = this.props;
    const { searchFields = [] } = this.state;
    const localStorageSearchFields =
      localStorage.getItem(`${id}__searchFields`) || "[]";
    try {
      const localStorageSearchFieldsArr = JSON.parse(localStorageSearchFields);
      if (localStorageSearchFieldsArr.length) {
        this.setState({
          searchFields: [...searchFields].map((item) => {
            return {
              ...item,
              checked: localStorageSearchFieldsArr.includes(item.dataIndex),
            };
          }),
        });
      }
    } catch (error) {}
  };

  initComData = async () => {
    const {
      responsible_department,
      suoshuquyu,
      charge_person,
      xiaoleimingcheng,
      pageNum,
      pageSize,
    } = this.state;
    try {
      const params = {};
      if (responsible_department?.length > 0) {
        params["responsible_department"] = responsible_department;
      }
      if (charge_person?.length > 0) {
        params["charge_person"] = charge_person;
      }
      if (suoshuquyu) {
        params["suoshuquyu"] = suoshuquyu;
      }
      if (xiaoleimingcheng) {
        params["xiaoleimingcheng"] = xiaoleimingcheng;
      }
      const { data } = await applicationsService.queryTableList(
        pageNum,
        pageSize,
        params
      );
      this.setState({ dataSource: data?.results, total: data?.totalCount });
    } catch (error) {
      console.log(error);
    }
  };

  getQueryLists = async () => {
    try {
      const { data: areaLists } = await applicationsService.queryAreaList();
      this.setState({ suoshuquyu_lists: areaLists });
      const { data: classificationLists } =
        await applicationsService.queryClassificationList();
      this.setState({ xiaoleimingcheng_lists: classificationLists });
      const { data: userLists } = await applicationsService.queryOfficeUserV2({
        type: "0",
      });
      let _userLists = loopOffice(
        JSON.parse(JSON.stringify(userLists)).filter(Boolean),
        []
      );
      this.setState({ charge_person_lists: _userLists });
      let _officeLists = loopOffice(
        JSON.parse(JSON.stringify(userLists)).filter(Boolean),
        [],
        true
      );
      this.setState({ responsible_department_lists: _officeLists });
    } catch (error) {
      console.log(error);
    }
  };

  Event_Center_getName() {
    return this.state.id;
  }

  /**
   * 用于触发事件方法，window.eventCenter?.triggerEvent封装了一层，
   * @param {String} eventName 事件名
   * @param {Array} payload 事件传参
   *
   */
  triggerEvent = (eventName, payload) => {
    const componentId =
      this.props.componentId || this.props?.customConfig.componentId;
    componentId &&
      window.eventCenter?.triggerEvent(
        componentId,
        eventName,
        //payload需为一个object
        payload
      );
  };
  handleOk = () => {
    this.initComData();
  };

  onHandleClean = () => {
    this.setState(
      {
        responsible_department: [],
        suoshuquyu: "",
        charge_person: [],
        xiaoleimingcheng: "",
      },
      () => {
        this.initComData();
      }
    );
  };

  handleRwlbChange = (value) => {
    this.setState({ xiaoleimingcheng: value, pageNum: 1, pageSize: 10 }, () => {
      this.initComData();
    });
  };

  handleAreaChange = (value) => {
    this.setState({ suoshuquyu: value, pageNum: 1, pageSize: 10 }, () => {
      this.initComData();
    });
  };

  handleUserChange = (value) => {
    this.setState({ charge_person: value, pageNum: 1, pageSize: 10 }, () => {
      this.initComData();
    });
  };
  handleOfficeChange = (value) => {
    this.setState(
      { responsible_department: value, pageNum: 1, pageSize: 10 },
      () => {
        this.initComData();
      }
    );
  };

  onUpdateFields = ({ checked, obj, name, arr }) => {
    const { id } = this.props;
    const index = arr.findIndex((item) => item.dataIndex === obj.dataIndex);
    if (index > -1) {
      arr.splice(index, 1, { ...obj, checked });
    }
    this.setState({
      [name]: [...arr],
    });
    const checkedKey = [];
    arr.forEach((item) => {
      if (item.checked) {
        checkedKey.push(item.dataIndex);
      }
    });
    localStorage.setItem(`${id}__${name}`, JSON.stringify(checkedKey));
  };

  render() {
    const {
      collapsed,
      dataSource,
      columns,
      total,
      responsible_department,
      suoshuquyu,
      charge_person,
      xiaoleimingcheng,
      suoshuquyu_lists,
      xiaoleimingcheng_lists,
      charge_person_lists,
      responsible_department_lists,
      searchFields = [],
    } = this.state;
    let _columns = [...columns];
    if (responsible_department.length > 0) {
      if (!suoshuquyu) {
        _columns = _columns.filter((item) => item.key !== "suoshuquyu");
      }
      if (charge_person.length === 0) {
        _columns = _columns.filter((item) => item.key !== "charge_person");
      }
    }
    if (suoshuquyu) {
      if (responsible_department.length === 0) {
        _columns = _columns.filter(
          (item) => item.key !== "responsible_department"
        );
      }
      if (charge_person.length === 0) {
        _columns = _columns.filter((item) => item.key !== "charge_person");
      }
    }
    if (charge_person.length > 0) {
      if (responsible_department.length === 0) {
        _columns = _columns.filter(
          (item) => item.key !== "responsible_department"
        );
      }
      if (!suoshuquyu) {
        _columns = _columns.filter((item) => item.key !== "suoshuquyu");
      }
    }
    return (
      <div
        className="app-secondary"
        id={this.state.id}
        style={{
          background: "#f5f6f7",
          height: "100%",
          width: " 100%",
        }}
      >
        <div
          className={classNames("search-wrapper", {
            "search-wrapper-collapsedfalse": !collapsed,
            "search-wrapper-collapsedtrue": collapsed,
          })}
        >
          <div
            className={classNames(
              "search-wrapper-content",
              "search-wrapper-middle"
            )}
          >
            {searchFields.find((v) => v.dataIndex === "department")
              ?.checked && (
              <div className="query-item-content">
                <div className="query-list">
                  <div className="title">责任部门：</div>
                  <TreeSelect
                    className="query-item"
                    showSearch
                    showCheckedStrategy={"SHOW_ALL"}
                    value={responsible_department}
                    style={{ width: "100%" }}
                    treeNodeFilterProp="title"
                    onChange={this.handleOfficeChange}
                    multiple={true}
                    treeData={responsible_department_lists || []}
                    treeDefaultExpandAll
                    treeCheckable={true}
                    allowClear={true}
                  />
                </div>
              </div>
            )}
            {searchFields.find((v) => v.dataIndex === "jurisdiction")
              ?.checked && (
              <div className="query-item-content">
                <div className="query-list">
                  <div className="title">辖区（区域）：</div>
                  <Select
                    className="query-item"
                    value={suoshuquyu}
                    allowClear={true}
                    onChange={this.handleAreaChange}
                  >
                    {suoshuquyu_lists.map((item) => (
                      <Option
                        key={item?.id}
                        value={item?.id}
                        label={item.label}
                      >
                        {item.label}
                      </Option>
                    ))}
                  </Select>
                </div>
              </div>
            )}
            {searchFields.find((v) => v.dataIndex === "person")?.checked && (
              <div className="query-item-content">
                <div className="query-list">
                  <div className="title">责任人：</div>

                  <TreeSelect
                    className="query-item"
                    showSearch
                    value={charge_person}
                    style={{ width: "100%" }}
                    treeNodeFilterProp="title"
                    onChange={this.handleUserChange}
                    multiple={true}
                    treeData={charge_person_lists || []}
                    treeDefaultExpandAll
                    treeCheckable={true}
                    allowClear={true}
                  />
                </div>
              </div>
            )}
            {collapsed &&
              searchFields.find((v) => v.dataIndex === "taskType")?.checked && (
                <div className="query-item-content">
                  <div className="query-list">
                    <div className="title">任务类别：</div>
                    <Select
                      className="query-item"
                      allowClear={true}
                      value={xiaoleimingcheng}
                      onChange={this.handleRwlbChange}
                    >
                      {xiaoleimingcheng_lists.map((item) => (
                        <Option
                          key={item?.id}
                          value={item?.id}
                          label={item.label}
                        >
                          {item.label}
                        </Option>
                      ))}
                    </Select>
                  </div>
                </div>
              )}
          </div>
          <div className="rightButtons">
            {!collapsed && <Divider type="vertical" className="divider-line" />}
            <Button
              type="primary"
              htmlType="submit"
              onClick={this.handleOk}
              className="filterBtn"
            >
              查询
            </Button>
            <Button onClick={this.onHandleClean} className="resetBtn">
              重置
            </Button>
            <ColumnSetting
              data={columns}
              onUpdate={(checked, obj) =>
                this.onUpdateFields({
                  checked,
                  obj,
                  name: "columns",
                  arr: columns,
                })
              }
              type="1"
            />
            <ColumnSetting
              data={searchFields}
              onUpdate={(checked, obj) =>
                this.onUpdateFields({
                  checked,
                  obj,
                  name: "searchFields",
                  arr: searchFields,
                })
              }
              type="2"
            />
          </div>
          <CollapsedAction
            collapsed={collapsed}
            setCollapsed={(value) => {
              this.setState({ collapsed: value });
            }}
            showFlag={true}
          />
        </div>
        <div className="model_view_content">
          <Table
            dataSource={dataSource}
            scroll={{ x: "100%" }}
            onChange={(pagination) => {
              this.setState(
                { pageNum: pagination.current, pageSize: pagination.pageSize },
                () => {
                  this.initComData();
                }
              );
            }}
            pagination={{ total: total }}
            bordered
            columns={_columns.filter((item) => item.checked)}
          />
        </div>
      </div>
    );
  }
}
