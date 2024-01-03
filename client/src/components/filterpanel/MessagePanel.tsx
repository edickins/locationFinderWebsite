import ClosePanelButton from '../buttons/ClosePanelButton';

type Props = {
  title: string;
  message: string;
  hideMessagePanelContainer: () => void;
};

function MessagePanel({ title, message, hideMessagePanelContainer }: Props) {
  return (
    <div
      id='message-panel'
      className='relative flex max-w-sm flex-col rounded-md border-4 bg-gray-500  py-2 pt-0'
    >
      <div className='absolute right-2 top-2'>
        <ClosePanelButton onClick={hideMessagePanelContainer} isPanelOpen>
          close
        </ClosePanelButton>
      </div>
      <h2 className='mb-2 bg-gray-600 p-2 pr-20 text-lg font-semibold'>
        {title}
      </h2>
      <p className='px-2'>{message}</p>
    </div>
  );
}

export default MessagePanel;
