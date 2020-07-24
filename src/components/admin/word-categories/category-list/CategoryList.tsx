import React, { useState } from 'react';
import { Flipper } from "react-flip-toolkit";
import { CategoryTypes, TopLevelCategories } from '../../models/models';
import CategoryCard from './CategoryCard/CategoryCard';
import CategoryCardExpanded from './CategoryCard/CategoryCardExpanded';
import './CategoryList.scss';

interface CategoryListProps {
  type: CategoryTypes,
  categories: TopLevelCategories,
  setSuccessMessage: React.Dispatch<React.SetStateAction<string>>,
}

const CategoryList = ({ type, categories, setSuccessMessage } : CategoryListProps) : JSX.Element => {
  const [focusedIndices, setFocusedIndices] = useState<Map<number, boolean>>(new Map());

  const categoryClicked = (index: number) : void => {
    let copyIndexMap = new Map(focusedIndices);
    focusedIndices.get(index) ? copyIndexMap.delete(index) : copyIndexMap.set(index, true);
    setFocusedIndices(copyIndexMap);
  }

  const shouldFlip = (index: number) => (prevDecisionData: number, currentDecisionData: number) =>
    index === prevDecisionData || index === currentDecisionData;

  const renderCategories = () : JSX.Element[] => {
    const categoryIds = Object.keys(categories);
    return categoryIds.reduce((result: JSX.Element[], id: string, index: number) => {
      if(categories[id] !== null) {
        result.push(
          <li key={index}>
            {
              !focusedIndices.get(index)
                ? <CategoryCard
                    type={type}
                    index={index}
                    categoryId={id}
                    category={categories[id]}
                    categoryClicked={categoryClicked}
                    shouldFlip={shouldFlip}
                    setSuccessMessage={setSuccessMessage}
                  />
                : <CategoryCardExpanded
                    type={type}
                    index={index}
                    categoryId={id}
                    category={categories[id]}
                    categoryClicked={categoryClicked}
                    shouldFlip={shouldFlip}
                    setSuccessMessage={setSuccessMessage}
                  />
            }
          </li>
        )
      }
      return result;
    }, []);
  }

  return (
    <Flipper
      flipKey={focusedIndices.keys()}
      className="categories"
      spring="gentle"
      decisionData={focusedIndices.keys()}
      staggerConfig={{
        card: {
          reverse: focusedIndices.size > 0,
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
