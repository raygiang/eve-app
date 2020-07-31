import React, { useState, useEffect } from 'react';
import { WordList } from '../../../admin/models/models';
import './FocusedWord.scss';
import { isArray } from 'lodash';

interface FocusedWordProps {
  word: string,
  wordInfo: WordList
}

interface DefinitionInterface {
  type: string,
  definition: string,
  example: string,
  image_url: string,
  emoji: string,
}

interface OwlbotMissing {
  message: string,
}

interface OwlbotResults {
  word: string,
  pronunciation: string,
  definition: DefinitionInterface,
}

const FocusedWord = ({ word, wordInfo }: FocusedWordProps) => {
  const [owlbotDef, setOwlbotDef] = useState<any>(null);

  // Get word information from Owlbot
  useEffect((): void => {
    fetch(`https://owlbot.info/api/v4/dictionary/${word}`, {
      method: 'GET',
      headers: {
        'Authorization': 'Token '+ process.env.REACT_APP_OWLBOT_KEY,
      }
    }).then(response => {
      response.json().then((data: any) => setOwlbotDef(data));
    }).catch(error => {
      console.log(error.message);
    });
  }, [word]);

  if(!owlbotDef) {
    return (
      <div className="focused-word">
        <div className="focused-word__spinner-container">
          <div className="focused-word__spinner"></div>
        </div>
      </div>
    );
  }

  const renderOwlbotDefinition = (): JSX.Element => {
    if(isArray(owlbotDef)) {
      return(
        <>
          <div className="focused-word__owlbot-info">
            <p className="focused-word__owlbot-word">Word: {word}</p>
            <p>{owlbotDef[0].message}</p>
          </div>
        </>
      )
    }
    else {
      return (
        <div className="focused-word__owlbot-info">
          <p className="focused-word__owlbot-word">Word: {owlbotDef.word}</p>
          <p className="focused-word__owlbot-pronunciation">Pronunciation: {owlbotDef.pronunciation || 'N/A'}</p>
          <h3>Definitions:</h3>
          <div className="focused-word__owlbot-definition-list">
            {
              owlbotDef.definitions.map((definition: DefinitionInterface, index: number):JSX.Element => (
                <div key={index} className="focused-word__owlbot-definition-container">
                  <div className="focused-word__owlbot-definition-image-container">
                    {
                      definition.image_url
                        ? <img src={definition.image_url} alt={`${owlbotDef.word}`} />
                        : <img src="/undraw_photo.svg" alt="placeholder" />
                    }
                  </div>
                  <div className="focused-word__owlbot-definition-info-container">
                    <h4 className="focused-word__owlbot-definition-heading">Definition {index + 1}</h4>
                    <p className="focused-word__owlbot-definition-type">Type: {definition.type || 'N/A'}</p>
                    <p className="focused-word__owlbot-definition">Definition: {definition.definition || 'N/A'}</p>
                    <p className="focused-word__owlbot-definition-example">Example: {definition.example || 'N/A'}</p>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      )
    }
  };

  return (
    <div className="focused-word">
      <div className="focused-word__definition">
        <h3 className="focused-word__heading">Owlbot Information:</h3>
        { renderOwlbotDefinition() }
      </div>
    </div>
  )
}

export default FocusedWord;
