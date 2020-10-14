import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
  width: 100%;
  height: 50px;
  background: #eb5757;
  border-radius: 10px;
  margin-top: 25px;
  justify-content: center;
  align-items: center;
`;

export const ButtonText = styled.Text`
  color: #fafafa;
  font-weight: bold;
  font-size: 18px;
`;
