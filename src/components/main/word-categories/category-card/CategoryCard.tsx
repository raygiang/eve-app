import React from 'react';
import { Link } from 'react-router-dom';
import { Category } from '../../../admin/models/models';
import './CategoryCard.scss';

interface CategoryCardProps {
  category: Category,
}

const CategoryCard = ({ category }: CategoryCardProps): JSX.Element => {
  return (
    <Link to={`/subcategories/${category.id}`} className="category-card">
      <h2 className="category-card__heading">
        {category.name}
      </h2>
    </Link>
  )
}

export default CategoryCard;
