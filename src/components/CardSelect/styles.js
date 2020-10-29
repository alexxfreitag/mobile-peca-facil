import styled, { css } from 'styled-components/native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { PixelRatio } from 'react-native';

export const Container = styled.TouchableOpacity`
  width: 100%;
  background-color: #fff;
  height: ${PixelRatio.getPixelSizeForLayoutSize(45)}px;
  border-radius: 10px;
  margin: 10px 0;
  display: flex;
  flex-direction: row;
  align-items: center;

  ${(props) =>
    props.isPressed &&
    css`
      background-color: #d74d4d;
    `}
`;

export const Icon = styled(FontAwesomeIcon)`
  color: #d74d4d;
  ${(props) =>
    props.isPressed &&
    css`
      color: #fff;
    `}
`;

export const Text = styled.Text`
  font-size: 24px;
  color: #d74d4d;
  ${(props) =>
    props.isPressed &&
    css`
      color: #fff;
    `}
`;
