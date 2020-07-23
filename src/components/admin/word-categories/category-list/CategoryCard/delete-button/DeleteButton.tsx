import React, { useState, MouseEvent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import './DeleteButton.scss';

const DeleteButton = () : JSX.Element => {
  const [buttonRef, setButtonRef] = useState<HTMLButtonElement | null>(null);
  
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
    >
      <button ref={setButtonRef}>
        <FontAwesomeIcon icon={faTrashAlt} />
      </button>
    </Tippy>
  )
}

export default DeleteButton;
