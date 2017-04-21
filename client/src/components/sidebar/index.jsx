/**
 * Created by Wayuki on 26-Mar-17.
 */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { routerActions } from 'react-router-redux';
import toastr from 'toastr';

import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

import * as authActions from '../../actions/authActions';
import * as sidebarActions from '../../actions/sidebarActions';

import { ElementForUserOnly } from '../../auth';

@connect(
  ({ sidebar }) => ({
    ...sidebar,
  }),
  dispatch => ({
    actions: bindActionCreators(sidebarActions, dispatch),
    authActions: bindActionCreators(authActions, dispatch),
    routerActions: bindActionCreators(routerActions, dispatch),
  }),
)
@ElementForUserOnly
class Sidebar extends Component {
  static propTypes = {
    open: PropTypes.bool.isRequired,
    actions: PropTypes.shape({
      toggle: PropTypes.func.isRequired,
      set: PropTypes.func.isRequired,
    }).isRequired,
    authActions: PropTypes.shape({
      logout: PropTypes.func.isRequired,
    }).isRequired,
    routerActions: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
  };

  handleRedirect = (to = '/', loggingout = false) => {
    const {
      actions: {
        set,
      },
      authActions: {
        logout,
      },
      routerActions: {
        push,
      },
    } = this.props;
    set(false);
    if (loggingout) {
      logout().then(() => {
        toastr.success('You have been logged out.');
        push(to);
      }).catch(() => {
        toastr.error('Error occurs when logging out. Please try again.');
      });
    } else {
      push(to);
    }
  };

  render() {
    const { open, actions: { toggle, set }}  = this.props;
    return (
      <div className="sidebar">
        <button className="btn btn-secondary btn-toggle" onClick={toggle}>
          <i className="fa fa-bars" aria-hidden="true" />
        </button>
        <Drawer
          docked={false}
          width={200}
          open={open}
          onRequestChange={open => set(open)}
        >
          <MenuItem
            onClick={e => this.handleRedirect()}
            rightIcon={(
              <i className="fa fa-search" aria-hidden="true" />
            )}
          >
            Search
          </MenuItem>
          <MenuItem
            onClick={e => this.handleRedirect()}
            rightIcon={<i className="fa fa-history" aria-hidden="true" />}
            disabled
          >
            History
          </MenuItem>
          <MenuItem
            onClick={e => this.handleRedirect('/favorite')}
            rightIcon={<i className="fa fa-heart" aria-hidden="true" />}
          >
            Favorite
          </MenuItem>
          <MenuItem
            onClick={e => this.handleRedirect('/login', true)}
            rightIcon={<i className="fa fa-sign-out" aria-hidden="true" />}
          >
            Logout
          </MenuItem>
        </Drawer>
      </div>
    );
  }
}

export default Sidebar;
