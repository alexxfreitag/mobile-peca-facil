import React from 'react';
import {
  ScrollView,
  Image,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
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

export default function Login() {
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

            <FormContainer
              style={{
                shadowColor: 'black',
                shadowOpacity: 0.9,
                elevation: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 24,
                  alignSelf: 'center',
                  color: '#eb5757',
                  fontWeight: 'bold',
                  marginVertical: 24,
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
      </KeyboardAvoidingView>
      <CreateAccountButton>
        <Icon name="log-in" size={20} color="#d74d4d" />
        <CreateAccountButtonText>Criar asnova conta</CreateAccountButtonText>
      </CreateAccountButton>
    </>
  );
}
