import React, { useState } from 'react';
import { StudyGuide } from '../../../models/models';
import { Link } from 'react-router-dom';
import DeleteButton from '../../general/delete-button/DeleteButton';
import firebase from '../../../../config/firebaseConfig';
import moment from 'moment';
import './GuideCard.scss';

interface GuideCardProps {
  guide: StudyGuide,
  setSuccessMessage: React.Dispatch<React.SetStateAction<string>>,
}

const GuideCard = ({ guide, setSuccessMessage }: GuideCardProps): JSX.Element => {
  const [deleting, setDeleting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const formattedStartDate = moment(guide.startDate.toDate().toLocaleDateString()).format('MMMM Do, YYYY');
  const formattedEndDate = moment(guide.endDate.toDate().toLocaleDateString()).format('MMMM Do, YYYY');
  const studyGuideDocument = firebase.firestore().collection('weekly-study-guides').doc(guide.id);

  const deleteStudyGuide = (): void => {
    setDeleting(true);
    studyGuideDocument.delete().then((): void => {
      setSuccessMessage(`Study guide from ${guide.startDate.toDate().toLocaleDateString()} 
        to ${guide.endDate.toDate().toLocaleDateString()} has been deleted.`);
      setErrorMessage('');
      setDeleting(false);
    }).catch((error: {message: string}) => {
      setSuccessMessage('');
      setErrorMessage(error.message);
      setDeleting(false);
    });
  }

  return (
    <div className="guide-card">
      <h3 className="guide-card__heading">
        { `${formattedStartDate} to ${formattedEndDate}` }
      </h3>
      <Link to={`/admin-dashboard/edit-study-guide/${guide.id}`} className="guide-card__edit-button">
        View/Edit
      </Link>
      <DeleteButton disabled={deleting} deleteFunction={deleteStudyGuide} text="Delete" />
      { errorMessage && <p className="guide-list-admin__error error">{ errorMessage }</p>}
    </div>
  )
}

export default GuideCard;
