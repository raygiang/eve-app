import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { isEqual } from 'lodash';
import { isLoaded, useFirestoreConnect } from 'react-redux-firebase';
import { CategoryTypes } from '../models/models';
import Loading from '../../general/loading/Loading';
import CategoryAdd from '../word-categories/category-add/CategoryAdd';
import CategoryList from '../word-categories/category-list/CategoryList';
import './Subcategories.scss';

interface PropsParams {
  categoryId: string,
}

interface SubcategoryProps {
  match: {
    isExact: boolean,
    params: PropsParams,
    path: string,
    url: string,
  }
}

const Subcategories = ({ match } : SubcategoryProps): JSX.Element => {
  const [successMessage, setSuccessMessage] = useState<string>('');
  const categoryId = match.params.categoryId;

  useFirestoreConnect([
    { collection: 'top-level-categories', doc: categoryId },
    { collection: 'subcategories', where: [
      ['parent', '==', categoryId]
    ] }
  ]);

  const parentCategory = useSelector(({ firestore: { data } }: any) => data['top-level-categories'], isEqual);
  const subcategories = useSelector(({ firestore: { data } }: any) => data['subcategories'], isEqual);

  if(!isLoaded(parentCategory) || !isLoaded(subcategories)) return <Loading />;
  console.log(parentCategory, subcategories);
  
  return (
    <section className="subcategories-admin">
      <div className="subcategories-admin__wrapper page-wrapper">
        <h1 className="subcategories-admin__heading">Subcategories of {parentCategory[categoryId].name}</h1>
        <p className="subcategories-admin__description">This is the interface for editing subcategories.</p>
        <CategoryAdd
          type={CategoryTypes.Sub}
          successMessage={successMessage}
          setSuccessMessage={setSuccessMessage}
          parentId={categoryId}
        />
        <CategoryList
          type={CategoryTypes.Sub}
          categories={subcategories ? subcategories : []}
          setSuccessMessage={setSuccessMessage}
        />
      </div>
    </section>
  )
}

export default Subcategories;
