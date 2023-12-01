type Props = {
  onClick: () => void;
  isPanelOpen: boolean;
};

function ClosePanelButton({ onClick, isPanelOpen }: Props) {
  if (!isPanelOpen) return null;
  return (
    <div>
      <button type='button' onClick={onClick}>
        <i className='fa-regular hover:fa-solid fa-circle-xmark text-lg' />
      </button>
    </div>
  );
}

export default ClosePanelButton;
