import React, { useState } from 'react';
import { CollectionNames, WordList, Exercise } from '../../../models/models';
import { useForm } from 'react-hook-form';
import { pickBy } from 'lodash';
import firebase from '../../../../config/firebaseConfig';
import './ExerciseForm.scss';

interface ExerciseFormProps {
  words: WordList,
  exercise: Exercise,
  subcategoryId: string,
  groupId: string,
  exerciseId: string,
}

const ExerciseForm = ({ words, exercise, subcategoryId, groupId, exerciseId }: ExerciseFormProps): JSX.Element => {
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string>('');
  const { register, handleSubmit, errors, reset } = useForm();
  const sortedWords = Object.keys(words).sort();
  const exerciseCollection = firebase.firestore().collection(CollectionNames.Subcategories).doc(subcategoryId)
    .collection(CollectionNames.Groups).doc(groupId).collection(CollectionNames.Exercises).doc(exerciseId);

  const renderFormRows = (): JSX.Element[] => {
    return sortedWords.map((word: string): JSX.Element => (
      <div key={word} className="exercise-form__form-row">
        <h3 className="exercise-form__row-heading">
          <span className="exercise-form__highlight">{word}</span>
        </h3>
        <div className="exercise-form__row-content">
          <label className="exercise-form__label" htmlFor={word}>Question: </label>
          <input
            id={word}
            name={word}
            className={`exercise-form__field ${errors[word] ? 'error' : ''}`}
            type="text"
            ref={register}
            defaultValue={exercise.questions[word] || ''}
          />
        </div>
      </div>
    ));
  }
  
  const onSubmit = (data: any) : void => {
    setSubmitting(true);
    const newExercises = pickBy(data, (value: string) => {
      return value.trim().length;
    });
    Object.keys(newExercises).forEach((word: string) => {
      if((newExercises[word].toLowerCase().includes(word))) {
        newExercises[word] = newExercises[word].replace(word, '_________');
      }
    });
    exerciseCollection.update({ questions: newExercises }).then((): void => {
      setSuccessMessage('Exercise has been saved.');
      setSubmitError('');
      setSubmitting(false);
    }).catch((error: { message: string }): void => {
      setSuccessMessage('');
      setSubmitError(error.message);
      setSubmitting(false);
    });
    reset();
    setSubmitting(false);
  }

  return (
    <form key={exerciseId} className="exercise-form" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="exercise-form__heading">Exercise Questions</h2>
      {
        sortedWords.length
          ? <>
              { renderFormRows() }
              { submitError && <p className="exercise-form__error error">{ submitError }</p> }
              { successMessage && <p className="exercise-form__success-message success">{ successMessage }</p> }
              <div className="exercise-form__submit-row">
                <button type="submit" disabled={submitting}>Save Exercise</button>
              </div>
            </>
          : <p>Please add words to this group first.</p>
      }
    </form>
  )
}

export default ExerciseForm;
