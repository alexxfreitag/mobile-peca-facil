import React from 'react';
import { Image, Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { ImageView, InformatioView, InformationTitle } from './styles';
import logoImg from '../../assets/logo.png';

export default function SingUpOption({ route, navigation }) {
  const { item } = route.params;
  return (
    <>
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <ImageView>
          {item.picture ? (
            <Image
              source={{ uri: item.picture.url }}
              style={{ width: 250, height: 250 }}
            />
          ) : (
            <Image source={logoImg} style={{ width: 250, height: 250 }} />
          )}
        </ImageView>
        <View
          style={{
            paddingTop: 5,
            paddingHorizontal: 15,
            marginTop: 10,
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: '300' }}>{item.name}</Text>
          <Text style={{ fontSize: 20, fontWeight: '700' }}>
            R$
            {item.value}
          </Text>
          <InformatioView>
            <InformationTitle>Descrição</InformationTitle>
            <Text style={{ fontSize: 14, marginTop: 5 }}>
              {item.description}
            </Text>
          </InformatioView>
          <InformatioView>
            <InformationTitle>Categoria</InformationTitle>
            <Text style={{ fontSize: 14, marginTop: 5 }}>{item.category}</Text>
          </InformatioView>
          <InformatioView>
            <InformationTitle>Anunciante</InformationTitle>
            <Text style={{ fontSize: 14, marginTop: 5 }}>{item.user.name}</Text>
            <Text style={{ fontSize: 14, marginTop: 5 }}>
              {item.user.phone}
            </Text>
          </InformatioView>
        </View>
        <TouchableOpacity
          style={{
            borderWidth: 2,
            borderColor: '#fff',
            alignItems: 'center',
            justifyContent: 'center',
            width: 70,
            position: 'absolute',
            bottom: 20,
            right: 10,
            height: 70,
            backgroundColor: '#d74d4d',
            borderRadius: 100,
          }}
          onPress={() => navigation.navigate('Chat')}
        >
          <Icon name="message-circle" size={30} color="#fff" />
        </TouchableOpacity>
      </View>
    </>
  );
}
