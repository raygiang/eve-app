import React, { useState } from 'react';
import CategoryEdit from './edit-form/CategoryEdit';
import { Flipped } from "react-flip-toolkit";
import { CategoryCardProps, PageTypes } from '../../../../models/models';
import { Link } from 'react-router-dom';
import { getCollectionName } from '../../../../../utils/utils';
import DeleteButton from '../../delete-button/DeleteButton';
import firebase from '../../../../../config/firebaseConfig';
import './Category.scss';

const CategoryCardExpanded = ({ type, categoryId, category, categoryClicked, shouldFlip, setSuccessMessage, uniqueIdentifiers } : CategoryCardProps): JSX.Element => {
  const [deleting, setDeleting] = useState<boolean>(false);
  const [deleteError, setDeleteError] = useState<string>('');
  const collectionName = getCollectionName(type);
  const categoriesCollection = firebase.firestore().collection(collectionName);

  const deleteCategory = (): void => {
    setDeleting(true);
    categoriesCollection.doc(categoryId).delete().then((): void => {
      setSuccessMessage(`${category.name} has been Deleted`);
      categoryClicked(categoryId);
    }).catch((error: {message: string}) => {
      setSuccessMessage('');
      setDeleteError(error.message);
      setDeleting(false);
    });
  }

  return (
    <Flipped
      flipId={`category-${categoryId}`}
      stagger="card"
      onStart={el => {
        setTimeout(() => {
          el.classList.add("expanded")
        }, 300);
      }}
    >
      <div className="category--expanded">
        <Flipped inverseFlipId={`category-${categoryId}`} shouldInvert={shouldFlip(categoryId)}>
          <div className="category--expanded__content-container">
            <div className="category--expanded__header">
              <Flipped flipId={`heading-${categoryId}`} stagger="card-content" shouldFlip={shouldFlip(categoryId)}>
                <h3 className="category--expanded__name">
                  <Link to={`/admin-dashboard/${type in PageTypes ? `edit-single/${type}` : collectionName}/${categoryId}`}>
                    {category.name}
                  </Link>
                </h3>
              </Flipped>
              <div className="category--expanded__button-container">
                <Flipped flipId={`delete-${categoryId}`} stagger="card-content" shouldFlip={shouldFlip(categoryId)}>
                  <DeleteButton disabled={deleting} deleteFunction={deleteCategory} />
                </Flipped>
              </div>
            </div>
            <CategoryEdit
              type={type}
              categoryId={categoryId}
              categoryName={category.name}
              categoryClicked={categoryClicked}
              setSuccessMessage={setSuccessMessage}
              uniqueIdentifiers={uniqueIdentifiers}
            />
            { deleteError && <p className="category--expanded__delete-error error">{ deleteError }</p> }
          </div>
        </Flipped>
      </div>
    </Flipped>
  )
}

export default CategoryCardExpanded;
