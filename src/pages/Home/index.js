import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Button from '../../components/Button';
import api from '../../services/api';

export default function Home({ navigation }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function loadData() {
      try {
        const response = await api.get('/products');
        setProducts(response.data);
      } catch (err) {
        console.log(err);
      }
    }
    loadData();
  }, []);

  return (
    <View style={{ backgroundColor: '#fff', flex: 1 }}>
      <Button
        style={{ width: 300, alignSelf: 'center' }}
        onPress={() => navigation.navigate('AutomobileType')}
      >
        Pesquisar
      </Button>
      <View
        style={{
          marginHorizontal: 10,
          borderTopWidth: 2,
          borderTopColor: '#d74d4d',
          marginTop: 20,
          paddingTop: 10,
        }}
      >
        <Text
          style={{
            fontSize: 22,
            marginBottom: 8,
            alignSelf: 'center',
            color: '#eb5757',
            fontWeight: 'bold',
          }}
        >
          Peças cadastradas:
        </Text>
        <FlatList
          data={products}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <View
              style={{
                padding: 10,
                flex: 1,
                flexDirection: 'row',
                borderRadius: 10,
                borderColor: '#d74d4d',
                backgroundColor: '#fff',
                borderWidth: 1,
                shadowColor: 'black',
                shadowOpacity: 0.9,
                elevation: 10,
                marginTop: 30,
              }}
            >
              <Image
                source={{ uri: item.picture.url }}
                style={{ width: 125, height: 125 }}
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
                    fontSize: 18,
                    marginBottom: 8,
                    color: '#eb5757',
                    fontWeight: 'bold',
                  }}
                >
                  {item.name}
                </Text>
                <Text
                  style={{ fontSize: 14, color: '#41414d', marginBottom: 7 }}
                >
                  {item.description}
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
      </View>
    </View>
  );
}
