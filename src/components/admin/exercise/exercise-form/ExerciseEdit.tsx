import React from 'react';
import { Question, QuestionList } from '../../../models/models';
import './ExerciseEdit.scss';

interface ExerciseEditProps {
  questionList: QuestionList,
  setQuestionList: Function,
}

const ExerciseEdit = ({questionList, setQuestionList}: ExerciseEditProps): JSX.Element => {

  const updateQuestionList = (e: any, index: number, changeAnswer: boolean = true): void => {
    const newList = [...questionList];
    const field = changeAnswer ? 'answer' : 'question';

    newList[index][field] = e.target.value;
    setQuestionList(newList);
  }

  return (
    <>
      {
        questionList.map(({answer, question}: Question, index): JSX.Element => (

          <div key={index} className="exercise-container__form-row">
            <label htmlFor={answer}>Answer: </label>
            <input
              id={answer}
              onChange={e => updateQuestionList(e, index)}
              className={"exercise-container__field"}
              value={answer || "<! No answer provided !>"}
            />
            <label htmlFor={`${answer}-answer`}>Question: </label>
            <textarea
              id={`${answer}-answer`}
              onChange={e => updateQuestionList(e, index, false)}
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
