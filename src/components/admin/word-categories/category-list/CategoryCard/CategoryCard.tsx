import React, { useState } from 'react';
import { Flipped } from "react-flip-toolkit";
import { CategoryTypes, CategoryCardProps } from '../../../models/models';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import DeleteButton from '../../../general/delete-button/DeleteButton';
import firebase from '../../../../../config/firebaseConfig';
import './Category.scss';

const CategoryCard = ({ type, index, categoryId, category, categoryClicked, shouldFlip, setSuccessMessage } : CategoryCardProps) : JSX.Element => {
  const [deleting, setDeleting] = useState<boolean>(false);
  const [deleteError, setDeleteError] = useState<string>('');
  const collectionName = type === CategoryTypes.Top ? 'top-level-categories' : 'subcategories';
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
      flipId={`category-${index}`}
      stagger="card"
      onStart={(el: HTMLElement) : void => {
        setTimeout((): void => {
          el.classList.add("expanded")
        }, 300)
      }}
    >
      <div className="category">
        <Flipped inverseFlipId={`category-${index}`} shouldInvert={shouldFlip(index)}>
          <div className="category__content-container">
            <Flipped flipId={`heading-${index}`} stagger="card-content" shouldFlip={shouldFlip(index)}>
              <h3 className="category__name">
                <Link to={`/admin-dashboard/${type === CategoryTypes.Top ? 'subcategories' : 'groups'}/${categoryId}`}>
                  {category.name}
                </Link>
              </h3>
            </Flipped>
            <div className="category__button-container">
              <button onClick={():any => categoryClicked(index)}>
                <FontAwesomeIcon icon={faEdit} />
              </button>
              <Flipped flipId={`delete-${index}`} stagger="card-content" shouldFlip={shouldFlip(index)}>
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
