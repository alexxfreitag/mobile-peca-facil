import styled from 'styled-components/native';
import { PixelRatio } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { Form } from '@unform/mobile';

export const Container = styled.ScrollView`
  background-color: #ffffff;
`;

export const FormContainer = styled(Form)`
  width: 100%;
  padding: ${PixelRatio.get() * 6}px;
`;

export const PictureView = styled.View`
  background-color: #d74d4d;
  justify-content: center;
  align-items: center;
  padding: ${PixelRatio.get() * 5}px 0;
  min-height: ${PixelRatio.get() * 80}px;
`;

export const PictureImage = styled.Image`
  width: ${PixelRatio.get() * 100}px;
  height: ${PixelRatio.get() * 70}px;
`;

export const InputTitle = styled.Text`
  font-size: ${PixelRatio.get() * 6}px;
  color: #000;
  font-weight: bold;
`;

export const Footer = styled.TouchableOpacity`
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  background: #fafafa;
  border-top-width: 2px;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  border-color: #d74d4d;
  padding: 16px 0 ${16 + getBottomSpace()}px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

export const FooterText = styled.Text`
  color: #d74d4d;
  font-size: 18px;
  margin-left: 16px;
  font-weight: bold;
`;
