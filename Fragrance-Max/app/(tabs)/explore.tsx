import React, {useState} from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { DefaultTheme } from '@react-navigation/native';


const TextInANest = () => {
  const [titleText, setTitleText] = useState("Basic Terms");

  const onPressTitle = () => {
    setTitleText("Basic Terms");
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <Text>
            <Text style={styles.titleText} onPress={onPressTitle}>
              {titleText}
              {'\n'}
              <Text style={styles.subtitleText}>WARNING!</Text>            
              {'\n'}
              <Text style={styles.baseText}>Not all fragrances are suitable for your skin type and can cause allergic reactions. Make sure to test the product for any allergic reactions before committing to a full purchase!</Text>
              {'\n'}
              -----------------------------
              {'\n'}
            </Text>
            {'\n'}
            <Text style={styles.termText}>Parfum:</Text>
            {'\n'}
            <Text style={styles.baseText}>•A fragrance with a 20-30% concentration of perfume oil to alcohol. Apply 1-2 sprays. Recommended locations include: Back of your neck, behind your ear, and by your collarbone.</Text>
            {'\n'}
            <Text style={styles.termText}>Eau de Cologne (EDC):</Text>
            {'\n'}
            <Text style={styles.baseText}>•The least concentrated style of fragrance, with a perfume oil to alcohol ratio of only 2-5%. Apply 3-7 sprays. Recommended locations include: Back of your neck, behind the ear, wrists, elbows, and collarbones.</Text>
            {'\n'}
            <Text style={styles.termText}>Eau de Parfum (EDP):</Text>
            {'\n'}
            <Text style={styles.baseText}>•A fragrance with a 10-15% concentration of perfume oil to alcohol. Apply 1-3 sprays. Recommended locations include: Back of your neck, behind your ear, and by your collarbone.</Text>
            {'\n'}
            <Text style={styles.termText}>Eau de Toilette  (EDT):</Text>
            {'\n'}
            <Text style={styles.baseText}>•A fragrance with a 5-10% concentration of perfume oil to alcohol. Apply 1-5 sprays. Recommended locations include: Back of your neck, behind your ear, your wrists, and your collarbones.</Text>
            {'\n'}
            <Text style={styles.termText}>Fragrance Families:</Text>
            {'\n'}
            <Text style={styles.baseText}>•There have been various attempts over the years to break down the world of fragrance into classifiable categories. 
            While there is no unchallenged standard, the often cited 7-category system used by the SociTtT Frantaise des Parfumeurs is as follows: citrus, floral, fougere, chypre, woody, amber and leather. 
            Conversely, Michael Edwards' Fragrances of the World uses a wheel of 4 categories: fresh, floral, oriental and woody. In either system, there are multiple subcategories of further specificity.
             Other versions may use overlapping terms from both. As there is no universal system, it is common to see a single fragrance categorized in multiple conflicting (or non-conflicting) ways,
              which is why it's best to use the families as loose guidelines and not rely on them too heavily.</Text>
            {'\n'}
            <Text style={styles.termText}>Drydown:</Text>
            {'\n'}
            <Text style={styles.baseText}>•The last phase of a fragrance's lifecycle, the drydown refers to the final hours of a fragrance's detection,
             when the top and heart notes have completely disappeared and only the longest lasting part of the base remains.</Text>
            {'\n'}
            <Text style={styles.termText}>Projection:</Text>
            {'\n'}
            <Text style={styles.baseText}>•Term for how far away from the wearer someone else would be able to smell the fragrance. 
            Often estimated by how many inches away from the skin a scent projects.</Text>
            {'\n'}
            <Text style={styles.termText}>Skin Scent:</Text>
            {'\n'}
            <Text style={styles.baseText}>•A scent with minimal projection (i.e., one that can only be detected when extremely close to the wearer). 
            Because of the kinds of ingredients that tend to have this effect, many skin scents have similar characteristics: soft, sheer, and musky.</Text>
            {'\n'}
            <Text style={styles.termText}>Notes:</Text>
            {'\n'}
            <Text style={styles.baseText}>•A single element of a fragrance, the building block level of a scent.</Text>
            {'\n'}
            <Text style={styles.termText}>Top:</Text>
            {'\n'}
            <Text style={styles.baseText}>•The top notes are the first notes that one smells after applying a fragrance. 
            Top notes tend to be made of lighter molecules than the rest of a fragrance, meaning that they disappear first as those molecules evaporate, revealing the heart of the fragrance (see Heart Notes). 
            Various forms of citrus are often used as top notes.</Text>
            {'\n'}
            <Text style={styles.termText}>Logentivity:</Text>
            {'\n'}
            <Text style={styles.baseText}>•The length of time the olfactory presence stays detectable on the skin of the wearer.</Text>
            {'\n'}
            <Text style={styles.termText}>Sillage:</Text>
            {'\n'}
            <Text style={styles.baseText}>•A French term that describes how much of a trail of scent is left behind the wearer. Differs slightly from projection- sillage is more about how long a scent would linger in the air after the person wearing the fragrance has left the room.</Text>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
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
    fontFamily: 'Times New Roman',
    fontWeight: 'bold',
  },
  titleText: {
    fontSize: 40,
    fontFamily: 'Times New Roman',
    fontWeight: 'bold',
  },
});

export default TextInANest;