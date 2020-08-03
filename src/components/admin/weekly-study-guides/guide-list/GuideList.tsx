import React from 'react';
import './GuideList.scss';
import { StudyGuide } from '../../../models/models';

interface GuideListProps {
  studyGuides: StudyGuide[],
}

const GuideList = ({ studyGuides }: GuideListProps): JSX.Element => {
  return (
    <div className="guide-list-admin">
      <h2 className="guide-list__heading">Guide List</h2>
      {
        studyGuides.map((guide: StudyGuide): JSX.Element => (
          <h3 key={guide.id}>
            { guide.startDate.toDate().toLocaleDateString() } to { guide.endDate.toDate().toLocaleDateString() }
          </h3>
        ))
      }
    </div>
  )
}

export default GuideList;
