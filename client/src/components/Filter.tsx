import { useRef, useState } from 'react';
import { useToiletsContext } from '../context/toiletContext/toiletsContext';
import SearchLocation from './SearchLocation';
import FilterButton from './FilterButton';
import FindToiletNearMeButton from './FindToiletNearMeButton';
import FilterSectionFacilities from './FilterSectionFacilities';
import FilterSectionSearch from './FilterSectionSearch';

function Filter() {
  const { facilities } = useToiletsContext();
  const [isFilterActive, setIsFilterActive] = useState(false);

  console.log(facilities);

  const filtersContainerRef = useRef<HTMLElement | null>(null);
  const searchResultsRef = useRef<HTMLElement | null>(null);

  const handleFilterClick = () => {
    console.log(filtersContainerRef.current);
    if (filtersContainerRef.current) {
      filtersContainerRef.current.classList.toggle('hidden');
      filtersContainerRef.current.classList.toggle('block');
      setIsFilterActive(!isFilterActive);
    }
  };

  return (
    <div
      id='filter-container'
      className='bg-dark-panel absolute left-0 right-0 top-0'
    >
      <nav
        id='filter-nav'
        aria-label='filter controls'
        className='flex flex-col gap-4 p-4'
      >
        <div className='flex justify-between'>
          <FilterButton
            handleFilterClick={handleFilterClick}
            isFilterActive={isFilterActive}
          />
          <FindToiletNearMeButton />
        </div>
        <div className='flex justify-center'>
          <SearchLocation />
        </div>
      </nav>

      <section
        id='filters-container'
        ref={filtersContainerRef}
        className='hidden'
      >
        <FilterSectionSearch />
        <FilterSectionFacilities
          facilities={facilities}
          handleFilterClick={handleFilterClick}
        />
      </section>
    </div>
  );
}

export default Filter;
