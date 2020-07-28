import React, { useState } from 'react';
import { Flipper } from "react-flip-toolkit";
import { WordList as WordListInterface } from '../../models/models';
import WordButton from '../word-button/WordButton';
import WordForm from '../word-form/WordForm';
import './WordList.scss';

interface WordListProps {
  words: WordListInterface,
  setSuccessMessage: React.Dispatch<React.SetStateAction<string>>,
  subcategoryId: string,
  groupId: string,
}

const WordList = ({ words, setSuccessMessage, subcategoryId, groupId }: WordListProps): JSX.Element => {
  const [focusedId, setFocusedId] = useState<string | null>(null);
  const wordList = [...Object.keys(words).sort(), ''];

  const renderWordList = (): JSX.Element[] => {
    return wordList.reduce((result: JSX.Element[], word: string, index: number) => {
      if(focusedId !== word) {
        result.push(
          <li key={index}>
            <WordButton
              word={word}
              setFocusedId={setFocusedId}
            />
          </li>
        )
      }
      return result;
    }, []);
  }

  return (
    <Flipper
      flipKey={focusedId}
      className="word-list"
      spring="verygentle"
    >
      <h2 className="word-list__heading">Word List</h2>
      {
        focusedId !== null && 
          <WordForm
            word={focusedId}
            setFocusedId={setFocusedId}
            wordList={words}
            setSuccessMessage={setSuccessMessage}
            subcategoryId={subcategoryId}
            groupId={groupId}
          />
      }
      <ul className="word-list__list">
        { renderWordList() }
      </ul>
    </Flipper>
  )
}

export default WordList;
