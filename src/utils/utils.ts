import { ApiWord, Meaning, Definitions, CategoryTypes, CollectionNames, PageTypes } from "../components/models/models";

export const formatDictionaryResults = (data: ApiWord[]): Definitions[] => {
  const definitions: Definitions[] = [];

  data.forEach((wordInfo: ApiWord): void => {
    const newDefinition: Definitions = {
      word: wordInfo.word,
      phonetics: wordInfo.phonetics,
      definitions: [],
    };
    const meanings = wordInfo.meaning;

    Object.keys(meanings).forEach((type: string) => {
      meanings[type].forEach((definition: Meaning) => {
        newDefinition.definitions.push({
          type,
          definition: definition.definition,
          example: definition.example || '',
          synonyms: definition.synonyms || null,
          selected: false,
        });
      });
    });

    definitions.push(newDefinition);
  })

  return definitions;
}

export const getCollectionName = (type: string): string => {
  switch(type) {
    case CategoryTypes.Top:
      return CollectionNames.Categories;
    case CategoryTypes.Sub:
      return CollectionNames.Subcategories;
    case CategoryTypes.Lang:
      return CollectionNames.HomeLanguages;
    case CategoryTypes.Page:
      return CollectionNames.Pages;
    case PageTypes.Language:
      return CollectionNames.HomeLanguages;
    case PageTypes.Contact:
      return CollectionNames.Contact;
    case PageTypes.Page:
      return CollectionNames.Pages;
    default:
      return '';
  }
}
