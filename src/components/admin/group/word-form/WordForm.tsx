import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { CollectionNames, WordList, Definitions } from '../../../models/models';
import { formatDictionaryResults } from '../../../../utils/utils';
import DeleteButton from '../../general/delete-button/DeleteButton';
import DefinitionBox from './definitions/DefinitionBox';
import firebase from '../../../../config/firebaseConfig';
import './WordForm.scss';

interface WordFormProps {
  word: string,
  setSelectedWord: React.Dispatch<React.SetStateAction<string | null>>,
  wordList: WordList,
  setSuccessMessage: React.Dispatch<React.SetStateAction<string>>,
  subcategoryId: string,
  groupId: string,
}

const WordForm = ({ word, setSelectedWord, wordList, setSuccessMessage, subcategoryId, groupId }: WordFormProps): JSX.Element => {
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string>('');
  const [definitions, setDefinitions] = useState<Definitions[] | null>(null);
  const { register, handleSubmit, errors, getValues, reset } = useForm();
  const groupCollection = firebase.firestore().collection(CollectionNames.Subcategories).doc(subcategoryId).collection(CollectionNames.Groups).doc(groupId);

  const updateGroupCollection = (data: any, newWord: string, wordListCopy: WordList, successMessage: string): void => {
    wordListCopy[newWord] = {
      customDefinition: data['custom-definition'],
      dictionaryUrl: data['dictionary-url'],
      apiDefinitions: definitions,
    };
    groupCollection.update({ words: wordListCopy }).then((): void => {
      setSuccessMessage(successMessage);
      setSubmitting(false);
      setSelectedWord(null);
    }).catch((error: { message: string }): void => {
      setSuccessMessage('');
      setSubmitError(error.message);
      setSubmitting(false);
    });
  }

  const searchDefinitions = (): void => {
    const word = getValues('word');

    if(!word) {
      setSubmitError('Please enter a word first');
      setSuccessMessage('');
      return;
    }

    setSubmitting(true);
    fetch(`https://api.dictionaryapi.dev/api/v1/entries/en/${word}`).then(response => {
      response.json().then((data: any) => {
        setSubmitError('');
        setSuccessMessage('');
        if(data.length) {
          reset({
            word: getValues('word'),
            'custom-definition': getValues('custom-definition'),
            'dictionary-url': getValues('dictionary-url'),
          });
          setDefinitions(formatDictionaryResults(data));
        }
        else {
          setDefinitions([]);
        }
      });
    }).catch(error => {
      console.log(error.message);
    });
    }).finally(() => setSubmitting(false));
  }

  const onSubmit = (data: any) : void => {
    setSubmitting(true);
    const wordListCopy = { ...wordList }
    const newWord = data.word.trim();

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
        setSelectedWord(null);
      }).catch((error: { message: string }): void => {
        setSuccessMessage('');
        setSubmitError(error.message);
        setSubmitting(false);
      });
    }
  }

  useEffect(() => {
    if(wordList[word]) {
      setDefinitions(wordList[word].apiDefinitions || null);
    }
    else {
      setDefinitions(null);
    }
    setSubmitError('');
  }, [word, wordList]);

  return (
    <form key={word} className="word-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="word-form__close-container">
        <button type="button" disabled={!definitions && submitting} onClick={() => {setSelectedWord(null)}}>
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
      { submitError && <p className="category-edit__error error">{ submitError }</p> }
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
        <button disabled={submitting} className="word-form__def-button" type="button" onClick={searchDefinitions}>
          Get Definitions
        </button>
        <button disabled={!definitions || submitting} className="word-form__save-button" type="submit">
          { word ? 'Save' : 'Add' }
        </button>
        { word && <DeleteButton disabled={!definitions || submitting} deleteFunction={deleteWord} text="Delete" /> }
      </div>

      { definitions && <DefinitionBox definitions={definitions} setDefinitions={setDefinitions} /> }

      { definitions && definitions.length > 0 &&
        <div className="word-form__submit-row">
          <button disabled={!definitions || submitting} className="word-form__save-button" type="submit">
            { word ? 'Save' : 'Add' }
          </button>
          { word && <DeleteButton disabled={!definitions || submitting} deleteFunction={deleteWord} text="Delete" /> }
        </div>
      }
    </form>
  )
}

export default WordForm;
