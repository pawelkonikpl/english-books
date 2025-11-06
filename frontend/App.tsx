import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Provider as PaperProvider} from 'react-native-paper';

import {LibraryScreen} from './src/screens/LibraryScreen';

const Tab = createBottomTabNavigator();

// Creative Energy Theme
const theme = {
  colors: {
    primary: '#EC4899',
    secondary: '#F59E0B',
    accent: '#8B5CF6',
    background: '#FFF7ED',
    surface: '#FFFFFF',
    text: '#292524',
    error: '#EF4444',
  },
};

function App(): React.JSX.Element {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <SafeAreaView style={styles.container}>
          <StatusBar barStyle="dark-content" backgroundColor="#FFF7ED" />
          <Tab.Navigator
            screenOptions={{
              tabBarActiveTintColor: '#EC4899',
              tabBarInactiveTintColor: '#78716C',
              headerShown: false,
            }}>
            <Tab.Screen name="Library" component={LibraryScreen} />
          </Tab.Navigator>
        </SafeAreaView>
      </NavigationContainer>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF7ED',
  },
});

export default App;
