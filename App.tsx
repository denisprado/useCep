/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  useColorScheme,
  View,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {useCep} from '~/hooks/cep.hook';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    padding: 8,
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [street, setStreet] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [complement, setComplement] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');

  const {dataCep, loadingCep, invalidCep} = useCep(zipCode);

  useEffect(() => {
    setStreet(dataCep?.logradouro);
    setComplement(dataCep?.complemento);
    setNeighborhood(dataCep?.bairro);
    setCity(dataCep?.localidade);
    setState(dataCep?.uf);
    console.log(dataCep);
  }, [dataCep, zipCode]);

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <View>
            <Text>Insira um cep:</Text>
            <TextInput
              value={zipCode}
              onChangeText={data => setZipCode(data)}
            />
            <Text style={{color: 'red'}}>{invalidCep && 'CEP inválido!'}</Text>
          </View>

          {!loadingCep ? (
            <View style={backgroundStyle}>
              <Text>Rua: {street}</Text>
              <Text>Complemento: {complement}</Text>
              <Text>Bairro: {neighborhood}</Text>
              <Text>Cidade: {city}</Text>
              <Text>Estado: {state}</Text>
            </View>
          ) : (
            <ActivityIndicator />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
