import userLocationImage from '../assets/images/mobile_user_location.png';
import nearestLocationImage from '../assets/images/mobile_nearest_location.png';
import detailsPanelImage from '../assets/images/mobile_details_panel.png';
import filterPanelImage from '../assets/images/mobile_filters.png';
import favouritesPanelImage from '../assets/images/mobile_favourites.png';

import userLocationImageDark from '../assets/images/mobile_user_location_dark.png';
import nearestLocationImageDark from '../assets/images/mobile_nearest_location_dark.png';
import detailsPanelImageDark from '../assets/images/mobile_details_panel_dark.png';
import filterPanelImageDark from '../assets/images/mobile_filters_dark.png';
import favouritesPanelImageDark from '../assets/images/mobile_favourites_dark.png';

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

      {/* Adding your location to the map. */}
      <div className='md:flex'>
        <div className='md:w-1/2'>
          <h3 className='mb-4 text-2xl text-light-primary-color dark:text-dark-primary-color'>
            Adding your location to the map.
          </h3>

          <p className='mb-4'>
            This app will ask you to share your location when it first loads -
            we need your location so we can find your nearest toilet. If you
            agree (and you are within the area covered by the map), the map will
            show your location with a marker saying{' '}
            <span className='font-semibold'>&quot;You are here&quot;</span>.
          </p>
          {/* img showing location on the map */}
          <figure className='md:hidden'>
            <img
              src={
                window.matchMedia('(prefers-color-scheme:light').matches
                  ? userLocationImage
                  : userLocationImageDark
              }
              alt='screenshot showing your location shown on the map'
              className='mx-auto mb-4 px-8  md:max-h-72'
            />
            <figcaption className='mb-8 px-8 text-center text-sm italic'>
              Screenshot of the user&apos;s location.
            </figcaption>
          </figure>
          <p className='mb-4'>
            If you don&apos;t agree or you are outside the area covered by this
            app, you can still use the map and the tools we provide to explore
            all of the toilets on the map. You can even search for a location by
            entering a postcode, street name or toilet amenity in the search
            panel at the top of the screen.
          </p>
        </div>
        <figure className='md:w-1/2'>
          <img
            src={
              window.matchMedia('(prefers-color-scheme:light').matches
                ? userLocationImage
                : userLocationImageDark
            }
            alt='screenshot showing your location shown on the map'
            className='mx-auto mb-4 px-8  md:max-h-72'
          />
          <figcaption className='mb-8 px-8 text-center text-sm italic'>
            Screenshot of the user&apos;s location.
          </figcaption>
        </figure>
      </div>

      {/* Finding your nearest public toilet. */}
      <div className='md:flex'>
        <div className='md:w-1/2'>
          <h3 className='mb-4 text-2xl text-light-primary-color dark:text-dark-primary-color'>
            Finding your nearest public toilet.
          </h3>
          <p className='mb-4'>
            The map has a button labelled{' '}
            <span className='font-semibold'>
              &quot;find my nearest toilet&quot;
            </span>
            . If you click on this button and have shared your location the
            nearest public toilet will be displayed. You can also see other
            toilets nearby by zooming in or out on the map.
          </p>
        </div>
        {/* img showing nearest location on the map */}
        <figure className='md:w-1/2'>
          <img
            src={
              window.matchMedia('(prefers-color-scheme:light').matches
                ? nearestLocationImage
                : nearestLocationImageDark
            }
            alt='screen shot showing your location shown on the map next to your nearest toilet'
            className='mx-auto mb-4 px-8 md:max-h-72'
          />
          <figcaption className='mb-8 px-8 text-center text-sm italic'>
            Screenshot of the user&apos;s location and the nearest toilet.
          </figcaption>
        </figure>
      </div>

      {/* get directions to your nearest public toilet. */}
      <div className='md:flex'>
        <div className='md:w-1/2'>
          <h3 className='mb-4 text-2xl text-light-primary-color dark:text-dark-primary-color'>
            Get directions to your nearest public toilet.
          </h3>
          <p className='mb-4'>
            If your location has been provided, you can get directions to any
            selected toilet by clicking on the{' '}
            <span className='font-semibold'>
              &quot;click to get directions on google maps&quot;
            </span>{' '}
            button in the details panel at the bottom of the screen.
          </p>
        </div>
      </div>

      {/* the details panel */}
      <div className='md:flex'>
        <div className='md:w-1/2'>
          <h3 className='mb-4 text-2xl text-light-primary-color dark:text-dark-primary-color'>
            Get details about any toilet.
          </h3>
          <p className='mb-4'>
            To view all details about a toilet, tap on a marker on the map and
            then open panel at the bottom of the screen to find out more about
            this location.
          </p>
          <p className='mb-4'>
            The panel will expand and show you the name, address, opening times
            and facilities of that toilet, as well as providing a link to the
            nearest alternative toilet. If the toilet is currently closed this
            will be shown on the panel above the opening hours.
          </p>
        </div>
        {/* img showing the detail panel */}
        <figure className='md:w-1/2'>
          <img
            src={
              window.matchMedia('(prefers-color-scheme:light').matches
                ? detailsPanelImage
                : detailsPanelImageDark
            }
            alt='screenshot showing the details panel'
            className='mx-auto mb-4 px-8 md:max-h-72'
          />
          <figcaption className='mb-8 px-8 text-center text-sm italic'>
            Screenshot of the details panel.
          </figcaption>
        </figure>
      </div>

      {/* using the filter panel */}
      <div className='md:flex'>
        <div className='md:w-1/2'>
          <h3 className='mb-4 text-2xl text-light-primary-color dark:text-dark-primary-color'>
            Finding toilets that meet your requirements.
          </h3>
          <p className='mb-4'>
            To filter the toilets by facilities, such as baby changing, disabled
            access or family rooms, tap on the{' '}
            <span className='font-semibold'>&quot;Filter&quot;</span> button.
            You will see a list of facilities that you can check or uncheck to
            highlight the toilets that match your preferences on the map.
          </p>
        </div>

        {/* img showing the filter panel */}
        <figure className='md:w-1/2'>
          <img
            src={
              window.matchMedia('(prefers-color-scheme:light').matches
                ? filterPanelImage
                : filterPanelImageDark
            }
            alt='screenshot showing the filters panel'
            className='mx-auto mb-4 px-8 md:max-h-72'
          />
          <figcaption className='mb-8 px-8 text-center text-sm italic'>
            Screenshot of the filters panel.
          </figcaption>
        </figure>
      </div>

      {/* adding a toilet as a favourite */}
      <div className='md:flex'>
        <div className='md:w-1/2'>
          <h3 className='mb-4 text-2xl text-light-primary-color dark:text-dark-primary-color'>
            Adding a toilet as a favorite.
          </h3>
          <p className='mb-4'>
            To save a toilet as a favourite, tap on its marker on the map. Open
            the panel at the bottom of the screen, you will also see a star icon
            next to the name. Tap on the star to add that toilet to your
            favourites list. You can access your favourites list by clicking on
            the
            <span className='font-semibold'>&quot;Favourites&quot;</span>{' '}
            button.
          </p>
        </div>
        {/* img showing the favourites panel */}
        <figure className='md:w-1/2'>
          <img
            src={
              window.matchMedia('(prefers-color-scheme:light').matches
                ? favouritesPanelImage
                : favouritesPanelImageDark
            }
            alt='screenshot showing the detail panel with a favourite toilet selected'
            className='mx-auto mb-4 px-8 md:max-h-72'
          />
          <figcaption className='mb-8 px-8 text-center text-sm italic'>
            Screenshot of a toilet selected as a favourite.
          </figcaption>
        </figure>
      </div>
    </div>
  );
}

export default Help;
