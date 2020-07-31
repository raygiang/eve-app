import React, { useState } from 'react';
import { WordList as WordInfoProps } from '../../../admin/models/models';
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
      {
        focusedWord && wordInfo[focusedWord].customDefinition
          ? <p className="word-list-main__custom-definition">Definition: { wordInfo[focusedWord].customDefinition }</p>
          : <></>
      }
      {
        focusedWord && wordInfo[focusedWord].dictionaryUrl
          ? <div className="word-list-main__dictionary-link-container">
              <a href={wordInfo[focusedWord].dictionaryUrl}>Dictionary Link</a>
            </div>
          : <></>
      }
      {
        focusedWord
          ? <FocusedWord word={focusedWord} wordInfo={wordInfo} />
          : <></>
      }
    </div>
  )
}

export default WordList;
