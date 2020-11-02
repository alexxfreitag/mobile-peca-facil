import React, { useRef } from 'react';
import { Image, Text, View, PixelRatio, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import * as Yup from 'yup';
import logoImg from '../../assets/logo.png';
import { Container, FormContainer, Footer, FooterText } from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button';
import api from '../../services/api';

export default function SingUpUser({ navigation }) {
  const formRef = useRef(null);

  async function handleSubmit(data) {
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
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errorMessages = {};

        err.inner.forEach((error) => {
          errorMessages[error.path] = error.message;
        });

        formRef.current.setErrors(errorMessages);
      }
    }

    /* try {
      await api.post('/users', {
        email: data.email,
        password: data.password,
      });

      Alert.alert('Login realizado com sucesso!');

      //navigation.navigate('Home');
    } catch (err) {
      Alert.alert('Falha na autenticação', err.response.data.error);
    } */
  }

  return (
    <>
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
              Cadastro de usuário
            </Text>

            <View>
              <Input
                name="name"
                icon="user"
                autoCorrect={false}
                autoCapitalize="none"
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
                returnKeyType="send"
                placeholder="Senha"
              />
            </View>
            <Button
              onPress={() => {
                formRef.current.submitForm();
              }}
            >
              Cadastrar
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
