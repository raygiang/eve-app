import React from 'react';
import CategoryEdit from './edit-form/CategoryEdit';
import { Flipped } from "react-flip-toolkit";
import { CategoryCardProps } from '../../models/models';
import DeleteButton from './delete-button/DeleteButton';
import './Category.scss';

const CategoryCardExpanded = ({ index, category, categoryClicked, shouldFlip } : CategoryCardProps) : JSX.Element => {
  return (
    <Flipped
      flipId={`category-${index}`}
      stagger="card"
      onStart={el => {
        setTimeout(() => {
          el.classList.add("expanded")
        }, 300)
      }}
    >
      <div className="category--expanded">
        <Flipped inverseFlipId={`category-${index}`} shouldInvert={shouldFlip(index)}>
          <div className="category--expanded__content-container">
            <div className="category--expanded__header">
              <Flipped flipId={`heading-${index}`} stagger="card-content" shouldFlip={shouldFlip(index)}>
                <h3 className="category--expanded__name">{category.name}</h3>
              </Flipped>
              <div className="category--expanded__button-container">
                <Flipped flipId={`delete-${index}`} stagger="card-content" shouldFlip={shouldFlip(index)}>
                  <DeleteButton />
                </Flipped>
              </div>
            </div>
            <CategoryEdit index={index} categoryClicked={categoryClicked} />
          </div>
        </Flipped>
      </div>
    </Flipped>
  )
}

export default CategoryCardExpanded;
