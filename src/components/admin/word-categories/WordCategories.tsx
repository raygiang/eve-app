import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { isEqual } from 'lodash';
import { isLoaded, useFirestoreConnect } from 'react-redux-firebase';
import CategoryAdd from './category-add/CategoryAdd';
import CategoryList from './category-list/CategoryList';
import Loading from '../../general/loading/Loading';
import './WordCategories.scss';

const WordCategories = () : JSX.Element => {
  const [successMessage, setSuccessMessage] = useState<string>('');

  useFirestoreConnect([
    { collection: 'top-level-categories' }
  ]);

  const topLevelCategories = useSelector(({ firestore: { data } }: any) => data['top-level-categories'], isEqual);

  if(!isLoaded(topLevelCategories)) return <Loading />;

  return (
    <section className="categories-admin">
      <div className="categories-admin__wrapper page-wrapper">
        <h1 className="categories-admin__heading">Top Level Word Categories</h1>
        <p className="categories-admin__description">This is the interface for editing your top level word categories.</p>
        <CategoryAdd successMessage={successMessage} setSuccessMessage={setSuccessMessage} />
        <CategoryList
          categories={topLevelCategories ? topLevelCategories : []}
          setSuccessMessage={setSuccessMessage}
        />
      </div>
    </section>
  )
}

export default WordCategories;
