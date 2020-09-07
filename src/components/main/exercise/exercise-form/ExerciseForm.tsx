import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { QuestionList } from '../../../models/models';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGrinBeam, faFrownOpen } from '@fortawesome/free-regular-svg-icons';
import './ExerciseForm.scss';

interface ExerciseFormProps {
  exerciseId: string,
  shuffledWords: string[],
  questions: QuestionList,
}

const ExerciseForm = ({ exerciseId, shuffledWords, questions}: ExerciseFormProps): JSX.Element => {
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [result, setResult] = useState<number | null>(null);
  const [resultArray, setResultArray] = useState<boolean[]>([]);
  const { register, handleSubmit, errors, reset } = useForm();

  const onSubmit = (data: any) : void => {
    setSubmitting(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    let correctCounter = 0;
    const newResultArray: boolean[] = []

    shuffledWords.forEach((word: string, index: number) => {
      const submittedAnswer = data[`field-${index}`];
      if(questions[submittedAnswer] === questions[word]) {
        correctCounter++;
        newResultArray[index] = true;
      }
      else {
        newResultArray[index] = false;
      }
    });

    const score = Math.round(correctCounter * 100 / shuffledWords.length);
    setResult(score);
    setResultArray(newResultArray);
  }

  const renderOptions = (): JSX.Element[] => (
    Object.keys(questions).map((word: string): JSX.Element => (
      <option key={word} value={word}>{word}</option>
    ))
  )

  const restartExercise = (): void => {
    setSubmitting(false);
    setResult(null);
    setResultArray([]);
    reset();
  }

  const getResultClass = (index: number): string => {
    if(resultArray.length) {
      return resultArray[index] ? 'correct' : 'incorrect';
    }
    else {
      return '';
    }
  }

  const getResultMessage = (index: number): JSX.Element => {
    if(resultArray[index]) {
      return (
        <>
          <FontAwesomeIcon icon={faGrinBeam} /> Congratulations, you got the this question correct!
        </>
      )
    }
    return (
      <>
        <FontAwesomeIcon icon={faFrownOpen} /> Sorry, the answer you chose was incorrect.
      </>
    )
  }

  return (
    <form key={exerciseId} className="exercise-form-main" onSubmit={handleSubmit(onSubmit)}>
      <h2>Questions:</h2>
      { result !== null && 
          <div className="exercise-form-main__result">
            <div className="exercise-form-main__result-image" style={{ backgroundImage: `url(${result > 50 ? '/images/exercise-success.svg' : '/images/exercise-fail.svg'})` }} />
            <div className="exercise-form-main__result-content">
              <p>Your score: <span className={result > 50 ? 'green' : 'red'}>{ result }%</span></p>
              <button type="button" className="exercise-form-main__restart-button" onClick={restartExercise}>
                Restart
              </button>
            </div>
          </div>
      }
      <div className="exercise-form-main__form-body">
        {
          shuffledWords.map((word: string, index: number) => (
            <div key={index} className={`exercise-form-main__form-row ${getResultClass(index)}`}>
              <div className="exercise-form-main__field-container">
                <label htmlFor={`field-${index}`}>{ (index + 1) + '. ' + questions[word] }</label>
                <select
                  name={`field-${index}`}
                  id={`field-${index}`}
                  className="exercise-form-main__select-field"
                  defaultValue=""
                  ref={register({ required: 'Please choose a word.' })}
                >
                  <option value="" disabled>Select a Word</option>
                  { renderOptions() }
                </select>
              </div>
              { errors[`field-${index}`] && <p className="exercise-form-main__error error">{ errors[`field-${index}`].message }</p> }
              {
                resultArray.length
                  ? <p className="exercise-form-main__result-message">{ getResultMessage(index) }</p>
                  : <></>
              }
            </div>
          ))
        }
      </div>
      <div className="exercise-form-main__button-row">
        <button
          type="button"
          className="exercise-form-main__reset"
          onClick={reset}
          disabled={submitting}
        >
          Reset
        </button>
        <button
          type="submit"
          className="exercise-form-main__submit"
          disabled={submitting}
        >
          Submit
        </button>
      </div>
    </form>
  )
}

export default ExerciseForm;
