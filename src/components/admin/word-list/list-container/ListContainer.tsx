import React, { useState } from 'react';
import { Flipper } from "react-flip-toolkit";
import { WordList } from '../../models/models';
import WordButton from '../word-button/WordButton';
import WordForm from '../word-form/WordForm';
import './ListContainer.scss';

interface ListContainerProps {
  words: WordList,
  setSuccessMessage: React.Dispatch<React.SetStateAction<string>>,
}

const ListContainer = ({ words, setSuccessMessage }: ListContainerProps): JSX.Element => {
  const [focusedId, setFocusedId] = useState<string | null>(null);
  const wordList = [...Object.keys(words), ''];

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
      className="list-container"
      spring="verygentle"
    >
      <h2>Word List</h2>
      { focusedId !== null && <WordForm word={focusedId} setFocusedId={setFocusedId} wordList={words} /> }
      <ul className="list-container__list">
        { renderWordList() }
      </ul>
    </Flipper>
  )
}

export default ListContainer;
