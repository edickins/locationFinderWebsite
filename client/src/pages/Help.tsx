import yourLocationImage from '../assets/images/nearest_location.png';

// https://locationfinder.bleepbloop.net/?userLocation=%7B%22lat%22%3A50.8219806%2C%22lng%22%3A-0.1424413%7D&locationID=location035

function Help() {
  return (
    <div className='mx-auto mt-20 w-full max-w-6xl px-4 md:px-8 md:py-4'>
      <h3 className='mb-4 text-2xl text-light-primary-color dark:text-dark-primary-color'>
        How to use this website.
      </h3>
      {/* intro */}
      <p className='mb-4'>
        This website does not use cookies and your location is not saved between
        visits.
      </p>
      <p className='mb-4'>
        Welcome to the website of the Brighton and Hove Public Toilet Finder, a
        handy app that helps you locate the nearest public toilet in Brighton
        and Hove. This app is designed for use on mobile devices, but you can
        also access it on a desktop. Here&apos;s how to use it:
      </p>
      <p className='mb-4'>
        When you open the website, you will see a map with the locations of
        public toilets displayed using markers. You will also see a button
        labelled &quot;Find my nearest toilet&quot; at the top of the screen.
      </p>
      {/* Adding your location to the map. */}
      <h3 className='mb-4 text-2xl text-light-primary-color dark:text-dark-primary-color'>
        Adding your location to the map.
      </h3>
      <p className='mb-4'>
        The website will ask you to share your location - we need this so we can
        find your nearest toilet. If you agree (and you are within the area
        covered by the map), the map will show your location with a marker
        saying &quot;You are here&quot;. If you don&apos;t agree or you are
        outside the area, you can still explore each of the toilets on the map,
        and use the app by entering a postcode, street name or toilet amenity in
        the search panel at the top of the screen.
      </p>
      {/* Finding your nearest public toilet. */}
      <h3 className='mb-4 text-2xl text-light-primary-color dark:text-dark-primary-color'>
        Finding your nearest public toilet.
      </h3>
      <p className='mb-4'>
        The map has a button labelled{' '}
        <span className='font-bold'>&quot;find my nearest toilet&quot;</span>.
        If you click on this button the nearest public toilet to your location
        will be displayed. You can also see other toilets nearby by zooming in
        or out on the map.
      </p>
      {/* get directions to your nearest public toilet. */}
      <h3 className='mb-4 text-2xl text-light-primary-color dark:text-dark-primary-color'>
        Get directions to your nearest public toilet.
      </h3>
      <p className='mb-4'>
        If your location has been provided, you can get directions to any
        selected toilet by clicking on the{' '}
        <span className='font-bold'>
          &quot;click to get directions on google maps&quot;
        </span>{' '}
        button in the details panel at the bottom of the screen.
      </p>
      {/* the details panel */}
      <h3 className='mb-4 text-2xl text-light-primary-color dark:text-dark-primary-color'>
        Get details about any toilet.
      </h3>
      <p className='mb-4'>
        To view more details about a toilet, tap on its marker on the map and
        then open panel at the bottom of the screen to find out more about this
        location. The panel will expand and show you the name, address, opening
        times and facilities of that toilet, as well as providing a link to the
        nearest alternative toilet. If the toilet is currently closed this will
        be shown on the panel above the opening hours.
      </p>

      <p className='mb-4'>
        To filter the toilets by facilities, such as baby changing, disabled
        access or family rooms, tap on the &quot;Filter&quot; button. You will
        see a list of facilities that you can check or uncheck to highlight the
        toilets that match your preferences on the map.
      </p>
      {/* img showing location on the map */}
      <figure>
        <img
          src={yourLocationImage}
          alt='your location shown on a map with a route to the nearest toilet shown in blue'
          className='mb-4 px-8'
        />
        <figcaption className='mb-8 px-8 text-center text-sm italic'>
          Screenshot of the website showing the user&apos;s location and the
          nearest public toilet, with the route displayed.
        </figcaption>
      </figure>
      <p className='mb-4'>
        To save a toilet as a favourite, tap on its marker on the map. Open the
        panel at the bottom of the screen, you will also see a star icon next to
        the name. Tap on the star to add that toilet to your favourites list.
        You can access your favourites list by tapping on the
        &quot;Favourites&quot; panel at the bottom right of the screen.
      </p>
    </div>
  );
}

export default Help;
