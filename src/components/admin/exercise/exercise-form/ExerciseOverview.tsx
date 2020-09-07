import React from 'react';
import { QuestionList } from '../../../models/models';
import './ExerciseOverview.scss';

interface ExerciseOverviewProps {
  questionList: QuestionList,
}

const ExerciseOverview = ({ questionList }: ExerciseOverviewProps): JSX.Element => {
  return (
    <div className="exercise-container">
      {
        Object.keys(questionList).map((answer: string) => (
          <div className="exercise-container__question-card" key={answer}>
            <p className="exercise-container__question">
              <span className="bold">Question: </span>{questionList[answer]}
            </p>
            <p className="exercise-container__question">
              <span className="bold">Answer: </span>{answer}
            </p>
          </div>
        ))
      }
    </div>
  )
}

export default ExerciseOverview;
