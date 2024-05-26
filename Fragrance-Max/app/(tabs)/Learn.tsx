import React, {useState} from 'react';
import { useColorScheme, StyleSheet, Text, View, SafeAreaView, ScrollView, Touchable } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { DefaultTheme, useTheme } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';


const TextInANest = () => {
  const [titleText, setTitleText] = useState("Basic Terms");
  const colorScheme = useColorScheme();
  const textColor = colorScheme === 'dark' ? 'white' : 'black';
  const brandColor = colorScheme === 'dark' ? '#cc8976' : '#cc8976';
  const onPressTitle = () => {
    setTitleText("Basic Terms");
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <Text>
            <Text style={[styles.titleText, { color: textColor}]} onPress={onPressTitle}>
              {titleText}
              {'\n'}
              <Text style={[styles.subtitleText, { color: textColor}]}>WARNING!</Text>            
              {'\n'}
              <Text style={[styles.baseText, { color: textColor}]}>Not all fragrances are suitable for your skin type and can cause allergic reactions. Make sure to test the product for any allergic reactions before committing to a full purchase!</Text>
              </Text>
          </Text>
          <View
                style={{
                  borderBottomColor: textColor,
                  borderBottomWidth: 2,
                }}
          />
          <Text>
            {'\n'}
            <Text style={[styles.termText, { color: brandColor}]}>Parfum:</Text>
            {'\n'}
            <Text style={[styles.baseText, { color: textColor}]}>•A fragrance with a 20-30% concentration of perfume oil to alcohol. Apply 1-2 sprays. Recommended locations include: Back of your neck, behind your ear, and by your collarbone.</Text>
            {'\n'}
            <Text style={[styles.termText, { color: brandColor}]}>Eau de Cologne (EDC):</Text>
            {'\n'}
            <Text style={[styles.baseText, { color: textColor}]}>•The least concentrated style of fragrance, with a perfume oil to alcohol ratio of only 2-5%. Apply 3-7 sprays. Recommended locations include: Back of your neck, behind the ear, wrists, elbows, and collarbones.</Text>
            {'\n'}
            <Text style={[styles.termText, { color: brandColor}]}>Eau de Parfum (EDP):</Text>
            {'\n'}
            <Text style={[styles.baseText, { color: textColor}]}>•A fragrance with a 10-15% concentration of perfume oil to alcohol. Apply 1-3 sprays. Recommended locations include: Back of your neck, behind your ear, and by your collarbone.</Text>
            {'\n'}
            <Text style={[styles.termText, { color: brandColor}]}>Eau de Toilette  (EDT):</Text>
            {'\n'}
            <Text style={[styles.baseText, { color: textColor}]}>•A fragrance with a 5-10% concentration of perfume oil to alcohol. Apply 1-5 sprays. Recommended locations include: Back of your neck, behind your ear, your wrists, and your collarbones.</Text>
            {'\n'}
            <Text style={[styles.termText, { color: brandColor}]}>Fragrance Families:</Text>
            {'\n'}
            <Text style={[styles.baseText, { color: textColor}]}>•Attempts to categorize fragrances vary, but notable systems include the 7-category model by the Société Française des Parfumeurs
             (citrus, floral, fougère, chypre, woody, amber, and leather) and Michael Edwards' 4-category wheel (fresh, floral, oriental, and woody). 
            These systems, along with others, often overlap and feature subcategories, making fragrance classification subjective and best used as a general guide rather than a strict standard.</Text>
            {'\n'}
            <Text style={[styles.termText, { color: brandColor}]}>Drydown:</Text>
            {'\n'}
            <Text style={[styles.baseText, { color: textColor}]}>•The last phase of a fragrance's lifecycle, the drydown refers to the final hours of a fragrance's detection,
             when the top and heart notes have completely disappeared and only the longest lasting part of the base remains.</Text>
            {'\n'}
            <Text style={[styles.termText, { color: brandColor}]}>Projection:</Text>
            {'\n'}
            <Text style={[styles.baseText, { color: textColor}]}>•Term for how far away from the wearer someone else would be able to smell the fragrance. 
            Often estimated by how many inches away from the skin a scent projects.</Text>
            {'\n'}
            <Text style={[styles.termText, { color: brandColor}]}>Skin Scent:</Text>
            {'\n'}
            <Text style={[styles.baseText, { color: textColor}]}>•A scent with minimal projection (i.e., one that can only be detected when extremely close to the wearer). 
            Because of the kinds of ingredients that tend to have this effect, many skin scents have similar characteristics: soft, sheer, and musky.</Text>
            {'\n'}
            <Text style={[styles.termText, { color: brandColor}]}>Notes:</Text>
            {'\n'}
            <Text style={[styles.baseText, { color: textColor}]}>•A single element of a fragrance, the building block level of a scent.</Text>
            {'\n'}
            <Text style={[styles.termText, { color: brandColor}]}>Top:</Text>
            {'\n'}
            <Text style={[styles.baseText, { color: textColor}]}>•The top notes are the first notes that one smells after applying a fragrance. 
            Top notes tend to be made of lighter molecules than the rest of a fragrance, meaning that they disappear first as those molecules evaporate, revealing the heart of the fragrance (see Heart Notes). 
            Various forms of citrus are often used as top notes.</Text>
            {'\n'}
            <Text style={[styles.termText, { color: brandColor}]}>Logentivity:</Text>
            {'\n'}
            <Text style={[styles.baseText, { color: textColor}]}>•The length of time the olfactory presence stays detectable on the skin of the wearer.</Text>
            {'\n'}
            <Text style={[styles.termText, { color: brandColor}]}>Sillage:</Text>
            {'\n'}
            <Text style={[styles.baseText, { color: textColor}]}>•A French term that describes how much of a trail of scent is left behind the wearer. Differs slightly from projection- sillage is more about how long a scent would linger in the air after the person wearing the fragrance has left the room.</Text>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  brandName: {
    color: '#cc8976',
  },
  baseText: {
    fontFamily: 'Cochin',
    fontSize: 18,
  },
  termText: {
    fontFamily: 'Cochin',
    fontSize: 25,
    fontWeight: 'bold', 
  },
  subtitleText: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  titleText: {
    fontSize: 40,
    fontWeight: 'bold',
  },
});

export default TextInANest;