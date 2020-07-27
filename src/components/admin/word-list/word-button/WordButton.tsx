import React from 'react';
import { Flipped } from "react-flip-toolkit";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import './WordButton.scss';

interface WordButtonProps {
  word: string,
  setFocusedId: React.Dispatch<React.SetStateAction<string | null>>,
}

const WordButton = ({ word, setFocusedId }: WordButtonProps): JSX.Element => {
  return (
    <Flipped
      flipId={`word-${word}`}
      // stagger="card"
    >
      <div className="button-container">
        <Flipped inverseFlipId={`word-${word}`}>
          <button
            className={word ? 'button-container__word-button' : 'button-container__add-button'}
            onClick={() => setFocusedId(word)}
          >
            { word || <><FontAwesomeIcon icon={faPlusCircle} /> Add a Word</> }
          </button>
        </Flipped>
      </div>
    </Flipped>
  )
}

export default WordButton;
