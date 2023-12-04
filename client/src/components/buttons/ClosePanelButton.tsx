import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type Props = {
  onClick: () => void;
  isPanelOpen: boolean;
};

function ClosePanelButton({ onClick, isPanelOpen }: Props) {
  if (!isPanelOpen) return null;
  return (
    <button type='button' onClick={onClick} className='flex items-center'>
      close{' '}
      <FontAwesomeIcon
        icon={faCircleXmark}
        className='hover:fa-solid ml-2 text-lg'
      />
    </button>
  );
}

export default ClosePanelButton;
