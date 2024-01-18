import { useState, useCallback, useEffect, PropsWithChildren } from 'react';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface Props extends PropsWithChildren {
  hidePanel: () => void;
  showPanel: () => void;
  upIcon?: IconDefinition;
  downIcon?: IconDefinition;
  isPanelOpen: boolean;
  title: string;
}

function CloseDetailPanelButton({
  hidePanel,
  showPanel,
  upIcon,
  downIcon,
  isPanelOpen,
  children,
  title
}: Props) {
  const [buttonIcon, setButtonIcon] = useState<IconDefinition>();
  const [buttonText, setButtonText] = useState('');

  useEffect(() => {
    if (upIcon && downIcon) {
      if (isPanelOpen) {
        setButtonIcon(downIcon);
        setButtonText('click to see less');
      } else {
        setButtonIcon(upIcon);
        setButtonText('click to see more');
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
    <>
      <button
        type='button'
        onClick={clickHandler}
        title={title}
        className={`flex items-center rounded-md border-2 ${
          children
            ? `border-none`
            : `hover:slate-100 border-white bg-light-secondary-color text-white hover:border-light-secondary-color hover:bg-slate-100 hover:text-light-secondary-color dark:border-white dark:bg-light-secondary-color dark:text-white  dark:hover:border-light-secondary-color dark:hover:bg-white  dark:hover:text-light-secondary-color`
        }`}
      >
        <span className='mx-2 text-sm'>{buttonText}</span>
        {buttonIcon && (
          <FontAwesomeIcon
            icon={buttonIcon}
            className='hover:fa-solid m-1 text-xs md:m-2 md:text-xl'
          />
        )}
        {children}
      </button>
    </>
  );
}

CloseDetailPanelButton.defaultProps = {
  upIcon: undefined,
  downIcon: undefined
};

export default CloseDetailPanelButton;
