import { IToilet } from '../../context/toiletContext/types';

type Props = {
  item: IToilet | undefined;
  onNearestAlternativeClick: (id: string | undefined) => void;
};

function DetailPanelNearestAlternative({
  item,
  onNearestAlternativeClick
}: Props) {
  return (
    <section id='nearest-alternative-section'>
      <h1 className='mb-4 text-lg font-bold dark:text-dark-secondary-color'>
        <p className='font-semibold'>Nearest alternative: </p>
        <p
          className='cursor-pointer hover:underline dark:text-white dark:hover:text-dark-primary-color'
          onClick={() => onNearestAlternativeClick(item?.id)}
        >
          {item?.long_name} (click to see on map)
        </p>
      </h1>
    </section>
  );
}

export default DetailPanelNearestAlternative;
