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
    <button
      type='button'
      onClick={clickHandler}
      title={title}
      className={`flex items-center rounded-md border-2 ${
        children
          ? `border-none`
          : `hover:slate-100 border-light-secondary-color bg-slate-100 text-light-secondary-color hover:border-white hover:bg-light-secondary-color hover:text-white dark:border-white dark:bg-light-secondary-color dark:text-white  dark:hover:border-light-secondary-color dark:hover:bg-white  dark:hover:text-light-secondary-color`
      }`}
    >
      {buttonIcon && (
        <FontAwesomeIcon
          icon={buttonIcon}
          className='hover:fa-solid m-2 text-xs md:text-xl'
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
