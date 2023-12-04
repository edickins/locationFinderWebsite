import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function FindToiletNearMeButton() {
  return (
    <button
      type='button'
      className='mx-auto text-sm dark:text-dark-primary-color'
    >
      <FontAwesomeIcon icon={faMagnifyingGlass} className='ml-1 text-xs' />
      <span>Find a toilet near me</span>
    </button>
  );
}

export default FindToiletNearMeButton;
