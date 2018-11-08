import React from "react";
import classes from "classnames";
import { IconHistory } from "./Icon";
import "./index.less";

class SearchPanel extends React.PureComponent {
  highlight = (searchWords, str) => {
    // 对搜索的关键字分词，这里使用简单的空格分词
    const searchwordsArray = searchWords.split(" ");
    let string = str;
    // 对每个关键词进行replace替换
    searchwordsArray.forEach(e => {
      if (e.trim() === "") {
        return;
      }
      string = string.replace(
        e,
        match => `<span style="font-weight:700">${match}</span>`
      );
    });
    return string;
  };
  renderHeader = () => {
    const { isHistory } = this.props;
    if (this.props.renderHeader) {
      return this.props.renderHeader(this.props.rows);
    }
    return (
      isHistory && (
        <li className="li-recent">
          <i className="recent-icon">
            <IconHistory style={{ fill: "#adb9c6" }} />
          </i>
          最近访问
        </li>
      )
    );
  };
  renderContent = () => {
    const { searchWords, handleClosePanel, rows } = this.props;
    if (this.props.renderContent) {
      return (
        <ul className="search-panel-ul">
          {this.props.renderContent({
            searchWords,
            rows,
            handleClose: handleClosePanel,
            highlight: this.highlight
          })}
        </ul>
      );
    }
    return null;
    // 默认的renderContent
  };
  renderFooter = () => {
    if (this.props.renderFooter) {
      return this.props.renderFooter(this.props.rows);
    }
    return (
      <div
        className="li-footer"
        onClick={() => {
          this.props.handleClosePanel();
        }}
      >
        查看更多
      </div>
    );
  };

  render() {
    const { isOpen, anchor } = this.props;
    const rootClass = classes(
      "search-panel",
      [`search-direction-${anchor}`], // 伸缩的方向
      {
        close: !isOpen
      }
    );
    return (
      <div className={rootClass}>
        {this.renderHeader()}
        {this.renderContent()}
        {this.renderFooter()}
      </div>
    );
  }
}
export default SearchPanel;
