import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { isEqual } from 'lodash';
import { isLoaded, useFirestoreConnect } from 'react-redux-firebase';
import Loading from '../../general/loading/Loading';
import WordList from './list-container/WordList';
import ExerciseList from './exercise-list/ExerciseList';
import './Group.scss';

interface ParamsProps {
  subcategoryId: string,
  groupId: string,
}

interface GroupProps {
  match: {
    isExact: boolean,
    params: ParamsProps,
    path: string,
    url: string,
  }
}

const Group = ({ match }: GroupProps): JSX.Element => {
  const [successMessage, setSuccessMessage] = useState<string>('');
  const subcategoryId = match.params.subcategoryId;
  const groupId = match.params.groupId;

  useFirestoreConnect([
    { collection: 'subcategories', doc: subcategoryId, storeAs: 'subcategories' },
    { collection: 'subcategories', doc: subcategoryId, storeAs: 'groups',
      subcollections: [{ collection: 'groups', doc: groupId }]
    },
    { collection: 'subcategories', doc: subcategoryId, storeAs: 'exercises',
      subcollections: [{ collection: 'groups', doc: groupId,
        subcollections: [{ collection: 'exercises', orderBy: ['createdAt', 'asc'] }]
      }]
    }
  ]);

  const parentCategory = useSelector(({ firestore: { data } }: any) => data['subcategories'], isEqual);
  const group = useSelector(({ firestore: { data } }: any) => data['groups'], isEqual);
  const exercises = useSelector(({ firestore: { ordered } }: any) => ordered['exercises'], isEqual);
  
  if(!isLoaded(parentCategory) || !isLoaded(group) || group[groupId] || !isLoaded(exercises)) return <Loading />;
  
  if(!parentCategory || !group) {
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
            Back to {parentCategory.name}
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
