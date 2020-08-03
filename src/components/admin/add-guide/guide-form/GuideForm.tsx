import React, { useState } from 'react';
import { StudyGuideDocument } from '../../../models/models';
import DayPicker, { DateUtils } from 'react-day-picker';
import firebase from '../../../../config/firebaseConfig';
import SunEditor from 'suneditor-react';
import plugins from 'suneditor/src/plugins'
import 'react-day-picker/lib/style.css';
import 'suneditor/dist/css/suneditor.min.css';
import './GuideForm.scss';

interface GuideFormProps {
  guideId?: string,
  guide?: any,
}

const GuideForm = ({ guideId, guide }: GuideFormProps): JSX.Element => {
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [submitError, setSubmitError] = useState<string>('');
  const [guideContent, setGuideContent] = useState<string>('');
  const [datesSelected, setDatesSelected] = useState<any>({ from: null, to: null, enteredTo: null});
  const modifiers = { start: datesSelected.from, end: datesSelected.enteredTo };
  const disabledDays = { before: datesSelected.from };
  const selectedDays = [datesSelected.from, { from: datesSelected.from, to: datesSelected.enteredTo }];
  const previousMonth = new Date();
  previousMonth.setDate(0);
  const studyGuideCollection = firebase.firestore().collection('weekly-study-guides');

  const isSelectingFirstDay = (day: Date) => {
    const isBeforeFirstDay = datesSelected.from && DateUtils.isDayBefore(day, datesSelected.from);
    const isRangeSelected = datesSelected.from && datesSelected.to;
    return !datesSelected.from || isBeforeFirstDay || isRangeSelected;
  }

  const onDayClicked = (day: Date): void => {
    if(datesSelected.from && datesSelected.to && day >= datesSelected.from && day <= datesSelected.to) {
      resetDayPicker();
      return;
    }
    if(isSelectingFirstDay(day)) {
      setDatesSelected({
        from: day,
        to: null,
        enteredTo: null,
      });
    }
    else {
      setDatesSelected({
        from: datesSelected.from,
        to: day,
        enteredTo: day,
      });
    }
  }

  const onMouseEnter = (day: Date): void => {
    if(!isSelectingFirstDay(day)) {
      setDatesSelected({
        from: datesSelected.from,
        to: datesSelected.to,
        enteredTo: day,
      });
    }
  }

  const resetDayPicker = (): void => {
    setDatesSelected({
      from: null,
      to: null,
      enteredTo: null,
    })
  }

  const renderDatePickerNotice = (): JSX.Element => (
    <p className="add-guide-form__date-instructions">
      { !datesSelected.from && !datesSelected.to && 'Please select the starting day for this study guide.' }
      { datesSelected.from && !datesSelected.to && 'Please select the last day for this study guide.' }
      {
        datesSelected.from && datesSelected.to
          && `Selected range:  ${datesSelected.from.toLocaleDateString()} to ${datesSelected.to.toLocaleDateString()}`
      }
    </p>
  )

  const saveStudyGuide = (): void => {
    if(!datesSelected.from || !datesSelected.to) {
      setSuccessMessage('');
      setSubmitError('Please select a date range.');
    }
    else {
      setSubmitting(true);

      const studyGuideFields: StudyGuideDocument = {
        startDate: datesSelected.from,
        endDate: datesSelected.to,
        guideContent: guideContent,
      }
      let docRef;

      if(!guide && !guideId) {
        studyGuideFields.createdAt = new Date();
        docRef = studyGuideCollection.doc();
      }
      else {
        docRef = studyGuideCollection.doc(guideId);
      }
        
      docRef.set(studyGuideFields).then((): void => {
        setSuccessMessage('Weekly study guide has been saved.');
        setSubmitError('');
        setGuideContent('');
        resetDayPicker();
        setSubmitting(false);
      }).catch((error: { message: string }): void => {
        setSuccessMessage('');
        setSubmitError(error.message);
        setSubmitting(false);
      });
    }
  }

  return (
    <div className="add-guide-form">
      <h2 className="add-guide-form__heading">Study Guide Fields</h2>
      <div className="add-guide-form__field-row">
        <h3 className="add-guide-form__subheading">Date Range: </h3>
        { renderDatePickerNotice() }
        <DayPicker
          className="add-guide-form__range-picker"
          numberOfMonths={2}
          fromMonth={previousMonth}
          selectedDays={selectedDays}
          disabledDays={disabledDays}
          modifiers={modifiers}
          onDayClick={onDayClicked}
          onDayMouseEnter={onMouseEnter}
        />
      </div>
      <div className="add-guide-form__field-row">
        <h3 className="add-guide-form__subheading">Guide Content: </h3>
        <SunEditor
          setContents={guideContent}
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
          onBlur={(e: FocusEvent, contents: string) => setGuideContent(contents)}
        />
      </div>
      { submitError && <p className="add-guide-form__error error">{ submitError }</p> }
      { successMessage && <p className="add-guide-form__success-message success">{ successMessage }</p> }
      <div className="add-guide-form__submit-row">
        <button className="add-guide-form__submit-button" disabled={submitting} onClick={saveStudyGuide}>
          Save Study Guide
        </button>
      </div>
    </div>
  )
}

export default GuideForm;
