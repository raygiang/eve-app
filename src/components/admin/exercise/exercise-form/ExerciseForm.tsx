import React, { useState, useRef } from 'react';
import { CollectionNames, Exercise, QuestionList } from '../../../models/models';
import { useForm } from 'react-hook-form';
import firebase from '../../../../config/firebaseConfig';
import './ExerciseForm.scss';
import ExerciseOverview from './ExerciseOverview';

interface ExerciseFormProps {
  exercise: Exercise,
  subcategoryId: string,
  groupId: string,
  exerciseId: string,
}

const ExerciseForm = ({ exercise, subcategoryId, groupId, exerciseId }: ExerciseFormProps): JSX.Element => {
  const answerList = useRef<null | Map<string, string>>(null);
  const [questionList, setQuestionList] = useState<QuestionList>(exercise.questions);
  const [currentUpload, setCurrentUpload] = useState<string>('No file uploaded yet');
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string>('');
  const { register, handleSubmit, errors, reset } = useForm();
  const exerciseCollection = firebase.firestore().collection(CollectionNames.Subcategories).doc(subcategoryId)
    .collection(CollectionNames.Groups).doc(groupId).collection(CollectionNames.Exercises).doc(exerciseId);
  
  const updateExercise = () : void => {
    setSubmitting(true);

    if(!Object.keys(questionList).length) {
      setSuccessMessage('');
      setSubmitError('Save Failed. The exercise is empty.');
      setSubmitting(false);
      return;
    }

    exerciseCollection.update({ questions: questionList }).then((): void => {
      setSuccessMessage('Exercise has been saved.');
      setSubmitError('');
      setSubmitting(false);
      setCurrentUpload('No file uploaded yet');
      reset();
    }).catch((error: { message: string }): void => {
      setSuccessMessage('');
      setSubmitError(error.message);
      setSubmitting(false);
    });
    setSubmitting(false);
  }

  const parseRow = (row: Element): QuestionList => {
    const questionElement = row.querySelector('.LeftItem');
    const answerElement = row.querySelector('.RightItem select');
    let questionId = answerElement ? answerElement.id : '';
    questionId = questionId.substring(questionId.indexOf('_') + 1, questionId.length);
    const fullQuestion = questionElement?.textContent;
    const trimmedQuestion = fullQuestion?.substring((parseInt(questionId) + 1).toString().length + 2, fullQuestion.length);

    if(!answerList.current) {
      const answerMap = new Map<string, string>();
      const possibleAnswers = answerElement?.querySelectorAll('option');
      possibleAnswers?.forEach((answer: any): void => {
        answerMap.set(answer.value, answer.innerHTML);
      })
      answerList.current = answerMap;
    }

    const answer: any = answerList.current.get(questionId);

    return { [answer]: trimmedQuestion }
  }

  const onSubmit = (data: any): void => {
    data['exercise-file'][0].text().then((res: any) => {
      const exerciseHtml = document.createElement("html");
      exerciseHtml.innerHTML = res;
      const questionRows = exerciseHtml.querySelectorAll('#Questions tr');

      if(!questionRows.length) {
        setSuccessMessage('');
        setSubmitError('Error parsing file. Please ensure you uploaded the correct file.');
        return;
      }

      let exerciseList: QuestionList = {};

      questionRows.forEach((row: Element) => {
        exerciseList = { ...exerciseList, ...parseRow(row) };
      });

      setQuestionList(exerciseList);

      answerList.current = null;
    });
  }

  const updateFileName = (e: any): void => {
    if(e.target.files && e.target.files[0]) setCurrentUpload(e.target.files[0].name);
  }

  return (
    <div className="exercise-content">
      <div className="exercise-content__form-container">
        <h2>Upload Form</h2>
        <form onChange={updateFileName} className="exercise-content__form" onSubmit={handleSubmit(onSubmit)}>
          <p>{ currentUpload }</p>
          <input className="hidden" type="file" id="exercise-file" name="exercise-file" disabled={submitting} ref={register({ required: 'Please select a file first.' })} />
          { errors['exercise-file'] && <p className="exercise-content__error error">{ errors['exercise-file'].message }</p> }
          <div className="exercise-content__button-container">
            <label className="exercise-content__upload-button" htmlFor="exercise-file">Upload an Exported htm</label>
            <button className="exercise-content__form-submit" type="submit" disabled={submitting}>Preview Exercise</button>
            <button className="exercise-content__save-button" type="button" disabled={submitting} onClick={updateExercise}>Save Exercise</button>
          </div>
        </form>
      </div>
      { successMessage && <p className="exercise-content__success success">{ successMessage }</p> }
      { submitError && <p className="exercise-content__error error">{ submitError }</p> }
      <div className="exercise-content__preview-container">
        <h2>Exercise Preview</h2>
        {
          Object.keys(questionList).length
            ? <ExerciseOverview questionList={questionList} />
            : <p>This exercise is currently empty.</p>
        }
      </div>
    </div>
  )
}

export default ExerciseForm;
