/* eslint-disable @typescript-eslint/no-unused-vars */
import 'leaflet/dist/leaflet.css';
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import { useEffect, useState } from 'react';
import { useAppSelector } from '@/redux/store';
import { IUser } from '@/types/user.type';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from './ui/button';

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

export interface LocationProps {
  id: number | string;
  name: string;
  location: [number, number]; // [lat, lng]
}

const CustomIcon = L.icon({
  iconUrl: '/marker.png',
  iconSize: [38, 38],
  iconAnchor: [19, 38],
  popupAnchor: [0, -38],
});

const UserIcon = L.icon({
  iconUrl: '/profile.png',
  iconSize: [38, 38],
  iconAnchor: [19, 38],
  popupAnchor: [0, -38],
});

interface Props {
  markers: LocationProps[];
  center?: [number, number];
  zoom?: number;
  onSelectLocation?: (lat: number, lng: number) => void;
  triggerText?: string
}

const ClickHandler = ({ onSelectLocation }: { onSelectLocation: (lat: number, lng: number) => void }) => {
  useMapEvents({
    click(e) {
      onSelectLocation(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
};

const MapComponent = ({
  markers,
  center ,
  zoom = 11,
  onSelectLocation,
  triggerText
}: Props) => {
  const user = useAppSelector((state) => state.auth.user) as IUser | null;
  const [userPosition, setUserPosition] = useState<{ lat: number; lng: number } | null>(null);
  const [clickedPosition, setClickedPosition] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setUserPosition({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          });
        },
        (err) => console.error('Failed to fetch geolocation:', err)
      );
    }
  }, []);

  const calculateDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ) => {
    const toRad = (val: number) => (val * Math.PI) / 180;
    const R = 6371;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const handleMapClick = (lat: number, lng: number) => {
    setClickedPosition({ lat, lng });
    if (onSelectLocation) {
      onSelectLocation(lat, lng);
    }
  };

  return (
    <Dialog>
      <DialogTrigger >
        <Button  > {triggerText || "Add you location"} </Button>
      </DialogTrigger>
      <DialogContent className="max-w-7xl p-0">
        <DialogHeader className="p-4">
          <DialogTitle>Select Location on Map</DialogTitle>
        </DialogHeader>
        <div className="h-[80vh] w-full">
          <MapContainer className="h-full w-full rounded-b-xl" center={center || [11.5665, 37.3392]} zoom={zoom} scrollWheelZoom>
            <TileLayer
              attribution='&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
            />
            {onSelectLocation &&
              <ClickHandler onSelectLocation={handleMapClick} />
            }
            {markers.map((marker) => (
              <Marker key={marker.id} icon={CustomIcon} position={marker.location}>
                <Popup>
                  {marker.name}
                  {userPosition  && (
                    <div className="mt-2 text-sm text-gray-600">
                      Distance: {calculateDistance(
                        userPosition.lat,
                        userPosition.lng,
                        marker.location[0],
                        marker.location[1]
                      ).toFixed(2)} km
                    </div>
                  )}
                </Popup>
              </Marker>
            ))}

            {userPosition && (
              <Marker icon={UserIcon} position={[userPosition.lat, userPosition.lng]}>
                <Popup>
                  Your current location
                </Popup>
              </Marker>
            )}

            {clickedPosition && (
              <Marker icon={CustomIcon} position={[clickedPosition.lat, clickedPosition.lng]}>
                <Popup>Selected Location</Popup>
              </Marker>
            )}
          </MapContainer>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MapComponent;
