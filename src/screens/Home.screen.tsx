import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { useGetPokemonByNameQuery } from '../services/pokemon';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import _ from 'lodash';
import React from 'react';
import { Section } from '../layout/Section';

export const Home = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const { data, error, isLoading } = useGetPokemonByNameQuery('rattata');

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

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
          <Section title="Pokemon">
            Select your favorite <Text style={styles.highlight}>Pokemon </Text>
            from the list below.
          </Section>
          <Section title="Example">
            {error ? (
              <Text>Oh no, there was an error!</Text>
            ) : isLoading ? (
              <Text>Loading...</Text>
            ) : data ? (
              <View>
                <Text>{_.capitalize(data.species.name)}</Text>
                <Image
                  source={{ uri: data.sprites.front_shiny }}
                  style={styles.thumbnail}
                />
              </View>
            ) : null}
          </Section>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  thumbnail: {
    width: 100,
    height: 100,
  },
  highlight: {
    fontWeight: '700',
  },
});
