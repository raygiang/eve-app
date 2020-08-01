import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { isEqual } from 'lodash';
import { isLoaded, useFirestoreConnect } from 'react-redux-firebase';
import { MatchProps } from '../../models/models';
import Loading from '../../general/loading/Loading';
import ExerciseForm from './exercise-form/ExerciseForm';
import './Exercise.scss';

interface ExerciseProps {
  match: MatchProps,
}

const Exercise = ({ match }: ExerciseProps): JSX.Element => {
  const subcategoryId = match.params.subcategoryId;
  const groupId = match.params.groupId;
  const exerciseId = match.params.exerciseId;

  useFirestoreConnect([
    { collection: 'subcategories', doc: subcategoryId, storeAs: groupId,
      subcollections: [{ collection: 'groups', doc: groupId }]
    },
    { collection: 'subcategories', doc: subcategoryId, storeAs: exerciseId,
      subcollections: [{ collection: 'groups', doc: groupId,
        subcollections: [{ collection: 'exercises', doc: exerciseId }]
      }]
    }
  ]);

  const group = useSelector(({ firestore: { data } }: any) => data[groupId], isEqual);
  const exercise = useSelector(({ firestore: { data } }: any) => data[exerciseId], isEqual);
  
  if(!isLoaded(group) || !isLoaded(exercise)) return <Loading />;

  if(!group || !exercise) {
    return (
      <section className="exercise-admin">
        <div className="exercise-admin__wrapper page-wrapper">
          <div className="exercise-admin__header">
            <h1 className="exercise-admin__heading">
              Group Not Found
            </h1>
            <Link to="/admin-dashboard/word-categories">Back to Top Level Categories</Link>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="exercise-admin">
      <div className="exercise-admin__wrapper page-wrapper">
        <div className="exercise-admin__header">
          <h1 className="exercise-admin__heading">
            Editing Exercise
          </h1>
          <Link to={`/admin-dashboard/group/${subcategoryId}/${groupId}`}>
            Back to Group
          </Link>
        </div>
        <p className="exercise-admin__description">
          This is the interface for editing an exercise inside of a group.
          Questions left blank will not appear in the exercise.
          The order of the questions will be randomized.
        </p>
        <ExerciseForm
          words={group.words}
          exercise={exercise}
          subcategoryId={subcategoryId}
          groupId={groupId}
          exerciseId={exerciseId}
        />
      </div>
    </section>
  )
}

export default Exercise;
