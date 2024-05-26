import React from 'react';
import { ScrollView, View, Text, Image, StyleSheet } from 'react-native';

const fragrances = [
{
    name: 'Sauvage Elixir',
    brand: 'Dior',
    image: require('@/assets/images/dior_sauvage_elixir.jpg'),
},
{
    name: 'Le Male',
    brand: 'Jean Paul Gaultier',
    image: require('@/assets/images/jpg_le_male.jpg'),
},
{
    name: 'Acqua di Gio',
    brand: 'Giorgio Armani',
    image: require('@/assets/images/acqua_di_gio.jpg'),
},
{
    name: 'Spongebob Squarepants Eau De Toilette',
    brand: 'Spongebob Squarepants',
    image: require('@/assets/images/spongebob.jpg'),
},
{
    name: 'Homme',
    brand: 'Dior',
    image: require('@/assets/images/dior_homme.jpg'),
},
{
    name: 'Eros',
    brand: 'Versace',
    image: require('@/assets/images/versace_eros.jpg'),
},
{
    name: 'Bleu',
    brand: 'Chanel',
    image: require('@/assets/images/bleu.jpeg'),
},
{
    name: 'Blue',
    brand: 'Nautica',
    image: require('@/assets/images/nautica_blue.jpg'),
},
{
    name: 'Phantom Parfum',
    brand: 'Paco Rabanne',
    image: require('@/assets/images/phantom.jpg'),
},
{
    name: 'Wood Sage & Sea Salt',
    brand: 'Jo Malone',
    image: require('@/assets/images/jo_malone.jpg'),
},
];

const Collections = () => {
    return (
      <ScrollView style={styles.container}>
        {fragrances.map((fragrance, index) => (
          <View key={index} style={styles.card}>
            <Image source={{ uri: fragrance.image }} style={styles.image} />
            <Text style={styles.name}>{fragrance.name}</Text>
            <Text style={styles.brand}>{fragrance.brand}</Text>
          </View>
        ))}
      </ScrollView>
    );
  };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#b2d8e6',
  },
  card: {
    flex: 1,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
  },
  image: {
    width: '100%',
    height: 200,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  brand: {
    fontSize: 16,
    color: '#888',
    marginTop: 5,
  },
});

export default Collections;