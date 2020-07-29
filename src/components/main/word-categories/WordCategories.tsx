import React from 'react';
import { isLoaded, useFirestoreConnect } from 'react-redux-firebase';
import { useSelector } from 'react-redux';
import { isEqual } from 'lodash';
import { Category } from '../../admin/models/models';
import Loading from '../../general/loading/Loading';
import CategoryCard from './category-card/CategoryCard';
import './WordCategories.scss';

const WordCategories = (): JSX.Element => {
  useFirestoreConnect([
    { collection: 'top-level-categories', orderBy: ['createdAt', 'asc'] },
  ]);

  const topLevelCategories = useSelector(({ firestore: { ordered } }: any) => ordered['top-level-categories'], isEqual);

  if(!isLoaded(topLevelCategories)) return <Loading />;
  
  const renderCategories = (): JSX.Element[] => {
    return topLevelCategories.map((category: Category): JSX.Element => (
      <li key={category.id}>
        <CategoryCard category={category} />
      </li>
    ));
  }

  return (
    <section className="word-categories">
      <div className="word-categories__wrapper page-wrapper">
        <h1 className="word-categories__heading">Word Categories</h1>
        <p className="word-categories__description">
          Please select a category.
        </p>
        {
          topLevelCategories.length
            ? <ul className="word-categories__category-list">
                { renderCategories() }
              </ul>
            : <p>There are no Categories to Display.</p>
        }
      </div>
    </section>
  )
}

export default WordCategories;
