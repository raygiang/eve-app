import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faTimes } from '@fortawesome/free-solid-svg-icons';
import { CategoryTypes, CategoryClickFunction } from '../../../../models/models';
import firebase from '../../../../../../config/firebaseConfig';
import './CategoryEdit.scss';

interface CategoryEditProps {
  type: CategoryTypes,
  index: number,
  categoryId: string,
  categoryName: string,
  categoryClicked: CategoryClickFunction,
  setSuccessMessage: React.Dispatch<React.SetStateAction<string>>,
}

const CategoryEdit = ({ type, index, categoryId, categoryName, categoryClicked, setSuccessMessage } : CategoryEditProps) : JSX.Element => {
  const [updateError, setUpdateError] = useState('');
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [cancelRef, setCancelRef] = useState<HTMLButtonElement | null>(null);
  const { register, handleSubmit, errors } = useForm();
  const collectionName = type === CategoryTypes.Top ? 'top-level-categories' : 'subcategories';
  const categoriesCollection = firebase.firestore().collection(collectionName);

  const onSubmit = (data: any) : void => {
    if(categoryName !== data.name) {
      setSubmitting(true);
      categoriesCollection.doc(categoryId).update({ id: categoryId, name: data.name }).then((): void => {
        setSuccessMessage(`Renamed to ${data.name}`);
        setSubmitting(false);
        cancelRef?.click();
      }).catch((error: {message: string}) => {
        setSuccessMessage('');
        setUpdateError(error.message);
        setSubmitting(false);
      });
    }
    else {
      setSuccessMessage('');
      cancelRef?.click();
    }
  }

  return (
    <form className="category-edit" onSubmit={handleSubmit(onSubmit)}>
      <div className="category-edit__form-row">
        <label htmlFor="name">Rename: </label>
        <input
          id="name"
          name="name"
          className={errors.name ? 'category-edit__field error' : 'category-edit__field'}
          type="text"
          defaultValue={categoryName}
          ref={register({ required: 'Please enter a new name.' })}
        />
      </div>
      <div className="category-edit__submit-options">
        <button
          type="submit"
          className="category-edit__save-option"
          title="Save"
          disabled={submitting}
        >
          <FontAwesomeIcon icon={faSave} />
        </button>
        <button
          type="button"
          className="category-edit__cancel-option"
          title="Cancel"
          disabled={submitting}
          onClick={() => categoryClicked(index)}
          ref={setCancelRef}
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>
      { errors.name && <p className="category-edit__error error">{ errors.name.message }</p> }
      { updateError && <p className="category-edit__error error">{ updateError }</p> }
    </form>
  )
}

export default CategoryEdit;
