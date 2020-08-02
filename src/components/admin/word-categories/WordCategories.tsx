import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { isEqual } from 'lodash';
import { isLoaded, useFirestoreConnect } from 'react-redux-firebase';
import { CategoryTypes } from '../../models/models';
import CategoryAdd from '../general/category-add/CategoryAdd';
import CategoryList from '../general/category-list/CategoryList';
import Loading from '../../general/loading/Loading';
import './WordCategories.scss';

const WordCategories = (): JSX.Element => {
  const [successMessage, setSuccessMessage] = useState<string>('');

  useFirestoreConnect([
    { collection: 'top-level-categories', orderBy: ['createdAt', 'asc'] }
  ]);

  const topLevelCategories = useSelector(({ firestore: { ordered } }: any) => ordered['top-level-categories'], isEqual);

  if(!isLoaded(topLevelCategories)) return <Loading />;

  return (
    <section className="categories-admin">
      <div className="categories-admin__wrapper page-wrapper">
        <h1 className="categories-admin__heading">Top Level Word Categories</h1>
        <p className="categories-admin__description">This is the interface for editing your top level word categories.</p>
        <CategoryAdd
          type={CategoryTypes.Top}
          successMessage={successMessage}
          setSuccessMessage={setSuccessMessage}
        />
        <CategoryList
          type={CategoryTypes.Top}
          categories={topLevelCategories || []}
          setSuccessMessage={setSuccessMessage}
        />
      </div>
    </section>
  )
}

export default WordCategories;
