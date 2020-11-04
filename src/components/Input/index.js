import React, { useEffect, useRef, forwardRef } from 'react';
import { useField } from '@unform/core';

import { Text } from 'react-native';
import { Container, Icon, TextInput } from './styles';

function Input({ name, icon, ...rest }, ref) {
  const {
    fieldName,
    registerField,
    defaultValue = '',
    error,
    clearError,
  } = useField(name);

  const inputElementRef = useRef(null);
  const inputValueRef = useRef({ value: defaultValue });

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputValueRef.current,
      path: 'value',
      setValue(value) {
        inputValueRef.current.value = value;
        inputElementRef.current.setNativeProps({ text: value });
      },
      clearValue() {
        inputValueRef.current.value = '';
        inputElementRef.current.clear();
      },
    });
  }, [fieldName, registerField]);

  return (
    <>
      <Container>
        {icon && <Icon name={icon} size={20} color="#EB5757" />}
        <TextInput
          ref={inputElementRef}
          {...rest}
          onChangeText={(value) => {
            inputValueRef.current.value = value;
          }}
          onFocus={clearError}
        />
      </Container>
      {error && <Text style={{ color: '#f00' }}>{error}</Text>}
    </>
  );
}

export default forwardRef(Input);
