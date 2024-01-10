import { useState, useCallback, useEffect, PropsWithChildren } from 'react';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface Props extends PropsWithChildren {
  hidePanel: () => void;
  showPanel: () => void;
  upIcon?: IconDefinition;
  downIcon?: IconDefinition;
  isPanelOpen: boolean;
}

function CloseDetailPanelButton({
  hidePanel,
  showPanel,
  upIcon,
  downIcon,
  isPanelOpen,
  children
}: Props) {
  const [buttonIcon, setButtonIcon] = useState<IconDefinition>();

  useEffect(() => {
    if (upIcon && downIcon) {
      if (isPanelOpen) {
        setButtonIcon(downIcon);
      } else {
        setButtonIcon(upIcon);
      }
    }
  }, [downIcon, isPanelOpen, upIcon]);

  const clickHandler = useCallback(() => {
    const doShowPanel = () => {
      showPanel();
    };

    const doHidePanel = () => {
      hidePanel();
    };

    if (isPanelOpen) {
      doHidePanel();
    } else {
      doShowPanel();
    }
  }, [isPanelOpen, hidePanel, showPanel]);

  return (
    <button type='button' onClick={clickHandler} className='flex items-center'>
      {buttonIcon && (
        <FontAwesomeIcon
          icon={buttonIcon}
          className='hover:fa-solid ml-2 text-lg'
        />
      )}
      {children}
    </button>
  );
}

CloseDetailPanelButton.defaultProps = {
  upIcon: undefined,
  downIcon: undefined
};

export default CloseDetailPanelButton;
