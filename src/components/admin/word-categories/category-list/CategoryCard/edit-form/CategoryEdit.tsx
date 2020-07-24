import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faTimes } from '@fortawesome/free-solid-svg-icons';
import { CategoryClickFunction } from '../../../models/models';
import firebase from '../../../../../../config/firebaseConfig';
import './CategoryEdit.scss';

interface CategoryEditProps {
  index: number,
  categoryId: string,
  categoryClicked: CategoryClickFunction,
}

const CategoryEdit = ({ index, categoryId, categoryClicked } : CategoryEditProps) : JSX.Element => {
  const [updateError, setUpdateError] = useState('');
  const [submitting, setSubmitting] = useState<boolean>(false);
  const { register, handleSubmit, errors } = useForm();
  const topLevelCategoriesCollection = firebase.firestore().collection('top-level-categories');

  const onSubmit = (data: any) : void => {
    setSubmitting(true);
    topLevelCategoriesCollection.doc(categoryId).update({ id: categoryId, name: data.name }).then((): void => {
      setSubmitting(false);
    }).catch((error: {message: string}) => {
      setUpdateError(error.message);
      setSubmitting(false);
    });
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
          className="category-edit__cancel-option"
          title="Cancel"
          onClick={():any => categoryClicked(index)}
          disabled={submitting}
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>
      { updateError && <p className="category-edit__error">{ updateError }</p> }
    </form>
  )
}

export default CategoryEdit;
