import { useRef, useEffect } from 'react';
import MessagePanel from './MessagePanel';

type Props = {
  messageDialogueProps: { messageTitle: string; message: string };
};

function MessagePanelContainer({ messageDialogueProps }: Props) {
  const messagePanelContainerRef = useRef<HTMLDivElement>(null);

  const showMessagePanelContainer = () => {
    if (!messagePanelContainerRef.current) return;
    messagePanelContainerRef.current.classList.toggle('hidden');
    messagePanelContainerRef.current.classList.toggle('grid');
  };

  const hideMessagePanelContainer = () => {
    if (!messagePanelContainerRef.current) return;
    messagePanelContainerRef.current.classList.toggle('hidden');
    messagePanelContainerRef.current.classList.toggle('grid');
  };

  useEffect(() => {
    hideMessagePanelContainer();
  }, []);

  useEffect(() => {
    if (
      messageDialogueProps.message !== '' &&
      messageDialogueProps.messageTitle !== ''
    ) {
      showMessagePanelContainer();
    }
  }, [messageDialogueProps]);

  return (
    <div
      id='message-panel-container'
      className='absolute bottom-0 left-0 right-0 top-0 z-50 hidden h-full w-full content-center justify-items-center bg-red-500 bg-opacity-50'
      ref={messagePanelContainerRef}
    >
      <MessagePanel
        title={messageDialogueProps.messageTitle}
        message={messageDialogueProps.message}
        hideMessagePanelContainer={hideMessagePanelContainer}
      />
    </div>
  );
}

export default MessagePanelContainer;
