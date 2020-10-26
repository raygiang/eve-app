import React from 'react';
import { Link } from 'react-router-dom';
import { isLoaded, useFirestoreConnect } from 'react-redux-firebase';
import { CollectionNames, MatchProps } from '../../models/models';
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
    { collection: CollectionNames.Subcategories, doc: subcategoryId, storeAs: exerciseId,
      subcollections: [{ collection: CollectionNames.Groups, doc: groupId,
        subcollections: [{ collection: CollectionNames.Exercises, doc: exerciseId }]
      }]
    }
  ]);

  const exercise = useSelector(({ firestore: { data } }: any) => data[exerciseId], isEqual);
  
  if(!isLoaded(exercise)) return <Loading />;

  const shuffledWords = shuffle(Object.keys(exercise.questions).map(index => parseInt(index)));

  return (
    <section className="group">
      <div className="group__wrapper page-wrapper">
        <div className="group__header">
          <h1 className="group__heading">
            Exercise
          </h1>
          <Link to={`/group/${subcategoryId}/${groupId}`}>
            Back to Group
          </Link>
        </div>
        <p className="exercise__description">
          Please select the words that best complete the following sentences.
        </p>
        {
          shuffledWords.length
            ? <ExerciseForm exerciseId={exerciseId} shuffledWords={shuffledWords} questions={exercise.questions} />
            : <p>No questions have been added to this exercise yet.</p>
        }
      </div>
    </section>
  )
}

export default Exercise;
