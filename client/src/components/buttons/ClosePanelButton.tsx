type Props = {
  onClick: () => void;
  isPanelOpen: boolean;
};

function ClosePanelButton({ onClick, isPanelOpen }: Props) {
  if (!isPanelOpen) return null;
  return (
    <button type='button' onClick={onClick} className='align-center flex'>
      close{' '}
      <i className='fa-regular hover:fa-solid fa-circle-xmark ml-2 text-lg' />
    </button>
  );
}

export default ClosePanelButton;
