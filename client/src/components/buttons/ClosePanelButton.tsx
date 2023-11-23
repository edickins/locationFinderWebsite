type Props = {
  hideFilterPanel: () => void;
  isPanelOpen: boolean;
};

function ClosePanelButton({ hideFilterPanel, isPanelOpen }: Props) {
  if (!isPanelOpen) return null;
  return (
    <div className='mb-2'>
      <button type='button' onClick={hideFilterPanel}>
        <i className='fa-regular hover:fa-solid fa-circle-xmark text-lg' />
      </button>
    </div>
  );
}

export default ClosePanelButton;
