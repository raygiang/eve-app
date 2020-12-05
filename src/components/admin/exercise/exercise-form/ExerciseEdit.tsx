import React from 'react';
import { Question, QuestionList } from '../../../models/models';
import './ExerciseEdit.scss';

interface ExerciseEditProps {
  questionList: QuestionList,
  setQuestionList: Function,
}

const ExerciseEdit = ({questionList, setQuestionList}: ExerciseEditProps): JSX.Element => {

  const updateQuestionList = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void => {
    const newList = questionList.map(exerciseObj => Object.assign({}, exerciseObj));
    const [field, index]: string[] = e.target.id.split('-');

    if (field && index){
      const exerciseObj = newList[parseInt(index)];
      const newValue = e.target.value;

      if (field === 'answer') {
        exerciseObj.answer = newValue;
      }

      if (field === 'question') {
        exerciseObj.question = newValue;
      }

      setQuestionList(newList);
    }
  }

  return (
    <>
      {
        questionList.map(({answer, question}: Question, index): JSX.Element => (

          <div key={index} className="exercise-container__form-row">
            <label htmlFor={answer}>Answer: </label>
            <input
              id={`answer-${index}`}
              onChange={updateQuestionList}
              className={"exercise-container__field"}
              value={answer || "<! No answer provided !>"}
            />
            <label htmlFor={`${answer}-answer`}>Question: </label>
            <textarea
              id={`question-${index}`}
              onChange={updateQuestionList}
              className={"exercise-container__field"}
              value={question || "<! No question provided !>"}
            />
          </div>
        ))
      }
    </>
  )
}

export default ExerciseEdit;
