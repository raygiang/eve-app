import React, { useState } from 'react';
import CategoryEdit from './edit-form/CategoryEdit';
import { Flipped } from "react-flip-toolkit";
import { CategoryCardProps } from '../../models/models';
import { Link } from 'react-router-dom';
import DeleteButton from '../../../general/delete-button/DeleteButton';
import firebase from '../../../../../config/firebaseConfig';
import './Category.scss';

const CategoryCardExpanded = ({ index, categoryId, category, categoryClicked, shouldFlip, setSuccessMessage } : CategoryCardProps) : JSX.Element => {
  const [deleting, setDeleting] = useState<boolean>(false);
  const [deleteError, setDeleteError] = useState<string>('');
  const topLevelCategoriesCollection = firebase.firestore().collection('top-level-categories');

  const deleteCategory = (): void => {
    setDeleting(true);
    topLevelCategoriesCollection.doc(categoryId).delete().then((): void => {
      setSuccessMessage(`${category.name} has been Deleted`);
      setDeleting(false);
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
      onStart={el => {
        setTimeout(() => {
          el.classList.add("expanded")
        }, 300);
      }}
    >
      <div className="category--expanded">
        <Flipped inverseFlipId={`category-${index}`} shouldInvert={shouldFlip(index)}>
          <div className="category--expanded__content-container">
            <div className="category--expanded__header">
              <Flipped flipId={`heading-${index}`} stagger="card-content" shouldFlip={shouldFlip(index)}>
                <h3 className="category--expanded__name">
                  <Link to={`/admin-dashboard/subcategories/${categoryId}`}>
                    {category.name}
                  </Link>
                </h3>
              </Flipped>
              <div className="category--expanded__button-container">
                <Flipped flipId={`delete-${index}`} stagger="card-content" shouldFlip={shouldFlip(index)}>
                  <DeleteButton disabled={deleting} deleteFunction={deleteCategory} />
                </Flipped>
              </div>
            </div>
            <CategoryEdit
              index={index}
              categoryId={categoryId}
              categoryName={category.name}
              categoryClicked={categoryClicked}
              setSuccessMessage={setSuccessMessage}
            />
            { deleteError && <p className="category--expanded__delete-error error">{ deleteError }</p> }
          </div>
        </Flipped>
      </div>
    </Flipped>
  )
}

export default CategoryCardExpanded;
