import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { QuestionList } from '../../../admin/models/models';

interface ExerciseFormProps {
  exerciseId: string,
  shuffledWords: string[],
  questions: QuestionList,
}

const ExerciseForm = ({ exerciseId, shuffledWords, questions}: ExerciseFormProps): JSX.Element => {
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [result, setResult] = useState<string>('');
  const { register, handleSubmit, errors, reset } = useForm();

  const onSubmit = (data: any) : void => {
    setSubmitting(true);
    let correctCounter = 0;

    shuffledWords.forEach((word: string, index: number) => {
      const submittedAnswer = data[`field-${index}`];
      if(questions[submittedAnswer] === data[`question-${index}`]) correctCounter++;
    });

    const score = Math.round(correctCounter * 100 / shuffledWords.length);
    setResult(`Your score: ${score}%`);
  }

  const renderOptions = (): JSX.Element[] => (
    Object.keys(questions).map((word: string): JSX.Element => (
      <option key={word} value={word}>{word}</option>
    ))
  )

  return (
    <form key={exerciseId} className="exercise-form-main" onSubmit={handleSubmit(onSubmit)}>
      <h2>Questions:</h2>
      { result && <div className="exercise-form-main__result">{ result }</div> }
      {
        shuffledWords.map((word: string, index: number) => (
          <div key={index} className="exercise-form-main__form-row">
            <div className="exercise-form-main__field-container">
              <label htmlFor={`field-${index}`}>{ questions[word] }</label>
              <input type="hidden" name={`question-${index}`} value={ questions[word] } ref={register} />
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
          </div>
        ))
      }
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
