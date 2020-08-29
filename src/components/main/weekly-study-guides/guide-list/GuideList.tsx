import React from 'react';
import { StudyGuide } from '../../../models/models';
import { Link } from 'react-router-dom';
import moment from 'moment';
import './GuideList.scss';

interface GuideListProps {
  studyGuides: StudyGuide[],
}

const GuideList = ({ studyGuides }: GuideListProps): JSX.Element => {
  const renderGuides = (): JSX.Element[] => {
    return studyGuides.map((guide: StudyGuide): JSX.Element => {
      const formattedStartDate = moment(guide.startDate.toDate()).format('MMMM Do, YYYY');
      const formattedEndDate = moment(guide.endDate.toDate()).format('MMMM Do, YYYY');

      return (
        <li key={guide.id} className="guide-list__item">
          <Link className="guide-list__card-link" to={`/weekly-study-guide/${guide.id}`}>
            <h3 className="guide-list__heading">
              { `${formattedStartDate} - ${formattedEndDate}` }
            </h3>
          </Link>
        </li>
      )
    });
  }

  return (
    <div className="guide-list">
      <h2 className="guide-list__heading">Study Guide List</h2>
      {
        studyGuides.length
          ? <ul className="guide-list__list">
              { renderGuides() }
            </ul>
          : <p>There are no study guides starting in the selected month.</p>
      }
    </div>
  )
}

export default GuideList;
