import styled from 'styled-components/native';
import { getBottomSpace } from 'react-native-iphone-x-helper';

export const FooterModal = styled.View`
  flex: 1;
  padding: 16px 0 ${16 + getBottomSpace()}px;
  justify-content: space-around;
  align-items: flex-end;
  flex-direction: row;
`;

export const FooterModalText = styled.Text`
  color: #d74d4d;
  font-size: 18px;
  margin-left: 16px;
  font-weight: bold;
`;
