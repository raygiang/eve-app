import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { isLoaded, useFirestoreConnect } from 'react-redux-firebase';
import CategoryList from './category-list/CategoryList';

const WordCategories = () => {
  useFirestoreConnect([
    { collection: 'top-level-categories' }
  ]);

  const topLevelCategories = useSelector(({ firestore: { data } }: any) => data['top-level-categories'], shallowEqual);

  if(!isLoaded(topLevelCategories)) return <></>;

  return (
    <section className="tlc-admin">
      <div className="tlc-admin__wrapper page-wrapper">
        <h1 className="tlc-admin__heading">Top Level Word Categories</h1>
        <p className="tlc-admin__description">This is the interface for editing your top level word categories.</p>
        <CategoryList categories={topLevelCategories ? topLevelCategories : []} />
      </div>
    </section>
  )
}

export default WordCategories;
