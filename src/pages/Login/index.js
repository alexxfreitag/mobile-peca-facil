import React, { useRef } from 'react';
import {
  ScrollView,
  Image,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  PixelRatio,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

import api from '../../services/api';

export default function Login({ navigation }) {
  const formRef = useRef(null);

  async function handleNewAccount() {
    navigation.navigate('SingUpOption');
  }

  async function handleSubmit(data) {
    if (!data.email || !data.password) {
      Alert.alert('Aviso', 'Necessário informar os dados de login!');
      return;
    }
    try {
      const response = await api.post('/sessions', {
        email: data.email,
        password: data.password,
      });

      Alert.alert('Login realizado com sucesso!');

      const { token, user } = response.data;

      await AsyncStorage.multiSet([
        ['@PecaFacil:token', token],
        ['@PecaFacil:user', JSON.stringify(user)],
      ]);

      navigation.navigate('Home');
    } catch (err) {
      Alert.alert('Falha na autenticação', err.response.data.error);
    }
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
              ref={formRef}
              onSubmit={handleSubmit}
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

              <Button
                onPress={() => {
                  formRef.current.submitForm();
                }}
              >
                Entrar
              </Button>

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

        <CreateAccountButton onPress={handleNewAccount}>
          <Icon name="log-in" size={20} color="#d74d4d" />
          <CreateAccountButtonText>Criar nova conta</CreateAccountButtonText>
        </CreateAccountButton>
      </KeyboardAvoidingView>
    </>
  );
}
