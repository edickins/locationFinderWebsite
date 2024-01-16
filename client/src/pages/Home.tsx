import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import GeoCoder from 'geocoder_node';
import MyMap from '../components/googlemaps/MyMap';
import DetailPanel from '../components/detailpanel/DetailPanel';
import FilterPanel from '../components/filterpanel/FilterPanel';
import FiltersProvider from '../context/filtersContext/filtersContext';
import { useLocationsContext } from '../context/locationContext/locationsContext';
import { ILocation } from '../context/locationContext/types';
import MessagePanelContainer from '../components/filterpanel/MessagePanelContainer';
import useGetScreensize, { ScreenSizeEnum } from '../hooks/getScreensize';
// import getRoute from '../services/getGoogleMapRoute';
// import { LocationActionEnum } from '../reducer/locationReducer/types';
import getUserGeoLocation from '../services/getUserGeoLocation';
import LoadingLayer from '../components/LoadingLayer';
import getUserAndLocationBounds from '../utils/map/getLocationBounds';

type Route = {
  distanceMeters: number;
  duration: string;
  polyline: { encodedPolyline: string };
};

function Home() {
  const screenSize = useGetScreensize();

  // const currentLocationPolyLineRef = useRef<google.maps.Polyline | undefined>();

  const [detailPanelItem, setDetailPanelItem] = useState<ILocation | undefined>(
    undefined
  );
  const [nearestAlternativeItem, setNearestAlternativeItem] = useState<
    ILocation | undefined
  >(undefined);
  const [googleMapRef, setGoogleMapRef] = useState<google.maps.Map | null>(
    null
  );
  const [locationBounds, setLocationBounds] = useState<
    google.maps.LatLngBounds | undefined
  >();
  const [findLocationError, setFindLocationError] = useState<{
    messageTitle: string;
    message: string;
  }>();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [
    locationsOrderedByDistanceFromUser,
    setLocationsOrderedByDistanceFromUser
  ] = useState<{ locationID: string; distance: number }[] | []>([]);

  const [showLoadingLayer, setShowLoadingLayer] = useState(false);
  const [hasRequestedUserLocation, setHasRequestedUserLocation] =
    useState(false);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    state: { locations },
    dispatchLocations
  } = useLocationsContext();

  const onMarkerClicked = useCallback(
    (id: string) => {
      if (id) {
        const newSearchParams = new URLSearchParams(searchParams.toString());
        newSearchParams.set('locationID', id);
        setSearchParams(newSearchParams);
      }
    },
    [searchParams, setSearchParams]
  );

  const doAskForUserLocationOnPageLoad = useCallback(() => {
    setShowLoadingLayer(true);
    getUserGeoLocation(locationBounds, setSearchParams, setFindLocationError);
  }, [locationBounds, setSearchParams]);

  // there was a findLocation error
  useEffect(() => {
    if (findLocationError) {
      setShowLoadingLayer(false);
    }
  }, [findLocationError]);

  // pan to a marker location *and* offset for the available screen space
  // to accommodate the panel which will be covering the map
  const panToWithOffset = useCallback(
    (
      latlng: google.maps.LatLng | google.maps.LatLngLiteral | null | undefined
    ) => {
      let offsetX = 0;
      let offsetY = 150;
      let zoomLevel = 15;

      switch (screenSize) {
        case ScreenSizeEnum.XL:
        case ScreenSizeEnum.LG:
        case ScreenSizeEnum.MD:
          offsetX = -150;
          offsetY = -50;
          break;
        case ScreenSizeEnum.SM:
          offsetX = 0;
          offsetY = 50;
          zoomLevel = 16;
          break;
        case ScreenSizeEnum.XS:
          offsetX = 0;
          offsetY = 20;
          zoomLevel = 16;
          break;
        default:
          offsetX = 0;
          offsetY = 0;
      }

      if (googleMapRef && latlng) {
        const ov = new google.maps.OverlayView();
        ov.onAdd = function onAdd() {
          // eslint-disable-next-line @typescript-eslint/no-this-alias
          const overlay = this;
          const proj = overlay.getProjection();
          const aPoint: google.maps.Point | null =
            proj.fromLatLngToContainerPixel(
              latlng instanceof google.maps.LatLng
                ? { lat: latlng.lat(), lng: latlng.lng() }
                : latlng
            );
          if (aPoint !== null) {
            aPoint.x += offsetX;
            aPoint.y += offsetY;
            const latLng = proj.fromContainerPixelToLatLng(aPoint);
            if (latLng !== null) {
              if (googleMapRef) {
                setTimeout(() => {
                  googleMapRef?.panTo(latLng);
                  googleMapRef?.setZoom(zoomLevel);
                }, 500);
              }
            }
          }
        };
        ov.draw = function draw() {};
        ov.setMap(googleMapRef);
      }
    },
    [googleMapRef, screenSize]
  );

  const findNearestLocationToUserLocation = useCallback(
    (pos: { lat: number; lng: number }) => {
      const coder = new GeoCoder('K');

      const distanceData = locations.map((loc) => {
        const geoObj = {
          lat1: pos.lat,
          lon1: pos.lng,
          lat2: loc.geometry.location.lat,
          lon2: loc.geometry.location.lng
        };
        const distance = coder.getDistanceBetweenPoints(geoObj);
        return { locationID: loc.id, distance };
      });

      distanceData.sort(
        (
          a: { locationID: string; distance: number },
          b: { locationID: string; distance: number }
        ) => a.distance - b.distance
      );
      setLocationsOrderedByDistanceFromUser(distanceData);
    },
    [locations]
  );

  const handleFindLocationButtonClick = () => {
    const userLocationString = searchParams.get('userLocation');
    const userLocation = userLocationString
      ? JSON.parse(userLocationString)
      : null;
    if (userLocation) {
      const newSearchParams = new URLSearchParams(searchParams.toString());

      newSearchParams.set(
        'locationID',
        locationsOrderedByDistanceFromUser[0].locationID
      );
      setSearchParams(newSearchParams);
      return;
    }
    setShowLoadingLayer(true);
    getUserGeoLocation(locationBounds, setSearchParams, setFindLocationError);
  };

  const displayPolylineRoute = useCallback(
    (
      route: Route,
      polylineRef: React.MutableRefObject<google.maps.Polyline | undefined>
    ) => {
      const { polyline } = route;
      const lineRef = polylineRef;

      let strokeColor = '#FFff22';

      if (
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: light)').matches
      ) {
        strokeColor = '#2088ff';
      }

      if (lineRef.current) {
        lineRef.current.setMap(null);
      }
      lineRef.current = new google.maps.Polyline({
        path: google.maps.geometry.encoding.decodePath(
          polyline.encodedPolyline
        ),
        strokeColor,
        strokeOpacity: 0.8,
        strokeWeight: 3
      });
      lineRef.current.setMap(googleMapRef);
    },
    [googleMapRef]
  );

  // get the bounds of the area defined by all locations
  useEffect(() => {
    if (!googleMapRef) return;
    if (locations.length > 0) {
      const bounds = new google.maps.LatLngBounds();
      locations.forEach((location) => {
        const latLng = new google.maps.LatLng(
          location.geometry.location.lat,
          location.geometry.location.lng
        );
        bounds.extend(latLng);
      });
      setLocationBounds(bounds);
    }
  }, [googleMapRef, locations]);

  useEffect(() => {
    if (!locationBounds) return;
    if (!hasRequestedUserLocation) {
      // get user location if 'userLocation' param is not present in the URL
      if (!searchParams.has('userLocation')) {
        // ask for user location when the locations are added and 'userLocation' param is missing.
        doAskForUserLocationOnPageLoad();
        setHasRequestedUserLocation(true);
      }
    }
  }, [
    doAskForUserLocationOnPageLoad,
    hasRequestedUserLocation,
    locationBounds,
    locations,
    searchParams
  ]);

  // respond to locationID being updated in searchParams
  useEffect(() => {
    const locationID = searchParams.get('locationID');
    if (!locationID) return;
    setShowLoadingLayer(false);
    const userLocationString = searchParams.get('userLocation');
    const userLocation = userLocationString
      ? JSON.parse(userLocationString)
      : null;
    if (locationID) {
      const currentLocation = locations.find((loc) => loc.id === locationID);
      // animate to location if userLocation is undefined
      if (currentLocation && !userLocation) {
        setTimeout(() => {
          panToWithOffset(currentLocation.geometry.location);
        }, 100);
      }
      setDetailPanelItem(currentLocation);
      setNearestAlternativeItem(
        locations.find(
          (item) => item.id === currentLocation?.nearest_alternative
        )
      );
    }
  }, [locations, panToWithOffset, searchParams]);

  // respond to userLocation being updated in searchParams
  useEffect(() => {
    const posString = searchParams.get('userLocation');
    if (posString) {
      const pos = JSON.parse(posString);
      // Check if pos is a valid LatLng object
      if (pos && typeof pos.lat === 'number' && typeof pos.lng === 'number') {
        findNearestLocationToUserLocation(pos);
        setShowLoadingLayer(false);
      } else {
        // TODO handle this error
        setFindLocationError({
          messageTitle: 'Geolocation error',
          message: 'There is an error with your location.'
        });
      }
    }
  }, [findNearestLocationToUserLocation, searchParams]);

  // respond to the page loading with userLocation in the searchParams of the url
  useEffect(() => {
    const posString = searchParams.get('userLocation');
    if (posString) {
      const pos = JSON.parse(posString);
      findNearestLocationToUserLocation(pos);
    }
  }, [findNearestLocationToUserLocation, searchParams]);

  // display a polyline path from the userlocation to the currently selected location
  useEffect(() => {
    /* const getRouteAsync = async (
      origin: { lat: number; lng: number },
      destination: string
    ) => {
      const route: Route | null = await getRoute(origin, destination);
      return route;
    }; */

    const locationID = searchParams.get('locationID');
    const userLocationString = searchParams.get('userLocation');
    const userLocation = userLocationString
      ? JSON.parse(userLocationString)
      : null;

    if (userLocation && locationID) {
      const currentLocation = locations.find((loc) => loc.id === locationID);
      if (currentLocation) {
        /* getRouteAsync(userLocation, currentLocation.place_id)
          .then((route) => {
            displayPolylineRoute(route, currentLocationPolyLineRef);
          })
          .catch((error) => {
            dispatchLocations({
              type: LocationActionEnum.SET_ERROR,
              payload: {
                messageTitle: error.message,
                message: 'There was an error fetching route data.'
              }
            });
          }); */
      }
    }
  }, [
    dispatchLocations,
    displayPolylineRoute,
    googleMapRef,
    locations,
    searchParams
  ]);

  // get the bounds of the userLocation and locationID
  useEffect(() => {
    if (googleMapRef === null) return;
    const locationID = searchParams.get('locationID');
    const location = locations.find((loc) => loc.id === locationID);
    const userLocationString = searchParams.get('userLocation');
    const userLocation = userLocationString
      ? JSON.parse(userLocationString)
      : null;
    if (userLocation && locationID) {
      const result = getUserAndLocationBounds(
        userLocation,
        location?.geometry.location,
        screenSize
      );

      if (result) {
        const { bounds, options } = result;
        googleMapRef.fitBounds(bounds, options);
      }
    }
  }, [googleMapRef, locations, screenSize, searchParams]);

  // set the default values for the map when it loads on different devices
  const defaultMapProps = useMemo(() => {
    const getDefaultMapProps = () => {
      switch (screenSize) {
        case ScreenSizeEnum.XL:
        case ScreenSizeEnum.LG:
        case ScreenSizeEnum.MD:
          return {
            center: { lat: 50.83356066, lng: -0.1593492 },
            zoom: 14
          };
          break;
        case ScreenSizeEnum.SM:
          return {
            center: { lat: 50.83356066, lng: -0.1413492 },
            zoom: 13
          };
        case ScreenSizeEnum.XS:
          return {
            center: { lat: 50.83356066, lng: -0.1413492 },
            zoom: 13
          };
          break;
        default:
          return {
            center: { lat: 50.83356066, lng: -0.1593492 },
            zoom: 15
          };
      }
    };
    return getDefaultMapProps();
  }, [screenSize]);

  return (
    <FiltersProvider>
      <main className='flex flex-grow' id='home-main'>
        <MyMap
          items={locations}
          nearestLocationID={
            locationsOrderedByDistanceFromUser[0]?.locationID || undefined
          }
          setGoogleMapRef={setGoogleMapRef}
          onMarkerClicked={onMarkerClicked}
          defaultMapProps={defaultMapProps}
          findNearestLocation={findNearestLocationToUserLocation}
        />
        <DetailPanel
          item={detailPanelItem}
          nearestAlternativeItem={nearestAlternativeItem}
        />
        <FilterPanel
          handleFindLocationButtonClick={handleFindLocationButtonClick}
        />
        <MessagePanelContainer />
      </main>
      <LoadingLayer
        showLoadingLayer={showLoadingLayer}
        findLocationError={findLocationError}
      />
    </FiltersProvider>
  );
}

export default Home;
