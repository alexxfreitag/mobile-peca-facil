import React from 'react';

import { Container, ButtonText } from './styles';

export default function Button({ children, ...rest }) {
  return (
    <Container {...rest}>
      <ButtonText>{children}</ButtonText>
    </Container>
  );
}
