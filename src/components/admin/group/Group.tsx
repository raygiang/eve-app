import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { isEqual } from 'lodash';
import { isLoaded, useFirestoreConnect } from 'react-redux-firebase';
import { MatchProps } from '../../models/models';
import Loading from '../../general/loading/Loading';
import WordList from './list-container/WordList';
import ExerciseList from './exercise-list/ExerciseList';
import './Group.scss';

interface GroupProps {
  match: MatchProps,
}

const Group = ({ match }: GroupProps): JSX.Element => {
  const [successMessage, setSuccessMessage] = useState<string>('');
  const subcategoryId = match.params.subcategoryId;
  const groupId = match.params.groupId;

  useFirestoreConnect([
    { collection: 'subcategories', doc: subcategoryId, storeAs: subcategoryId },
    { collection: 'subcategories', doc: subcategoryId, storeAs: groupId,
      subcollections: [{ collection: 'groups', doc: groupId }]
    },
    { collection: 'subcategories', doc: subcategoryId, storeAs: `exercises-${groupId}`,
      subcollections: [{ collection: 'groups', doc: groupId,
        subcollections: [{ collection: 'exercises', orderBy: ['createdAt', 'asc'] }]
      }]
    }
  ]);

  const subcategory = useSelector(({ firestore: { data } }: any) => data[subcategoryId], isEqual);
  const group = useSelector(({ firestore: { data } }: any) => data[groupId], isEqual);
  const exercises = useSelector(({ firestore: { ordered } }: any) => ordered[`exercises-${groupId}`], isEqual);

  if(!isLoaded(subcategory) || !isLoaded(group) || !isLoaded(exercises)) return <Loading />;

  if(!subcategory || !group) {
    return (
      <section className="group-admin">
        <div className="group-admin__wrapper page-wrapper">
          <div className="group-admin__header">
            <h1 className="group-admin__heading">
              Group Not Found
            </h1>
            <Link to="/admin-dashboard/word-categories">Back to Top Level Categories</Link>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="group-admin">
      <div className="group-admin__wrapper page-wrapper">
        <div className="group-admin__header">
          <h1 className="group-admin__heading">
            Editing Group
          </h1>
          <Link to={`/admin-dashboard/groups/${subcategoryId}`}>
            Back to {subcategory.name}
          </Link>
        </div>
        <p className="group-admin__description">This is the interface for editing a group inside of a subcategory.</p>
        { successMessage && <p className="group-admin__success-message success">{ successMessage }</p> }
        <WordList
          words={group.words}
          setSuccessMessage={setSuccessMessage}
          subcategoryId={subcategoryId}
          groupId={groupId}
        />
        <ExerciseList
          exercises={exercises}
          setSuccessMessage={setSuccessMessage}
          subcategoryId={subcategoryId}
          groupId={groupId}
        />
      </div>
    </section>
  )
}

export default Group;
