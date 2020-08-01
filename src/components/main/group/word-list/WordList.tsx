import React, { useState } from 'react';
import { WordList as WordInfoProps } from '../../../models/models';
import './WordList.scss';
import FocusedWord from '../focused-word/FocusedWord';

interface WordListProps {
  wordInfo: WordInfoProps,
  wordList: string[],
}

const WordList = ({ wordInfo, wordList }: WordListProps): JSX.Element => {
  const [focusedWord, setFocusedWord] = useState<string | null>(null);

  const renderWordList = (): JSX.Element[] => {
    return wordList.map((word: string): JSX.Element => (
      <li key={word} className="word-list-main__word">
        <button
          className="word-list-main__word-card"
          onClick={() => setFocusedWord(word)}
          disabled={focusedWord === word}
        >
          { word }
        </button>
      </li>
    ));
  }

  return (
    <div className="word-list-main">
      <h2 className="word-list-main__heading">Word List</h2>
      <ul className="word-list-main__list">
        { renderWordList() }
      </ul>
      { focusedWord && <FocusedWord word={focusedWord} wordInfo={wordInfo} /> }
    </div>
  )
}

export default WordList;
