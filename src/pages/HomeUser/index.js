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
import Icon from 'react-native-vector-icons/Feather';
import Button from '../../components/Button';
import api from '../../services/api';
import logoImg from '../../assets/logo.png';

export default function HomeUser({ navigation }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const response = await api.get('/products');
      setProducts(response.data);
      setLoading(false);
    }
    loadData();
  }, []);

  const renderItem = ({ item }) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          borderRadius: 3,
          backgroundColor: '#fff',
          elevation: 5,
          marginVertical: 5,
          flex: 1,
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
    );
  };

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
                Não existe nenhuma peça cadastrada ainda!
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
                  Peças cadastradas:
                </Text>
                <FlatList
                  data={products}
                  keyExtractor={(item) => String(item.id)}
                  windowSize={10}
                  renderItem={renderItem}
                />
              </>
            )}
          </View>
        </>
      )}
    </View>
  );
}
