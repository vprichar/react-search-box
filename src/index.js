import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _filter from 'lodash/filter';
import classNames from 'classnames';
import styled from 'styled-components';

import Dropdown from './dropdown';

const InputWrapper = styled.input`
    grid-column: 2 / 3;
    grid-row: 1 / 2;
    width: 55px;
    min-width: ${(props) => props.value !== '' || props.value.length > 0 ? '200px' : 'max-content'};
    max-width: 200px;
    margin-left: 7px;
    height: 30px;

    -webkit-transition: width 0.4s ease;
    transition: width 0.4s ease;

    &:focus{
        outline: none !important;
        outline-offset: none !important;
        width: 200px;
    }
`;

export default class Search extends Component {
  constructor() {
    super();

    this.state = {
      matchedData: [],
      value: '',
      showDropdown: false
    };
  }

  static propTypes = {
    placeholder: PropTypes.string,
    exactSearch: PropTypes.bool,
    onChange: PropTypes.func,
    class: PropTypes.string,
    searchKey: PropTypes.string
  };

  static defaultProps = {
    placeholder: 'Search...',
    data: [],
    exactSearch: false,
    class: ''
  };

  handleChange(e) {
    if (e.target.value.trim()) {
      let matchedData = this.getValueByKey(e.target.value.trim(), this.props.data);

      this.setState({
        matchedData,
        value: e.target.value,
        showDropdown: true
      });
    } else {
      this.setState({
        value: e.target.value,
        showDropdown: false
      });
    }
  }

  getValueByKey(key, array) {
    if (this.props.exactSearch) {
      return this.exactSearchQuery(key, array);
    }

    return this.fuzzySearchQuery(key, array);
  }

  exactSearchQuery(key, array) {
    let _this = this;

    return _filter(array, { [`${_this.props.searchKey}`]: key });
  }

  fuzzySearchQuery(key, array) {
    let _this = this;

    return _filter(array, (item) => {
      let searchableItem = item[`${_this.props.searchKey}`].toString();
      if (searchableItem.indexOf(key) !== -1) {
        return searchableItem;
      }
    });
  }

  handleSetValue(value) {
    this.setState({
      value: value.target.innerText,
      showDropdown: false
    }, () => {
      if (this.props.onChange) {
        this.props.onChange(this.state.value);
      }
    });
  }

  render() {
    return (
      <div
        className={ classNames({
          search: true,
          [this.props.class]: !this.props.class ? false : true
        }) }
      >
        <div className="search__input">
          <InputWrapper
            type="text"
            className={ classNames({
              input: true,
              'input--show-dropdown': this.state.showDropdown
            }) }
            placeholder={ this.props.placeholder }
            onChange={ this.handleChange.bind(this) }
            value={ this.state.value }
          />
        </div>
        <div className="search__dropdown">
          <Dropdown
            data={ this.state.matchedData }
            onClick={ this.handleSetValue.bind(this) }
            show={ this.state.showDropdown }
            searchKey={ this.props.searchKey }
          />
        </div>
      </div>
    );
  }
}
