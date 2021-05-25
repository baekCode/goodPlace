import React, {useEffect, useState} from 'react';
import {MapWrap, MapRegion} from './styles';
import {ICoordsState, IResultState} from './interface';

function KakaoMaps() {
  const [region, setRegion] = useState<IResultState>();
  const [coords, setCoords] = useState<ICoordsState>({
    latitude : 37.511337,
    longitude: 127.012084,
  });

  function displayCenterInfo(result: IResultState[], status: string): void {
    if (status === window.kakao.maps.services.Status.OK) {
      setRegion(result.filter(v => v.region_type === 'H')[0]);
    }
  }

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
    const geocoder = new window.kakao.maps.services.Geocoder();
    const markerPosition = new window.kakao.maps.LatLng(coords.latitude, coords.longitude);
    const marker = new window.kakao.maps.Marker({
      position: markerPosition
    });
    marker.setMap(map);

    function searchAddrFromCoords(coords: any, callback: any) {
      geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);
    }

    searchAddrFromCoords(map.getCenter(), displayCenterInfo);
  }, [coords]);

  return (
    <>
      <MapWrap id={'map'}>
        <MapRegion children={region?.address_name}/>
      </MapWrap>
    </>
  );
}

export default KakaoMaps;