import React, { useState, useRef } from 'react';
import { Text, View, PixelRatio, Alert, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import * as Yup from 'yup';
import {
  Container,
  FormContainer,
  Footer,
  FooterText,
  InputScrollView,
} from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button';
import api from '../../services/api';

export default function SignUpUser({ navigation }) {
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(data) {
    setLoading(true);
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required('O nome é obrigatório'),
        email: Yup.string()
          .email('Digite um e-mail válido')
          .required('O e-mail é obrigatório'),
        password: Yup.string()
          .required('A senha é obrigatório')
          .min(6, 'No mínimo seis dígitos'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      await api.post('/users', {
        name: data.name,
        email: data.email,
        password: data.password,
      });

      Alert.alert(
        'Cadastro realizado com sucesso!',
        'Faça agora o login e aproveite o aplicativo.',
      );

      navigation.navigate('Login');
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errorMessages = {};

        err.inner.forEach((error) => {
          errorMessages[error.path] = error.message;
        });

        formRef.current.setErrors(errorMessages);
        return;
      }

      Alert.alert('Falha na criação de usuário', err.response.data.error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <View style={{ flex: 1 }}>
        <View style={{ backgroundColor: '#D74D4D', flex: 1 }} />
        <View style={{ backgroundColor: '#ffffff', flex: 1 }} />
        <Container>
          <Text
            style={{
              fontSize: PixelRatio.getPixelSizeForLayoutSize(8),
              alignSelf: 'center',
              color: '#FFF',
              fontWeight: 'bold',
            }}
          >
            Cadastro de usuário
          </Text>

          <FormContainer
            ref={formRef}
            onSubmit={handleSubmit}
            style={{
              shadowColor: 'black',
              shadowOpacity: 0.9,
              elevation: 15,
              borderColor: '#D74D4D',
              borderWidth: 2,
            }}
          >
            <InputScrollView>
              <Input
                name="name"
                icon="user"
                autoCorrect={false}
                placeholder="Nome"
              />

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
                autoCapitalize="none"
                returnKeyType="send"
                placeholder="Senha"
              />
            </InputScrollView>
            <Button
              onPress={() => {
                formRef.current.submitForm();
              }}
            >
              {loading ? (
                <ActivityIndicator size={20} color="#fff" />
              ) : (
                <Text>Cadastrar</Text>
              )}
            </Button>
          </FormContainer>
        </Container>
      </View>
      <Footer onPress={() => navigation.navigate('Login')}>
        <Icon name="arrow-left" size={20} color="#d74d4d" />
        <FooterText>Voltar para login</FooterText>
      </Footer>
    </>
  );
}
