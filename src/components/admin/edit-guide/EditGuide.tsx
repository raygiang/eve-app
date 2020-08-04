import React from 'react';
import { Link } from 'react-router-dom';
import { MatchProps } from '../../models/models';
import { useSelector } from 'react-redux';
import { isEqual } from 'lodash';
import { isLoaded, useFirestoreConnect } from 'react-redux-firebase';
import Loading from '../../general/loading/Loading';
import GuideForm from '../general/guide-form/GuideForm';
import './EditGuide.scss';

interface EditGuideProps {
  match: MatchProps,
}

const EditGuide = ({ match }: EditGuideProps): JSX.Element => {
  const guideId = match.params.guideId;

  useFirestoreConnect([
    { collection: 'weekly-study-guides', doc: guideId, storeAs: guideId },
  ]);

  const guide = useSelector(({ firestore: { data } }: any) => data[guideId], isEqual);

  if(!isLoaded(guide)) return <Loading />;

  if(!guide) {
    return (
      <section className="edit-guide">
        <div className="edit-guide__wrapper page-wrapper">
          <div className="edit-guide__header">
            <h1 className="edit-guide__heading">
              Weekly Study Guide Not Found
            </h1>
            <Link to="/admin-dashboard/weekly-study-guides">Back to Weekly Study Guides</Link>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="edit-guide">
      <div className="edit-guide__wrapper page-wrapper">
        <div className="edit-guide__header">
          <h1 className="edit-guide__heading">Edit a Weekly Study Guide</h1>
          <Link to="/admin-dashboard/weekly-study-guides">Back to Weekly Study Guides</Link>
        </div>
        <p className="edit-guide__description">
          This is the interface for editing your weekly study guides.
        </p>
        <GuideForm guideId={guideId} guide={guide} />
      </div>
    </section>
  )
}

export default EditGuide;
