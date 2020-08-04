import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { isEqual } from 'lodash';
import { isLoaded, useFirestoreConnect } from 'react-redux-firebase';
import { CollectionNames, FilterDates } from '../../models/models';
import Loading from '../../general/loading/Loading';
import GuideList from './guide-list/GuideList';
import MonthPicker from '../../general/MonthPicker/MonthPicker';
import './WeeklyStudyGuides.scss';

const WeeklyStudyGuides = (): JSX.Element => {
  const today = new Date();
  const [refDates, setRefDates] = useState<FilterDates>({ startDate: today, endDate: today });

  useFirestoreConnect([
    {
      collection: CollectionNames.StudyGuides,
      startAt: refDates.startDate,
      endAt: refDates.endDate,
      orderBy: ['startDate', 'asc'],
      storeAs: CollectionNames.StudyGuides },
  ]);

  const studyGuides = useSelector(({ firestore: { ordered } }: any) => ordered[CollectionNames.StudyGuides], isEqual);

  if(!isLoaded(studyGuides)) return <Loading />;

  const filterResults = (refDates: FilterDates): void => {
    setRefDates(refDates);
  }

  return (
    <section className="study-guides-admin">
      <div className="study-guides-admin__wrapper page-wrapper">
        <h1 className="study-guides-admin__heading">Weekly Study Guides</h1>
        <p className="study-guides-admin__description">
          This is the interface for editing groups inside of a subcategory.
        </p>
        <div className="study-guides-admin__add-container">
          <Link to="/admin-dashboard/add-study-guide" className="study-guides-admin__add-link">
            Add New Study Guide
          </Link>
        </div>
        <MonthPicker filterFunction={filterResults} />
        <GuideList studyGuides={studyGuides} />
      </div>
    </section>
  )
}

export default WeeklyStudyGuides;
