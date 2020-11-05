import React, { useState, useRef } from 'react';
import {
  Text,
  ScrollView,
  PixelRatio,
  Alert,
  Image,
  Platform,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';
import * as Yup from 'yup';
import ImagePicker from 'react-native-image-picker';

import Button from '../../components/Button';
import Input from '../../components/Input';
import api from '../../services/api';
import {
  Container,
  PictureView,
  PictureImage,
  InputTitle,
  FormContainer,
} from './styles';

export default function ProductRegistration({ navigation }) {
  const formRef = useRef(null);
  const [picture, setPicture] = useState();

  async function handleSubmit(data) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required('O título é obrigatório'),
        category: Yup.string().required('A categoria é obrigatória'),
        value: Yup.string().required('O valor é obrigatório'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      const response = await api.post('/products', {
        name: data.name,
        description: data.description,
        value: data.value,
        category: data.category,
      });

      const { id: productId } = response.data;

      const formData = new FormData();

      const file = {
        uri:
          Platform.OS === 'android'
            ? picture.uri
            : picture.uri.replace('file://', ''),
        name: picture.fileName,
        type: picture.type,
      };

      formData.append('file', file);

      await api.post(`/files/products/${productId}`, formData);

      Alert.alert(
        'Produto cadastrado com sucesso!',
        'Este produto já está sendo exibido para os usuários.',
      );

      navigation.goBack();
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errorMessages = {};

        err.inner.forEach((error) => {
          errorMessages[error.path] = error.message;
        });

        formRef.current.setErrors(errorMessages);
        return;
      }

      Alert.alert('Falha no cadastro de produto', err.response.data.error);
    }
  }

  function imagePickerCb(data) {
    if (data.didCancel) return;
    if (data.error) return;
    if (!data.uri) return;

    setPicture(data);
  }

  return (
    <Container>
      <PictureView>
        {picture ? (
          <PictureImage source={{ uri: picture.uri }} resizeMode="cover" />
        ) : (
          <>
            <TouchableOpacity
              style={{
                borderColor: '#fff',
                borderWidth: 2,
                borderStyle: 'dashed',
                borderRadius: 1,
                padding: PixelRatio.get() * 7,
                alignItems: 'center',
              }}
              onPress={() => ImagePicker.showImagePicker({}, imagePickerCb)}
            >
              <Icon name="camera" size={50} color="#fff" />
              <Text style={{ color: '#fff', marginTop: PixelRatio.get() * 3 }}>
                Adicionar foto
              </Text>
            </TouchableOpacity>
          </>
        )}
      </PictureView>
      <FormContainer ref={formRef} onSubmit={handleSubmit}>
        <ScrollView>
          <InputTitle>Título do produto *</InputTitle>
          <Input name="name" placeholder="Ex: Lâmpada traseira" />
          <InputTitle style={{ marginTop: 20 }}>
            Descrição do produto
          </InputTitle>
          <Input
            name="description"
            placeholder="Ex: Acende uma luz quando solicitado"
          />
          <InputTitle style={{ marginTop: 20 }}>Categoria *</InputTitle>
          <Input name="category" placeholder="Ex: Motor" />
          <InputTitle style={{ marginTop: 20 }}>Valor *</InputTitle>
          <Input
            keyboardType="number-pad"
            name="value"
            placeholder="Ex: 250.00"
          />
        </ScrollView>
        <Button
          style={{ bottom: -10 }}
          onPress={() => {
            formRef.current.submitForm();
          }}
        >
          Cadastrar
        </Button>
      </FormContainer>
    </Container>
  );
}
