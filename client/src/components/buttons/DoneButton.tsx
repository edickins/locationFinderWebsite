type Props = {
  hideFilterPanel: () => void;
  isPanelOpen: boolean;
};

function DoneButton({ hideFilterPanel, isPanelOpen }: Props) {
  if (!isPanelOpen) return null;

  return (
    <div className='flex justify-center font-semibold'>
      <button type='button' onClick={hideFilterPanel}>
        Done
      </button>
    </div>
  );
}

export default DoneButton;
