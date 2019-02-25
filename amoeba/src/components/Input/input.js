import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './input.css';

class Input extends Component {
  static propTypes = {
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
    type: PropTypes.string,
    value: PropTypes.string,
  };

  static defaultProps = {
    disabled: false,
    onChange: () => {},
    placeholder: 'Enter node name',
    type: 'text',
    value: '',
  };

  _getClassNames = () => {
    const { className } = this.props;
    return classNames('Input', {
      [className]: className,
    });
  }

  handleChange = (e) => {
    this.props.onChange(e.target.value);
  }

  render() {
    const { disabled, placeholder, type, value } = this.props;
    
    return (
      <input
        className={this._getClassNames()}
        disabled={disabled}
        onChange={this.handleChange}
        placeholder={placeholder}
        type={type}
        value={value}
        {...this.props}
      />
    );
  }
}

export default Input;
