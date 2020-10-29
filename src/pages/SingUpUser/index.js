import React from 'react';
import { ScrollView, Image, Text, View, PixelRatio } from 'react-native';

import Icon from 'react-native-vector-icons/Feather';
import logoImg from '../../assets/logo.png';
import { Container, FormContainer, Footer, FooterText } from './styles';

export default function SingUpUser({}) {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ backgroundColor: '#D74D4D', flex: 1 }} />
      <View style={{ backgroundColor: '#ffffff', flex: 1 }} />
      <Container>
        <Image
          source={logoImg}
          style={{
            width: PixelRatio.getPixelSizeForLayoutSize(50),
            height: PixelRatio.getPixelSizeForLayoutSize(50),
          }}
        />
        <Text style={{ color: '#FFFFFF', fontSize: 24, fontWeight: 'bold' }}>
          PeçaFácil
        </Text>

        <FormContainer
          style={{
            shadowColor: 'black',
            shadowOpacity: 0.9,
            elevation: 10,
          }}
        >
          <Text
            style={{
              fontSize: PixelRatio.getPixelSizeForLayoutSize(12),
              alignSelf: 'center',
              color: '#eb5757',
              fontWeight: 'bold',
              marginTop: '10%',
            }}
          >
            Quero ...
          </Text>
        </FormContainer>
      </Container>
    </View>
  );
}
