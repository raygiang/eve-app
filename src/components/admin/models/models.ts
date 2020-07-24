/* Enums */
export enum CategoryTypes {
  Top = 'Category',
  Sub = 'Subcategory',
}

/* Types and Interfaces */

export interface Category {
  name: string,
  subcategories: string[]
}

export interface TopLevelCategories {
  [id: string]: Category
}

export type CategoryClickFunction = (index: number) => void;
export type ShouldFlipFunction = (index: number) => (prevDecisionData: number, currentDecisionData: number) => boolean;

export interface CategoryCardProps {
  type: CategoryTypes,
  index: number,
  categoryId: string,
  category: Category,
  categoryClicked: CategoryClickFunction,
  shouldFlip: ShouldFlipFunction,
  setSuccessMessage: React.Dispatch<React.SetStateAction<string>>,
}
