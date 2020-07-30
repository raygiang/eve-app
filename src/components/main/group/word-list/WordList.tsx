import React, { useState } from 'react';
import { WordList as WordInfoProps } from '../../../admin/models/models';
import { Flipper, Flipped } from "react-flip-toolkit";
import './WordList.scss';
import FocusedWord from '../focused-word/FocusedWord';

interface WordListProps {
  wordInfo: WordInfoProps,
  wordList: string[],
}

const WordList = ({ wordInfo, wordList }: WordListProps): JSX.Element => {
  const [focusedWord, setFocusedWord] = useState<string | null>(null);

  const renderWordList = (): JSX.Element[] => {
    return wordList.reduce((result: JSX.Element[], word: string): JSX.Element[] => {
      if(word !== focusedWord) {
        result.push(
          <Flipped key={word} flipId={`word-${word}`}>
            <li className="word-list-main__word">
              <Flipped inverseFlipId={`word-${word}`}>
                <button
                  className="word-list-main__word-card"
                  onClick={() => setFocusedWord(word)}
                  disabled={focusedWord === word}
                >
                  {word}
                </button>
              </Flipped>
            </li>
          </Flipped>
        )
      }
      return result;
    }, []);
  }

  return (
    <Flipper
      flipKey={focusedWord}
      className="word-list-main"
      spring="verygentle"
    >
      <h2 className="word-list-main__heading">Word List</h2>
      {
        focusedWord
          ? <FocusedWord word={focusedWord} wordInfo={wordInfo} />
          : <></>
      }
      <ul className="word-list-main__list">
        { renderWordList() }
      </ul>
    </Flipper>
  )
}

export default WordList;
