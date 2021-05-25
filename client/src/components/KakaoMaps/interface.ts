declare global {
  interface Window {
    kakao: any;
  }
}

export interface ICoordsState {
  latitude: number;
  longitude: number;
}

export interface IResultState {
  address_name: string;
  code: string;
  region_1depth_name: string;
  region_2depth_name: string;
  region_3depth_name: string;
  region_4depth_name: string;
  region_type: string;
  x: number;
  y: number;
}