import React from 'react';
import { MatchProps } from '../../models/models';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { isEqual } from 'lodash';
import { isLoaded, useFirestoreConnect } from 'react-redux-firebase';
import Loading from '../../general/loading/Loading';
import LanguageForm from './language-form/LanguageForm';
import './Language.scss';

interface LanguageProps {
  match: MatchProps,
}

const Language = ({ match } : LanguageProps): JSX.Element => {
  const languageId = match.params.languageId;

  useFirestoreConnect([
    { collection: 'home-languages', doc: languageId, storeAs: languageId },
  ]);

  const languageData = useSelector(({ firestore: { data } }: any) => data[languageId], isEqual);

  if(!isLoaded(languageData)) return <Loading />;

  if(!languageId) {
    return (
      <section className="language-admin">
        <div className="language-admin__wrapper page-wrapper">
          <div className="language-admin__header">
            <h1 className="language-admin__heading">
              Subcategory Not Found
            </h1>
            <Link to="/admin-dashboard/word-categories">Back to Languages</Link>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="language-admin">
      <div className="language-admin__wrapper page-wrapper">
        <div className="language-admin__header">
          <h1 className="language-admin__heading">
            Editing <span className="highlight">{languageData.name}</span> Home Page
          </h1>
          <Link to="/admin-dashboard/edit-home">Back to Languages</Link>
        </div>
        <p className="language-admin__description">Here you can edit what appears on your home page under this language.</p>
        <LanguageForm languageId={languageId} language={languageData} />
      </div>
    </section>
  )
}

export default Language;
