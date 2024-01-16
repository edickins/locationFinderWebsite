type Props = {
  showMessage: boolean;
};

function ClickToSeeDetailsPrompt({ showMessage }: Props) {
  return showMessage ? (
    <div className='absolute -top-10 right-2 grid content-center justify-center border-2 border-white bg-black px-4 py-2 text-sm text-white'>
      open this panel to see details for this location
    </div>
  ) : null;
}

export default ClickToSeeDetailsPrompt;
