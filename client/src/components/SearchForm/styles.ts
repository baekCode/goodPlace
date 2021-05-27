import styled from '@emotion/styled';

export const Container = styled.div`
  position : fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 20vh;
  background: white;
  z-index: 10;
`;

export const MapRegion = styled.p`
  width: 100%;
  padding: 0.75rem;
  text-align: center;  
`;

export const BlindTitle = styled.h1`
  overflow: hidden;
  position: absolute;
  width:0;
  height:0;
  font-size:0;
  line-height: 0;
`;