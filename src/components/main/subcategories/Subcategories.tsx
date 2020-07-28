import React from 'react';
import { isLoaded, useFirestoreConnect } from 'react-redux-firebase';
import { MatchProps, Category } from '../../admin/models/models';
import { useSelector } from 'react-redux';
import { isEqual } from 'lodash';
import Loading from '../../general/loading/Loading';
import SubcategoryCard from './subcategory-card/SubcategoryCard';
import './Subcategories.scss';

interface SubcategoriesProps {
  match: MatchProps,
}

const Subcategories = ({ match }: SubcategoriesProps): JSX.Element => {
  const categoryId = match.params.categoryId;

  useFirestoreConnect([
    { collection: 'top-level-categories', doc: categoryId },
    { collection: 'subcategories', orderBy: ['createdAt', 'asc'], where: ['parent', '==', categoryId] }
  ]);

  const topLevelCategories = useSelector(({ firestore: { data } }: any) => data['top-level-categories'], isEqual);
  const subcategories = useSelector(({ firestore: { ordered } }: any) => ordered['subcategories'], isEqual);

  if(!isLoaded(topLevelCategories) || !isLoaded(subcategories)) return <Loading />;

  const renderSubcategories = () => {
    return subcategories.map((subcategory: Category): JSX.Element => (
      <li key={subcategory.id}>
        <SubcategoryCard subcategory={subcategory} />
      </li>
    ));
  }

  return (
    <section className="subcategories">
    <div className="subcategories__wrapper page-wrapper">
      <h1 className="subcategories__heading">
        Subcategories of {topLevelCategories[categoryId].name}
      </h1>
      <p className="subcategories__description">
        Please select a subcategory to view.
      </p>
      <ul className="subcategories__list">
        {
          subcategories.length
            ? renderSubcategories()
            : <p>There are no Categories to Display.</p>
        }
      </ul>
    </div>
  </section>
  )
}

export default Subcategories;
