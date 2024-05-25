import React, {useState} from 'react';
import { StyleSheet, Text, View, SafeAreaView, Platform } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { DefaultTheme } from '@react-navigation/native';


const TextInANest = () => {
  const [titleText, setTitleText] = useState("Basic Terms");

  const onPressTitle = () => {
    setTitleText("Basic Terms [pressed]");
  };

  return (
    <SafeAreaView>
      <View>
        <Text>
          <Text style={styles.titleText} onPress={onPressTitle}>
            {titleText}
            {'\n'}
          </Text>
          <Text style={styles.termText}>Eau de Parfum (EDP)</Text>
          {'\n'}
          A fragrance with a 10-15% concentration of perfume oil to alcohol.
        </Text>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  baseText: {
    fontFamily: 'Cochin',
  },
  termText: {
    fontFamily: 'Cochin',
    fontSize: 20,
    fontWeight: 'bold', 
  },
  titleText: {
    fontSize: 40,
    fontFamily: 'Cochin',
    fontWeight: 'bold',
  },
});

export default TextInANest;