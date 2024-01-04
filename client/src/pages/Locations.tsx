import Location from '../components/Location';
import { useLocationsContext } from '../context/locationContext/locationsContext';
import { ILocation } from '../context/locationContext/types';
import createFilter from '../services/createFilter';

function Locations() {
  const {
    state: { locations }
  } = useLocationsContext();

  let filterFn = (item: ILocation) =>
    item.open_status.toLocaleLowerCase() === 'closed';
  const filterForClosed = createFilter(filterFn);
  const closedLocations = filterForClosed(locations);

  filterFn = (item: ILocation) =>
    item.open_status.toLocaleLowerCase() === 'closed for winter';
  const filterForClosedForWinter = createFilter(filterFn);
  const closedForWinterLocations = filterForClosedForWinter(locations);

  filterFn = (item: ILocation) =>
    item.open_status.toLocaleLowerCase() === 'open';
  const filterForOpenLocations = createFilter(filterFn);
  const openLocations = filterForOpenLocations(locations);

  filterFn = (item: ILocation) =>
    item.location.toLocaleLowerCase() === 'city_centre';
  const filterForOpenCityCenterLocations = createFilter(filterFn);
  const openCityCenterLocations =
    filterForOpenCityCenterLocations(openLocations);

  filterFn = (item: ILocation) => item.location.toLocaleLowerCase() === 'hove';
  const filterForOpenHoveLocations = createFilter(filterFn);
  const openHoveLocations = filterForOpenHoveLocations(openLocations);

  return (
    <div className='mx-auto mt-20 max-w-6xl px-4 md:px-2'>
      <h3 className='mb-4 text-2xl  dark:text-dark-primary-color'>
        Toilets in Brighton and Hove.
      </h3>
      <p className='mb-4 text-lg'>
        These are the public toilets in Brighton and Hove. Some are purpose
        built public toilets and others are toilets available to the public in
        council run properties.
      </p>
      <p className='mb-4'>
        The information used was copied from the Brighton and Hove County
        Council webpage that lists the addresses and opening times for public
        toilets in the Brighton and Hove area which can be found here (all
        rights reserved):{' '}
        <a
          href='https://www.brighton-hove.gov.uk/libraries-leisure-and-arts/public-toilets/list-public-toilets-brighton-hove'
          target='_blank'
          rel='noopener noreferrer'
          className='light-primary-color dark:text-dark-secondary-color'
        >
          https://www.brighton-hove.gov.uk/libraries-leisure-and-arts/public-toilets/list-public-toilets-brighton-hove
        </a>
        .
      </p>
      <p>
        Please check opening times. Some locations are currently closed - these
        are listed at the top of the page.{' '}
      </p>

      <nav className='mt-4'>
        <p className=' text-xl font-semibold dark:text-dark-primary-color'>
          Quick links:
        </p>
        <p className='my-2'>
          <a href='#closed'>Toilets currently closed</a>
        </p>
        <p className='my-2'>
          <a href='#closed_for_winter'>Toilets currently closed for Winter</a>
        </p>
        <p className='my-2'>
          <a href='#city_centre'>Brighton toilets</a>
        </p>
        <p className='my-2'>
          <a href='#hove'>Hove toilets</a>
        </p>
      </nav>

      {closedLocations.length > 0 && (
        <p
          className='mt-8 scroll-m-20 text-xl font-semibold dark:text-dark-primary-color'
          id='closed'
        >
          Toilets currently closed.
        </p>
      )}
      {closedLocations.length > 0 &&
        closedLocations.map((location, index) => {
          return (
            <Location
              location={location}
              key={location.id}
              mtValue={index === 0 ? 4 : 8}
            />
          );
        })}
      <hr className='mt-8' />
      <p className='text-center'>
        <a href='#top'>
          <i className='fa-solid fa-arrow-up-from-bracket mr-4 mt-4' />
          back to top
        </a>
      </p>

      {closedForWinterLocations.length > 0 && (
        <p
          className='mt-8 scroll-m-20 text-xl font-semibold dark:text-dark-primary-color'
          id='closed_for_winter'
        >
          Toilets currently closed for Winter.
        </p>
      )}
      {closedForWinterLocations.length > 0 &&
        closedForWinterLocations.map((location, index) => {
          return (
            <Location
              location={location}
              key={location.id}
              mtValue={index === 0 ? 4 : 8}
            />
          );
        })}
      <hr className='mt-8' />
      <p className='text-center'>
        <a href='#top'>
          <i className='fa-solid fa-arrow-up-from-bracket mr-4 mt-4' />
          back to top
        </a>
      </p>

      {openCityCenterLocations.length > 0 && (
        <p
          className='mt-8 scroll-m-20 text-xl font-semibold dark:text-dark-primary-color'
          id='city_centre'
        >
          Open toilets in Brighton city centre
        </p>
      )}
      {openCityCenterLocations.length > 0 &&
        openCityCenterLocations.map((location, index) => {
          return (
            <Location
              location={location}
              key={location.id}
              mtValue={index === 0 ? 4 : 8}
            />
          );
        })}
      <hr className='mt-8' />
      <p className='text-center'>
        <a href='#top'>
          <i className='fa-solid fa-arrow-up-from-bracket mr-4 mt-4' />
          back to top
        </a>
      </p>

      {openHoveLocations.length > 0 && (
        <p
          className='mt-8 scroll-m-20 text-xl font-semibold dark:text-dark-primary-color'
          id='hove'
        >
          Open toilets in Hove
        </p>
      )}
      {openHoveLocations.length > 0 &&
        openHoveLocations.map((location, index) => {
          return (
            <Location
              location={location}
              key={location.id}
              mtValue={index === 0 ? 4 : 8}
            />
          );
        })}
    </div>
  );
}

export default Locations;
