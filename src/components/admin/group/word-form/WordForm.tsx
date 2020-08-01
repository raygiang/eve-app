import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Flipped } from 'react-flip-toolkit';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { WordList } from '../../../models/models';
import DeleteButton from '../../general/delete-button/DeleteButton';
import firebase from '../../../../config/firebaseConfig';
import './WordForm.scss';

interface WordFormProps {
  word: string,
  setFocusedId: React.Dispatch<React.SetStateAction<string | null>>,
  wordList: WordList,
  setSuccessMessage: React.Dispatch<React.SetStateAction<string>>,
  subcategoryId: string,
  groupId: string,
}

const WordForm = ({ word, setFocusedId, wordList, setSuccessMessage, subcategoryId, groupId }: WordFormProps): JSX.Element => {
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string>('');
  const { register, handleSubmit, errors } = useForm();
  const groupCollection = firebase.firestore().collection('subcategories').doc(subcategoryId).collection('groups').doc(groupId);

  const updateGroupCollection = (data: any, newWord: string, wordListCopy: WordList, successMessage: string): void => {
    wordListCopy[newWord] = {
      customDefinition: data['custom-definition'],
      dictionaryUrl: data['dictionary-url'],
    };
    groupCollection.update({ words: wordListCopy }).then((): void => {
      setSuccessMessage(successMessage);
      setSubmitting(false);
      setFocusedId(null);
    }).catch((error: { message: string }): void => {
      setSuccessMessage('');
      setSubmitError(error.message);
      setSubmitting(false);
    });
  }

  const onSubmit = (data: any) : void => {
    setSubmitting(true);
    const wordListCopy = { ...wordList }
    const newWord = data.word.toLowerCase().trim();

    // Updating an existing word
    if(word === newWord) {
      updateGroupCollection(data, newWord, wordListCopy, `Updated word: ${newWord}`);
    }
    else {
      // If new word already exists
      if(wordListCopy[newWord]) {
        setSuccessMessage('');
        setSubmitError('That word already exists in this list.');
        setSubmitting(false);
        return;
      }

      // Replacing an existing word
      if(word && word !== newWord) {
        delete wordListCopy[word];
        updateGroupCollection(data, newWord, wordListCopy, `${word} removed, ${newWord} added`);
      }
      // Adding a completely new word
      else {
        updateGroupCollection(data, newWord, wordListCopy, `Added new word: ${newWord}`);
      }
    }
  }

  const deleteWord = () => {
    if(word) {
      setSubmitting(true);
      const wordListCopy = { ...wordList }
      delete wordListCopy[word];
      groupCollection.update({ words: wordListCopy }).then((): void => {
        setSuccessMessage(`Word deleted: ${word}`);
        setSubmitting(false);
        setFocusedId(null);
      }).catch((error: { message: string }): void => {
        setSuccessMessage('');
        setSubmitError(error.message);
        setSubmitting(false);
      });
    }
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
              <button disabled={submitting} className="word-form__save-button" type="submit">
                { word ? 'Save' : 'Add' }
              </button>
              { word && <DeleteButton disabled={submitting} deleteFunction={deleteWord} text="Delete" /> }
            </div>
            { submitError && <p className="category-edit__error error">{ submitError }</p> }
          </form>
        </Flipped>
      </div>
    </Flipped>
  )
}

export default WordForm;
