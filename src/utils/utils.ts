import { ApiWord, Meaning, Definitions } from "../components/models/models";

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
          selected: true,
        });
      });
    });

    definitions.push(newDefinition);
  })

  return definitions;
}
