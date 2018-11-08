import React, { Component } from "react";
import { hot } from "react-hot-loader";
import "./index.css";
import Search from "../../lib/index";

class Main extends React.PureComponent {
  mockData = value =>
    Array(18).fill({ name: `${value} :随机数${Math.random()}` });
  onSearchHistory = value =>
    new Promise(resolve => resolve(this.mockData(`${value}历史数据`)));
  onSearch = value => new Promise(resolve => resolve(this.mockData(value)));

  onEnter = value => {
    console.log("searchword:" + value);
  };
  placeholder = open =>
    open
      ? "指标搜索：最多支持三个关键词搜索，以空格隔开"
      : "指标搜索 (微贷/财富/保险)";
  renderContent = options => {
    const { rows, highlight, searchWords, handleClose } = options;
    return rows.map((item, index) => {
      const text = highlight(searchWords, item.name);
      return (
        <li
          key={`${index}content_li`}
          onClick={() => {
            console.log(item.name);
            handleClose();
          }}
        >
          <div dangerouslySetInnerHTML={{ __html: text }} />
        </li>
      );
    });
  };
  render() {
    console.log("...");
    return (
      <div>
        <div style={{ width: "90%" }}>
          <Search
            anchor="right"
            placeholder={this.placeholder}
            onSearchHistory={this.onSearchHistory} // 历史搜索
            onSearch={this.onSearch} // 搜索查询
            onEnter={this.onEnter} // 回车键入
            renderContent={this.renderContent} // 渲染内容
            renderFooter={this.renderFooter}
          />
        </div>
      </div>
    );
  }
}
export default hot(module)(Main);
