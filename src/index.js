import React from "react";

import classnames from "classnames";
import SearchPanel from "./Panel";
import { IconSearch } from "./Icon";
import "./index.less";

const DebounceTime = 250;
const ENTER_KEY = 13;
class Search extends React.PureComponent {
  constructor(props) {
    super(props);
    this.timer = null;
    this.searchNode = null;
    this.inputNode = null;
    this.state = {
      searchWords: "",
      isOpen: false,
      isHistory: false,
      rows: [],
      isFull: false
    };
  }

  onFocus = () => {
    // 将历史消息
    if (this.state.searchWords === "" && this.props.onSearchHistory) {
      this.props.onSearchHistory(this.state.searchWords).then(res => {
        this.setState({
          isOpen: true,
          searchWords: "",
          rows: res,
          isHistory: true,
          isFull: true
        });
      });
    } else {
      this.setState({ isOpen: true, isFull: true }, () => {
        this.props.onSearch(this.state.searchWords);
      });
    }
  };
  onKeyDown = e => {
    if (e.keyCode === ENTER_KEY && this.props.onEnter) {
      this.setState(
        {
          isOpen: false,
          isFull: false
        },
        () => {
          this.props.onEnter(this.inputNode.value);
        }
      );
    }
  };
  onChange = () => {
    const value = this.inputNode.value;
    if (value === "") {
      // 当输入为空的时候显示历史搜索记录：初次进入/清空搜索字段
      this.queryHistory();
    } else {
      this.queryFuzzy(value);
    }
  };
  queryFuzzy = value => {
    this.debounce(() => {
      this.props.onSearch(value).then(res => {
        this.setState({ isHistory: false, rows: res, searchWords: value });
      });
    }, DebounceTime);
  };
  queryHistory = () => {
    this.props.onSearchHistory("").then(res => {
      this.setState({
        rows: res,
        isHistory: true,
        searchWords: ""
      });
    });
  };

  debounce = (fn, delay) => {
    const that = this;
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      fn.apply(that);
    }, delay);
  };

  handleClosePanel = () => {
    this.setState({
      isOpen: false,
      isFull: false
    });
  };
  isFunction = val => typeof val === "function";

  render() {
    const { isOpen, isFull } = this.state;
    const rootCx = classnames("search-bar", {
      full: isFull
    });
    const { placeholder } = this.props;
    const newPlaceholder = this.isFunction(placeholder)
      ? placeholder(isOpen)
      : placeholder;
    return (
      <div className={rootCx}>
        <div className="searchbox">
          <input
            ref={node => {
              this.inputNode = node;
            }}
            placeholder={newPlaceholder} // "指标搜索"
            type="text"
            className="search-field search-query"
            autoComplete="off"
            onFocus={this.onFocus}
            onChange={() => {
              this.debounce(this.onChange, DebounceTime);
            }}
            onKeyDown={this.onKeyDown}
          />
          <div className="search-image">
            <IconSearch style={{ width: "18px" }} />
          </div>
        </div>
        <SearchPanel
          {...this.props}
          rows={[...this.state.rows]}
          searchWords={this.state.searchWords}
          isOpen={this.state.isOpen}
          isHistory={this.state.isHistory} // 是否显示历史访问的info
          handleClosePanel={this.handleClosePanel}
        />

        {isOpen && (
          <div className="search-mask" onClick={this.handleClosePanel} />
        )}
      </div>
    );
  }
}

export default Search;
