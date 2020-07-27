/* Enums */
export enum CategoryTypes {
  Top = 'Category',
  Sub = 'Subcategory',
}

/* Types and Interfaces */

export interface Category {
  id: string,
  name: string,
  createdAt: any,
}

export interface CategoryDocument {
  name: string,
  createdAt: any,
  parent?: string,
}

export type CategoryClickFunction = (id: string) => void;
export type ShouldFlipFunction = (id: string) => (prevDecisionData: string, currentDecisionData: string) => boolean;

export interface CategoryCardProps {
  type: CategoryTypes,
  categoryId: string,
  category: Category,
  categoryClicked: CategoryClickFunction,
  shouldFlip: ShouldFlipFunction,
  setSuccessMessage: React.Dispatch<React.SetStateAction<string>>,
}
