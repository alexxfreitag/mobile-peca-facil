import styled from 'styled-components/native';
import { Platform, PixelRatio } from 'react-native';

export const Header = styled.View`
  width: 100%;
  height: 50px;
  flex-direction: row;
  background-color: #d74d4d;
  align-items: center;
  justify-content: center;
`;

export const InformatioView = styled.View`
  border-top-width: ${PixelRatio.get() * 0.4}px;
  margin-top: ${PixelRatio.get() * 3}px;
  border-top-color: #d6d6d6;
  padding: ${PixelRatio.get() * 5}px 0;
`;

export const InformationTitle = styled.Text`
  font-size: ${PixelRatio.get() * 7}px;
  font-weight: 700;
`;

export const ImageView = styled.View`
  align-items: center;
  background-color: lightgrey;
`;

export const Whatebever = styled.View`
  width: 100%;
  background-color: #d74d4d;
  align-items: center;
  justify-content: center;
  padding: 0 30px ${Platform.OS === 'android' ? 150 : 40}px;
  position: absolute;
  margin-top: ${PixelRatio.get() * 10}px /*30px*/;
`;
