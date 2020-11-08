import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { isEqual } from 'lodash';
import { isLoaded, useFirestoreConnect } from 'react-redux-firebase';
import { CategoryTypes, CollectionNames, CategoryDocument } from '../../models/models';
import Loading from '../../general/loading/Loading';
import CategoryAdd from '../general/category-add/CategoryAdd';
import CategoryList from '../general/category-list/CategoryList';
import './EditPages.scss';

const EditPages = (): JSX.Element => {
  const [successMessage, setSuccessMessage] = useState<string>('');

  useFirestoreConnect([
    { collection: CollectionNames.Pages, orderBy: ['createdAt', 'asc'] }
  ]);

  const pages = useSelector(({ firestore: { ordered } }: any) => ordered[CollectionNames.Pages], isEqual);

  if(!isLoaded(pages)) return <Loading />;

  const uniqueIdentifiers = pages.map((page: CategoryDocument): string => {
    return page.slug ? page.slug : '';
  });

  return (
    <section className="edit-pages">
      <div className="edit-pages__wrapper page-wrapper">
        <h1 className="edit-pages__heading">Private Pages</h1>
        <p className="edit-pages__description">This is the interface for editing your private pages.</p>
        <CategoryAdd
          type={CategoryTypes.Page}
          successMessage={successMessage}
          setSuccessMessage={setSuccessMessage}
          uniqueIdentifiers={uniqueIdentifiers}
        />
        <CategoryList
          type={CategoryTypes.Page}
          categories={pages || []}
          setSuccessMessage={setSuccessMessage}
          uniqueIdentifiers={uniqueIdentifiers}
        />
      </div>
    </section>
  )
}

export default EditPages;
