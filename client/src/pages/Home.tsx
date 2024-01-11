import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
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
import getRoute from '../services/getGoogleMapRoute';
import { LocationActionEnum } from '../reducer/locationReducer/types';
import findUserLocation from '../services/findUserLocation';
import LoadingLayer from '../components/LoadingLayer';

type Route = {
  distanceMeters: number;
  duration: string;
  polyline: { encodedPolyline: string };
};

function Home() {
  const screenSize = useGetScreensize();

  const currentLocationPolyLineRef = useRef<google.maps.Polyline | undefined>();
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
  const [locationsDistanceFromUser, setLocationsDistanceFromUser] = useState<
    { locationID: string; distance: number }[] | []
  >([]);

  const [showLoadingLayer, setShowLoadingLayer] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams();
  const [locationID, setLocationID] = useState(searchParams.get('locationID'));
  const [userLocation, setUserLocation] = useState<
    { lat: number; lng: number } | undefined
  >();
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
    if (!locationBounds || !searchParams) return;
    setShowLoadingLayer(true);
    findUserLocation(
      locationBounds,
      searchParams,
      setSearchParams,
      setFindLocationError
    );
  }, [locationBounds, searchParams, setSearchParams]);

  // ask for user location when the locations are added.
  useEffect(() => {
    if (!locationBounds) return;
    doAskForUserLocationOnPageLoad();
  }, [doAskForUserLocationOnPageLoad, locationBounds]);

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

  const findNearestLocation = useCallback(
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

      if (distanceData.length > 0) {
        const newSearchParams = new URLSearchParams(searchParams.toString());
        newSearchParams.set('locationID', distanceData[0].locationID);
        setSearchParams(newSearchParams);
      }
      setLocationsDistanceFromUser(distanceData);
    },
    [locations, searchParams, setSearchParams]
  );

  const handleFindToiletButtonClick = () => {
    setShowLoadingLayer(true);
    findUserLocation(
      locationBounds,
      searchParams,
      setSearchParams,
      setFindLocationError
    );
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

  // NEW locationID is set through searchParams
  useEffect(() => {
    const newLocationID = searchParams.get('locationID');
    // TODO is this gate necessary?
    if (newLocationID) {
      setLocationID(newLocationID);
    }
  }, [searchParams]);

  // respond to locationID being updated
  useEffect(() => {
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
  }, [locationID, locations, panToWithOffset, userLocation]);

  // userLocation is set by user sharing geolocation
  useEffect(() => {
    const posString = searchParams.get('userLocation');

    if (posString) {
      setShowLoadingLayer(false);
      const pos = JSON.parse(posString);
      // Check if pos is a valid LatLng object
      if (pos && typeof pos.lat === 'number' && typeof pos.lng === 'number') {
        if (userLocation?.lat !== pos.lat || userLocation?.lng !== pos.lng) {
          setUserLocation(pos);
          findNearestLocation(pos);
          setShowLoadingLayer(false);
        }
      } else {
        // TODO handle this error
        // Handle the error...
      }
    }
  }, [findNearestLocation, searchParams, userLocation]);

  // display a polyline path from the userlocation to the currently selected location
  useEffect(() => {
    const getRouteAsync = async (
      origin: { lat: number; lng: number },
      destination: string
    ) => {
      const route: Route | null = await getRoute(origin, destination);
      return route;
    };

    if (userLocation && locationID) {
      const currentLocation = locations.find((loc) => loc.id === locationID);
      if (currentLocation) {
        getRouteAsync(userLocation, currentLocation.place_id)
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
          });
      }
    }
  }, [
    dispatchLocations,
    displayPolylineRoute,
    googleMapRef,
    locationID,
    locations,
    userLocation
  ]);

  // get the bounds of the area defined by all locations
  useEffect(() => {
    if (googleMapRef) {
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
  }, [setLocationBounds, locations, googleMapRef]);

  // get the bounds of the userLocation and the currently selected location
  useEffect(() => {
    if (googleMapRef === null) return;
    if (userLocation && locationID) {
      const bounds = new google.maps.LatLngBounds();
      const latLng = new google.maps.LatLng(userLocation.lat, userLocation.lng);

      if (latLng !== null) {
        const circle = new google.maps.Circle({
          center: latLng,
          radius: 500
        });

        const radius = circle.getRadius();
        const northEast = google.maps.geometry.spherical.computeOffset(
          latLng,
          radius,
          45
        );
        const southWest = google.maps.geometry.spherical.computeOffset(
          latLng,
          radius,
          225
        );
        bounds.extend(northEast);
        bounds.extend(southWest);
      }

      const options = { top: 0, left: 0, right: 0, bottom: 0, maxZoom: 14 };
      switch (screenSize) {
        case ScreenSizeEnum.SM:
        case ScreenSizeEnum.XS: {
          options.bottom = 5;
          options.left = 5;
          options.right = 5;
          options.top = 5;

          break;
        }
        default:
          options.bottom = 100;
          options.left = 100;
          options.right = 100;
          options.top = 100;
      }
      googleMapRef.fitBounds(bounds, options);
    }
  }, [googleMapRef, locationID, locations, screenSize, userLocation]);

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
          locationID={locationID}
          nearestLocationID={
            locationsDistanceFromUser[0]?.locationID || undefined
          }
          setGoogleMapRef={setGoogleMapRef}
          onMarkerClicked={onMarkerClicked}
          defaultMapProps={defaultMapProps}
        />
        <DetailPanel
          item={detailPanelItem}
          nearestAlternativeItem={nearestAlternativeItem}
        />
        <FilterPanel
          handleFindToiletButtonClick={handleFindToiletButtonClick}
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
