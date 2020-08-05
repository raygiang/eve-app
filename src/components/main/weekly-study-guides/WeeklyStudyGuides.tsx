import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { isEqual } from 'lodash';
import { isLoaded, useFirestoreConnect } from 'react-redux-firebase';
import { CollectionNames, FilterDates } from '../../models/models';
import Loading from '../../general/loading/Loading';
import MonthPicker from '../../general/MonthPicker/MonthPicker';
import './WeeklyStudyGuides.scss';
import GuideList from './guide-list/GuideList';

const WeeklyStudyGuides = (): JSX.Element => {
  const today = new Date();
  const [refDates, setRefDates] = useState<FilterDates>({ startDate: today, endDate: today });

  useFirestoreConnect([
    {
      collection: CollectionNames.StudyGuides,
      startAt: refDates.startDate,
      endAt: refDates.endDate,
      orderBy: ['startDate', 'asc'],
      storeAs: CollectionNames.StudyGuides
    },
  ]);

  const studyGuides = useSelector(({ firestore: { ordered } }: any) => ordered[CollectionNames.StudyGuides], isEqual);

  if(!isLoaded(studyGuides)) return <Loading />;

  const filterResults = (refDates: FilterDates): void => {
    setRefDates(refDates);
  }

  return (
    <section className="study-guides">
      <div className="study-guides__wrapper page-wrapper">
        <h1 className="study-guides__heading">Weekly Study Guides</h1>
        <p className="study-guides-admin__description">
          Please select a month to view weekly study guides that start in that month.
        </p>
        <MonthPicker filterFunction={filterResults} />
        <GuideList studyGuides={studyGuides} />
      </div>
    </section>
  )
}

export default WeeklyStudyGuides;
