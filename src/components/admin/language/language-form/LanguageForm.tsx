import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { HomeLanguage } from '../../../models/models';
import firebase from '../../../../config/firebaseConfig';
import SunEditor from 'suneditor-react';
import plugins from 'suneditor/src/plugins'
import 'suneditor/dist/css/suneditor.min.css';
import './LanguageForm.scss';

interface LanguageFormProps {
  languageId: string,
  language: HomeLanguage,
}

const LanguageForm = ({ languageId, language }: LanguageFormProps): JSX.Element => {
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [mainContent, setMainContent] = useState<string>(language.mainContent || '');
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string>('');
  const { register, handleSubmit } = useForm();
  const languageCollection = firebase.firestore().collection('home-languages').doc(languageId);

  const onSubmit = (data: any) : void => {
    setSubmitting(true);
    const updatedDoc = {
      bannerHeading: data['banner-heading'],
      bannerText: data['banner-text'],
      mainContent: mainContent,
    }
    languageCollection.update(updatedDoc).then((): void => {
      setSuccessMessage(`${language.name} home page has been saved.`);
      setSubmitError('');
      setSubmitting(false);
    }).catch((error: { message: string }): void => {
      setSuccessMessage('');
      setSubmitError(error.message);
      setSubmitting(false);
    });
  }
  
  return (
    <form className="language-form" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="language-form__heading">Edit Fields</h2>
      <div className="language-form__form-row">
        <label className="language-form__label" htmlFor={'banner-heading'}>Banner Heading: </label>
        <input
          id="banner-heading"
          name="banner-heading"
          className="language-form__field"
          type="text"
          ref={register}
          defaultValue={language.bannerHeading || ''}
        />
      </div>
      <div className="language-form__form-row">
        <label className="language-form__label" htmlFor={'banner-text'}>Banner Text: </label>
        <textarea
          id="banner-text"
          name="banner-text"
          className="language-form__field"
          ref={register}
          defaultValue={language.bannerText || ''}
        />
      </div>
      <div className="language-form__form-row">
        <h3 className="language-form__label">Main Content: </h3>
        <SunEditor
          setContents={mainContent}
          setOptions={{
            height: 300,
            plugins: plugins,
            buttonList: [
              ['undo', 'redo'],
              ['fontSize'],
              ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
              ['outdent', 'indent'],
              ['align', 'horizontalRule', 'list'],
              ['table', 'link', 'image', 'video', 'audio'],
              ['fullScreen'],
            ],
          }}
          onBlur={(e: FocusEvent, contents: string) => setMainContent(contents)}
        />
      </div>
      { submitError && <p className="language-form__error error">{ submitError }</p> }
      { successMessage && <p className="language-form__success-message success">{ successMessage }</p> }
      <div className="language-form__submit-row">
        <button type="submit" className="language-form__submit-button" disabled={submitting}>Save Page</button>
      </div>
    </form>
  )
}

export default LanguageForm;
