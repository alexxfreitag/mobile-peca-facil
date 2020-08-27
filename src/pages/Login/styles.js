import styled from 'styled-components/native';
import { Platform } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';

export const Container = styled.View`
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  padding: 0 30px ${Platform.OS === 'android' ? 150 : 40}px;
  position: absolute;
  margin-top: 30px;
`;

export const FormContainer = styled.View`
  width: 100%;
  /*height: 315px;*/
  border-radius: 16px;
  margin-top: 70px;
  justify-content: center;
  align-items: center;
  background-color: #fafafa;
`;

export const CreateAccountButton = styled.View`
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
  font-family: 'RobotoSlab-Regular';
  margin-left: 16px;
  font-weight: bold;
`;
