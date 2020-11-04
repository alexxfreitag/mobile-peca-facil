import React, { useState, useEffect } from 'react';
import {
  View,
  FlatList,
  Text,
  Image,
  TouchableOpacity,
  PixelRatio,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Feather';
import Button from '../../components/Button';
import api from '../../services/api';

export default function HomeSeller({ navigation }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function loadData() {
      const user = await AsyncStorage.getItem('@PecaFacil:user');
      const userParsed = JSON.parse(user);
      const response = await api.get(`/products?user_id=${userParsed.id}`);
      setProducts(response.data);
    }
    loadData();
  }, []);

  return (
    <View style={{ backgroundColor: '#f5f5f5', flex: 1 }}>
      <Button
        style={{ width: 300, alignSelf: 'center' }}
        onPress={() => navigation.navigate('ProductRegistration')}
      >
        Cadastrar
      </Button>
      <View
        style={{
          marginHorizontal: 10,
          borderTopWidth: 2,
          borderTopColor: '#d74d4d',
          marginTop: 20,
          paddingTop: 10,
          flex: 1,
        }}
      >
        {products.length === 0 ? (
          <Text
            style={{
              fontSize: 18,
              marginBottom: 8,
              alignSelf: 'center',
              color: '#eb5757',
              fontWeight: 'bold',
            }}
          >
            Você não cadastrou nenhuma peça ainda!
          </Text>
        ) : (
          <>
            <Text
              style={{
                fontSize: 22,
                marginBottom: 8,
                alignSelf: 'center',
                color: '#eb5757',
                fontWeight: 'bold',
              }}
            >
              Minhas peças cadastradas:
            </Text>
            <FlatList
              data={products}
              keyExtractor={(item) => String(item.id)}
              renderItem={({ item }) => (
                <View
                  style={{
                    flexDirection: 'row',
                    borderRadius: 3,
                    backgroundColor: '#fff',
                    elevation: 5,
                    marginVertical: 5,
                  }}
                >
                  <Image
                    source={{ uri: item.picture.url }}
                    style={{
                      width: 125,
                      height: 125,
                      borderTopLeftRadius: 3,
                      borderBottomLeftRadius: 3,
                    }}
                    resizeMode="cover"
                  />
                  <View
                    style={{
                      marginHorizontal: 5,
                      paddingHorizontal: 5,
                      flexDirection: 'column',
                      justifyContent: 'space-around',
                      flex: 1,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: PixelRatio.get() * 5,
                        marginBottom: 8,
                        color: '#eb5757',
                        fontWeight: '600',
                      }}
                    >
                      {item.name}
                    </Text>
                    <Text
                      style={{
                        fontSize: 16,
                        color: '#41414d',
                        marginBottom: 7,
                      }}
                    >
                      R$
                      {item.value.toLocaleString('pt-br', {
                        style: 'currency',
                        currency: 'BRL',
                      })}
                    </Text>

                    <TouchableOpacity
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        alignSelf: 'flex-end',
                      }}
                      onPress={() => {
                        navigation.navigate('ProductDetail', {
                          item,
                        });
                      }}
                    >
                      <Text
                        style={{
                          color: '#e02041',
                          fontSize: 15,
                          fontWeight: 'bold',
                          marginRight: 2,
                        }}
                      >
                        Ver mais detalhes
                      </Text>
                      <Icon name="arrow-right" size={16} color="#d74d4d" />
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            />
          </>
        )}
      </View>
    </View>
  );
}
