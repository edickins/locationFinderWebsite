import { ScreenSizeEnum } from '../../hooks/getScreensize';

const getUserAndLocationBounds = (
  userLocation: { lat: number; lng: number },
  location: { lat: number; lng: number } | undefined,
  screenSize: string | undefined
) => {
  if (userLocation && screenSize) {
    const bounds = new google.maps.LatLngBounds();
    const userLocationLatLng = new google.maps.LatLng(
      userLocation.lat,
      userLocation.lng
    );

    if (userLocationLatLng !== null) {
      const radius = 150;
      const northEast = google.maps.geometry.spherical.computeOffset(
        userLocationLatLng,
        radius,
        45
      );
      const southWest = google.maps.geometry.spherical.computeOffset(
        userLocationLatLng,
        radius,
        225
      );
      bounds.extend(northEast);
      bounds.extend(southWest);
    }

    if (location) bounds.extend(location);

    const options = { top: 0, left: 0, right: 0, bottom: 0, maxZoom: 10 };
    switch (screenSize) {
      case ScreenSizeEnum.SM:
      case ScreenSizeEnum.XS: {
        options.bottom = 50;
        options.left = 20;
        options.right = 20;
        options.top = 20;

        break;
      }
      default:
        options.bottom = 250;
        options.left = 300;
        options.right = 200;
        options.top = 200;
    }
    return { bounds, options };
  }
  return null;
};

export default getUserAndLocationBounds;
