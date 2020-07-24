import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import firebase from '../../../../config/firebaseConfig';
import './CategoryAdd.scss';

interface CategoryAddProps {
  successMessage: string,
  setSuccessMessage: React.Dispatch<React.SetStateAction<string>>,
}

const CategoryAdd = ({ successMessage, setSuccessMessage }: CategoryAddProps) : JSX.Element => {
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [addError, setAddError] = useState<string>('');
  const { register, handleSubmit, errors, reset } = useForm();
  const topLevelCategoriesCollection = firebase.firestore().collection('top-level-categories');

  const onSubmit = (data: any) : void => {
    setSubmitting(true);
    topLevelCategoriesCollection.doc().set({ name: data.name, subcategories: [] }).then((): void => {
      setSubmitting(false);
      setAddError('');
      setSuccessMessage(`${data.name} successfully added`);
      reset();
    }).catch((error: {message: string}) => {
      setSubmitting(false);
      setAddError(error.message);
      setSuccessMessage('');
    });
  }

  return (
    <form className="category-add" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="category-add__heading">Add a New Category</h2>
      <div className="category-add__form-content">
        <div className="category-add__field-row">
          <label htmlFor="name">Name: </label>
          <input
            id="name"
            name="name"
            className={errors.name ? 'category-add__field error' : 'category-add__field'}
            type="text"
            ref={register({ required: 'Please enter a name.' })}
          />
        </div>
        <div className="category-add__submit-row">
          { submitting && <span className="category-add__spinner" aria-hidden="true"></span> }
          <button className="category-add__submit" type="submit" disabled={submitting}>Add</button>
        </div>
      </div>
      { errors.name && <p className="category-add__error error">{ errors.name.message }</p> }
      { successMessage && <p className="category-add__success success">{ successMessage }</p> }
      { addError && <p className="category-add__error error">{ addError }</p> }
    </form>
  )
}

export default CategoryAdd;
