import React, { useState } from 'react';
import { Flipper } from "react-flip-toolkit";
import CategoryCard from './CategoryCard/CategoryCard';
import { TopLevelCategories } from '../models/models';
import CategoryCardExpanded from './CategoryCard/CategoryCardExpanded';
import './CategoryList.scss';

const CategoryList = ({ categories } : { categories: TopLevelCategories }) : JSX.Element => {
  const [focusedIndex, setFocusedIndex] = useState<null | number>(null);

  const categoryClicked = (index: number) : void => {
    setFocusedIndex(index !== focusedIndex ? index : null);
  }

  const shouldFlip = (index: number) => (prevDecisionData: number, currentDecisionData: number) =>
    index === prevDecisionData || index === currentDecisionData;

  const renderCategories = () : JSX.Element[] => {
    const categoryIds = Object.keys(categories);
    return categoryIds.map((id: string, index: number) : JSX.Element => (
      <li key={index}>
        {
          index !== focusedIndex
            ? <CategoryCard
                index={index}
                category={categories[id]}
                categoryClicked={categoryClicked}
                shouldFlip={shouldFlip}
              />
            : <CategoryCardExpanded
                index={index}
                category={categories[id]}
                categoryClicked={categoryClicked}
                shouldFlip={shouldFlip}
              />
        }
      </li>
    ));
  }

  return (
    <Flipper
      flipKey={focusedIndex}
      className="categories"
      spring="gentle"
      decisionData={focusedIndex}
      staggerConfig={{
        card: {
          reverse: focusedIndex !== null,
          speed: 0.1
        }
      }}
    >
      <h2 className="categories__heading">Top Level Categories</h2>
      <ul className="categories__list">
        {
          Object.keys(categories).length
            ? renderCategories()
            : <li>No top level categories have been added yet</li>
        }
      </ul>
    </Flipper>
  )
}

export default CategoryList;
