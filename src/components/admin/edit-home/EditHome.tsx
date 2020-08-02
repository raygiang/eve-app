import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { isEqual } from 'lodash';
import { isLoaded, useFirestoreConnect } from 'react-redux-firebase';
import { CategoryTypes } from '../../models/models';
import Loading from '../../general/loading/Loading';
import CategoryAdd from '../general/category-add/CategoryAdd';
import CategoryList from '../general/category-list/CategoryList';
import './EditHome.scss';

const EditHome = (): JSX.Element => {
  const [successMessage, setSuccessMessage] = useState<string>('');

  useFirestoreConnect([
    { collection: 'home-languages', orderBy: ['createdAt', 'asc'] }
  ]);

  const homeLanguages = useSelector(({ firestore: { ordered } }: any) => ordered['home-languages'], isEqual);

  if(!isLoaded(homeLanguages)) return <Loading />;

  return (
    <section className="edit-home">
      <div className="edit-home__wrapper page-wrapper">
        <h1 className="edit-home__heading">Home Page Languages</h1>
        <p className="edit-home__description">This is the interface for editing the available languages on your home page.</p>
        <CategoryAdd
          type={CategoryTypes.Lang}
          successMessage={successMessage}
          setSuccessMessage={setSuccessMessage}
        />
        <CategoryList
          type={CategoryTypes.Lang}
          categories={homeLanguages || []}
          setSuccessMessage={setSuccessMessage}
        />
      </div>
    </section>
  )
}

export default EditHome;
