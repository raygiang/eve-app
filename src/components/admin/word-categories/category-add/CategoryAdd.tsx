import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import firebase from '../../../../config/firebaseConfig';
import './CategoryAdd.scss';

const CategoryAdd = () : JSX.Element => {
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [addError, setAddError] = useState<string>('');
  const { register, handleSubmit, errors } = useForm();
  const addTopLevelCategory = firebase.functions().httpsCallable('addTopLevelCategory');

  const onSubmit = (data: any) : void => {
    setSubmitting(true);
    addTopLevelCategory({ name: data.name }).then((): void => {
      setSubmitting(false);
    }).catch((error: {message: string}) => {
      setAddError(error.message);
      setSubmitting(false);
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
      { errors.name && <p className="category-add__error">{ errors.name.message }</p> }
      { addError && <p className="category-add__error">{ addError }</p> }
    </form>
  )
}

export default CategoryAdd;
