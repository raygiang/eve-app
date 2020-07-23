import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faTimes } from '@fortawesome/free-solid-svg-icons';
import { CategoryClickFunction } from '../../../models/models';
import './CategoryEdit.scss';

interface CategoryEditProps {
  index: number,
  categoryClicked: CategoryClickFunction
}

const CategoryEdit = ({ index, categoryClicked } : CategoryEditProps) : JSX.Element => {
  // const [categoryError, setCategoryError] = useState('');
  const [submitting, setSubmitting] = useState<boolean>(false);
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data: any) : void => {
    setSubmitting(true);
    console.log(data);
    setSubmitting(false);
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
    </form>
  )
}

export default CategoryEdit;
