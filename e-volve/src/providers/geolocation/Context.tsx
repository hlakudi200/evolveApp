'use client';
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

// Position interface for storing latitude and longitude
interface Position {
  latitude: number;
  longitude: number;
}

// Geolocation context interface
interface GeolocationContextType {
  isWatching: boolean;
  position: Position | null;
  startWatching: () => void;
  stopWatching: () => void;
}

// Create the context
const GeolocationContext = createContext<GeolocationContextType | undefined>(undefined);

interface GeolocationProviderProps {
  children: ReactNode;
}

export const useGeolocation = () => {
  const context = useContext(GeolocationContext);
  if (!context) {
    throw new Error('useGeolocation must be used within a GeolocationProvider');
  }
  return context;
};

export const GeolocationProvider: React.FC<GeolocationProviderProps> = ({ children }) => {
  const [isWatchingLocation, setIsWatchingLocation] = useState(false);
  const [watchId, setWatchId] = useState<number | null>(null);
  const [position, setPosition] = useState<Position | null>(null);
  const [lastPosition, setLastPosition] = useState<Position | null>(null);

  // Start watching for location
  const startWatching = () => {
    if (navigator.geolocation && !isWatchingLocation) {
      const newWatchId = navigator.geolocation.watchPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;

          // Check if position has changed significantly (debounce)
          if (
            !lastPosition ||
            Math.abs(latitude - lastPosition.latitude) > 0.0001 || // Small threshold for latitude
            Math.abs(longitude - lastPosition.longitude) > 0.0001 // Small threshold for longitude
          ) {
            setPosition({ latitude, longitude });
            setLastPosition({ latitude, longitude }); // Store last position for comparison
          }
        },
        (error) => {
          console.error("Error getting location", error);
        },
        {
          enableHighAccuracy: true,
          maximumAge: 0,
          timeout: 10000,
        }
      );
      setIsWatchingLocation(true);
      setWatchId(newWatchId);
    }
  };

  // Stop watching for location
  const stopWatching = () => {
    if (watchId !== null) {
      navigator.geolocation.clearWatch(watchId);
      setIsWatchingLocation(false);
      setWatchId(null);
      setPosition(null);
    }
  };

  // Automatically start watching when the component mounts
  useEffect(() => {
    if (!isWatchingLocation) {
      startWatching();
    }
    // Cleanup the watch when the component unmounts or stops watching
    return () => stopWatching();
  }, [isWatchingLocation]);

  return (
    <GeolocationContext.Provider
      value={{ isWatching: isWatchingLocation, position, startWatching, stopWatching }}
    >
      {children}
    </GeolocationContext.Provider>
  );
};
