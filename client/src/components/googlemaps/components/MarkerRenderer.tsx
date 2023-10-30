import { useSearchParams } from 'react-router-dom';
import { IToilet } from '../../../context/toiletContext/types';
import MultiMarker from './MultiMarker';
import { useEffect } from 'react';

type Props = {
  items: IToilet[];
  onMarkerClicked: (id: string) => void;
};

function MarkerRenderer({ items, onMarkerClicked }: Props) {
  const [searchParams] = useSearchParams();
  const filterParams = searchParams.get('filters');
  console.log(filterParams);

  useEffect(() => {
    console.log(searchParams);
  }, [searchParams]);

  return (
    items &&
    items.map((item) => {
      return (
        <MultiMarker
          key={item.id}
          position={item.geometry.location}
          id={item.id}
          isFavourite={item.isFavourite}
          open_status={item.open_status}
          onMarkerClicked={onMarkerClicked}
          data-testid={`marker-${item.id}`}
        />
      );
    })
  );
}

export default MarkerRenderer;
