/* Enums */
export enum CategoryTypes {
  Top = 'Category',
  Sub = 'Subcategory',
}

/* Types and Interfaces */

export interface CreatedAt {
  seconds: number,
  nanoseconds: number,
}

export interface Category {
  id: string,
  name: string,
  createdAt: CreatedAt,
}

export interface CategoryDocument {
  name: string,
  createdAt: Date,
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

export interface Word {
  customDefinition: string,
  dictionaryUrl: string,
}

export interface WordList {
  [word: string]: Word
}

export interface Group {
  id: string,
  words: WordList,
  createdAt: CreatedAt
}
