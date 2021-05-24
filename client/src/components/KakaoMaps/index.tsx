import React, {useEffect, useState} from 'react';

declare global {
  interface Window {
    kakao: any;
  }
}

interface ICoordsState {
  latitude: number;
  longitude: number;
}

function KakaoMaps() {
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
    const container = document.getElementById('map');
    const options = {
      center: new window.kakao.maps.LatLng(coords.latitude, coords.longitude), //지도의 중심좌표.
      level : 5
    };

    const map = new window.kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
    const markerPosition = new window.kakao.maps.LatLng(coords.latitude, coords.longitude);
    const marker = new window.kakao.maps.Marker({
      position: markerPosition
    });
    marker.setMap(map);
  }, [coords]);

  return (
    <div className="App">
      <div id="map" style={{
        width : '100vw',
        height: '100vh'
      }}/>
    </div>
  );
}

export default KakaoMaps;