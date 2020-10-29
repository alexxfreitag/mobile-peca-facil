import React, {
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from 'react';
import { useField } from '@unform/core';

import { Container, Icon, TextInput } from './styles';

function Input({ name, icon, ...rest }, ref) {
  const { fieldName, registerField, defaultValue = '' } = useField(name);

  const inputElementRef = useRef(null);
  const inputValueRef = useRef({ value: defaultValue });

  /* useImperativeHandle(ref, () => ({
    focus() {
      inputRef.current.focus();
    },
  })); */

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
    <Container>
      <Icon name={icon} size={20} color="#EB5757" />
      <TextInput
        ref={inputElementRef}
        {...rest}
        onChangeText={(value) => {
          inputValueRef.current.value = value;
        }}
      />
    </Container>
  );
}

export default forwardRef(Input);
