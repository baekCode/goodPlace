import React, {useEffect, useRef, useState} from 'react';
import {useSelector} from 'react-redux';
import {MapWrap} from './styles';
import {IPlaceSearchListData, IResultState} from './interface';
import SearchForm from '../SearchForm';
import {RootState} from '../../store';
import useGeolocation from '../../hooks/useGeolocation';
import {displayCenterInfo, searchAddrFromCoords} from '../../utils/kakaoMapFunc';

function KakaoMaps() {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const {keyword} = useSelector((state: RootState) => state.search);
  const [region, setRegion] = useState<IResultState>();
  const coords = useGeolocation();

  const geocoder = new window.kakao.maps.services.Geocoder();
  const ps = new window.kakao.maps.services.Places();
  const infoWindow = new window.kakao.maps.InfoWindow({zIndex: 1});

  useEffect(() => {
    const map = new window.kakao.maps.Map(mapRef.current, coords.options); //지도 생성 및 객체 리턴
    const markerPosition = new window.kakao.maps.LatLng(coords.latitude, coords.longitude);
    const marker = new window.kakao.maps.Marker({
      position: markerPosition
    });
    marker.setMap(map);

    searchAddrFromCoords(map.getCenter(), displayCenterInfo(setRegion), geocoder);

  }, [coords]);

  useEffect(() => {
    const map = new window.kakao.maps.Map(mapRef.current, coords.options); //지도 생성 및 객체 리턴

    searchAddrFromCoords(map.getCenter(), displayCenterInfo(setRegion), geocoder);

    // 키워드로 장소를 검색합니다
    ps.keywordSearch(keyword ? keyword : region?.region_3depth_name, placesSearchCB);

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
        searchAddrFromCoords(map.getCenter(), displayCenterInfo(setRegion), geocoder);
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
        infoWindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
        infoWindow.open(map, marker);
      });
    }

  }, [keyword]);

  return (
    <>
      <MapWrap id={'map'} ref={mapRef}>
        <SearchForm addressName={region?.address_name}/>
      </MapWrap>
    </>
  );
}

export default KakaoMaps;