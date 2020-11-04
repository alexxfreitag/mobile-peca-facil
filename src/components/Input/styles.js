import styled from 'styled-components/native';
import FeatherIcon from 'react-native-vector-icons/Feather';

export const Container = styled.View`
  width: 100%;
  height: 50px;
  padding: 0 16px;
  border-radius: 3px;
  border-width: 1px;
  border-color: #eb5757;
  flex-direction: row;
  align-items: center;
  margin-top: 10px;
`;

export const TextInput = styled.TextInput`
  flex: 1;
  color: #000;
  font-size: 18px;
  font-family: 'RobotSlab-Regular';
`;

export const Icon = styled(FeatherIcon)`
  margin-right: 16px;
`;
