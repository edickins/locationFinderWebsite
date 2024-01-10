import yourLocationImage from '../assets/images/nearest_location.png';

// https://locationfinder.bleepbloop.net/?userLocation=%7B%22lat%22%3A50.8219806%2C%22lng%22%3A-0.1424413%7D&locationID=location035

function Help() {
  return (
    <div className='mx-auto mt-20 w-full max-w-6xl px-4 md:px-2'>
      <h3 className='mb-4 text-2xl text-light-primary-color dark:text-dark-primary-color'>
        How to use this website.
      </h3>
      <p className='mb-4'>
        The Brighton and Hove WC Wayfinder website was built to help users find
        a public toilet close to their current location. Because this website
        only provides information on public toilets in the Brighton and Hove
        area, we do not support users who&apos;s location is outisde of this
        area.
      </p>
      <p className='mb-4'>
        if you decline to allow permissions on your device to use your current
        location this will mean your location is not displayed on the map.
      </p>
      <h3 className='mb-4 text-2xl text-light-primary-color dark:text-dark-primary-color'>
        Finding your nearest public toilet.
      </h3>
      <p className='mb-4'>
        The map has a button labelled{' '}
        <span className='font-bold'>&quot;find my nearest toilet&quot;</span>.
        If you click on this button the nearest public toilet to your location
        will be displayed, along with a route so that you can get to this
        location.
      </p>
      <h3 className='mb-4 text-2xl text-light-primary-color dark:text-dark-primary-color'>
        Adding your location to the map.
      </h3>
      <p className='mb-4'>
        When you are on the map page, you will be asked if you wish to share
        your current location. If your device allows this, your location will be
        displayed on the map with a label showing you your location.
      </p>
      <p className='mb-4'>
        If you wish you can close this label - your location will still be
        displayed.
      </p>
      <p className='mb-4'>
        This website does not use cookies and your location is not saved between
        visits.
      </p>

      <p className='mb-4'>
        If you previously declined to share your location when the map loaded,
        clicking the &quot;find my nearest toilet&quot; button will prompt you
        again and ask if you wish to share your location. If you decline again,
        it will not be possible to calculate the location of your nearest public
        toilet.
      </p>
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
    </div>
  );
}

export default Help;
