import { Form } from '@unform/mobile';
import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
  PixelRatio,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Input from '../Input';
import InputMask from '../InputMask';
import { FooterModal, FooterModalText } from './styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    position: 'absolute',
  },
  modal: {
    bottom: 0,
    position: 'absolute',
    height: '60%',
    backgroundColor: '#fff',
    width: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 25,
  },
  indicator: {
    width: 50,
    height: 5,
    backgroundColor: '#ccc',
    borderRadius: 50,
    alignSelf: 'center',
    marginTop: 5,
  },
  text: {
    marginTop: 50,
    textAlign: 'center',
  },
  btn: {
    width: '100%',
    height: 50,
    borderRadius: 10,
    backgroundColor: '#D74D4D',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
});

const { height } = Dimensions.get('window');

const Modal = ({ show, close }) => {
  const formRef = useRef(null);

  const handleSubmit = async (data) => {
    close(data, 'add');
  };

  const [state, setState] = useState({
    opacity: new Animated.Value(0),
    container: new Animated.Value(height),
    modal: new Animated.Value(height),
  });

  const openModal = () => {
    Animated.sequence([
      Animated.timing(state.container, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(state.opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.spring(state.modal, {
        toValue: 0,
        bounciness: 5,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const closeModal = () => {
    Animated.sequence([
      Animated.timing(state.modal, {
        toValue: height,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(state.opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(state.container, {
        toValue: height,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  useEffect(() => {
    if (show) {
      openModal();
    } else {
      closeModal();
    }
  }, [show]);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: state.opacity,
          transform: [{ translateY: state.container }],
        },
      ]}
    >
      <Animated.View
        style={[
          styles.modal,
          {
            transform: [{ translateY: state.modal }],
          },
        ]}
      >
        <View style={styles.indicator} />

        <Text style={styles.text}>Filtros</Text>

        <Form
          ref={formRef}
          onSubmit={handleSubmit}
          style={{
            shadowColor: 'black',
            shadowOpacity: 0.9,
            elevation: 10,
          }}
        >
          <Text style={{ color: 'gray' }}>Nome da peça</Text>
          <Input
            name="name"
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Ex: motor"
          />

          <Text
            style={{
              color: 'gray',
              marginTop: PixelRatio.getPixelSizeForLayoutSize(5),
            }}
          >
            Preço (R$)
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}
          >
            <View style={{ flex: 2 }}>
              <InputMask
                name="minValue"
                type="money"
                keyboardType="number-pad"
                placeholder="Valor mínimo"
              />
            </View>
            <Text
              style={{
                alignSelf: 'center',
                marginHorizontal: 2,
                fontWeight: 'bold',
                marginTop: 10,
              }}
            >
              -
            </Text>
            <View style={{ flex: 2 }}>
              <InputMask
                name="maxValue"
                type="money"
                keyboardType="number-pad"
                placeholder="Valor máximo"
              />
            </View>
          </View>

          <TouchableOpacity
            style={styles.btn}
            onPress={() => formRef.current.submitForm()}
          >
            <Text style={{ color: '#fff' }}>Aplicar filtros</Text>
          </TouchableOpacity>
        </Form>

        <FooterModal>
          <TouchableOpacity
            style={{ flexDirection: 'row' }}
            onPress={() => close({}, 'close')}
          >
            <Icon name="minimize-2" size={20} color="#d74d4d" />
            <FooterModalText>Fechar</FooterModalText>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ flexDirection: 'row' }}
            onPress={() => {
              formRef.current.reset();
              close({}, 'remove');
            }}
          >
            <Icon name="x" size={20} color="#d74d4d" />
            <FooterModalText>Remover filtros</FooterModalText>
          </TouchableOpacity>
        </FooterModal>
      </Animated.View>
    </Animated.View>
  );
};

export default Modal;
