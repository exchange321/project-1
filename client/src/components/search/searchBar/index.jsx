/**
 * Created by Wayuki on 24-Mar-17.
 */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as searchPageActions from '../../../actions/searchPageActions';

@connect(
  ({ searchPage: { query, results } }) => ({
    query,
    numResults: results.length,
  }),
  dispatch => ({
    actions: bindActionCreators(searchPageActions, dispatch),
  })
)
class SearchBar extends Component {
  static propTypes = {
    query: PropTypes.string.isRequired,
    numResults: PropTypes.number.isRequired,
    actions: PropTypes.shape({
      handleQueryChange: PropTypes.func.isRequired,
    }).isRequired,
  };

  componentDidMount() {
    $('#search-bar-query').focus();
  }

  handleQueryChange = (e) => {
    const { value } = e.target;
    this.props.actions.handleQueryChange(value);
  };

  render() {
    const {
      query,
      numResults,
      location,
    } = this.props;
    return (
      <div className={`search-bar-container ${(numResults > 0 || location.pathname !== '/') ? 'has-results' : ''}`}>
          <div className="search-bar container">
            <form>
              <div className="search-bar-inner input-group">
                <span className="input-group-addon">How to</span>
                <input
                  type="text"
                  id="search-bar-query"
                  className="form-control"
                  value={query}
                  onChange={this.handleQueryChange}
                />
                <span className="input-group-btn">
                  <button type="submit" className="btn btn-secondary"><i className="fa fa-search" /></button>
                </span>
              </div>
            </form>
          </div>
      </div>
    );
  }
}

export default SearchBar;
