import React from 'react';
import { QuestionList, Question } from '../../../models/models';
import './ExerciseOverview.scss';

interface ExerciseOverviewProps {
  questionList: QuestionList,
}

const ExerciseOverview = ({ questionList }: ExerciseOverviewProps): JSX.Element => {
  return (
    <div className="exercise-container">
      {
        questionList.map((questionObj: Question, index: number) => (
          <div className="exercise-container__question-card" key={index}>
            <p className="exercise-container__question">
              <span className="bold">Question: </span>{questionObj.question}
            </p>
            <p className="exercise-container__question">
              <span className="bold">Answer: </span>{questionObj.answer}
            </p>
          </div>
        ))
      }
    </div>
  )
}

export default ExerciseOverview;
