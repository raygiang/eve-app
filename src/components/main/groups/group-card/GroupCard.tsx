import React from 'react';
import { Link } from 'react-router-dom';
import { Group } from '../../../models/models';
import './GroupCard.scss';

interface GroupCardProps {
  number: number,
  subcategoryId: string,
  group: Group,
}

const GroupCard = ({ number, subcategoryId, group }: GroupCardProps) => {
  const wordList = Object.keys(group.words).sort();

  const renderWords = (): JSX.Element[] => {
    return wordList.map((word: string): JSX.Element => (
      <li key={word} className="group-card-main__word">{word}</li>
    ));
  }

  return (
    <Link to={`/group/${subcategoryId}/${group.id}`} className="group-card-main">
      <h2 className="group-card-main__heading">
        Group {number}
      </h2>
      {
        wordList.length
          ? <ul className="group-card-main__word-list">
              { renderWords() }
            </ul>
          : <p>No words have been added to this list yet.</p>
      }
    </Link>
  )
}

export default GroupCard;
