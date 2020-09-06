import React from 'react';
import Loading from '../../general/loading/Loading';
import { isLoaded, useFirestoreConnect } from 'react-redux-firebase';
import { useSelector } from 'react-redux';
import { isEqual } from 'lodash';
import { CollectionNames } from '../../models/models';
import './Contact.scss';

const Contact = (): JSX.Element => {
  useFirestoreConnect([
    { collection: CollectionNames.Contact, doc: '2urA1ndMb9wk6VncvYsB', storeAs: 'contact' },
  ]);

  const contactContent = useSelector(({ firestore: { data } }: any) => data['contact'], isEqual);

  if(!isLoaded(contactContent)) return <Loading />;

  console.log(contactContent)

  return (
    <div className="contact-page">
      <div className="contact-page__wrapper page-wrapper">
        <div className="contact-page__main-content" dangerouslySetInnerHTML={{ __html: contactContent.mainContent }}></div>
      </div>
    </div>
  )
}

export default Contact;
