import { useRef, useEffect } from 'react';
import MessagePanel from './MessagePanel';
import { useLocationsContext } from '../../context/locationContext/locationsContext';

type Props = {
  messageDialogueProps: { messageTitle: string; message: string };
};

function MessagePanelContainer({ messageDialogueProps }: Props) {
  const { state } = useLocationsContext();

  const messagePanelContainerRef = useRef<HTMLDivElement>(null);

  const showMessagePanelContainer = () => {
    if (!messagePanelContainerRef.current) return;
    messagePanelContainerRef.current.classList.add('grid');
    messagePanelContainerRef.current.classList.remove('hidden');
  };

  const hideMessagePanelContainer = () => {
    if (!messagePanelContainerRef.current) return;
    messagePanelContainerRef.current.classList.add('hidden');
    messagePanelContainerRef.current.classList.remove('grid');
  };

  useEffect(() => {
    hideMessagePanelContainer();
  }, []);

  useEffect(() => {
    if (state.error) {
      if (state.error.message !== '' && state.error.messageTitle !== '') {
        showMessagePanelContainer();
      }
    }
  }, [messageDialogueProps, state.error]);

  return (
    <div
      id='message-panel-container'
      className='absolute bottom-0 left-0 right-0 top-0 z-50 hidden h-full w-full content-center justify-items-center bg-red-500 bg-opacity-50'
      ref={messagePanelContainerRef}
    >
      {state.error && (
        <MessagePanel
          title={state.error?.messageTitle}
          message={state.error?.message}
          hideMessagePanelContainer={hideMessagePanelContainer}
        />
      )}
    </div>
  );
}

export default MessagePanelContainer;
