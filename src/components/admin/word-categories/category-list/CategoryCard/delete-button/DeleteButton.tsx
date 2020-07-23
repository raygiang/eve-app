import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react';
import 'tippy.js/themes/light-border.css';
import 'tippy.js/dist/tippy.css';
import './DeleteButton.scss';

const DeleteButton = () : JSX.Element => {
  const [disabled, setDisabled] = useState<boolean>(true);
  const [buttonRef, setButtonRef] = useState<HTMLButtonElement | null>(null);

  useEffect((): void => {
    setTimeout((): void => {
      setDisabled(false);
    }, 1150)
  }, []);
  
  const cancelClick = () : void => {
    buttonRef?.click();
  }

  const confirmPopover = 
    <div className="confirm-popover">
      <div className="confirm-popover__message">Are you sure?</div>
      <div className="confirm-popover__button-container">
        <button className="confirm-popover__yes-button">Yes</button>
        <button className="confirm-popover__no-button" onClick={cancelClick}>No</button>
      </div>
    </div>
  ;

  return (
    <Tippy
      content={confirmPopover}
      interactive={true}
      trigger="click"
      theme="light-border"
    >
      <button ref={setButtonRef} disabled={disabled}>
        <FontAwesomeIcon icon={faTrashAlt} />
      </button>
    </Tippy>
  )
}

export default DeleteButton;
