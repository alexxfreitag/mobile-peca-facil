import React, { useState, useEffect, useRef } from 'react';
import {
  Text,
  ScrollView,
  PixelRatio,
  Alert,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';
import * as Yup from 'yup';
import ImagePicker from 'react-native-image-picker';

import Button from '../../components/Button';
import Input from '../../components/Input';
import InputMask from '../../components/InputMask';
import api from '../../services/api';
import {
  Container,
  PictureView,
  PictureImage,
  InputTitle,
  FormContainer,
} from './styles';

export default function ProductRegistration({ route, navigation }) {
  const formRef = useRef(null);
  const [picture, setPicture] = useState();
  const [loading, setLoading] = useState(false);
  const [updateMode, setUpdateMode] = useState(false);

  const initialData = {
    name: route.params?.item.name,
    description: route.params?.item.description,
    category: route.params?.item.category,
    value: `${route.params?.item.value}`,
  };

  useEffect(() => {
    if (route.params?.item) {
      const pictureParam = {
        uri: route.params?.item.picture.url,
      };
      setPicture(pictureParam);
      setUpdateMode(true);
    }
  }, []);

  const goBack = (productId, updateItem) => {
    navigation.navigate('HomeSeller', { productId, updateItem });
  };

  async function handleSubmit(data) {
    setLoading(true);
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required('O título é obrigatório'),
        category: Yup.string().required('A categoria é obrigatória'),
        value: Yup.string().required('O valor é obrigatório'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      if (updateMode) {
        const productId = route.params?.item.id;

        const body = {};
        if (initialData.name !== data.name) body.name = data.name;
        if (initialData.description !== data.description)
          body.description = data.description;
        if (initialData.value !== data.value) body.value = data.value;
        if (initialData.category !== data.category)
          body.category = data.category;

        if (Object.keys(body).length === 0) {
          Alert.alert(
            'Produto não atualizado!',
            'Nenhuma informação foi alterada.',
          );
          return;
        }

        await api.put(`/products/${productId}`, body);

        Alert.alert('Produto atualizado com sucesso!');

        goBack(productId, true);

        return;
      }

      const response = await api.post('/products', {
        name: data.name,
        description: data.description,
        value: data.value,
        category: data.category,
      });

      const { id: productId } = response.data;

      if (picture) {
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
      }

      Alert.alert(
        'Produto cadastrado com sucesso!',
        'Este produto já está sendo exibido para os usuários.',
      );

      goBack(productId, false);
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
    } finally {
      setLoading(false);
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
      <FormContainer
        initialData={initialData}
        ref={formRef}
        onSubmit={handleSubmit}
      >
        <ScrollView>
          <InputTitle>Título do produto *</InputTitle>
          <Input name="name" placeholder="Ex: Lanterna traseira" />
          <InputTitle style={{ marginTop: 20 }}>
            Descrição do produto
          </InputTitle>
          <Input
            name="description"
            placeholder="Ex: Lanterna traseira Gol G2 95 A 99"
          />
          <InputTitle style={{ marginTop: 20 }}>Categoria *</InputTitle>
          <Input name="category" placeholder="Ex: Lanterna" />
          <InputTitle style={{ marginTop: 20 }}>Valor *</InputTitle>
          <InputMask
            type="money"
            name="value"
            keyboardType="number-pad"
            placeholder="Ex: R$250,00"
          />
        </ScrollView>
        <Button
          style={{ bottom: -10 }}
          onPress={() => {
            formRef.current.submitForm();
          }}
        >
          {loading ? (
            <ActivityIndicator size={20} color="#fff" />
          ) : (
            <Text>{updateMode ? 'Atualizar' : 'Cadastrar'}</Text>
          )}
        </Button>
      </FormContainer>
    </Container>
  );
}
