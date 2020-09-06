import React from 'react';
import { MatchProps, PageTypes } from '../../models/models';
import { useSelector } from 'react-redux';
import { isEqual } from 'lodash';
import { isLoaded, useFirestoreConnect } from 'react-redux-firebase';
import { getCollectionName } from '../../../utils/utils';
import Loading from '../../general/loading/Loading';
import SinglePageForm from './single-page-form/SinglePageForm';
import './SinglePage.scss';

interface SinglePageProps {
  match: MatchProps,
}

const SinglePage = ({ match } : SinglePageProps): JSX.Element => {
  const pageId = match.params.pageId;
  const type: string = match.params.type;
  const collectionName = getCollectionName(type);

  useFirestoreConnect([
    { collection: collectionName, doc: pageId, storeAs: pageId },
  ]);

  const pageData = useSelector(({ firestore: { data } }: any) => data[pageId], isEqual);

  if(!isLoaded(pageData)) return <Loading />;

  if(!pageData) {
    return (
      <section className="single-page-admin">
        <div className="single-page-admin__wrapper page-wrapper">
          <div className="single-page-admin__header">
            <h1 className="single-page-admin__heading">
              {type} Not Found
            </h1>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="single-page-admin">
      <div className="single-page-admin__wrapper page-wrapper">
        <div className="single-page-admin__header">
          <h1 className="single-page-admin__heading">
            Editing <span className="highlight">{pageData.name}</span> in {Object(PageTypes)[type]}
          </h1>
        </div>
        <p className="single-page-admin__description">Here you can edit the content that appears in {pageData.name}.</p>
        <SinglePageForm pageId={pageId} page={pageData} type={type} />
      </div>
    </section>
  )
}

export default SinglePage;
