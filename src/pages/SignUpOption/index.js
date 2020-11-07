import React from 'react';
import {
  ScrollView,
  Image,
  Text,
  View,
  PixelRatio,
  TouchableOpacity,
} from 'react-native';

import Icon from 'react-native-vector-icons/Feather';
import logoImg from '../../assets/logo.png';
import { Container, FormContainer, Footer, FooterText } from './styles';

export default function SignUpOption({ navigation }) {
  return (
    <>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flex: 1,
        }}
      >
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

            <View
              style={{
                display: 'flex',
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
                width: '100%',
              }}
            >
              <View>
                <TouchableOpacity
                  style={{
                    borderRadius: 80,
                    height: PixelRatio.getPixelSizeForLayoutSize(40),
                    width: PixelRatio.getPixelSizeForLayoutSize(40),
                    backgroundColor: '#eb5757',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  onPress={() => navigation.navigate('SignUpUser')}
                >
                  <Icon name="search" size={50} color="black" />
                </TouchableOpacity>
                <Text
                  style={{
                    fontSize: PixelRatio.getPixelSizeForLayoutSize(8),
                    alignSelf: 'center',
                    color: '#eb5757',
                    fontWeight: 'bold',
                    marginTop: '10%',
                  }}
                >
                  Pesquisar
                </Text>
              </View>
              <View>
                <TouchableOpacity
                  style={{
                    borderRadius: 80,
                    height: PixelRatio.getPixelSizeForLayoutSize(40),
                    width: PixelRatio.getPixelSizeForLayoutSize(40),
                    backgroundColor: '#eb5757',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  onPress={() => navigation.navigate('SignUpSeller')}
                >
                  <Icon name="dollar-sign" size={50} color="black" />
                </TouchableOpacity>
                <Text
                  style={{
                    fontSize: PixelRatio.getPixelSizeForLayoutSize(8),
                    alignSelf: 'center',
                    color: '#eb5757',
                    fontWeight: 'bold',
                    marginTop: '10%',
                  }}
                >
                  Vender
                </Text>
              </View>
            </View>
          </FormContainer>
        </Container>
      </ScrollView>

      <Footer onPress={() => navigation.goBack()}>
        <Icon name="arrow-left" size={20} color="#d74d4d" />
        <FooterText>Voltar para login</FooterText>
      </Footer>
    </>
  );
}
