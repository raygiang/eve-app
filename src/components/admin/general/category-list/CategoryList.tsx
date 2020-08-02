import React, { useState } from 'react';
import { Flipper } from "react-flip-toolkit";
import { CategoryTypes, Category } from '../../../models/models';
import CategoryCard from './CategoryCard/CategoryCard';
import CategoryCardExpanded from './CategoryCard/CategoryCardExpanded';
import './CategoryList.scss';

interface CategoryListProps {
  type: CategoryTypes,
  categories: Category[],
  setSuccessMessage: React.Dispatch<React.SetStateAction<string>>,
}

const CategoryList = ({ type, categories, setSuccessMessage } : CategoryListProps): JSX.Element => {
  const [focusedIds, setFocusedIds] = useState<Map<string, boolean>>(new Map());

  const categoryClicked = (id: string) : void => {
    const copyIdsMap = new Map(focusedIds);
    focusedIds.get(id) ? copyIdsMap.delete(id) : copyIdsMap.set(id, true);
    setFocusedIds(copyIdsMap);
  }

  const shouldFlip = (id: string) => (prevDecisionData: string, currentDecisionData: string) =>
    id === prevDecisionData || id === currentDecisionData;

  const renderCategories = (): JSX.Element[] => {
    return categories.map((category: Category) => (
      <li key={category.id}>
        {
          !focusedIds.get(category.id)
            ? <CategoryCard
                type={type}
                categoryId={category.id}
                category={category}
                categoryClicked={categoryClicked}
                shouldFlip={shouldFlip}
                setSuccessMessage={setSuccessMessage}
              />
            : <CategoryCardExpanded
                type={type}
                categoryId={category.id}
                category={category}
                categoryClicked={categoryClicked}
                shouldFlip={shouldFlip}
                setSuccessMessage={setSuccessMessage}
              />
        }
      </li>
    ));
  }

  return (
    <Flipper
      flipKey={focusedIds.keys()}
      className="categories"
      spring="verygentle"
      decisionData={focusedIds.keys()}
      staggerConfig={{
        card: {
          reverse: focusedIds.size > 0,
          speed: 0.5
        }
      }}
    >
      <h2 className="categories__heading">{type} List</h2>
      <ul className="categories__list">
        {
          Object.keys(categories).length
            ? renderCategories()
            : <li>No {type.toLowerCase()} has been added yet.</li>
        }
      </ul>
    </Flipper>
  )
}

export default CategoryList;
