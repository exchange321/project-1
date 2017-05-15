/**
 * Created by Wayuki on 24-Mar-17.
 */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { routerActions } from 'react-router-redux';
import toastr from 'toastr';

import SpellSuggestion from './SpellSuggestion.jsx';
import * as searchPageActions from '../../../actions/searchPageActions';

import { setCaretToPos, checkOverflown } from '../../../../../helpers';
import { ElementForUserOnly } from '../../../auth';

@connect(
  (
    {
      searchPage: {
        query,
        words,
        results,
        spelling,
      },
      appPage: {
        stage,
      },
    }
   ) => ({
    query,
    words,
    spelling,
    numResults: results.length,
    idle: stage === 1,
  }),
  dispatch => ({
    actions: bindActionCreators(searchPageActions, dispatch),
    routerActions: bindActionCreators(routerActions, dispatch),
  })
)
@ElementForUserOnly
class SearchBar extends Component {
  static propTypes = {
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
    query: PropTypes.string.isRequired,
    words: PropTypes.arrayOf(PropTypes.element).isRequired,
    numResults: PropTypes.number.isRequired,
    idle: PropTypes.bool.isRequired,
    spelling: PropTypes.shape({
      show: PropTypes.bool.isRequired,
      wordPos: PropTypes.number.isRequired,
      pos: PropTypes.number.isRequired,
      suggestions: PropTypes.arrayOf(PropTypes.shape({
        word: PropTypes.string.isRequired,
      })).isRequired,
    }).isRequired,
    actions: PropTypes.shape({
      handleQueryChange: PropTypes.func.isRequired,
      handleQuerySubmit: PropTypes.func.isRequired,
      registerSpellingSuggestions: PropTypes.func.isRequired,
      registerCaretPosition: PropTypes.func.isRequired,
      handleInputBoxFocus: PropTypes.func.isRequired,
      handleApplyingSuggestion: PropTypes.func.isRequired,
    }).isRequired,
    routerActions: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
  };

  constructor(props) {
    super(props);
    this.caretScanTimer = null;
  }

  componentDidMount() {
    this.input.focus();
  }

  handleQueryChange = (e) => {
    const { value } = e.target;
    this.props.actions.handleQueryChange(value);
  };

  handleQuerySubmit = (e) => {
    e.preventDefault();
    const {
      location: {
        pathname,
      },
      actions: {
        handleQueryChange,
        handleQuerySubmit,
      },
      routerActions: {
        push,
      },
    } = this.props;
    $('#search-bar-query').addClass("progress-bar-striped progress-bar-animated searching").prop('disabled', 'disabled');
    $('.btn-search-submit').addClass("progress-bar-striped progress-bar-animated searching").prop('disabled', 'disabled');
    handleQuerySubmit().then(() => {
      $('#search-bar-query').removeClass("progress-bar-striped progress-bar-animated searching").prop('disabled', '');
      $('.btn-search-submit').removeClass("progress-bar-striped progress-bar-animated searching").prop('disabled', '');
      $('.search-bar-outer').blur().children().blur();
      if (pathname !== '/') {
        push('/');
      }
    }).catch((err) => {
      $('#search-bar-query').removeClass("progress-bar-striped progress-bar-animated searching").prop('disabled', '');
      $('.btn-search-submit').removeClass("progress-bar-striped progress-bar-animated searching").prop('disabled', '');
      handleQueryChange("");
      toastr.error(err.message);
    });
  };

  handleInputBoxFocus = () => {
    if (this.caretScanTimer === null) {
      this.caretScanTimer = setInterval(() => {
        if (!checkOverflown(this.wordContainer)) {
          this.props.actions.handleInputBoxFocus(this.input.selectionStart);
        } else {
          this.props.actions.registerSpellingSuggestions({
            show: false,
          });
        }
      }, 100);
    }
  };

  handleInputBoxBlur = () => {
    if (this.caretScanTimer !== null) {
      clearInterval(this.caretScanTimer);
      this.caretScanTimer = null;
    }
    this.props.actions.registerCaretPosition(-1);
  };

  handleSearchBarBlur = (e) => {
    const currentTarget = e.currentTarget;
    setTimeout(() => {
      if (!currentTarget.contains(document.activeElement)) {
        this.props.actions.registerSpellingSuggestions({
          show: false,
        });
      }
    }, 0);
  };

  handleSuggestionClick = (wordPos, word) => {
    this.props.actions.handleApplyingSuggestion(wordPos, word).then((caretPosition) => {
      this.input.focus();
      setCaretToPos(this.input, caretPosition);
    });
  };

  render() {
    const {
      query,
      words,
      numResults,
      idle,
      spelling: {
        show,
        wordPos,
        pos,
        suggestions,
      },
      location,
    } = this.props;
    return (
      <div className={`search-bar-container ${(numResults > 0 || location.pathname !== '/') ? 'has-results' : ''}`}>
        <div className="search-bar container">
          <form
            className={`search-bar-form ${idle ? 'idle' : ''}`}
            onSubmit={this.handleQuerySubmit}
          >
            <div className="search-bar-inner input-group">
              <span className="input-group-addon">How to</span>
              <div
                className="search-bar-outer"
                onBlur={this.handleSearchBarBlur}
                ref={searchBar => this.searchBar = searchBar}
              >
                <input
                  type="text"
                  id="search-bar-query"
                  className="form-control"
                  value={query}
                  autoComplete="off"
                  spellCheck="true"
                  ref={input => this.input = input}
                  onChange={this.handleQueryChange}
                  onFocus={this.handleInputBoxFocus}
                  onBlur={this.handleInputBoxBlur}
                />
                <div className="words-container">
                  <div
                    className="words"
                    ref={wordContainer => this.wordContainer = wordContainer}
                  >
                    { words }
                  </div>
                </div>
                {
                  show ? <SpellSuggestion wordPos={wordPos} pos={pos} suggestions={suggestions} onSuggestionClick={this.handleSuggestionClick} /> : null
                }
              </div>
              <span className="input-group-btn">
                  <button type="submit" className="btn btn-secondary btn-search-submit"><i className="fa fa-search" /> Search</button>
              </span>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default SearchBar;
