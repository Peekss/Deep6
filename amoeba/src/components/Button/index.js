import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './button.css';

class Button extends Component {
  static propTypes = {
    cta: PropTypes.oneOf(['primary', 'secondary']),
    disabled: PropTypes.bool,
    icon: PropTypes.object,
    onClick: PropTypes.func,
    value: PropTypes.string,
  };

  static defaultProps = {
    cta: 'primary',
    disabled: false,
    icon: null,
    onClick: () => {},
    value: '',
  };

  state = {
    hovered: false,
  };

  _getClassNames = () => {
    const { cta } = this.props;
    return classNames('Button', {
      ['Button--primary']: cta === 'primary',
      ['Button--secondary']: cta === 'secondary',
      ['Button--danger']: cta === 'danger'
    });
  }

  render() {
    const { value, icon, onClick } = this.props;

    return (
      <button
        className={this._getClassNames()}
        onMouseOver={() => this.setState({ hovered: true })}
        onMouseOut={() => this.setState({ hovered: false })}
        onClick={onClick}
        {...this.props}
      >
        {icon && <div className="Button__icon">{icon}</div>}
        <div className="Button__value">{value}</div>
      </button>
    );
  }
}

export default Button;