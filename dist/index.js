(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react', 'prop-types', 'lodash/filter', 'classnames', 'styled-components', './dropdown'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'), require('prop-types'), require('lodash/filter'), require('classnames'), require('styled-components'), require('./dropdown'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react, global.propTypes, global.filter, global.classnames, global.styledComponents, global.dropdown);
    global.index = mod.exports;
  }
})(this, function (exports, _react, _propTypes, _filter3, _classnames, _styledComponents, _dropdown) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react2 = _interopRequireDefault(_react);

  var _propTypes2 = _interopRequireDefault(_propTypes);

  var _filter4 = _interopRequireDefault(_filter3);

  var _classnames2 = _interopRequireDefault(_classnames);

  var _styledComponents2 = _interopRequireDefault(_styledComponents);

  var _dropdown2 = _interopRequireDefault(_dropdown);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  var _templateObject = _taggedTemplateLiteral(['\n    grid-column: 2 / 3;\n    grid-row: 1 / 2;\n    width: 55px;\n    min-width: ', ';\n    max-width: 200px;\n    margin-left: 7px;\n    height: 30px;\n\n    -webkit-transition: width 0.4s ease;\n    transition: width 0.4s ease;\n\n    &:focus{\n        outline: none !important;\n        outline-offset: none !important;\n        width: 200px;\n    }\n'], ['\n    grid-column: 2 / 3;\n    grid-row: 1 / 2;\n    width: 55px;\n    min-width: ', ';\n    max-width: 200px;\n    margin-left: 7px;\n    height: 30px;\n\n    -webkit-transition: width 0.4s ease;\n    transition: width 0.4s ease;\n\n    &:focus{\n        outline: none !important;\n        outline-offset: none !important;\n        width: 200px;\n    }\n']);

  function _taggedTemplateLiteral(strings, raw) {
    return Object.freeze(Object.defineProperties(strings, {
      raw: {
        value: Object.freeze(raw)
      }
    }));
  }

  var InputWrapper = _styledComponents2.default.input(_templateObject, function (props) {
    return props.value !== '' || props.value.length > 0 ? '200px' : 'max-content';
  });

  var Search = function (_Component) {
    _inherits(Search, _Component);

    function Search() {
      _classCallCheck(this, Search);

      var _this2 = _possibleConstructorReturn(this, (Search.__proto__ || Object.getPrototypeOf(Search)).call(this));

      _this2.state = {
        matchedData: [],
        value: '',
        showDropdown: false
      };
      return _this2;
    }

    _createClass(Search, [{
      key: 'handleChange',
      value: function handleChange(e) {
        if (e.target.value.trim()) {
          var matchedData = this.getValueByKey(e.target.value.trim(), this.props.data);

          this.setState({
            matchedData: matchedData,
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
    }, {
      key: 'getValueByKey',
      value: function getValueByKey(key, array) {
        if (this.props.exactSearch) {
          return this.exactSearchQuery(key, array);
        }

        return this.fuzzySearchQuery(key, array);
      }
    }, {
      key: 'exactSearchQuery',
      value: function exactSearchQuery(key, array) {
        var _this = this;

        return (0, _filter4.default)(array, _defineProperty({}, '' + _this.props.searchKey, key));
      }
    }, {
      key: 'fuzzySearchQuery',
      value: function fuzzySearchQuery(key, array) {
        var _this = this;

        return (0, _filter4.default)(array, function (item) {
          var searchableItem = item['' + _this.props.searchKey].toString();
          if (searchableItem.indexOf(key) !== -1) {
            return searchableItem;
          }
        });
      }
    }, {
      key: 'handleSetValue',
      value: function handleSetValue(value) {
        var _this3 = this;

        this.setState({
          value: value.target.innerText,
          showDropdown: false
        }, function () {
          if (_this3.props.onChange) {
            _this3.props.onChange(_this3.state.value);
          }
        });
      }
    }, {
      key: 'render',
      value: function render() {
        return _react2.default.createElement(
          'div',
          {
            className: (0, _classnames2.default)(_defineProperty({
              search: true
            }, this.props.class, !this.props.class ? false : true))
          },
          _react2.default.createElement(
            'div',
            { className: 'search__input' },
            _react2.default.createElement(InputWrapper, {
              type: 'text',
              placeholder: this.props.placeholder,
              onChange: this.handleChange.bind(this),
              value: this.state.value
            })
          ),
          _react2.default.createElement(
            'div',
            { className: 'search__dropdown' },
            _react2.default.createElement(_dropdown2.default, {
              data: this.state.matchedData,
              onClick: this.handleSetValue.bind(this),
              show: this.state.showDropdown,
              searchKey: this.props.searchKey
            })
          )
        );
      }
    }]);

    return Search;
  }(_react.Component);

  Search.propTypes = {
    placeholder: _propTypes2.default.string,
    exactSearch: _propTypes2.default.bool,
    onChange: _propTypes2.default.func,
    class: _propTypes2.default.string,
    searchKey: _propTypes2.default.string
  };
  Search.defaultProps = {
    placeholder: 'Search...',
    data: [],
    exactSearch: false,
    class: ''
  };
  exports.default = Search;
});