'use client';

import { useEffect, useState } from 'react';

export const useGeolocation = () => {
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState<GeolocationPosition>();
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLoading(false);
        setLocation(pos);
      },
      (err) => {
        setLoading(false);
        setError(err.message);
      }
    );
  }, []);

  return {
    loading,
    location,
    error,
  };
};
