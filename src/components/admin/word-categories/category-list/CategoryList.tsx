import React, { useState } from 'react';
import { Flipper, Flipped } from "react-flip-toolkit";

interface TopLevelCategories {
  [id: string]: {
    name: string,
    subcategories: string[]
  }
}

const CategoryList = ({ categories } : { categories: TopLevelCategories }) => {
  const [focusedIndex, setFocusedIndex] = useState<null | number>(null);

  console.log(categories);

  const renderCategories = () : JSX.Element[] => {
    const categoryIds = Object.keys(categories);
    return categoryIds.map((id: string, index: number) : JSX.Element => (
      <li key={index}>
        <Flipped
          flipId={`category-${index}`}
          stagger="card"
        >
          <div>{categories[id].name}</div>
        </Flipped>
      </li>
    ));
  }

  return (
    <Flipper
      flipKey={focusedIndex}
      className="categories"
      spring="gentle"
      staggerConfig={{
        card: {
          reverse: focusedIndex !== null
        }
      }}
      decisionData={focusedIndex}
    >
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
