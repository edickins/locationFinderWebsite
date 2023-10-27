import { useRef } from 'react';
import { useToiletsContext } from '../context/toiletContext/toiletsContext';
import FacilitiesList from './FacilitiesList';

function Filter() {
  const { facilities } = useToiletsContext();

  console.log(facilities);

  const facilitiesListRef = useRef<HTMLElement | null>(null);

  const handleFilterClick = () => {
    if (facilitiesListRef.current) {
      facilitiesListRef.current.classList.toggle('hidden');
      facilitiesListRef.current.classList.toggle('block');
    }
  };

  return (
    <div
      id='filter-container'
      className='absolute left-0 right-0 top-0 bg-black'
    >
      <nav
        id='filter-nav'
        aria-label='filter controls'
        className='flex gap-4 p-4'
      >
        <input
          type='text'
          name='search'
          id='search'
          placeholder='search location...'
          className='rounded-md px-2'
        />
        <button type='button' onClick={handleFilterClick}>
          filter
        </button>
        <button type='button'>Find a toilet near me</button>
      </nav>
      <section id='filters-container'>
        <section
          id='facilities-container'
          ref={facilitiesListRef}
          className='hidden p-4'
        >
          <h2 className='text-2xl'>Filter by facilities</h2>
          <FacilitiesList
            facilities={facilities}
            handleFilterClick={handleFilterClick}
          />
        </section>
      </section>
    </div>
  );
}

export default Filter;
