import React from 'react';
import { ScrollView, View, Text, Image, StyleSheet } from 'react-native';

const fragrances = Array(10).fill({
  name: 'Sauvage Elixir',
  brand: 'Dior',
  image: '',
});

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