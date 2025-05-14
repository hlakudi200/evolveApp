"use client";

import React, { useEffect, useRef, useState } from "react";
import { Card, Spin, Button, Tooltip} from "antd";
import { Loader } from "@googlemaps/js-api-loader";
import {
  Navigation,
  Map,
  Locate,
  LocateFixed,
  Info,
  Clock,
} from "lucide-react";

declare global {
  interface Window {
    google: typeof google;
  }
}

interface NavigationComponentProps {
  destination: {
    lat: number;
    lng: number;
    name?: string;
  };
}

const NavigationComponent: React.FC<NavigationComponentProps> = ({
  destination,
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [driverMarker, setDriverMarker] = useState<google.maps.Marker | null>(
    null
  );
  const [directionsRenderer, setDirectionsRenderer] =
    useState<google.maps.DirectionsRenderer | null>(null);
  const [loading, setLoading] = useState(true);
  const [eta, setEta] = useState<string | null>(null);
  const [distance, setDistance] = useState<string | null>(null);
  const [followDriver, setFollowDriver] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!mapRef.current || map) return;

    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
      version: "weekly",
      libraries: ["places"],
    });

    loader
      .importLibrary("maps")
      .then(async () => {
        await loader.importLibrary("places");

        const g = window.google;

        const initialMap = new g.maps.Map(mapRef.current!, {
          center: destination,
          zoom: 14,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: true,
          zoomControl: true,
        });

        // Add destination marker
        new g.maps.Marker({
          position: destination,
          map: initialMap,
          title: destination.name || "Destination",
          icon: {
            url: "/images/destination2.png",
            scaledSize: new g.maps.Size(40, 40),
          },
        });

        const renderer = new g.maps.DirectionsRenderer({
          suppressMarkers: true,
          polylineOptions: {
            strokeColor: "#4285F4",
            strokeWeight: 5,
          },
        });

        setMap(initialMap);
        setDirectionsRenderer(renderer);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load Google Maps libraries:", err);
        setError(
          "Failed to load maps. Please check your connection and reload."
        );
        setLoading(false);
      });
  }, [destination, mapRef.current]);

  useEffect(() => {
    if (!map || !directionsRenderer) return;

    const g = window.google;

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const currentPos = new g.maps.LatLng(latitude, longitude);

        if (!driverMarker) {
          const marker = new g.maps.Marker({
            position: currentPos,
            map,
            icon: {
              url: "/images/bus.png",
              scaledSize: new g.maps.Size(40, 40),
            },
            animation: g.maps.Animation.DROP,
          });
          setDriverMarker(marker);
        } else {
          driverMarker.setPosition(currentPos);
        }

        if (followDriver) {
          map.setCenter(currentPos);
        }

        const directionsService = new g.maps.DirectionsService();
        directionsService.route(
          {
            origin: currentPos,
            destination,
            travelMode: g.maps.TravelMode.DRIVING,
          },
          (result, status) => {
            if (status === "OK" && result) {
              directionsRenderer.setDirections(result);
              directionsRenderer.setMap(map);

              // Extract ETA and distance information
              const leg = result.routes[0]?.legs[0];
              setEta(leg?.duration?.text || null);
              setDistance(leg?.distance?.text || null);
            } else {
              console.warn("Failed to get route:", status);
            }
          }
        );
      },
      (err) => {
        console.error("Geolocation error:", err);
        setError(
          "Location access is required for navigation. Please enable location services."
        );
      },
      { enableHighAccuracy: true, maximumAge: 0, timeout: 10000 }
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, [map, directionsRenderer, destination, driverMarker, followDriver]);

  const recenterMap = () => {
    if (driverMarker && map) {
      map.setCenter(driverMarker.getPosition() as google.maps.LatLng);
      setFollowDriver(true);
    }
  };

  const toggleFollow = () => {
    setFollowDriver((prev) => !prev);
  };

  const viewDestination = () => {
    if (map) {
      map.setCenter(destination);
      setFollowDriver(false);
    }
  };

  useEffect(() => {
    if (!map) return;

    const listener = window.google.maps.event.addListener(
      map,
      "dragstart",
      () => {
        setFollowDriver(false);
      }
    );

    return () => {
      window.google.maps.event.removeListener(listener);
    };
  }, [map]);

  if (error) {
    return (
      <Card
        title={
          <div className="flex items-center">
            <Navigation className="mr-2" />
            Navigation Error
          </div>
        }
        bordered={false}
        style={{ width: "100%", height: "100vh" }}
      >
        <div className="flex flex-col items-center justify-center h-full">
          <p className="text-red-500 mb-4">{error}</p>
          <Button type="primary" onClick={() => window.location.reload()}>
            Retry
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card
      title={
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Navigation className="mr-2" />
            <span>Driver Navigation</span>
          </div>
          {eta && distance && (
            <div className="flex items-center gap-4">
              <Tooltip title="Estimated arrival time">
                <div className="flex items-center gap-2">
                  <Clock size={18} />
                  <span className="text-sm font-medium text-green-600">
                    {eta}
                  </span>
                </div>
              </Tooltip>
              <Tooltip title="Distance to destination">
                <div className="flex items-center gap-2">
                  <Map size={18} />
                  <span className="text-sm text-gray-700">{distance}</span>
                </div>
              </Tooltip>
            </div>
          )}
        </div>
      }
      bordered={false}
      style={{ width: "100%", height: "100vh" }}
      bodyStyle={{
        padding: 0,
        height: "calc(100% - 58px)",
        position: "relative",
      }}
    >
      <div style={{ width: "100%", height: "100%", position: "relative" }}>
        <div ref={mapRef} style={{ width: "100%", height: "100%" }} />

        {loading && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(255,255,255,0.8)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 999,
            }}
          >
            <Spin size="large" tip="Loading map..." />
          </div>
        )}

        {!loading && (
          <div
            style={{
              position: "absolute",
              bottom: "20px",
              right: "20px",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              zIndex: 10,
            }}
          >
            <Tooltip title="Center on your location">
              <Button
                type="primary"
                shape="circle"
                icon={followDriver ? <LocateFixed /> : <Locate />}
                onClick={toggleFollow}
                style={{
                  backgroundColor: followDriver ? "#1890ff" : "#fff",
                  color: followDriver ? "#fff" : "#1890ff",
                }}
              />
            </Tooltip>
            <Tooltip title="Recenter map">
              <Button
                type="primary"
                shape="circle"
                icon={<Map />}
                onClick={recenterMap}
              />
            </Tooltip>
            <Tooltip title="View destination">
              <Button
                type="primary"
                shape="circle"
                icon={<Info />}
                onClick={viewDestination}
              />
            </Tooltip>
          </div>
        )}
      </div>
    </Card>
  );
};

export default NavigationComponent;