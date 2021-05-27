import {IResultState} from '../components/KakaoMaps/interface';

interface IGeocoder {
  addressSearch: any
  coord2Address: any
  coord2RegionCode: any
  transCoord: any
}

export function displayCenterInfo(setState: any): (result: IResultState[], status: string) => void {
  return (result, status) => {
    if (status === window.kakao.maps.services.Status.OK) {
      setState(result.filter(v => v.region_type === 'H')[0]);
    }
  };
}

export function searchAddrFromCoords(coords: any, callback: any, geocoder: IGeocoder): void {
  geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);
}
