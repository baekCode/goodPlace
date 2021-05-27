import {useEffect, useState} from 'react';
import {ICoordsState} from './interface';

export default function useGeolocation() {
  const [coords, setCoords] = useState<ICoordsState>({
    latitude : 37.511337,
    longitude: 127.012084,
    options  : {
      center: new window.kakao.maps.LatLng(37.511337, 127.012084),
      level : 5
    }
  });
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (pos) {
        setCoords(prev => ({
          ...prev,
          latitude : pos.coords.latitude,
          longitude: pos.coords.longitude,
          options  : {
            ...prev.options,
            center: new window.kakao.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
          }
        }));
      });
    } else {
      console.log('이 브라우저에서는 Geolocation 이 지원되지 않습니다.');
    }
  }, []);

  return coords;
}