/**
 * Created by Wayuki on 24-Mar-17.
 */
import React, { PropTypes } from 'react';

import VideoPlayback from './videoPlayback/index.jsx';
import VideoNotes from './videoNotes/index.jsx';

import AccordionCard from '../common/AccordionCard.jsx';

const VideoPage = () => (
  <div className="video">
    <VideoPlayback />
    <div id="video-accordion" role="tablist" aria-multiselectable="true">
      <div className="container">
        <div className="cards">
          <AccordionCard
            parentId="video-accordion"
            headingId="video-description-accordion-heading"
            collapseId="video-description-accordion-collapse"
            headingText="Description"
            isDefault={true}
          >
            <div className="video-info">
              <div className="video-title">
                <h1>I am Title</h1>
              </div>
              <div className="video-description">
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A aliquam delectus dignissimos, earum esse et eum explicabo facilis harum itaque iure magni mollitia necessitatibus obcaecati officia omnis porro possimus provident quas vel! Accusantium ad aperiam assumenda autem consectetur earum error eveniet facilis, fugit in laudantium magnam maiores molestias natus, nisi odit optio pariatur perferendis porro praesentium provident quibusdam quo ratione repellat reprehenderit repudiandae saepe sed similique suscipit tempore tenetur voluptatum!</p>
              </div>
            </div>
          </AccordionCard>
          <AccordionCard
            parentId="video-accordion"
            headingId="video-notes-accordion-heading"
            collapseId="video-notes-accordion-collapse"
            headingText="Notes"
            isDefault={false}
          >
            <VideoNotes />
          </AccordionCard>
        </div>
      </div>
    </div>
    {/*<div id="video-accordion" role="tablist" aria-multiselectable="true">*/}
      {/*<div className="container">*/}
        {/*<div className="card">*/}
          {/*<div className="card-header" role="tab" id="video-notes-accordion-heading">*/}
            {/*<h5 className="mb-0">*/}
              {/*<a*/}
                {/*data-toggle="collapse"*/}
                {/*data-parent="#video-accordion"*/}
                {/*href="#video-notes-accordion-collapse"*/}
                {/*aria-expanded="true"*/}
                {/*aria-controls="#video-notes-accordion-collapse"*/}
              {/*>*/}
                {/*Notes*/}
              {/*</a>*/}
            {/*</h5>*/}
          {/*</div>*/}
          {/*<div*/}
            {/*id="video-notes-accordion-heading"*/}
            {/*className="collapse"*/}
            {/*role="tabpanel"*/}
            {/*aria-labelledby="video-notes-accordion-heading"*/}
          {/*>*/}
            {/*<div className="card-block">*/}
              {/*<VideoNotes />*/}
            {/*</div>*/}
          {/*</div>*/}
        {/*</div>*/}
      {/*</div>*/}
    {/*</div>*/}
  </div>
);

VideoPage.propTypes = {};

export default VideoPage;
