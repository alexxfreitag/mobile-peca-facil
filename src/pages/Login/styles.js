import styled from 'styled-components/native';
import { Platform, PixelRatio } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { Form } from '@unform/mobile';

export const Container = styled.View`
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  padding: 0 30px ${Platform.OS === 'android' ? 150 : 40}px;
  position: absolute;
  margin-top: ${PixelRatio.get() * 10}px /*30px*/;
`;

export const FormContainer = styled(Form)`
  width: 100%;
  height: 315px;
  border-radius: 16px;
  margin-top: 10%;
  justify-content: center;
  align-items: center;
  background-color: #fafafa;
  padding: 0 20px;
`;

export const CreateAccountButton = styled.TouchableOpacity`
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

export const CreateAccountButtonText = styled.Text`
  color: #d74d4d;
  font-size: 18px;
  margin-left: 16px;
  font-weight: bold;
`;
