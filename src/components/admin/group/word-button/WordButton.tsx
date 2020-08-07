import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import './WordButton.scss';

interface WordButtonProps {
  word: string,
  selectedWord: string | null,
  setSelectedWord: React.Dispatch<React.SetStateAction<string | null>>,
}

const WordButton = ({ word, selectedWord, setSelectedWord }: WordButtonProps): JSX.Element => {
  return (
    <button
      className={word ? 'word-button--word' : 'word-button--add'}
      disabled={selectedWord === word}
      onClick={() => setSelectedWord(word)}
    >
      { word || <><FontAwesomeIcon icon={faPlusCircle} /> Add a Word</> }
    </button>
  )
}

export default WordButton;
