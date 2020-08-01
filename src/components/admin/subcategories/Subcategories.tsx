import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { isEqual } from 'lodash';
import { isLoaded, useFirestoreConnect } from 'react-redux-firebase';
import { CategoryTypes, MatchProps } from '../../models/models';
import Loading from '../../general/loading/Loading';
import CategoryAdd from '../word-categories/category-add/CategoryAdd';
import CategoryList from '../word-categories/category-list/CategoryList';
import './Subcategories.scss';

interface SubcategoryProps {
  match: MatchProps,
}

const Subcategories = ({ match } : SubcategoryProps): JSX.Element => {
  const [successMessage, setSuccessMessage] = useState<string>('');
  const categoryId = match.params.categoryId;

  useFirestoreConnect([
    { collection: 'top-level-categories', doc: categoryId, storeAs: categoryId },
    { collection: 'subcategories', orderBy: ['createdAt', 'asc'], where: ['parent', '==', categoryId], storeAs: `subcategories-${categoryId}` }
  ]);

  const parentCategory = useSelector(({ firestore: { data } }: any) => data[categoryId], isEqual);
  const subcategories = useSelector(({ firestore: { ordered } }: any) => ordered[`subcategories-${categoryId}`], isEqual);

  if(!isLoaded(parentCategory) || !isLoaded(subcategories)) return <Loading />;

  if(!parentCategory) {
    return (
      <section className="subcategories-admin">
        <div className="subcategories-admin__wrapper page-wrapper">
          <div className="subcategories-admin__header">
            <h1 className="subcategories-admin__heading">
              Subcategory Not Found
            </h1>
            <Link to="/admin-dashboard/word-categories">Back to Top Level Categories</Link>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="subcategories-admin">
      <div className="subcategories-admin__wrapper page-wrapper">
        <div className="subcategories-admin__header">
          <h1 className="subcategories-admin__heading">
            Subcategories of <span className="highlight">{parentCategory.name}</span>
          </h1>
          <Link to="/admin-dashboard/word-categories">Back to Top Level Categories</Link>
        </div>
        <p className="subcategories-admin__description">This is the interface for editing subcategories.</p>
        <CategoryAdd
          type={CategoryTypes.Sub}
          successMessage={successMessage}
          setSuccessMessage={setSuccessMessage}
          parentId={categoryId}
        />
        <CategoryList
          type={CategoryTypes.Sub}
          categories={subcategories || []}
          setSuccessMessage={setSuccessMessage}
        />
      </div>
    </section>
  )
}

export default Subcategories;
