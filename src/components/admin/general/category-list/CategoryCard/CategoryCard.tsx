import React, { useState } from 'react';
import { Flipped } from "react-flip-toolkit";
import { CollectionNames, CategoryTypes, CategoryCardProps } from '../../../../models/models';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import DeleteButton from '../../delete-button/DeleteButton';
import firebase from '../../../../../config/firebaseConfig';
import './Category.scss';

const CategoryCard = ({ type, categoryId, category, categoryClicked, shouldFlip, setSuccessMessage } : CategoryCardProps): JSX.Element => {
  const [deleting, setDeleting] = useState<boolean>(false);
  const [deleteError, setDeleteError] = useState<string>('');
  const collectionName = type === CategoryTypes.Top
    ? CollectionNames.Categories
    : type === CategoryTypes.Sub
      ? CollectionNames.Subcategories
      : CollectionNames.HomeLanguages;
  const categoriesCollection = firebase.firestore().collection(collectionName);

  const deleteCategory = (): void => {
    setDeleting(true);
    categoriesCollection.doc(categoryId).delete().then((): void => {
      setSuccessMessage(`${category.name} has been Deleted`);
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
    >
      <div className="category">
        <Flipped inverseFlipId={`category-${categoryId}`} shouldInvert={shouldFlip(categoryId)}>
          <div className="category__content-container">
            <Flipped flipId={`heading-${categoryId}`} stagger="card-content" shouldFlip={shouldFlip(categoryId)}>
              <h3 className="category__name">
                <Link to={`/admin-dashboard/${type === CategoryTypes.Top ? CollectionNames.Subcategories : type === CategoryTypes.Sub ? CollectionNames.Groups : 'language'}/${categoryId}`}>
                  {category.name}
                </Link>
              </h3>
            </Flipped>
            <div className="category__button-container">
              <button onClick={():any => categoryClicked(categoryId)} title="Edit">
                <FontAwesomeIcon icon={faEdit} />
              </button>
              <Flipped flipId={`delete-${categoryId}`} stagger="card-content" shouldFlip={shouldFlip(categoryId)}>
                <DeleteButton disabled={deleting} deleteFunction={deleteCategory} />
              </Flipped>
            </div>
            { deleteError && <p className="category__delete-error error">{ deleteError }</p> }
          </div>
        </Flipped>
      </div>
    </Flipped>
  )
}

export default CategoryCard;
