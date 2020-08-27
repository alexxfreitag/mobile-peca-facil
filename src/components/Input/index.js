import React from 'react';

import { Container, Icon, TextInput } from './styles';

export default function Input({ icon, ...rest }) {
  return (
    <Container>
      <Icon name={icon} size={20} color="#EB5757" />
      <TextInput {...rest} />
    </Container>
  );
}
