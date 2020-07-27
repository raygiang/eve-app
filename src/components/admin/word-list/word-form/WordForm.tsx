import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Flipped } from 'react-flip-toolkit';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { WordList } from '../../models/models';
import './WordForm.scss';
import DeleteButton from '../../general/delete-button/DeleteButton';

interface WordFormProps {
  word: string,
  setFocusedId: React.Dispatch<React.SetStateAction<string | null>>,
  wordList: WordList,
}

const WordForm = ({ word, setFocusedId, wordList }: WordFormProps): JSX.Element => {
  const [submitting, setSubmitting] = useState<boolean>(false);
  // const [submitError, setSubmitError] = useState<string>('');
  const { register, handleSubmit, errors, reset } = useForm();

  const onSubmit = (data: any) : void => {
    setSubmitting(true);
    console.log(data);
    setSubmitting(false);
  }

  const deleteWord = () => {

  }

  return (
    <Flipped flipId={`word-${word}`}>
      <div className="word-form">
        <Flipped inverseFlipId={`word-${word}`}>
          <form key={word} className="word-form__form" onSubmit={handleSubmit(onSubmit)}>
            <div className="word-form__close-container">
              <button type="button" disabled={submitting} onClick={() => {setFocusedId(null)}}>
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
            <div className="word-form__field-row">
              <label htmlFor="name">Word: </label>
              <input
                id="word"
                name="word"
                className={`word-form__field ${errors.word ? 'error' : ''}`}
                type="text"
                ref={register({ required: 'Please enter a word.' })}
                defaultValue={word}
              />
            </div>
            { errors.word && <p className="word-form__error error">{ errors.word.message }</p> }
            <div className="word-form__field-row">
              <label htmlFor="custom-definition">Custom Definition: </label>
              <textarea
                id="custom-definition"
                name="custom-definition"
                className={`word-form__field ${errors['custom-definition'] ? 'error' : ''}`}
                ref={register()}
                defaultValue={wordList[word] && wordList[word].customDefinition}
              />
            </div>
            <div className="word-form__field-row">
              <label htmlFor="dictionary-url">Dictionary URL: </label>
              <input
                id="dictionary-url"
                name="dictionary-url"
                className={`word-form__field ${errors['dictionary-url'] ? 'error' : ''}`}
                type="text"
                ref={register()}
                defaultValue={wordList[word] && wordList[word].dictionaryUrl}
              />
            </div>
            <div className="word-form__submit-row">
              <button className="word-form__save-button" type="submit">
                { word ? 'Save' : 'Add' }
              </button>
              { word && <DeleteButton disabled={submitting} deleteFunction={deleteWord} text="Delete" /> }
            </div>
          </form>
        </Flipped>
      </div>
    </Flipped>
  )
}

export default WordForm;
