import React, { useEffect } from 'react';
import {
  ScrollView,
  Image,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  PixelRatio,
} from 'react-native';

import Icon from 'react-native-vector-icons/Feather';
import logoImg from '../../assets/logo.png';
import {
  Container,
  FormContainer,
  CreateAccountButton,
  CreateAccountButtonText,
} from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button';

export default function Login({ navigation }) {
  useEffect(() => {
    console.log('use effect');
  }, []);

  async function handleSubmit() {
    /* const response = await api.post('/sessions', {
      email,
    });

    const {_id} = response.data;
    await AsyncStorage.setItem('user', _id);
    await AsyncStorage.setItem('techs', techs); */

    console.log('teste');

    navigation.navigate('SingUp');
  }
  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            flex: 1,
          }}
        >
          <View style={{ backgroundColor: '#D74D4D', flex: 1 }} />
          <View style={{ backgroundColor: '#ffffff', flex: 1 }} />
          <Container>
            <Image source={logoImg} />
            <Text
              style={{ color: '#FFFFFF', fontSize: 26, fontWeight: 'bold' }}
            >
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
                  fontSize: PixelRatio.getPixelSizeForLayoutSize(8),
                  alignSelf: 'center',
                  color: '#eb5757',
                  fontWeight: 'bold',
                  marginVertical: 10,
                }}
              >
                Faça seu login
              </Text>

              <View>
                <Input
                  name="email"
                  icon="mail"
                  autoCorrect={false}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  placeholder="E-mail"
                />

                <Input
                  name="password"
                  secureTextEntry
                  icon="lock"
                  returnKeyType="send"
                  placeholder="Senha"
                />
              </View>

              <Button>Entrar</Button>

              <Text
                style={{
                  fontSize: 18,
                  alignSelf: 'center',
                  color: '#eb5757',
                  fontWeight: 'bold',
                  marginVertical: 20,
                }}
              >
                Esqueci minha senha
              </Text>
            </FormContainer>
          </Container>
        </ScrollView>

        <CreateAccountButton onPress={handleSubmit}>
          <Icon name="log-in" size={20} color="#d74d4d" />
          <CreateAccountButtonText>Criar nova conta</CreateAccountButtonText>
        </CreateAccountButton>
      </KeyboardAvoidingView>
    </>
  );
}
