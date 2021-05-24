import React, {useEffect, useState} from 'react';
import {MapWrap} from '@components/Map/styles';

interface ICoordsState {
  latitude: number;
  longitude: number
}

export default function Map() {
  const [coords, setCoords] = useState<ICoordsState>({
    latitude : 37.511337,
    longitude: 127.012084,
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (pos) {
        setCoords(prev => ({
          ...prev,
          latitude : pos.coords.latitude,
          longitude: pos.coords.longitude
        }));
      });
    } else {
      console.log('이 브라우저에서는 Geolocation 이 지원되지 않습니다.');
    }
  }, []);

  useEffect(() => {
    const initMap = () => {
      if (naver) {
        const map = new naver.maps.Map('map', {
          center: new naver.maps.LatLng(coords.latitude, coords.longitude),
          zoom  : 13,
        });
      }
    };
    initMap();
  }, [coords]);

  return (
    <MapWrap id="map"/>
  );
}