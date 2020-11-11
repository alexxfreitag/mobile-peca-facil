import React, { useState, useEffect } from 'react';
import {
  View,
  FlatList,
  Text,
  Image,
  TouchableOpacity,
  PixelRatio,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Feather';
import Button from '../../components/Button';
import api from '../../services/api';
import logoImg from '../../assets/logo.png';

export default function HomeSeller({ route, navigation }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const user = await AsyncStorage.getItem('@PecaFacil:user');
      const userParsed = JSON.parse(user);
      const response = await api.get(`/products?user_id=${userParsed.id}`);
      setProducts(response.data);
      setLoading(false);
    }
    loadData();
  }, []);

  useEffect(() => {
    console.log('useEffect');
    console.log(route.params);
    if (route.params?.productId) {
      console.log('useEffect inside conditional');
      const addNewProduct = async (productId) => {
        console.log('addNewProduct');
        console.log(productId);
        const response = await api.get(`/products/${productId}`);
        console.log(response.data);
        setProducts([...products, response.data]);
      };
      addNewProduct(route.params?.productId);
    }
  }, [route.params?.productId]);

  return (
    <View style={{ backgroundColor: '#f5f5f5', flex: 1 }}>
      {loading ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
          }}
        >
          <ActivityIndicator size={70} color="#d74d4d" />
          <Text style={{ fontSize: 24, marginTop: 20 }}>Carregando...</Text>
        </View>
      ) : (
        <>
          <Button
            style={{ width: 300, alignSelf: 'center' }}
            onPress={() => {
              navigation.navigate('ProductRegistration');
            }}
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
                      {!item.picture ? (
                        <Image
                          source={logoImg}
                          style={{
                            width: 125,
                            height: 125,
                            borderTopLeftRadius: 3,
                            borderBottomLeftRadius: 3,
                          }}
                          resizeMode="cover"
                        />
                      ) : (
                        <Image
                          source={{
                            uri: item.picture.url,
                          }}
                          style={{
                            width: 125,
                            height: 125,
                            borderTopLeftRadius: 3,
                            borderBottomLeftRadius: 3,
                          }}
                          resizeMode="cover"
                        />
                      )}
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
                            fontSize: PixelRatio.get() * 6,
                            marginBottom: 8,
                            color: '#eb5757',
                            fontWeight: '700',
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
                            navigation.navigate('ProductRegistration', {
                              item,
                            });
                          }}
                        >
                          <Text
                            style={{
                              color: '#e02041',
                              fontSize: 15,
                              fontWeight: '600',
                              marginRight: 2,
                            }}
                          >
                            Editar peça
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
        </>
      )}
    </View>
  );
}
