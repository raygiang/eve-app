import React from 'react';
import Loading from '../../general/loading/Loading';
import { isLoaded, useFirestoreConnect } from 'react-redux-firebase';
import { useSelector } from 'react-redux';
import { isEqual } from 'lodash';
import { CollectionNames } from '../../models/models';
import './Page.scss';

const Page = (): JSX.Element => {
  useFirestoreConnect([
    { collection: CollectionNames.Pages, where:['slug', '==', 'beer'], storeAs: 'page' },
  ]);

  const pageContent = useSelector(({ firestore: { ordered } }: any) => ordered['page'], isEqual);

  if(!isLoaded(pageContent)) return <Loading />;

  console.log(pageContent)

  return (
    <div className="single-page">
      <div className="single-page__wrapper page-wrapper">
        <div className="single-page__main-content" dangerouslySetInnerHTML={{ __html: pageContent ? pageContent[0].mainContent : '' }}></div>
      </div>
    </div>
  )
}

export default Page;
