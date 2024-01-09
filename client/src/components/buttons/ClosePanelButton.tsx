import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type Props = {
  hidePanel: () => void;
  isPanelOpen: boolean;
  children?: string;
};

function ClosePanelButton({ hidePanel, isPanelOpen, children }: Props) {
  if (!isPanelOpen) return null;
  return (
    <button type='button' onClick={hidePanel} className='flex items-center'>
      {children}
      <FontAwesomeIcon
        icon={faCircleXmark}
        className='hover:fa-solid ml-2 text-lg'
      />
    </button>
  );
}

ClosePanelButton.defaultProps = {
  children: ''
};

export default ClosePanelButton;
