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
  index: number,
  categoryId: string,
  category: Category,
  categoryClicked: CategoryClickFunction,
  shouldFlip: ShouldFlipFunction,
  setSuccessMessage: React.Dispatch<React.SetStateAction<string>>,
}
