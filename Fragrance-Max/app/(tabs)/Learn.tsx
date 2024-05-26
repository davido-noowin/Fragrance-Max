import React, {useState} from 'react';
import { useColorScheme, StyleSheet, Text, View, SafeAreaView, ScrollView, Touchable } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { DefaultTheme, useTheme } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';


const Learn = () => {
  const terms = [
    {
      term: 'Parfum',
      description: 'A fragrance with a 20-30% concentration of perfume oil to alcohol. Apply 1-2 sprays. Recommended locations include: Back of your neck, behind your ear, and by your collarbone.',
    },
    {
      term: 'Eau de Cologne (EDC)',
      description: 'The least concentrated style of fragrance, with a perfume oil to alcohol ratio of only 2-5%. Apply 3-7 sprays. Recommended locations include: Back of your neck, behind the ear, wrists, elbows, and collarbones.',
    },
    {
      term: 'Eau de Parfum (EDP)',
      description: 'A fragrance with a 10-15% concentration of perfume oil to alcohol. Apply 1-3 sprays. Recommended locations include: Back of your neck, behind your ear, and by your collarbone.',
    },
    {
      term: 'Eau De Toilette (EDT)',
      description: 'A fragrance with a 5-10% concentration of perfume oil to alcohol. Apply 1-5 sprays. Recommended locations include: Back of your neck, behind your ear, your wrists, and your collarbones.',
    },
    {
      term: 'Longevity',
      description: 'The length of time the olfactory presence stays detectable on the skin of the wearer.',
    },
    {
      term: 'Sillage',
      description: 'A French term that describes how much of a trail of scent is left behind the wearer. Differs slightly from projection- sillage is more about how long a scent would linger in the air after the person wearing the fragrance has left the room.',
    },
    {
      term: 'Fragrance Families',
      description: 'Attempts to categorize fragrances vary, but notable systems include the 7-category model by the Société Française des Parfumeurs (citrus, floral, fougère, chypre, woody, amber, and leather) and Michael Edwards 4-category wheel (fresh, floral, oriental, and woody). These systems, along with others, often overlap and feature subcategories, making fragrance classification subjective and best used as a general guide rather than a strict standard.',
    },
    {
      term: 'Drydown',
      description: "The last phase of a fragrance's lifecycle, the drydown refers to the final hours of a fragrance's detection, when the top and heart notes have completely disappeared and only the longest lasting part of the base remains.",
    },
    {
      term: 'Projection',
      description: 'Term for how far away from the wearer someone else would be able to smell the fragrance. Often estimated by how many inches away from the skin a scent projects.',
    },
    {
      term: 'Skin Scent',
      description: 'A scent with minimal projection (i.e., one that can only be detected when extremely close to the wearer). Because of the kinds of ingredients that tend to have this effect, many skin scents have similar characteristics: soft, sheer, and musky.',
    },
    {
      term: 'Notes',
      description: 'A single element of a fragrance, the building block level of a scent.',
    },
    {
      term: 'Top',
      description: 'The top notes are the first notes that one smells after applying a fragrance. Top notes tend to be made of lighter molecules than the rest of a fragrance, meaning that they disappear first as those molecules evaporate, revealing the heart of the fragrance (see Heart Notes). Various forms of citrus are often used as top notes.',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      {terms.map((term, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.name}>{term.term}</Text>
          <Text style={styles.brand}>{term.description}</Text>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  warning: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    marginBottom: 20,
  },
});
export default Learn;

