import React, { useState } from 'react';
import { StudyGuide } from '../../../models/models';
import GuideCard from '../guide-card/GuideCard';
import './GuideList.scss';

interface GuideListProps {
  studyGuides: StudyGuide[],
}

const GuideList = ({ studyGuides }: GuideListProps): JSX.Element => {
  const [successMessage, setSuccessMessage] = useState<string>('');

  const renderGuides = (): JSX.Element[] => {
    return studyGuides.map((guide: StudyGuide): JSX.Element => (
      <li key={guide.id} className="guide-list-admin__item">
        <GuideCard guide={guide} setSuccessMessage={setSuccessMessage} />
      </li>
    ));
  }

  return (
    <div className="guide-list-admin">
      <h2 className="guide-list-admin__heading">Study Guide List</h2>
      { successMessage && <p className="guide-list-admin__success-message success">{ successMessage }</p>}
      {
        studyGuides.length
          ? <ul className="guide-list-admin__list">
              { renderGuides() }
            </ul>
          : <p>There are no study guides starting in the selected month.</p>
      }
    </div>
  )
}

export default GuideList;
