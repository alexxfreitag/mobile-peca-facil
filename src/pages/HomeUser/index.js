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
import Modal from '../../components/Modal';

export default function HomeUser({ navigation }) {
  const [originalProducts, setOriginalProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [messageDataNotFound, setMessageDataNotFound] = useState(
    'Não existe nenhuma peça cadastrada ainda!',
  );

  useEffect(() => {
    async function loadData() {
      const response = await api.get('/products');
      response.data.forEach((element) => {
        // eslint-disable-next-line no-param-reassign
        element.value = `R$ ${element.value
          .toFixed(2)
          .replace('.', ',')
          .replace(/(\d)(?=(\d{3})+,)/g, '$1.')}`;
      });
      setProducts(response.data);
      setOriginalProducts(response.data);

      setLoading(false);
    }
    loadData();
  }, []);

  const applyFilters = (val, operation) => {
    if (operation === 'add') {
      let filteredProducts;

      filteredProducts = originalProducts.filter((product) =>
        product.name.toLowerCase().includes(val.name),
      );

      filteredProducts = filteredProducts.filter((product) => {
        const formattedFilterValue = `R$ ${val.minValue
          .toFixed(2)
          .replace('.', ',')
          .replace(/(\d)(?=(\d{3})+,)/g, '$1.')}`;
        return product.value >= formattedFilterValue;
      });

      filteredProducts = filteredProducts.filter((product) => {
        const formattedFilterValue = `R$ ${val.maxValue
          .toFixed(2)
          .replace('.', ',')
          .replace(/(\d)(?=(\d{3})+,)/g, '$1.')}`;
        return product.value <= formattedFilterValue;
      });

      if (filteredProducts.length === 0) {
        setMessageDataNotFound('Nenhuma peça corresponde ao filtro aplicado!');
      }
      setProducts(filteredProducts);
    } else if (operation === 'remove') {
      setMessageDataNotFound('Não existe nenhuma peça cadastrada ainda!');
      setProducts(originalProducts);
    }
    setModal(false);
  };

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
            source={{ uri: item.picture.url }}
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
            {item.value}
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
            onPress={
              () => setModal(true) /* navigation.navigate('AutomobileType') */
            }
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
                {messageDataNotFound}
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
                  Peças disponíveis:
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
      <Modal show={modal} close={applyFilters} />
    </View>
  );
}
