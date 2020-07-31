import React from 'react';
import { Link } from 'react-router-dom';
import { isLoaded, useFirestoreConnect } from 'react-redux-firebase';
import { MatchProps } from '../../admin/models/models';
import { useSelector } from 'react-redux';
import { shuffle, isEqual } from 'lodash';
import Loading from '../../general/loading/Loading';
import ExerciseForm from './exercise-form/ExerciseForm';

interface ExerciseProps {
  match: MatchProps,
}

const Exercise = ({ match }: ExerciseProps): JSX.Element => {
  const subcategoryId = match.params.subcategoryId;
  const groupId = match.params.groupId;
  const exerciseId = match.params.exerciseId;

  useFirestoreConnect([
    { collection: 'subcategories', doc: subcategoryId, storeAs: exerciseId,
      subcollections: [{ collection: 'groups', doc: groupId,
        subcollections: [{ collection: 'exercises', doc: exerciseId }]
      }]
    }
  ]);

  const exercise = useSelector(({ firestore: { data } }: any) => data[exerciseId], isEqual);
  
  if(!isLoaded(exercise)) return <Loading />;

  const shuffledWords = shuffle(Object.keys(exercise.questions));

  return (
    <section className="group">
      <div className="group__wrapper page-wrapper">
        <div className="group__header">
          <h1 className="group__heading">
            Viewing Exercise
          </h1>
          <Link to={`/group/${subcategoryId}/${groupId}`}>
            Back to Group
          </Link>
        </div>
        <p className="exercise__description">
          Please select the words that best complete the following sentences.
        </p>
        <ExerciseForm exerciseId={exerciseId} shuffledWords={shuffledWords} questions={exercise.questions} />
      </div>
    </section>
  )
}

export default Exercise;
