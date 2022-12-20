export const getCenterOfCoordinates = (coords: number[][]): number[] => {
  const latitudes: number[] = [];
  const longitudes: number[] = [];
  coords.forEach((c) => {
    latitudes.push(c[0]);
    longitudes.push(c[1]);
  });
  const lat = (Math.min(...latitudes) + Math.max(...latitudes)) / 2;
  const lng = (Math.min(...longitudes) + Math.max(...longitudes)) / 2;
  return [lat, lng];
};
