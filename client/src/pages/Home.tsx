import { useCallback, useEffect, useRef, useState } from 'react';
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

type Route = {
  distanceMeters: number;
  duration: string;
  polyline: { encodedPolyline: string };
};

function Home() {
  const screenSize = useGetScreensize();

  const currentLocationPolyLineRef = useRef<google.maps.Polyline | undefined>();
  const boundsRectRef = useRef<google.maps.Rectangle | undefined>();

  const [detailPanelItem, setDetailPanelItem] = useState<ILocation | undefined>(
    undefined
  );
  const [nearestAlternativeItem, setNearestAlternativeItem] = useState<
    ILocation | undefined
  >(undefined);
  const [messageDialogueProps, setMessageDialogueProps] = useState({
    messageTitle: '',
    message: ''
  });
  const [googleMapRef, setGoogleMapRef] = useState<google.maps.Map | null>(
    null
  );
  const [locationBounds, setLocationBounds] = useState<
    google.maps.LatLngBounds | undefined
  >();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [locationsDistanceFromUser, setLocationsDistanceFromUser] = useState<
    { locationID: string; distance: number }[] | []
  >([]);

  const [doShowPanel, setDoShowPanel] = useState(false);

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

  // pan to a marker location *and* offset for the available screen space
  // to accommodate the panel which will be covering the map
  const panToWithOffset = useCallback(
    (
      latlng: google.maps.LatLng | google.maps.LatLngLiteral | null | undefined
    ) => {
      let offsetX = 0;
      let offsetY = 150;

      switch (screenSize) {
        case ScreenSizeEnum.XL:
        case ScreenSizeEnum.LG:
        case ScreenSizeEnum.MD:
          offsetX = -150;
          offsetY = 150;
          break;
        case ScreenSizeEnum.SM:
          offsetX = 0;
          offsetY = 50;
          break;
        case ScreenSizeEnum.XS:
          offsetX = 0;
          offsetY = 10;
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

  const displayPolylineRoute = useCallback(
    (
      route: Route,
      polylineRef: React.MutableRefObject<google.maps.Polyline | undefined>,
      strokeColor: string
    ) => {
      const { polyline } = route;
      const lineRef = polylineRef;
      if (lineRef.current) {
        lineRef.current.setMap(null);
      }
      lineRef.current = new google.maps.Polyline({
        path: google.maps.geometry.encoding.decodePath(
          polyline.encodedPolyline
        ),
        strokeColor,
        strokeOpacity: 0.8,
        strokeWeight: 2
      });
      lineRef.current.setMap(googleMapRef);
    },
    [googleMapRef]
  );

  // NEW locationID is set through searchParams
  useEffect(() => {
    const newLocationID = searchParams.get('locationID');
    // TODO is this gate necessary?
    if (newLocationID !== locationID) {
      setLocationID(newLocationID);
      setDoShowPanel(true);
    }
  }, [locationID, searchParams]);

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
      setDoShowPanel(true);
    }
  }, [locationID, locations, panToWithOffset, userLocation]);

  // userLocation is set by user sharing geolocation
  useEffect(() => {
    const posString = searchParams.get('userLocation');

    if (posString) {
      const pos = JSON.parse(posString);
      // Check if pos is a valid LatLng object
      if (pos && typeof pos.lat === 'number' && typeof pos.lng === 'number') {
        if (
          !userLocation ||
          userLocation.lat !== pos.lat ||
          userLocation.lng !== pos.lng
        ) {
          setUserLocation(pos);
          findNearestLocation(pos);
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
            displayPolylineRoute(route, currentLocationPolyLineRef, '#FFff22');
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
    if (googleMapRef !== null && userLocation && locationID) {
      const bounds = new google.maps.LatLngBounds();
      let latLng = new google.maps.LatLng(userLocation.lat, userLocation.lng);
      bounds.extend(latLng);
      const currentLocation = locations.find((loc) => loc.id === locationID);
      if (currentLocation) {
        latLng = new google.maps.LatLng(
          currentLocation.geometry.location.lat,
          currentLocation.geometry.location.lng
        );
        bounds.extend(latLng);
      }

      if (boundsRectRef.current) {
        boundsRectRef.current.setMap(null);
      }

      const padding = { top: 0, left: 0, right: 0, bottom: 0 };
      switch (screenSize) {
        case ScreenSizeEnum.SM: {
          padding.bottom = 360;
          padding.left = 50;
          padding.right = 50;
          padding.top = 180;

          break;
        }
        default:
          padding.bottom = 350;
          padding.left = 400;
          padding.right = 220;
          padding.top = 250;
      }

      googleMapRef.fitBounds(bounds, padding);
    }
  }, [googleMapRef, locationID, locations, screenSize, userLocation]);

  const defaultMapProps = {
    center: { lat: 50.8249486, lng: -0.1270007 },
    zoom: 13
  };

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
          defaultMapProps={defaultMapProps}
        />
        <DetailPanel
          item={detailPanelItem}
          nearestAlternativeItem={nearestAlternativeItem}
          doShowPanel={doShowPanel}
          setDoShowPanel={setDoShowPanel}
        />
        <FilterPanel
          setMessageDialogueText={setMessageDialogueProps}
          locationBounds={locationBounds}
          defaultMapProps={defaultMapProps}
        />
        <MessagePanelContainer messageDialogueProps={messageDialogueProps} />
      </main>
    </FiltersProvider>
  );
}

export default Home;
