import React, {useEffect, useState} from 'react';
import {MapWrap, MapRegion} from './styles';
import {ICoordsState, IResultState, IPlaceSearchListData} from './interface';

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

    // 장소 검색 객체를 생성합니다
    const ps = new window.kakao.maps.services.Places();
    const infowindow = new window.kakao.maps.InfoWindow({zIndex: 1});
    // 키워드로 장소를 검색합니다
    ps.keywordSearch(`${region?.region_3depth_name} 맛집`, placesSearchCB);

    // 키워드 검색 완료 시 호출되는 콜백함수 입니다
    function placesSearchCB(data: IPlaceSearchListData[], status: string, pagination: any) {
      if (status === window.kakao.maps.services.Status.OK) {
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        const bounds = new window.kakao.maps.LatLngBounds();

        for (let i = 0; i < data.length; i++) {
          displayMarker(data[i]);
          bounds.extend(new window.kakao.maps.LatLng(data[i].y, data[i].x));
        }

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        map.setBounds(bounds);
      }
    }

    // 지도에 마커를 표시하는 함수입니다
    function displayMarker(place: IPlaceSearchListData) {
      // 마커를 생성하고 지도에 표시합니다
      const marker = new window.kakao.maps.Marker({
        map     : map,
        position: new window.kakao.maps.LatLng(place.y, place.x)
      });

      // 마커에 클릭이벤트를 등록합니다
      window.kakao.maps.event.addListener(marker, 'click', function () {
        // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
        infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
        infowindow.open(map, marker);
      });
    }

  }, [coords]);

  useEffect(() => {
    // console.log(region);
  }, [region]);

  return (
    <>
      <MapWrap id={'map'}>
        <MapRegion children={region?.address_name}/>
      </MapWrap>
    </>
  );
}

export default KakaoMaps;