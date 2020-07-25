import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react';
import 'tippy.js/themes/light-border.css';
import 'tippy.js/dist/tippy.css';
import './DeleteButton.scss';

export type DeleteFunction = () => void;

export interface DeleteProps {
  disabled: boolean,
  deleteFunction: DeleteFunction,
}

const DeleteButton = ({ disabled, deleteFunction }: DeleteProps): JSX.Element => {
  const [buttonRef, setButtonRef] = useState<HTMLButtonElement | null>(null);
  
  const confirmClick = () : void => {
    buttonRef?.click();
    deleteFunction()
  }

  const cancelClick = () : void => {
    buttonRef?.click();
  }

  const confirmPopover = 
    <div className="confirm-popover">
      <div className="confirm-popover__message">Are you sure?</div>
      <div className="confirm-popover__button-container">
        <button className="confirm-popover__yes-button" onClick={confirmClick}>Yes</button>
        <button className="confirm-popover__no-button" onClick={cancelClick}>No</button>
      </div>
    </div>
  ;

  return (
    <div className="popover-button-container">
      <Tippy
        content={confirmPopover}
        interactive={true}
        trigger="click"
        theme="light-border"
      >
        <button ref={setButtonRef} title="Delete" disabled={disabled}>
          <FontAwesomeIcon icon={faTrashAlt} />
        </button>
      </Tippy>
    </div>
  )
}

export default DeleteButton;
