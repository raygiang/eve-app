import React from 'react';
import { isLoaded, useFirestoreConnect } from 'react-redux-firebase';
import { MatchProps, Group } from '../../admin/models/models';
import { useSelector } from 'react-redux';
import { isEqual } from 'lodash';
import Loading from '../../general/loading/Loading';
import GroupCard from './group-card/GroupCard';
import './Groups.scss';

interface SubcategoriesProps {
  match: MatchProps,
}

const Subcategories = ({ match }: SubcategoriesProps): JSX.Element => {
  const subcategoryId = match.params.subcategoryId;

  useFirestoreConnect([
    { collection: 'subcategories', doc: subcategoryId, storeAs: subcategoryId },
    { collection: 'subcategories', doc: subcategoryId, storeAs: `groups-${subcategoryId}`,
      subcollections: [{
        collection: 'groups',
        orderBy: ['createdAt', 'asc']
      }]
    }
  ]);

  const subcategory = useSelector(({ firestore: { data } }: any) => data[subcategoryId], isEqual);
  const groups = useSelector(({ firestore: { ordered } }: any) => ordered[`groups-${subcategoryId}`], isEqual);

  if(!isLoaded(subcategory) || !isLoaded(groups)) return <Loading />;

  const renderGroups = (): JSX.Element[] => {
    return groups.map((group: Group, index: number): JSX.Element => (
      <li key={group.id}>
        <GroupCard number={index + 1} subcategoryId={subcategoryId} group={group} />
      </li>
    ));
  }

  return (
    <section className="groups">
      <div className="groups__wrapper page-wrapper">
        <h1 className="groups__heading">
          Groups in {subcategory.name}
        </h1>
        <p className="groups__description">
          Please select a group to view its words and exercises.
        </p>
        {
          groups.length
            ? <ul className="groups__list">
                { renderGroups() }
              </ul>
            : <p>There are no groups to Display.</p>
        }
      </div>
    </section>
  )
}

export default Subcategories;
