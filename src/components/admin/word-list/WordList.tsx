import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { isEqual } from 'lodash';
import { isLoaded, useFirestoreConnect } from 'react-redux-firebase';
import Loading from '../../general/loading/Loading';
import './WordList.scss';

interface PropsParams {
  subcategoryId: string,
  groupId: string,
}

interface WordListProps {
  match: {
    isExact: boolean,
    params: PropsParams,
    path: string,
    url: string,
  }
}

const WordList = ({ match }: WordListProps): JSX.Element => {
  const [successMessage, setSuccessMessage] = useState<string>('');
  const subcategoryId = match.params.subcategoryId;
  const groupId = match.params.groupId;

  useFirestoreConnect([
    { collection: 'subcategories', doc: subcategoryId, storeAs: 'subcategories' },
    { collection: 'subcategories', doc: subcategoryId, storeAs: 'groups',
      subcollections: [{ collection: 'groups', doc: groupId }]
    }
  ]);

  const parentCategory = useSelector(({ firestore: { data } }: any) => data['subcategories'], isEqual);
  const group = useSelector(({ firestore: { data } }: any) => data['groups'], isEqual);

  if(!isLoaded(parentCategory) || !isLoaded(group)) return <Loading />;
  
  if(!parentCategory || !group) {
    return (
      <section className="word-list-admin">
        <div className="subcategories-admin__wrapper page-wrapper">
          <div className="subcategories-admin__header">
            <h1 className="subcategories-admin__heading">
              Group Not Found
            </h1>
            <Link to="/admin-dashboard/word-categories">Back to Top Level Categories</Link>
          </div>
        </div>
      </section>
    )
  }


  return (
    <section className="word-list-admin">
      <div className="word-list-admin__wrapper page-wrapper">
        <div className="word-list-admin__header">
          <h1 className="word-list-admin__heading">
            Editing Group
          </h1>
          <Link to={`/admin-dashboard/groups/${subcategoryId}`}>
            Back to {parentCategory.name}
          </Link>
        </div>
        <p className="word-list-admin__description">This is the interface for editing the word list inside of a group.</p>
        { successMessage && <p className="word-list-admin__success-message success">{ successMessage }</p> }
        {/* <GroupAdd setSuccessMessage={setSuccessMessage} subcategoryId={subcategoryId} /> */}
        {/* <GroupList groups={groups} subcategoryId={subcategoryId} setSuccessMessage={setSuccessMessage} /> */}
      </div>
    </section>
  )
}

export default WordList;
