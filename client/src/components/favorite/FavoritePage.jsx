import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { routerActions } from 'react-router-redux';

import * as favoritePageActions from '../../actions/favoritePageActions';

import ListResult from '../common/ListResult.jsx';

import app from '../../feathers';

@connect(
  ({
    favoritePage,
    auth: {
      user: {
        _id: userId,
      },
    },
  }) => ({
    userId,
    ...favoritePage,
  }),
  dispatch => ({
    actions: bindActionCreators(favoritePageActions, dispatch),
    routerActions: bindActionCreators(routerActions, dispatch),
  }),
)
class FavoritePage extends Component {
  static propTypes = {
    userId: PropTypes.string.isRequired,
    favorites: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      thumbnail: PropTypes.string.isRequired,
      videoId: PropTypes.string.isRequired,
    })).isRequired,
    actions: PropTypes.shape({
      registerFavorite: PropTypes.func.isRequired,
    }).isRequired,
    routerActions: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
  };

  componentDidMount() {
    const {
      userId,
      actions: {
        registerFavorite,
      },
    } = this.props;
    if (!this.favorites && userId) {
      this.favorites = app.service('favorites').find({
        query: {
          userId,
          $select: ['videoId', 'title', 'description', 'thumbnail'],
        },
        rx: {
          listStrategy: 'always',
        },
      }).subscribe(({ data: favorites }) => registerFavorite(favorites));
    }
  }

  componentWillUnmount() {
    if (this.favorites) {
      this.favorites.unsubscribe();
    }
  }

  handleFavoriteClick = (videoId) => {
    this.props.routerActions.push(`/watch?v=${videoId}`);
  };

  render() {
    const { favorites } = this.props;
    return (
      <div className="favorites-container page container clearfix">
        {
          favorites.map((favorite, key) => (
            <ListResult
              key={key}
              className={`clear-${key % 2}`}
              { ...favorite }
              handleResultClick={this.handleFavoriteClick}
            />
          ))
        }
      </div>
    );
  }
}

export default FavoritePage;
