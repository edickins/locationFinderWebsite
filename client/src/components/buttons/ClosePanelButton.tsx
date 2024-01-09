import { useState, useCallback, useEffect } from 'react';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type Props = {
  hidePanel: () => void;
  showPanel: () => void;
};

function ClosePanelButton({ hidePanel, showPanel, children }: Props) {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [buttonIcon, setButtonIcon] = useState(faChevronUp);

  useEffect(() => {
    if (isPanelOpen) {
      setButtonIcon(faChevronDown);
    } else {
      setButtonIcon(faChevronUp);
    }
  }, [isPanelOpen]);

  const clickHandler = useCallback(() => {
    const doShowPanel = () => {
      showPanel();
      setIsPanelOpen(true);
    };

    const doHidePanel = () => {
      hidePanel();
      setIsPanelOpen(false);
    };

    if (isPanelOpen) {
      doHidePanel();
    } else {
      doShowPanel();
    }
  }, [isPanelOpen, hidePanel, showPanel]);

  return (
    <button type='button' onClick={clickHandler} className='flex items-center'>
      {isPanelOpen ? 'hide details' : 'show details'}
      <FontAwesomeIcon
        icon={buttonIcon}
        className='hover:fa-solid ml-2 text-lg'
      />
    </button>
  );
}

export default ClosePanelButton;
