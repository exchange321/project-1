import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { routerActions } from 'react-router-redux';

import * as historyPageActions from '../../actions/historyPageActions';

import ListResult from '../common/ListResult.jsx';

import app from '../../feathers';

@connect(
  ({
     historyPage,
     auth: {
       user: {
         _id: userId,
       },
     },
   }) => ({
    userId,
    ...historyPage,
  }),
  dispatch => ({
    actions: bindActionCreators(historyPageActions, dispatch),
    routerActions: bindActionCreators(routerActions, dispatch),
  }),
)
class HistoryPage extends Component {
  static propTypes = {
    userId: PropTypes.string.isRequired,
    histories: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      thumbnail: PropTypes.string.isRequired,
      videoId: PropTypes.string.isRequired,
    })).isRequired,
    actions: PropTypes.shape({
      registerHistory: PropTypes.func.isRequired,
    }).isRequired,
    routerActions: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
  };

  componentDidMount() {
    const {
      userId,
      actions: {
        registerHistory,
      },
    } = this.props;
    if (!this.histories && userId) {
      this.histories = app.service('histories').find({
        query: {
          userId,
          $sort: {
            createdAt: -1,
          },
        },
        rx: {
          listStrategy: 'always',
        },
      }).subscribe(({ data: histories }) => registerHistory(histories));
    }
  }

  componentWillUnmount() {
    if (this.histories) {
      this.histories.unsubscribe();
    }
  }

  handleHistoryClick = (videoId) => {
    this.props.routerActions.push(`/watch?v=${videoId}`);
  };

  render() {
    const { histories } = this.props;
    return (
      <div className="histories-container page container clearfix">
        {
          histories.map((favorite, key) => (
            <ListResult
              key={key}
              className={`clear-${key % 2}`}
              { ...favorite }
              handleResultClick={this.handleHistoryClick}
            />
          ))
        }
      </div>
    );
  }
}

export default HistoryPage;
