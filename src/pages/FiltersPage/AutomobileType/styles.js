import styled, { css } from 'styled-components/native';
import { PixelRatio } from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

export const Container = styled.View`
  flex: 1;
  background-color: #d74d4d;
`;

export const ViewStepIndicator = styled.View`
  padding: 10px;
`;

export const ViewFilter = styled.View`
  background-color: #fafafa;
  flex: 1;
  padding: 0 20px;
  justify-content: flex-start;
  align-items: center;
`;

export const Card = styled.TouchableOpacity`
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

export const CardText = styled.Text`
  font-size: 24px;
  color: #d74d4d;
  ${(props) =>
    props.isPressed &&
    css`
      color: #fff;
    `}
`;

export const ViewCardIcon = styled.View`
  margin: 0 20px;
  min-width: 70px;
`;

export const CardIcon = styled(FontAwesomeIcon)`
  color: #d74d4d;
  ${(props) =>
    props.isPressed &&
    css`
      color: #fff;
    `}
`;
