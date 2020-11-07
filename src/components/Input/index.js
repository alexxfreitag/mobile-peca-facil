import React, { useEffect, useRef, useCallback, forwardRef } from 'react';
import { useField } from '@unform/core';

import { Text } from 'react-native';
import { Container, Icon, TextInput } from './styles';

function Input({ name, onChangeText, rawValue, icon, ...rest }, ref) {
  const {
    fieldName,
    registerField,
    defaultValue = '',
    error,
    clearError,
  } = useField(name);

  const inputElementRef = useRef(null);
  const inputValueRef = useRef({ value: defaultValue });

  const handleOnChange = useCallback(
    (text) => {
      if (inputValueRef.current) inputValueRef.current.value = text;
      if (onChangeText) onChangeText(text);
    },
    [onChangeText],
  );

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
      getValue() {
        return rawValue || inputValueRef.current.value;
      },
    });
  }, [fieldName, rawValue, registerField]);

  return (
    <>
      <Container>
        {icon && <Icon name={icon} size={20} color="#EB5757" />}
        <TextInput
          ref={inputElementRef}
          {...rest}
          onChangeText={handleOnChange}
          onFocus={clearError}
        />
      </Container>
      {error && <Text style={{ color: '#f00' }}>{error}</Text>}
    </>
  );
}

export default forwardRef(Input);
