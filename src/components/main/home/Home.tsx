import React from 'react';
import { isLoaded, useFirestoreConnect } from 'react-redux-firebase';
import { useSelector } from 'react-redux';
import { isEqual } from 'lodash';
import { CollectionNames } from '../../models/models';
import Loading from '../../general/loading/Loading';
import HomeContent from './home-content/HomeContent';
import './Home.scss';

const Home = (): JSX.Element => {
  useFirestoreConnect([
    { collection: CollectionNames.HomeLanguages, orderBy: ['createdAt', 'asc'] },
  ]);

  const homeLanguages = useSelector(({ firestore: { ordered } }: any) => ordered[CollectionNames.HomeLanguages], isEqual);

  if(!isLoaded(homeLanguages)) return <Loading />;

  return (
    <section className="home">
      { homeLanguages.length && <HomeContent homeLanguages={homeLanguages} /> }
    </section>
  )
}

export default Home;
