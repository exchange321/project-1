/**
 * Created by Wayuki on 26-Mar-17.
 */
import React, { PropTypes } from 'react';

const AccordionCard = ({ parentId, headingId, collapseId, headingText, isDefault, children }) => (
  <div className="card">
    <div className="card-header" role="tab" id={headingId}>
      <h5 className="mb-0">
        <a
          data-toggle="collapse"
          data-parent={`#${parentId}`}
          href={`#${collapseId}`}
          aria-expanded="true"
          aria-controls={collapseId}
          className="text-white"
        >
          { headingText }
        </a>
      </h5>
    </div>

    <div id={collapseId} className={`collapse ${isDefault ? 'show' : ''}`} role="tabpanel" aria-labelledby={headingId}>
      <div className="card-block">
        { children }
      </div>
    </div>
  </div>
);

AccordionCard.propTypes = {
  parentId: PropTypes.string.isRequired,
  headingId: PropTypes.string.isRequired,
  collapseId: PropTypes.string.isRequired,
  headingText: PropTypes.string.isRequired,
  isDefault: PropTypes.bool.isRequired,
  children: PropTypes.element.isRequired,
};

export default AccordionCard;
