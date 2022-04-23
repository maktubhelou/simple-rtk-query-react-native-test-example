/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import _ from 'lodash';
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

import { Provider } from 'react-redux';

import { Colors } from 'react-native/Libraries/NewAppScreen';
import { store } from './store';
import { useGetPokemonByNameQuery } from './services/pokemon';

const Section: React.FC<{
  title: string;
}> = ({ children, title }) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const Home = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const { data, error, isLoading } = useGetPokemonByNameQuery('rattata');

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <Provider store={store}>
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
              Select your favorite{' '}
              <Text style={styles.highlight}>Pokemon </Text>
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
    </Provider>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <Home />
    </Provider>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  thumbnail: {
    width: 100,
    height: 100,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
