import { ScreenSizeEnum } from '../../hooks/getScreensize';

const getUserAndLocationBounds = (
  userLocation: { lat: number; lng: number },
  locationID: string,
  screenSize: string | undefined
) => {
  if (userLocation && locationID && screenSize) {
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
    return { bounds, options };
  }
  return null;
};

export default getUserAndLocationBounds;
