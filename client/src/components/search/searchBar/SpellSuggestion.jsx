import React, { PropTypes, Component } from 'react'

class SpellSuggestion extends Component {
  static propTypes = {
    wordPos: PropTypes.number.isRequired,
    pos: PropTypes.number.isRequired,
    suggestions: PropTypes.arrayOf(PropTypes.shape({
      word: PropTypes.string.isRequired,
    }).isRequired).isRequired,
    onSuggestionClick: PropTypes.func.isRequired,
  };

  render() {
    const {
      wordPos,
      pos,
      suggestions,
      onSuggestionClick,
    } = this.props;
    return (
      <div className="spell-suggestion list-group" style={{
        left: pos,
      }}>
        {
          suggestions.map(({ word, emoji }, key) => (
            <button
              key={key}
              type="button"
              className="list-group-item list-group-item-action"
              onClick={e => onSuggestionClick(wordPos, word)}
            >
              { word }
              {
                emoji ? (
                  <span className="emoji">{ emoji }</span>
                ) : null
              }
            </button>
          ))
        }
      </div>
    );
  }
}

export default SpellSuggestion;
