import { useCallback, useEffect, useRef } from 'react';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MessagePanel from './filterpanel/MessagePanel';

type Props = {
  showLoadingLayer: boolean;
  findLocationError: { messageTitle: string; message: string } | undefined;
};

function LoadingLayer({ showLoadingLayer, findLocationError }: Props) {
  const loadingLayerRef = useRef<HTMLDivElement>(null);
  const messagePanelContainerRef = useRef<HTMLDivElement>(null);

  const doShowLoadingLayer = useCallback(() => {
    if (loadingLayerRef.current !== null) {
      loadingLayerRef.current.classList.remove('hidden');
      loadingLayerRef.current.classList.add('grid');
    }
  }, []);

  const doHideLoadingLayer = useCallback(() => {
    if (loadingLayerRef.current !== null) {
      loadingLayerRef.current.classList.add('hidden');
      loadingLayerRef.current.classList.remove('grid');
    }
  }, []);

  const doHideMessageLayer = useCallback(() => {
    if (messagePanelContainerRef.current !== null) {
      messagePanelContainerRef.current.classList.add('hidden');
      messagePanelContainerRef.current.classList.remove('grid');
    }
  }, []);
  const doShowMessageLayer = useCallback(() => {
    if (messagePanelContainerRef.current !== null) {
      messagePanelContainerRef.current.classList.remove('hidden');
      messagePanelContainerRef.current.classList.add('grid');
    }
  }, []);

  useEffect(() => {
    if (!loadingLayerRef.current) return;
    if (showLoadingLayer) {
      doShowLoadingLayer();
    } else {
      doHideLoadingLayer();
    }
  }, [doHideLoadingLayer, doShowLoadingLayer, showLoadingLayer]);

  useEffect(() => {
    if (!messagePanelContainerRef.current || findLocationError === undefined)
      return;
    if (findLocationError !== undefined) {
      doShowMessageLayer();
    }
  }, [doShowMessageLayer, findLocationError]);

  return (
    <div>
      <div
        id='loading_layer'
        ref={loadingLayerRef}
        className='absolute bottom-0 left-0 right-0 top-0 grid content-center justify-center bg-gray-800 bg-opacity-80'
      >
        <p className=' mb-8 text-2xl md:text-4xl'>
          ...loading your location...
        </p>
        <div className='rotateDiv  text-center  text-6xl'>
          <FontAwesomeIcon icon={faSpinner} />
        </div>
      </div>
      <div
        id='message-panel-container'
        className='absolute bottom-0 left-0 right-0 top-0 z-50 hidden h-full w-full content-center justify-items-center bg-red-500 bg-opacity-50'
        ref={messagePanelContainerRef}
      >
        {findLocationError && (
          <MessagePanel
            title={findLocationError?.messageTitle}
            message={findLocationError?.message}
            hideMessagePanelContainer={doHideMessageLayer}
          />
        )}
      </div>
    </div>
  );
}

export default LoadingLayer;
