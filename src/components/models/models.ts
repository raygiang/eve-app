/* Enums */
export enum CategoryTypes {
  Top = 'Category',
  Sub = 'Subcategory',
  Lang = 'Language',
}

/* Types and Interfaces */

export interface ParamsProps {
  categoryId: string,
  subcategoryId: string,
  groupId: string,
  exerciseId: string,
  languageId: string,
}

export interface MatchProps {
  isExact: boolean,
  params: ParamsProps,
  path: string,
  url: string,
}

export interface CreatedAt {
  seconds: number,
  nanoseconds: number,
}

export interface Category {
  id: string,
  name: string,
  createdAt: CreatedAt,
  parent?: string,
}

export interface CategoryDocument {
  name: string,
  createdAt: Date,
  parent?: string,
  bannerHeading?: string,
  bannerText?: string,
  mainContent?: string,
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
  [word: string]: Word,
}

export interface QuestionList {
  [word: string]: string,
}

export interface Exercise {
  id?: string,
  questions: QuestionList,
  createdAt: CreatedAt,
}

export interface Group {
  id?: string,
  words: WordList,
  createdAt: CreatedAt,
}

export interface HomeLanguage {
  id?: string,
  name: string,
  bannerHeading: string,
  bannerText: string,
  mainContent: string,
  createdAt: CreatedAt,
}
