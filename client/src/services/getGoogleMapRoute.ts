type LatLng = {
  lat: number;
  lng: number;
};

type Route = {
  distanceMeters: number;
  duration: string;
  polyline: { encodedPolyline: string };
};

// TODO handle errors
async function getRoute(origin: LatLng, destination: string) {
  const data = {
    origin: {
      location: { latLng: { latitude: origin.lat, longitude: origin.lng } }
    },
    destination: { placeId: destination }
  };

  // Use fetch to send a POST request
  const response = await fetch(
    'https://routes.googleapis.com/directions/v2:computeRoutes',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/JSON',
        'X-Goog-Api-Key': import.meta.env.VITE_API_KEY,
        'X-Goog-FieldMask':
          'routes.duration,routes.distanceMeters,routes.polyline.encodedPolyline'
      },
      body: JSON.stringify(data) // Convert the data to a JSON string
    }
  );

  // Check if the response is ok
  if (response.ok) {
    // Parse the response as JSON
    const json = await response.json();

    // Extract the route information
    const route: Route = {
      distanceMeters: json.routes[0].distanceMeters,
      duration: json.routes[0].duration,
      polyline: json.routes[0].polyline
    };

    // Return the route
    return route;
  }
  // Throw an error
  throw new Error(`HTTP error! status: ${response.status}`);
}

export default getRoute;
