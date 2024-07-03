import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, Image, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { useUserContext } from '@/app/auth';

// const fragrances = [
// {
//     name: 'Sauvage Elixir',
//     brand: 'Dior',
//     image: require('@/assets/images/dior-sauvage-elixir.jpg'),
// },
// {
//     name: 'Le Male',
//     brand: 'Jean Paul Gaultier',
//     image: require('@/assets/images/le_male.png'),
// },
// {
//     name: 'Acqua di Gio',
//     brand: 'Giorgio Armani',
//     image: require('@/assets/images/acqua_di_gio.jpg'),
// },
// {
//     name: 'Spongebob Squarepants Eau De Toilette',
//     brand: 'Spongebob Squarepants',
//     image: require('@/assets/images/spongebob.jpg'),
// },
// {
//     name: 'Homme',
//     brand: 'Dior',
//     image: require('@/assets/images/dior_homme.jpg'),
// },
// {
//     name: 'Eros',
//     brand: 'Versace',
//     image: require('@/assets/images/versace_eros.jpg'),
// },
// {
//     name: 'Bleu',
//     brand: 'Chanel',
//     image: require('@/assets/images/bleu.jpeg'),
// },
// {
//     name: 'Blue',
//     brand: 'Nautica',
//     image: require('@/assets/images/nautica_blue.jpg'),
// },
// {
//     name: 'Phantom Parfum',
//     brand: 'Paco Rabanne',
//     image: require('@/assets/images/phantom.jpg'),
// },
// {
//     name: 'Wood Sage & Sea Salt',
//     brand: 'Jo Malone',
//     image: require('@/assets/images/jo_malone.jpg'),
// },
// ];

const Collections = () => {
  const [fragrances, setFragrance] = useState<any[]>([]);
  const {user, setUser} = useUserContext();

  const loadCollection = () => {
    console.log(`populating collections page for user: ${user}`);
    
    fetch(`http://192.168.0.25:8000/api/get-collection?username=${user}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setFragrance(data['collection']);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };


  const addToCollection = () => {
    console.log(`adding a new fragrance for user: ${user}`);
  }

  useEffect(() => {
      loadCollection();
    }, []
  )

    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollContainer}>
          <TouchableOpacity onPress={addToCollection}>
            <Text>Add</Text>
          </TouchableOpacity>
          {fragrances.map((fragrance, index) => (
            <View key={index} style={styles.card}>
              <Image source={fragrance.image } style={styles.image} />
              <Text style={styles.name}>{fragrance.name}</Text>
              <Text style={styles.brand}>{fragrance.brand}</Text>
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>
    );
  };

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    marginTop: 50,
    padding: 16,
    backgroundColor: '#b2d8e6',
  },
  container: {
    flex: 1,
    backgroundColor: '#b2d8e6',
  },
  card: {
    flex: 1,
    marginBottom: 20,
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