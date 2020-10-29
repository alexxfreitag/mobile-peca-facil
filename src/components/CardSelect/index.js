import React, { useEffect, forwardRef } from 'react';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

import { View } from 'react-native';
import { Container, Text, Icon } from './styles';

function CardSelect({ children, isPressed, iconName, textName, ...rest }, ref) {
  useEffect(() => {
    console.log('ref->', ref);
  }, [ref]);
  return (
    <Container
      {...rest}
      style={{
        shadowColor: 'black',
        shadowOpacity: 0.9,
        elevation: 10,
        marginTop: 30,
      }}
      isPressed={isPressed}
      ref={ref}
    >
      <View style={{ marginHorizontal: 20, minWidth: 70 }}>
        <Icon name={iconName} size={50} isPressed={isPressed} />
      </View>
      <Text isPressed={isPressed}>{textName}</Text>
      <View
        style={{
          flex: 1,
          alignItems: 'flex-end',
          marginEnd: 15,
        }}
      >
        <FontAwesomeIcon name="check" size={50} color="#fff" />
      </View>
    </Container>
  );
}

export default forwardRef(CardSelect);
