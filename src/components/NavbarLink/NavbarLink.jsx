import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '../../helpers/WithStyles';

class NavbarLink extends Component {
  render() {
    const { href, target, onClick, children, className } = this.props;
    return (
      <li className="nav-item">
        <a
          className={`${className} nav-link NavbarLink`}
          href={href}
          target={target}
          onClick={onClick}
        >
          {children}
        </a>
      </li>
    );
  }
}

NavbarLink.propTypes = {
  /**
   * Url to redirect on intem click. Default `"#"`
   */
  href: PropTypes.string,
  /**
   * Link target. Default `""`
   */
  target: PropTypes.string,
  /**
   * Called when link is clicked
   */
  onClick: PropTypes.func,
  /**
   * Elements show into the NavbarLink
   */
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  /**
   * Class of the component. Default `""`
   */
  className: PropTypes.string
};
NavbarLink.defaultProps = {
  href: '#',
  target: '',
  onClick: () => {},
  children: null,
  className: ''
};

export default withStyles(NavbarLink);
